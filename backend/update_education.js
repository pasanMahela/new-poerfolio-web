import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import Education from './models/Education.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const newEducationData = [
    {
        degree: "BSc (Hons) in Information Technology",
        institution: "Sri Lanka Institute of Information Technology",
        period: "January 2023 - Present",
        status: "In Progress",
        gpa: "3.49",
        specialization: "Specialising in Software Engineering", // Adding this custom field if schema supports or just append to degree? 
        // Schema only has degree, institution, period, gpa, status.
        // Let's modify degree to include specialization or just stick to schema. 
        // The UI used to show specialization if present. Let's check schema again. 
        // Schema is strict by default? No, Mongoose schema is strict.
        // I should probably add 'specialization' to schema if I want to keep it separated, 
        // or merge it into degree string.
        // For now, let's look at schema file again. It only had 5 fields.
        // But the UI uses `edu.specialization`. 
        // So I should probably update the schema too to allow this field.
        // I will add it to the data here and then update schema in next step.
        icon: "🎓" // UI uses icon from data file, I might need to store it or decide in UI based on logic.
        // The current UI uses `edu.icon`. 
        // I should probably persist the icon or move icon logic to frontend.
        // For now let's save what we can.
    },
    {
        degree: "Certificate in Information Technology",
        institution: "Esoft Metro Campus, Anuradhapura",
        period: "January 2022 - July 2022",
        status: "Completed",
        icon: "📜"
    },
    {
        degree: "Science Stream",
        institution: "GCE Advanced Level",
        period: "2019",
        status: "Completed",
        icon: "📚"
    },
    {
        degree: "General Education",
        institution: "GCE Ordinary Level",
        period: "2016",
        status: "Completed",
        icon: "📖"
    }
];

// I'll skip icon and specialization in this array if schema rejects them, 
// but wait, I can modify schema first.
// Let's assume I will modify schema to add 'icon' and 'specialization'.

async function updateEducation() {
    try {
        console.log('🚀 Starting education update...\n');

        await connectDB();

        console.log('🗑️  Clearing existing education data...');
        await Education.deleteMany({});
        console.log('✅ Existing education data cleared\n');

        console.log('🎓 Inserting new education...');
        // Note: Fields not in schema will be dropped by default mongoose strict mode unless I update schema.
        await Education.insertMany(newEducationData);
        console.log(`✅ Inserted ${newEducationData.length} education entries\n`);

        console.log('🎉 Education update completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Update failed:', error);
        process.exit(1);
    }
}

updateEducation();
