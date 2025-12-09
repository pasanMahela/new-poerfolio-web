import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import Project from './models/Project.js';
import Experience from './models/Experience.js';
import Skill from './models/Skill.js';
import Education from './models/Education.js';
import Settings from './models/Settings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Sample data based on your portfolio
const projectsData = [
    {
        title: "Automated Testing Framework",
        desc: "Developed a comprehensive automated testing framework using Selenium and TestNG for web application testing",
        tech: ["Selenium", "TestNG", "Java", "Maven"],
        repo: "https://github.com/pasanMahela/automated-testing-framework",
        visible: true,
        featured: true,
        stars: 0,
        language: "Java"
    },
    {
        title: "ERP System Module",
        desc: "Built custom modules for enterprise ERP system with focus on inventory management and reporting",
        tech: ["Java", "Spring Boot", "PostgreSQL", "React"],
        repo: "https://github.com/pasanMahela/erp-module",
        visible: true,
        featured: true,
        stars: 0,
        language: "Java"
    },
    {
        title: "Portfolio Website",
        desc: "Modern portfolio website with admin dashboard and CMS capabilities",
        tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
        repo: "https://github.com/pasanMahela/portfolio",
        visible: true,
        featured: true,
        stars: 0,
        language: "JavaScript"
    }
];

const experienceData = [
    {
        company: "Arimac Lanka (Pvt) Ltd",
        role: "Associate Software Engineer",
        period: "September 2023 - Present",
        location: "Colombo, Sri Lanka",
        type: "full-time",
        achievements: [
            "Developed and maintained enterprise ERP systems",
            "Implemented automated testing frameworks",
            "Collaborated with cross-functional teams on multiple projects",
            "Improved system performance and reliability"
        ]
    },
    {
        company: "Freelance",
        role: "Full Stack Developer",
        period: "January 2022 - August 2023",
        location: "Remote",
        type: "freelance",
        achievements: [
            "Built custom web applications for various clients",
            "Implemented responsive designs and modern UI/UX",
            "Managed end-to-end project delivery"
        ]
    }
];

const skillsData = [
    { name: "Java", category: "Backend" },
    { name: "JavaScript", category: "Frontend" },
    { name: "React", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Express", category: "Backend" },
    { name: "MongoDB", category: "Database" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MySQL", category: "Database" },
    { name: "Spring Boot", category: "Backend" },
    { name: "Selenium", category: "Tools" },
    { name: "TestNG", category: "Tools" },
    { name: "Git", category: "Tools" },
    { name: "Docker", category: "DevOps" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "HTML/CSS", category: "Frontend" }
];

const educationData = [
    {
        degree: "BSc (Hons) in Information Technology",
        institution: "Sri Lanka Institute of Information Technology (SLIIT)",
        period: "2020 - 2024",
        gpa: "3.5",
        status: "Completed"
    }
];

const settingsData = {
    personal: {
        name: "Pasan Vithanage",
        title: "Associate Software Engineer",
        tagline: "Building scalable solutions with expertise in enterprise ERP systems, full-stack development, and test automation",
        email: "pasancp2000@gmail.com",
        phone: "+94-712684685",
        location: "Malabe, Sri Lanka",
        github: "https://github.com/pasanMahela",
        linkedin: "https://www.linkedin.com/in/pasan-vithanage"
    },
    about: {
        summary: "Experienced software engineer specializing in full-stack development and enterprise ERP systems. Passionate about creating exceptional user experiences and building scalable solutions.",
        stats: {
            experience: "2+",
            projects: "15+",
            technologies: "35+"
        },
        strengths: [
            "Full-Stack Development",
            "Enterprise ERP Systems",
            "Test Automation",
            "Problem Solving"
        ]
    }
};

async function migrateData() {
    try {
        console.log('🚀 Starting data migration...\n');

        // Connect to MongoDB
        await connectDB();

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await Project.deleteMany({});
        await Experience.deleteMany({});
        await Skill.deleteMany({});
        await Education.deleteMany({});
        await Settings.deleteMany({});
        console.log('✅ Existing data cleared\n');

        // Insert Projects
        console.log('📁 Inserting projects...');
        const projects = await Project.insertMany(projectsData);
        console.log(`✅ Inserted ${projects.length} projects\n`);

        // Insert Experience
        console.log('💼 Inserting experience...');
        const experience = await Experience.insertMany(experienceData);
        console.log(`✅ Inserted ${experience.length} experience entries\n`);

        // Insert Skills
        console.log('🛠️  Inserting skills...');
        const skills = await Skill.insertMany(skillsData);
        console.log(`✅ Inserted ${skills.length} skills\n`);

        // Insert Education
        console.log('🎓 Inserting education...');
        const education = await Education.insertMany(educationData);
        console.log(`✅ Inserted ${education.length} education entries\n`);

        // Insert Settings
        console.log('⚙️  Inserting settings...');
        const settings = await Settings.create(settingsData);
        console.log(`✅ Settings inserted\n`);

        console.log('🎉 Data migration completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`   Projects: ${projects.length}`);
        console.log(`   Experience: ${experience.length}`);
        console.log(`   Skills: ${skills.length}`);
        console.log(`   Education: ${education.length}`);
        console.log(`   Settings: 1`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

// Run migration
migrateData();
