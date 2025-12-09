import { Search, Filter, GitBranch, Plus, RefreshCw } from 'lucide-react';

export default function AdminToolbar({
    searchQuery,
    onSearchChange,
    filterVisible,
    onFilterChange,
    activeTab,
    onSyncGitHub,
    syncingGitHub,
    onAddNew,
    selectedCount,
    onBulkAction
}) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 mb-4 border border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-wrap gap-3 items-center">
                {/* Search */}
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
                        />
                    </div>
                </div>

                {/* Filter (Projects only) */}
                {activeTab === 'projects' && (
                    <select
                        value={filterVisible}
                        onChange={(e) => onFilterChange(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
                    >
                        <option value="all">All Projects</option>
                        <option value="visible">Visible Only</option>
                        <option value="hidden">Hidden Only</option>
                    </select>
                )}

                {/* GitHub Sync */}
                {activeTab === 'projects' && (
                    <button
                        onClick={onSyncGitHub}
                        disabled={syncingGitHub}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm disabled:opacity-50"
                    >
                        {syncingGitHub ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                            <GitBranch className="w-4 h-4" />
                        )}
                        Sync GitHub
                    </button>
                )}

                {/* Add New */}
                <button
                    onClick={onAddNew}
                    className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add New
                </button>
            </div>

            {/* Bulk Actions */}
            {activeTab === 'projects' && selectedCount > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400 py-2">
                        {selectedCount} selected
                    </span>
                    <button
                        onClick={() => onBulkAction('show')}
                        className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
                    >
                        Show All
                    </button>
                    <button
                        onClick={() => onBulkAction('hide')}
                        className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm"
                    >
                        Hide All
                    </button>
                    <button
                        onClick={() => onBulkAction('feature')}
                        className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm"
                    >
                        Feature
                    </button>
                    <button
                        onClick={() => onBulkAction('delete')}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
