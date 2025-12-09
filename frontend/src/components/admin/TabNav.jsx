export default function TabNav({ tabs, activeTab, onTabChange }) {
    return (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-sky-500 text-white'
                                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}
