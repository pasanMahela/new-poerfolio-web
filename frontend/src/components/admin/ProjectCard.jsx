import { motion } from 'framer-motion';
import { Eye, EyeOff, Star, Edit2, Trash2, Code } from 'lucide-react';

export default function ProjectCard({
    project,
    isSelected,
    onToggleSelect,
    onToggleVisibility,
    onToggleFeatured,
    onEdit,
    onDelete
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white dark:bg-zinc-900 rounded-lg p-4 border transition-all ${isSelected
                    ? 'border-sky-500 ring-2 ring-sky-500/20'
                    : 'border-zinc-200 dark:border-zinc-800'
                }`}
        >
            <div className="flex items-start gap-4">
                {/* Checkbox */}
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onToggleSelect(project.id, e.target.checked)}
                    className="mt-1 w-4 h-4 text-sky-500 rounded"
                />

                {/* Content */}
                <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                    {project.title}
                                </h3>
                                {project.featured && (
                                    <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs rounded-full">
                                        Featured
                                    </span>
                                )}
                                {project.visible === false && (
                                    <span className="px-2 py-0.5 bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 text-xs rounded-full">
                                        Hidden
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                                {project.desc}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
                                {project.stars > 0 && (
                                    <span className="flex items-center gap-1">
                                        <Star className="w-3 h-3" />
                                        {project.stars}
                                    </span>
                                )}
                                {project.language && (
                                    <span className="flex items-center gap-1">
                                        <Code className="w-3 h-3" />
                                        {project.language}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => onToggleVisibility(project)}
                                className={`p-2 rounded-lg transition-colors ${project.visible !== false
                                        ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                                        : 'text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                    }`}
                                title={project.visible !== false ? 'Hide' : 'Show'}
                            >
                                {project.visible !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => onToggleFeatured(project)}
                                className={`p-2 rounded-lg transition-colors ${project.featured
                                        ? 'text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                                        : 'text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                    }`}
                                title={project.featured ? 'Unfeature' : 'Feature'}
                            >
                                <Star className={`w-4 h-4 ${project.featured ? 'fill-current' : ''}`} />
                            </button>
                            <button
                                onClick={() => onEdit(project)}
                                className="p-2 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg transition-colors"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => onDelete(project.id)}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
