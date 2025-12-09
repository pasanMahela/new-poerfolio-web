import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    period: { type: String, required: true },
    location: String,
    type: { type: String, enum: ['full-time', 'part-time', 'internship', 'freelance', 'contract'], default: 'full-time' },
    achievements: [String]
}, { timestamps: true });

export default mongoose.model('Experience', experienceSchema);
