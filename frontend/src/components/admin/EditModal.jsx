import { motion } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { useState, useEffect } from 'react';

// Helper to parse "Month Year" string to "YYYY-MM-DD"
const parseDateString = (dateStr) => {
    if (!dateStr || dateStr.toLowerCase() === 'present') return '';
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
    }
    // Handle "Year" only case (e.g. "2020")
    if (/^\d{4}$/.test(dateStr)) {
        return `${dateStr}-01-01`;
    }
    return '';
};

// Helper to format "YYYY-MM-DD" to "Month Year"
const formatDateString = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

export default function EditModal({ item, activeTab, onSave, onClose }) {
    const [formData, setFormData] = useState(item || {});
    const [useDatePicker, setUseDatePicker] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isPresent, setIsPresent] = useState(false);

    useEffect(() => {
        setFormData(item || {});

        // Initialize date picker logic for Experience and Education
        if (item && (activeTab === 'experience' || activeTab === 'education')) {
            setUseDatePicker(true);
            const period = item.period || '';
            const [start, end] = period.split(' - ').map(s => s?.trim());

            setStartDate(parseDateString(start));

            if (end?.toLowerCase() === 'present') {
                setIsPresent(true);
                setEndDate('');
            } else {
                setIsPresent(false);
                setEndDate(parseDateString(end));
            }
        } else {
            setUseDatePicker(false);
        }
    }, [item, activeTab]);

    // Update formData.period whenever date inputs change
    useEffect(() => {
        if (!useDatePicker) return;

        let periodString = '';
        if (startDate) {
            const startStr = formatDateString(startDate);
            if (isPresent) {
                periodString = `${startStr} - Present`;
            } else if (endDate) {
                const endStr = formatDateString(endDate);
                periodString = `${startStr} - ${endStr}`;
            } else {
                periodString = startStr;
            }
        }

        // Only update if changed to avoid infinite loop
        if (periodString && periodString !== formData.period) {
            setFormData(prev => ({ ...prev, period: periodString }));
        }
    }, [startDate, endDate, isPresent, useDatePicker]);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleArrayChange = (field, value) => {
        const array = value.split('\n').filter(line => line.trim());
        setFormData({ ...formData, [field]: array });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!item) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-zinc-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                        {formData.id === 'new' ? 'Add New' : 'Edit'} {activeTab.slice(0, -1)}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Projects Form */}
                    {activeTab === 'projects' && (
                        <>
                            <input
                                type="text"
                                placeholder="Project Title"
                                value={formData.title || ''}
                                onChange={(e) => handleChange('title', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={formData.desc || ''}
                                onChange={(e) => handleChange('desc', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                                rows={3}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Tech Stack (comma separated)"
                                value={formData.tech?.join(', ') || ''}
                                onChange={(e) => handleChange('tech', e.target.value.split(',').map(t => t.trim()))}
                                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                            />
                            <input
                                type="url"
                                placeholder="Repository URL"
                                value={formData.repo || ''}
                                onChange={(e) => handleChange('repo', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                            />
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.visible !== false}
                                        onChange={(e) => handleChange('visible', e.target.checked)}
                                        className="w-4 h-4 text-sky-500 rounded"
                                    />
                                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Visible on portfolio</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured || false}
                                        onChange={(e) => handleChange('featured', e.target.checked)}
                                        className="w-4 h-4 text-sky-500 rounded"
                                    />
                                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Featured project</span>
                                </label>
                            </div>
                        </>
                    )}

                    {/* Experience Form */}
                    {activeTab === 'experience' && (
                        <>
                            <input
                                type="text"
                                placeholder="Company"
                                value={formData.company || ''}
                                onChange={(e) => handleChange('company', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Role"
                                value={formData.role || ''}
                                onChange={(e) => handleChange('role', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                                required
                            />

                            {/* Date Picker Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">End Date</label>
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            disabled={isPresent}
                                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 disabled:opacity-50"
                                        />
                                        <label className="flex items-center gap-2 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={isPresent}
                                                onChange={(e) => setIsPresent(e.target.checked)}
                                                className="w-4 h-4 text-sky-500 rounded"
                                            />
                                            <span className="text-sm text-zinc-700 dark:text-zinc-300">Present</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs text-zinc-500">
                                Formatted: {formData.period}
                            </div>

                            <input
                                type="text"
                                placeholder="Location (e.g., Colombo, Sri Lanka)"
                                value={formData.location || ''}
                                onChange={(e) => handleChange('location', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                            />
                            <select
                                value={formData.type || 'full-time'}
                                onChange={(e) => handleChange('type', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                            >
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="internship">Internship</option>
                                <option value="freelance">Freelance</option>
                                <option value="contract">Contract</option>
                            </select>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Achievements (one per line)
                                </label>
                                <textarea
                                    placeholder="Enter each achievement on a new line"
                                    value={formData.achievements?.join('\n') || ''}
                                    onChange={(e) => handleArrayChange('achievements', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                                    rows={5}
                                />
                            </div>
                        </>
                    )}

                    {/* Skills Form */}
                    {activeTab === 'skills' && (
                        <>
                            <input
                                type="text"
                                placeholder="Skill Name"
                                value={formData.name || ''}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                                required
                            />
                            <select
                                value={formData.category || 'Frontend'}
                                onChange={(e) => handleChange('category', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                            >
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="Database">Database</option>
                                <option value="DevOps">DevOps</option>
                                <option value="Mobile">Mobile</option>
                                <option value="Tools">Tools</option>
                                <option value="Other">Other</option>
                            </select>
                        </>
                    )}

                    {/* Education Form */}
                    {activeTab === 'education' && (
                        <>
                            <input
                                type="text"
                                placeholder="Degree"
                                value={formData.degree || ''}
                                onChange={(e) => handleChange('degree', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Institution"
                                value={formData.institution || ''}
                                onChange={(e) => handleChange('institution', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                                required
                            />

                            {/* Date Picker Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">End Date</label>
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            disabled={isPresent}
                                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 disabled:opacity-50"
                                        />
                                        <label className="flex items-center gap-2 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={isPresent}
                                                onChange={(e) => setIsPresent(e.target.checked)}
                                                className="w-4 h-4 text-sky-500 rounded"
                                            />
                                            <span className="text-sm text-zinc-700 dark:text-zinc-300">Present</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs text-zinc-500">
                                Formatted: {formData.period}
                            </div>

                            <input
                                type="text"
                                placeholder="GPA (optional)"
                                value={formData.gpa || ''}
                                onChange={(e) => handleChange('gpa', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                            />
                            <select
                                value={formData.status || 'Completed'}
                                onChange={(e) => handleChange('status', e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                            >
                                <option value="Completed">Completed</option>
                                <option value="In Progress">In Progress</option>
                            </select>
                        </>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-4">
                        <button
                            type="submit"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
