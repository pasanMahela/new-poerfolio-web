import express from 'express';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Skill from '../models/Skill.js';
import Education from '../models/Education.js';
import Settings from '../models/Settings.js';

const router = express.Router();

// Get all projects (only visible ones for public)
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find({ visible: true }).sort({ createdAt: -1 });
        const formattedProjects = projects.map(p => ({
            ...p.toObject(),
            id: p._id
        }));
        res.json({ success: true, data: formattedProjects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all experience
router.get('/experience', async (req, res) => {
    try {
        // Sort by period? Or mostly created order is fine for now, or add a sort key.
        // Usually reverse chronological. For now sorting by creation might not be enough if updated, 
        // but let's assume standard sort or add logic later. Mongoose default is natural order usually.
        // Let's sort by createdAt desc as a default proxy for "newest added".
        const experience = await Experience.find().sort({ createdAt: -1 });
        const formattedExperience = experience.map(e => ({
            ...e.toObject(),
            id: e._id
        }));
        res.json({ success: true, data: formattedExperience });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all skills
router.get('/skills', async (req, res) => {
    try {
        const skills = await Skill.find().sort({ category: 1 });
        const formattedSkills = skills.map(s => ({
            ...s.toObject(),
            id: s._id
        }));
        res.json({ success: true, data: formattedSkills });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all education
router.get('/education', async (req, res) => {
    try {
        const education = await Education.find().sort({ createdAt: -1 });
        const formattedEducation = education.map(e => ({
            ...e.toObject(),
            id: e._id
        }));
        res.json({ success: true, data: formattedEducation });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get settings (public info only)
router.get('/settings', async (req, res) => {
    try {
        const settings = await Settings.findOne();
        // Return everything for now as settings seem public-safe
        res.json({ success: true, data: settings || {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
