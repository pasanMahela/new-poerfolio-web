import { useState, useCallback, useEffect } from 'react';
import { Save, Upload, FileText, User, Mail, Phone, MapPin, Github, Linkedin, X, Check } from 'lucide-react';
import axios from 'axios';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage';
import { useToast } from '../Toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsTab({ token }) {
    const { toast } = useToast();
    const [settings, setSettings] = useState({
        personal: {
            name: 'Pasan Vithanage',
            title: 'Associate Software Engineer',
            tagline: 'Building scalable solutions with expertise in enterprise ERP systems',
            email: 'pasancp2000@gmail.com',
            phone: '+94-712684685',
            location: 'Malabe, Sri Lanka',
            github: 'https://github.com/pasanMahela',
            linkedin: 'https://www.linkedin.com/in/pasan-vithanage',
        },
        about: {
            summary: 'Experienced software engineer specializing in full-stack development and enterprise ERP systems.',
            stats: {
                experience: '2+',
                projects: '15+',
                technologies: '35+'
            },
            strengths: [
                'Full-Stack Development',
                'Enterprise ERP Systems',
                'Test Automation',
                'Problem Solving'
            ]
        }
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Cropper State
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const axiosConfig = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/public/settings`);
                if (response.data.success) {
                    setSettings(response.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error);
                toast.error('Failed to load settings');
            }
        };

        fetchSettings();
    }, [API_URL, toast]);

    const handleSaveSettings = async () => {
        setLoading(true);
        try {
            await axios.put(`${API_URL}/api/settings/settings`, settings, axiosConfig);
            toast.success('Settings saved successfully!');
        } catch (error) {
            toast.error('Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    const handleCVUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('cv', file);

        try {
            await axios.post(`${API_URL}/api/settings/upload-cv`, formData, {
                ...axiosConfig,
                headers: {
                    ...axiosConfig.headers,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('CV uploaded successfully!');
        } catch (error) {
            toast.error('Failed to upload CV');
        } finally {
            setUploading(false);
        }
    };

    const handle3DModelUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('3dmodel', file);

        try {
            await axios.post(`${API_URL}/api/settings/upload-3d-model`, formData, {
                ...axiosConfig,
                headers: {
                    ...axiosConfig.headers,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('3D model uploaded successfully!');
        } catch (error) {
            toast.error('Failed to upload 3D model');
        } finally {
            setUploading(false);
        }
    };

    // 1. Select File -> Read as DataURL -> Show Cropper
    const handleProfileImageSelect = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImageSrc(reader.result);
                setShowCropper(true);
            });
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // 2. Crop Action -> Create Blob -> Upload
    const handleCropAndUpload = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        try {
            setUploading(true);
            const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

            const formData = new FormData();
            formData.append('profileImage', croppedImageBlob, 'profile.jpg');

            await axios.post(`${API_URL}/api/settings/upload-profile-image`, formData, {
                ...axiosConfig,
                headers: {
                    ...axiosConfig.headers,
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('Profile image updated successfully!');
            setShowCropper(false);
            setImageSrc(null);
        } catch (e) {
            console.error(e);
            toast.error('Failed to upload cropped image');
        } finally {
            setUploading(false);
        }
    };

    const handleCancelCrop = () => {
        setShowCropper(false);
        setImageSrc(null);
    };

    const updateStrength = (index, value) => {
        const newStrengths = [...settings.about.strengths];
        newStrengths[index] = value;
        setSettings({
            ...settings,
            about: { ...settings.about, strengths: newStrengths }
        });
    };

    const addStrength = () => {
        setSettings({
            ...settings,
            about: {
                ...settings.about,
                strengths: [...settings.about.strengths, '']
            }
        });
    };

    const removeStrength = (index) => {
        const newStrengths = settings.about.strengths.filter((_, i) => i !== index);
        setSettings({
            ...settings,
            about: { ...settings.about, strengths: newStrengths }
        });
    };

    return (
        <div className="space-y-6 relative">
            {/* Personal Information */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={settings.personal.name}
                            onChange={(e) => setSettings({
                                ...settings,
                                personal: { ...settings.personal, name: e.target.value }
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Job Title
                        </label>
                        <input
                            type="text"
                            value={settings.personal.title}
                            onChange={(e) => setSettings({
                                ...settings,
                                personal: { ...settings.personal, title: e.target.value }
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Tagline
                        </label>
                        <input
                            type="text"
                            value={settings.personal.tagline}
                            onChange={(e) => setSettings({
                                ...settings,
                                personal: { ...settings.personal, tagline: e.target.value }
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={settings.personal.email}
                            onChange={(e) => setSettings({
                                ...settings,
                                personal: { ...settings.personal, email: e.target.value }
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Phone
                        </label>
                        <input
                            type="tel"
                            value={settings.personal.phone}
                            onChange={(e) => setSettings({
                                ...settings,
                                personal: { ...settings.personal, phone: e.target.value }
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            value={settings.personal.location}
                            onChange={(e) => setSettings({
                                ...settings,
                                personal: { ...settings.personal, location: e.target.value }
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            GitHub URL
                        </label>
                        <input
                            type="url"
                            value={settings.personal.github}
                            onChange={(e) => setSettings({
                                ...settings,
                                personal: { ...settings.personal, github: e.target.value }
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            LinkedIn URL
                        </label>
                        <input
                            type="url"
                            value={settings.personal.linkedin}
                            onChange={(e) => setSettings({
                                ...settings,
                                personal: { ...settings.personal, linkedin: e.target.value }
                            })}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                    About Me Section
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Summary
                        </label>
                        <textarea
                            value={settings.about.summary}
                            onChange={(e) => setSettings({
                                ...settings,
                                about: { ...settings.about, summary: e.target.value }
                            })}
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                    </div>

                    {/* Stats */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Statistics
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">Experience</label>
                                <input
                                    type="text"
                                    value={settings.about.stats.experience}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        about: {
                                            ...settings.about,
                                            stats: { ...settings.about.stats, experience: e.target.value }
                                        }
                                    })}
                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">Projects</label>
                                <input
                                    type="text"
                                    value={settings.about.stats.projects}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        about: {
                                            ...settings.about,
                                            stats: { ...settings.about.stats, projects: e.target.value }
                                        }
                                    })}
                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1">Technologies</label>
                                <input
                                    type="text"
                                    value={settings.about.stats.technologies}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        about: {
                                            ...settings.about,
                                            stats: { ...settings.about.stats, technologies: e.target.value }
                                        }
                                    })}
                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Key Strengths */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Key Strengths
                        </label>
                        <div className="space-y-2">
                            {settings.about.strengths.map((strength, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={strength}
                                        onChange={(e) => updateStrength(index, e.target.value)}
                                        className="flex-1 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                                    />
                                    <button
                                        onClick={() => removeStrength(index)}
                                        className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={addStrength}
                                className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors text-sm"
                            >
                                + Add Strength
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* File Uploads */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    File Uploads
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            CV / Resume (PDF)
                        </label>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleCVUpload}
                            disabled={uploading}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Profile Image (JPG, PNG)
                        </label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleProfileImageSelect}
                            disabled={uploading}
                            onClick={(e) => { e.target.value = null }} // clear value so same file can be selected again
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                        <p className="text-xs text-zinc-500 mt-1">Select an image to crop and set as profile picture.</p>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSaveSettings}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Save className="w-5 h-5" />
                    )}
                    Save All Settings
                </button>
            </div>

            {/* Cropper Modal */}
            <AnimatePresence>
                {showCropper && imageSrc && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-2xl"
                        >
                            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                                <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">Crop Profile Picture</h3>
                                <button onClick={handleCancelCrop} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                                    <X className="w-5 h-5 text-zinc-500" />
                                </button>
                            </div>

                            <div className="relative h-80 w-full bg-black">
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                />
                            </div>

                            <div className="p-4 space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-zinc-600 dark:text-zinc-400 min-w-[3rem]">Zoom</span>
                                    <input
                                        type="range"
                                        value={zoom}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        aria-labelledby="Zoom"
                                        onChange={(e) => setZoom(Number(e.target.value))}
                                        className="w-full h-1 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                                    />
                                </div>

                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        onClick={handleCancelCrop}
                                        className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleCropAndUpload}
                                        disabled={uploading}
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        {uploading ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <Check className="w-4 h-4" />
                                        )}
                                        Save & Upload
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
