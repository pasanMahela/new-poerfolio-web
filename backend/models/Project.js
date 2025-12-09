import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    tech: [String],
    repo: String,
    demo: String,
    visible: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    stars: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    language: String
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
