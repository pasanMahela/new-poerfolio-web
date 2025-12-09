import crypto from 'crypto';

// Generate 6-digit OTP
export function generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
}

// Store OTPs in memory (in production, use Redis or database)
const otpStore = new Map();

// Save OTP with expiry (10 minutes)
export function saveOTP(email, otp) {
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    otpStore.set(email, { otp, expiresAt, attempts: 0 });
}

// Verify OTP
export function verifyOTP(email, otp) {
    const stored = otpStore.get(email);

    if (!stored) {
        return { success: false, message: 'No OTP found. Please request a new one.' };
    }

    if (Date.now() > stored.expiresAt) {
        otpStore.delete(email);
        return { success: false, message: 'OTP expired. Please request a new one.' };
    }

    if (stored.attempts >= 3) {
        otpStore.delete(email);
        return { success: false, message: 'Too many failed attempts. Please request a new OTP.' };
    }

    if (stored.otp !== otp) {
        stored.attempts++;
        return { success: false, message: 'Invalid OTP. Please try again.' };
    }

    // OTP is valid, remove it
    otpStore.delete(email);
    return { success: true, message: 'OTP verified successfully.' };
}

// Clean up expired OTPs every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [email, data] of otpStore.entries()) {
        if (now > data.expiresAt) {
            otpStore.delete(email);
        }
    }
}, 5 * 60 * 1000);
