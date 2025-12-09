import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import Experience from './models/Experience.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const newExperienceData = [
    {
        company: "IFS R&D International Pvt Ltd",
        role: "Associate Software Engineer",
        period: "September 2025 - Present",
        location: "Colombo, Sri Lanka",
        type: "full-time",
        achievements: [
            "Contributed to 15+ enhancements in the Aviation Maintenance area, improving Aurena UI pages, projections, PL/SQL logic, and Oracle views used across daily operations",
            "Implemented Enhanced Search and CUD functionality including UI updates, projections, and supporting queries and datamarts",
            "Improved the Baseline and Actual Loaders by refining validations, adding clearer error messages, and fixing import related issues",
            "Worked on inventory functions such as lock/unlock and capability updates, implementing the required UI behavior and backend logic",
            "Built and updated datamart views to improve UI performance",
            "Resolved 20+ defects across fault management, loaders, and inventory modules by adjusting Aurena configurations, SQL queries, and PL/SQL code",
            "Supported CI/CD and test automation, ensuring Jenkins pipelines and report generation run smoothly",
            "Collaborated with developers, QA, and product owners in an Agile environment through design discussions, code reviews, and testing cycles"
        ]
    },
    {
        company: "IFS R&D International Pvt Ltd",
        role: "Software Engineer Intern",
        period: "November 2024 - August 2025",
        location: "Colombo, Sri Lanka",
        type: "internship",
        achievements: [
            "Assisted development for the Aviation Maintenance domain using Aurena Framework, Java, SQL, and PL/SQL",
            "Integrated a Jenkins CI/CD pipeline that automated test execution and report generation, reducing manual reporting efforts",
            "Helped maintain a Selenium automation suite used during regression cycles, improving testing speed and reliability",
            "Supported ongoing ERP development by fixing defects and writing SQL queries for troubleshooting and analytics",
            "Contributed to enhancements in the Actuals & Baseline Loader, improving data validation and error-handling accuracy",
            "Monitored system performance using Grafana, Jenkins, and Bamboo, identifying and resolving issues before they impacted users",
            "Worked closely with senior engineers and QA in Agile sprints, performing code reviews, task updates, and daily collaboration"
        ]
    },
    {
        company: "Veryality",
        role: "Freelance Roblox Game Developer",
        period: "January 2025 - June 2025",
        location: "Remote",
        type: "freelance",
        achievements: [
            "Built interactive gameplay systems using Lua, OOP, and the Knit framework",
            "Integrated Firebase to manage player progress and live game data",
            "Delivered multiple gameplay improvements that enhanced player experience and system stability"
        ]
    }
];

async function updateExperience() {
    try {
        console.log('🚀 Starting experience update...\n');

        // Connect to MongoDB
        await connectDB();

        // Clear existing experience data
        console.log('🗑️  Clearing existing experience data...');
        await Experience.deleteMany({});
        console.log('✅ Existing experience data cleared\n');

        // Insert new Experience
        console.log('💼 Inserting new experience...');
        const experience = await Experience.insertMany(newExperienceData);
        console.log(`✅ Inserted ${experience.length} experience entries\n`);

        console.log('🎉 Experience update completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Update failed:', error);
        process.exit(1);
    }
}

// Run update
updateExperience();
