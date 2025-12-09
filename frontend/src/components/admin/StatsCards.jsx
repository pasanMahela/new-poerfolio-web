import { motion } from 'framer-motion';
import { FolderGit2, Eye, Star } from 'lucide-react';

export default function StatsCards({ stats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-sky-500/10 rounded-lg">
                        <FolderGit2 className="w-5 h-5 text-sky-500" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Projects</p>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stats.totalProjects}</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                        <Eye className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Visible</p>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stats.visibleProjects}</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                        <Star className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Stars</p>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stats.totalStars}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
