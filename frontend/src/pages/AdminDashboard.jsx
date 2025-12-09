import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../components/Toast';
import TabNav from '../components/admin/TabNav';
import StatsCards from '../components/admin/StatsCards';
import AdminToolbar from '../components/admin/AdminToolbar';
import ProjectCard from '../components/admin/ProjectCard';
import ExperienceCard from '../components/admin/ExperienceCard';
import SkillCard from '../components/admin/SkillCard';
import EducationCard from '../components/admin/EducationCard';
import EditModal from '../components/admin/EditModal';
import SettingsTab from '../components/admin/SettingsTab';
import { Briefcase, GraduationCap, Code, FolderGit2, Settings } from 'lucide-react';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [activeTab, setActiveTab] = useState('projects');
    const [projects, setProjects] = useState([]);
    const [experience, setExperience] = useState([]);
    const [skills, setSkills] = useState([]);
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterVisible, setFilterVisible] = useState('all');
    const [selectedItems, setSelectedItems] = useState([]);
    const [syncingGitHub, setSyncingGitHub] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [stats, setStats] = useState({
        totalProjects: 0,
        visibleProjects: 0,
        totalStars: 0
    });

    const token = localStorage.getItem('adminToken');
    const axiosConfig = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const tabs = [
        { id: 'projects', label: 'Projects', icon: FolderGit2 },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'skills', label: 'Skills', icon: Code },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    useEffect(() => {
        if (!token) {
            navigate('/pasan100323');
            return;
        }
        if (activeTab !== 'settings') {
            fetchData();
        }
    }, [activeTab, token, navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/${activeTab}`, axiosConfig);
            if (response.data.success) {
                const data = response.data.data;
                switch (activeTab) {
                    case 'projects':
                        setProjects(data);
                        calculateStats(data);
                        break;
                    case 'experience':
                        setExperience(data);
                        break;
                    case 'skills':
                        setSkills(data);
                        break;
                    case 'education':
                        setEducation(data);
                        break;
                    default:
                        break;
                }
            }
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error('Session expired. Please login again.');
                localStorage.removeItem('adminToken');
                navigate('/pasan100323');
            } else {
                toast.error('Failed to fetch data');
            }
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (projectsData) => {
        const visible = projectsData.filter(p => p.visible !== false).length;
        const stars = projectsData.reduce((sum, p) => sum + (p.stars || 0), 0);
        setStats({
            totalProjects: projectsData.length,
            visibleProjects: visible,
            totalStars: stars
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        toast.success('Logged out successfully');
        navigate('/');
    };

    const handleToggleVisibility = async (project) => {
        const updated = { ...project, visible: !project.visible };
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/projects/${project.id}`, updated, axiosConfig);
            toast.success(updated.visible ? 'Project shown' : 'Project hidden');
            fetchData();
        } catch (error) {
            toast.error('Failed to update visibility');
        }
    };

    const handleToggleFeatured = async (project) => {
        const updated = { ...project, featured: !project.featured };
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/projects/${project.id}`, updated, axiosConfig);
            toast.success(updated.featured ? 'Marked as featured' : 'Removed from featured');
            fetchData();
        } catch (error) {
            toast.error('Failed to update');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/${activeTab}/${id}`, axiosConfig);
            toast.success('Deleted successfully');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const handleSyncGitHub = async () => {
        setSyncingGitHub(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/github/github-repos`, axiosConfig);
            if (response.data.success) {
                toast.success(`Found ${response.data.data.length} repositories!`);
            }
        } catch (error) {
            toast.error('Failed to fetch GitHub repos');
        } finally {
            setSyncingGitHub(false);
        }
    };

    const handleBulkAction = async (action) => {
        if (selectedItems.length === 0) {
            toast.error('No items selected');
            return;
        }

        try {
            for (const id of selectedItems) {
                const project = projects.find(p => p.id === id);
                if (!project) continue;

                let updated = { ...project };
                if (action === 'show') updated.visible = true;
                else if (action === 'hide') updated.visible = false;
                else if (action === 'feature') updated.featured = true;
                else if (action === 'delete') {
                    await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/projects/${id}`, axiosConfig);
                    continue;
                }

                await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/projects/${id}`, updated, axiosConfig);
            }

            toast.success(`Bulk ${action} completed`);
            setSelectedItems([]);
            fetchData();
        } catch (error) {
            toast.error('Bulk action failed');
        }
    };

    const handleToggleSelect = (id, checked) => {
        if (checked) {
            setSelectedItems([...selectedItems, id]);
        } else {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
    };

    const handleAddNew = () => {
        setEditingItem({ id: 'new' });
    };

    const handleSave = async (item) => {
        try {
            if (item.id && item.id !== 'new') {
                await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/${activeTab}/${item.id}`, item, axiosConfig);
                toast.success('Updated successfully');
            } else {
                const newItem = { ...item };
                delete newItem.id;
                await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/${activeTab}`, newItem, axiosConfig);
                toast.success('Created successfully');
            }
            setEditingItem(null);
            fetchData();
        } catch (error) {
            toast.error('Failed to save');
        }
    };

    const getCurrentData = () => {
        switch (activeTab) {
            case 'projects': return projects;
            case 'experience': return experience;
            case 'skills': return skills;
            case 'education': return education;
            default: return [];
        }
    };

    const getFilteredProjects = () => {
        let filtered = projects;

        if (searchQuery) {
            filtered = filtered.filter(p =>
                JSON.stringify(p).toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterVisible !== 'all') {
            filtered = filtered.filter(p =>
                filterVisible === 'visible' ? p.visible !== false : p.visible === false
            );
        }

        return filtered;
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-20">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                Portfolio Admin
                            </h1>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                Manage your portfolio content
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {activeTab === 'projects' && <StatsCards stats={stats} />}

                <TabNav
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={(tab) => {
                        setActiveTab(tab);
                        setSelectedItems([]);
                        setSearchQuery('');
                    }}
                />

                {activeTab === 'settings' ? (
                    <SettingsTab token={token} />
                ) : (
                    <>
                        <AdminToolbar
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            filterVisible={filterVisible}
                            onFilterChange={setFilterVisible}
                            activeTab={activeTab}
                            onSyncGitHub={handleSyncGitHub}
                            syncingGitHub={syncingGitHub}
                            onAddNew={handleAddNew}
                            selectedCount={selectedItems.length}
                            onBulkAction={handleBulkAction}
                        />

                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {activeTab === 'projects' && getFilteredProjects().map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        isSelected={selectedItems.includes(project.id)}
                                        onToggleSelect={handleToggleSelect}
                                        onToggleVisibility={handleToggleVisibility}
                                        onToggleFeatured={handleToggleFeatured}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}

                                {activeTab === 'experience' && getCurrentData().map((exp) => (
                                    <ExperienceCard
                                        key={exp.id}
                                        experience={exp}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}

                                {activeTab === 'skills' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {getCurrentData().map((skill) => (
                                            <SkillCard
                                                key={skill.id}
                                                skill={skill}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                            />
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'education' && getCurrentData().map((edu) => (
                                    <EducationCard
                                        key={edu.id}
                                        education={edu}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}

                                {getCurrentData().length === 0 && (
                                    <div className="text-center py-12 text-zinc-500">
                                        No {activeTab} found. Click "Add New" to create one!
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}

                {editingItem && (
                    <EditModal
                        item={editingItem}
                        activeTab={activeTab}
                        onSave={handleSave}
                        onClose={() => setEditingItem(null)}
                    />
                )}
            </div>
        </div>
    );
}
