import express from 'express';
import nodemailer from 'nodemailer';
import { generateOTP, saveOTP, verifyOTP } from '../utils/otp.js';
import { generateToken } from '../utils/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Admin email (only this email can access admin)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'pasancp2000@gmail.com';

// Email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Rate limiting for OTP requests (max 3 per hour per IP)
const otpRequestLimits = new Map();

function checkRateLimit(ip) {
    const now = Date.now();
    const requests = otpRequestLimits.get(ip) || [];

    // Remove requests older than 1 hour
    const recentRequests = requests.filter(time => now - time < 60 * 60 * 1000);

    if (recentRequests.length >= 3) {
        return false;
    }

    recentRequests.push(now);
    otpRequestLimits.set(ip, recentRequests);
    return true;
}

// Request OTP
router.post('/request-otp', async (req, res) => {
    const { email } = req.body;
    const clientIP = req.ip;

    // Validate email
    if (!email || email !== ADMIN_EMAIL) {
        return res.status(403).json({
            success: false,
            message: 'Unauthorized email address'
        });
    }

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
        return res.status(429).json({
            success: false,
            message: 'Too many OTP requests. Please try again later.'
        });
    }

    try {
        // Generate OTP
        const otp = generateOTP();
        saveOTP(email, otp);

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Portfolio Admin Login - OTP Code',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0ea5e9;">Portfolio Admin Login</h2>
          <p>Your one-time password (OTP) for admin access:</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #0ea5e9; font-size: 36px; margin: 0; letter-spacing: 8px;">${otp}</h1>
          </div>
          <p style="color: #6b7280;">This code will expire in <strong>10 minutes</strong>.</p>
          <p style="color: #6b7280; font-size: 14px;">
            If you didn't request this code, please ignore this email.
          </p>
        </div>
      `
        });

        res.json({
            success: true,
            message: 'OTP sent to your email'
        });

    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send OTP: ' + (error.message || 'Unknown error'),
            debug: error.toString()
        });
    }
});

// Verify OTP and login
router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    // Validate email
    if (!email || email !== ADMIN_EMAIL) {
        return res.status(403).json({
            success: false,
            message: 'Unauthorized email address'
        });
    }

    // Verify OTP
    const result = verifyOTP(email, otp);

    if (!result.success) {
        return res.status(400).json(result);
    }

    // Generate JWT token
    const token = generateToken(email);

    res.json({
        success: true,
        message: 'Login successful',
        token
    });
});

export default router;
