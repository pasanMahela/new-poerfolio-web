import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { authenticateAdmin } from '../utils/auth.js';
import Settings from '../models/Settings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// All routes require authentication
router.use(authenticateAdmin);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../frontend/public');
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        if (file.fieldname === 'cv') {
            cb(null, 'cv.pdf');
        } else if (file.fieldname === 'avatar') {
            const ext = path.extname(file.originalname);
            cb(null, `avatar${ext}`);
        } else {
            cb(null, file.originalname);
        }
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'cv' && file.mimetype === 'application/pdf') {
            cb(null, true);
        } else if ((file.fieldname === 'avatar' || file.fieldname === 'profileImage') && file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else if (file.fieldname === '3dmodel' && file.originalname.endsWith('.glb')) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});

// Get all settings
router.get('/settings', async (req, res) => {
    try {
        let settings = await Settings.findOne();

        // If no settings exist, return default structure (or create one)
        if (!settings) {
            settings = {
                personal: {
                    name: 'Pasan Vithanage',
                    title: 'Associate Software Engineer',
                    tagline: 'Building scalable solutions with expertise in enterprise ERP systems',
                    email: 'pasancp2000@gmail.com',
                    phone: '+94-712684685',
                    location: 'Malabe, Sri Lanka',
                    github: 'https://github.com/pasanMahela',
                    linkedin: 'https://www.linkedin.com/in/pasan-vithanage',
                },
                about: {
                    summary: 'Experienced software engineer specializing in full-stack development...',
                    stats: {
                        experience: '2+',
                        projects: '15+',
                        technologies: '35+'
                    },
                    strengths: [
                        'Full-Stack Development',
                        'Enterprise ERP Systems',
                        'Test Automation',
                        'Problem Solving'
                    ]
                }
            };
        }

        res.json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update settings
router.put('/settings', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (settings) {
            settings = await Settings.findByIdAndUpdate(settings._id, req.body, { new: true });
        } else {
            settings = new Settings(req.body);
            await settings.save();
        }
        res.json({ success: true, message: 'Settings updated successfully', data: settings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Upload CV
router.post('/upload-cv', upload.single('cv'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        res.json({
            success: true,
            message: 'CV uploaded successfully',
            filename: req.file.filename
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Upload 3D model
router.post('/upload-3d-model', upload.single('3dmodel'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        res.json({
            success: true,
            message: '3D model uploaded successfully',
            filename: req.file.filename
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Upload avatar image
router.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        res.json({
            success: true,
            message: 'Avatar uploaded successfully',
            filename: req.file.filename
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Upload profile image
router.post('/upload-profile-image', upload.single('profileImage'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Rename to pasan.JPG
        const oldPath = req.file.path;
        const newPath = path.join(path.dirname(oldPath), 'pasan.JPG');
        await fs.rename(oldPath, newPath);

        res.json({
            success: true,
            message: 'Profile image uploaded successfully',
            filename: 'pasan.JPG'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
