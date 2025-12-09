import { motion } from 'framer-motion';
import { Edit2, Trash2, Code } from 'lucide-react';

export default function SkillCard({ skill, onEdit, onDelete }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800 hover:border-sky-500 dark:hover:border-sky-500 transition-all group"
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                    {/* Icon */}
                    <div className="p-2 bg-gradient-to-br from-sky-500 to-purple-500 rounded-lg">
                        <Code className="w-5 h-5 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                            {skill.name}
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {skill.category}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(skill)}
                        className="p-2 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg transition-colors"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(skill.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
