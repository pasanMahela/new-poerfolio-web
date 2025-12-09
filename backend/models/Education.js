import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    period: { type: String, required: true },
    gpa: String,
    status: { type: String, enum: ['Completed', 'In Progress'], default: 'Completed' },
    specialization: String,
    icon: String
}, { timestamps: true });

export default mongoose.model('Education', educationSchema);
