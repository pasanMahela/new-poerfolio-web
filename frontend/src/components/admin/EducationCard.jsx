import { motion } from 'framer-motion';
import { Edit2, Trash2, GraduationCap, Calendar, Award } from 'lucide-react';

export default function EducationCard({ education, onEdit, onDelete }) {
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
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <GraduationCap className="w-5 h-5 text-purple-500" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                                {education.degree}
                            </h3>
                            <p className="text-purple-600 dark:text-purple-400 font-medium">
                                {education.institution}
                            </p>
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {education.period}
                        </div>
                        {education.gpa && (
                            <div className="flex items-center gap-1">
                                <Award className="w-4 h-4" />
                                GPA: {education.gpa}
                            </div>
                        )}
                        {education.status && (
                            <span className={`px-2 py-1 rounded text-xs ${education.status === 'Completed'
                                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                    : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                                }`}>
                                {education.status}
                            </span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(education)}
                        className="p-2 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg transition-colors"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(education.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
