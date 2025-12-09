import express from 'express';
import axios from 'axios';
import { authenticateAdmin } from '../utils/auth.js';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Skill from '../models/Skill.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateAdmin);

// Fetch all GitHub repositories
router.get('/github-repos', async (req, res) => {
    try {
        const username = 'pasanMahela'; // Your GitHub username
        const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

        const repos = response.data.map(repo => ({
            id: repo.id,
            title: repo.name,
            desc: repo.description || 'No description available',
            tech: [], // Will be populated from languages API
            link: repo.homepage || '',
            repo: repo.html_url,
            cover: '',
            featured: false,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            created_at: repo.created_at,
            updated_at: repo.updated_at,
            topics: repo.topics || [],
            isGitHubSync: true,
            visible: false // Hidden by default
        }));

        res.json({ success: true, data: repos });
    } catch (error) {
        console.error('GitHub API Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch GitHub repositories'
        });
    }
});

// Get repository languages
router.get('/github-repos/:owner/:repo/languages', async (req, res) => {
    try {
        const { owner, repo } = req.params;
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`);

        const languages = Object.keys(response.data);
        res.json({ success: true, data: languages });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch languages' });
    }
});

// Bulk update projects (for show/hide toggles)
router.post('/bulk-update', async (req, res) => {
    try {
        const { updates } = req.body; // Array of {id, visible, featured, etc}

        if (!updates || !Array.isArray(updates)) {
            return res.status(400).json({ success: false, message: 'Invalid updates format' });
        }

        const operations = updates.map(update => ({
            updateOne: {
                filter: { _id: update.id },
                update: { $set: update }
            }
        }));

        if (operations.length > 0) {
            await Project.bulkWrite(operations);
        }

        res.json({ success: true, message: 'Bulk update successful' });
    } catch (error) {
        console.error('Bulk update error:', error);
        res.status(500).json({ success: false, message: 'Bulk update failed' });
    }
});

// Analytics endpoint
router.get('/analytics', async (req, res) => {
    try {
        const totalProjects = await Project.countDocuments();
        const visibleProjects = await Project.countDocuments({ visible: true });

        // Calculate total stars
        const projects = await Project.find({}, 'stars');
        const totalStars = projects.reduce((sum, p) => sum + (p.stars || 0), 0);

        const totalExperience = await Experience.countDocuments();
        const totalSkills = await Skill.countDocuments();

        const stats = {
            totalProjects,
            visibleProjects,
            totalStars,
            totalExperience,
            totalSkills,
            recentUpdates: [] // Could query recent logs if we had them
        };

        res.json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch analytics' });
    }
});

export default router;
