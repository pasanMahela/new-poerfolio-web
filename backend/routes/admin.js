import express from 'express';
import { authenticateAdmin } from '../utils/auth.js';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Skill from '../models/Skill.js';
import Education from '../models/Education.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateAdmin);

// ===== PROJECTS =====
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        // Map _id to id for frontend compatibility
        const formattedProjects = projects.map(p => ({
            ...p.toObject(),
            id: p._id
        }));
        res.json({ success: true, data: formattedProjects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/projects', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.json({ success: true, data: { ...project.toObject(), id: project._id } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, data: { ...project.toObject(), id: project._id } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ===== EXPERIENCE =====
router.get('/experience', async (req, res) => {
    try {
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

router.post('/experience', async (req, res) => {
    try {
        const experience = new Experience(req.body);
        await experience.save();
        res.json({ success: true, data: { ...experience.toObject(), id: experience._id } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/experience/:id', async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!experience) {
            return res.status(404).json({ success: false, message: 'Experience not found' });
        }
        res.json({ success: true, data: { ...experience.toObject(), id: experience._id } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/experience/:id', async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).json({ success: false, message: 'Experience not found' });
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ===== SKILLS =====
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

router.post('/skills', async (req, res) => {
    try {
        const skill = new Skill(req.body);
        await skill.save();
        res.json({ success: true, data: { ...skill.toObject(), id: skill._id } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/skills/:id', async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!skill) {
            return res.status(404).json({ success: false, message: 'Skill not found' });
        }
        res.json({ success: true, data: { ...skill.toObject(), id: skill._id } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/skills/:id', async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) {
            return res.status(404).json({ success: false, message: 'Skill not found' });
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ===== EDUCATION =====
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

router.post('/education', async (req, res) => {
    try {
        const education = new Education(req.body);
        await education.save();
        res.json({ success: true, data: { ...education.toObject(), id: education._id } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/education/:id', async (req, res) => {
    try {
        const education = await Education.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!education) {
            return res.status(404).json({ success: false, message: 'Education not found' });
        }
        res.json({ success: true, data: { ...education.toObject(), id: education._id } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/education/:id', async (req, res) => {
    try {
        const education = await Education.findByIdAndDelete(req.params.id);
        if (!education) {
            return res.status(404).json({ success: false, message: 'Education not found' });
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
