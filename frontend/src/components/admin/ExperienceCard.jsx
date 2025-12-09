import { motion } from 'framer-motion';
import { Edit2, Trash2, MapPin, Briefcase, Calendar } from 'lucide-react';

export default function ExperienceCard({ experience, onEdit, onDelete }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-sky-500/10 rounded-lg">
                            <Briefcase className="w-5 h-5 text-sky-500" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                                {experience.role}
                            </h3>
                            <p className="text-sky-600 dark:text-sky-400 font-medium">
                                {experience.company}
                            </p>
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {experience.period}
                        </div>
                        {experience.location && (
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {experience.location}
                            </div>
                        )}
                        {experience.type && (
                            <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-xs">
                                {experience.type}
                            </span>
                        )}
                    </div>

                    {/* Achievements */}
                    {experience.achievements && experience.achievements.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Key Achievements:
                            </p>
                            <ul className="space-y-1">
                                {experience.achievements.map((achievement, index) => (
                                    <li
                                        key={index}
                                        className="text-sm text-zinc-600 dark:text-zinc-400 pl-4 relative before:content-['•'] before:absolute before:left-0"
                                    >
                                        {achievement}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(experience)}
                        className="p-2 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg transition-colors"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(experience.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
