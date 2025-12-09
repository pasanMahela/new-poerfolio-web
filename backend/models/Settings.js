import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
    personal: {
        name: String,
        title: String,
        tagline: String,
        email: String,
        phone: String,
        location: String,
        github: String,
        linkedin: String
    },
    about: {
        summary: String,
        stats: {
            experience: String,
            projects: String,
            technologies: String
        },
        strengths: [String]
    }
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
