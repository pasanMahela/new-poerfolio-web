import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import Settings from './models/Settings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const newSettings = {
    personal: {
        name: 'Pasan Vithanage',
        title: 'Associate Software Engineer',
        tagline: 'Building scalable solutions with expertise in enterprise ERP systems, full-stack development, and test automation. Passionate about creating exceptional user experiences.',
        email: 'pasancp2000@gmail.com',
        phone: '+94-712684685',
        location: 'Malabe, Sri Lanka',
        github: 'https://github.com/pasanMahela',
        linkedin: 'https://www.linkedin.com/in/pasan-vithanage',
    },
    about: {
        summary: `I'm a motivated and aspiring Software Engineering undergraduate with hands-on experience in enterprise ERP systems, full-stack development, and test automation.\n\nSkilled in translating classroom knowledge into real-world applications through academic projects, freelance game development, and industry internships at IFS R&D International.\n\nAdept at problem-solving, collaborating in Agile teams, and quickly adapting to new tools and technologies. Passionate about building scalable solutions and continuously improving technical and professional skills.`,
        stats: {
            experience: '2+',
            projects: '8+',
            technologies: '35+'
        },
        strengths: [
            'Problem Solving',
            'Critical Thinking',
            'Teamwork',
            'Communication',
            'Time Management'
        ]
    }
};

async function updateSettings() {
    try {
        console.log('🚀 Starting settings update...\n');

        await connectDB();

        console.log('⚙️  Updating settings...');

        // Find and update or insert if not exists
        // We use findOneAndUpdate with upsert: true, but since we want to handle the singleton nature (one settings doc),
        // we can delete all and insert one, or update the existing one.
        // Let's first try to find one.
        let settings = await Settings.findOne();

        if (settings) {
            console.log('Found existing settings, updating...');
            settings.personal = newSettings.personal;
            settings.about = newSettings.about;
            await settings.save();
        } else {
            console.log('No settings found, creating new...');
            settings = new Settings(newSettings);
            await settings.save();
        }

        console.log('✅ Settings updated successfully\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Update failed:', error);
        process.exit(1);
    }
}

updateSettings();
