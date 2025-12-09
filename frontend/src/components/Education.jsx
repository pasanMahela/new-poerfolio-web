import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Education() {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await axios.get(`${API_URL}/api/public/education`);
                if (response.data.success) {
                    const sortedData = response.data.data.sort((a, b) => {
                        const getEndDate = (period) => {
                            if (!period) return 0;
                            // Check for 4 digit year only pattern first
                            if (/^\d{4}$/.test(period)) return new Date(period, 0, 1).getTime();

                            const parts = period.split(' - ');
                            const endStr = parts[1] || parts[0];
                            if (endStr.toLowerCase().includes('present')) return new Date().getTime();

                            // Try parsing date
                            const date = new Date(endStr);
                            if (!isNaN(date.getTime())) return date.getTime();

                            // If it's just a year string but failed simple regex
                            if (/^\d{4}$/.test(endStr)) return new Date(endStr, 0, 1).getTime();

                            return 0;
                        };

                        return getEndDate(b.period) - getEndDate(a.period);
                    });
                    setEducation(sortedData);
                }
            } catch (error) {
                console.error("Failed to fetch education:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEducation();
    }, []);

    if (loading) {
        return (
            <Section
                id="education"
                title="Education"
                subtitle="My academic background and qualifications."
            >
                <div className="flex justify-center items-center py-20">
                    <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </Section>
        );
    }

    return (
        <Section
            id="education"
            title="Education"
            subtitle="My academic background and qualifications."
        >
            <div className="grid gap-6 md:grid-cols-2">
                {education.map((edu, index) => (
                    <Reveal key={edu.id} delay={index * 0.1}>
                        <motion.div
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.3 }}
                            className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-500/10 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-sky-500/50"
                        >
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="relative space-y-4">
                                {/* Icon and Status */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="text-4xl">{edu.icon}</div>
                                        <div>
                                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                                {edu.degree}
                                            </h3>
                                            {edu.specialization && (
                                                <p className="text-sm text-sky-600 dark:text-sky-400">
                                                    {edu.specialization}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${edu.status === 'In Progress'
                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                        }`}>
                                        {edu.status}
                                    </span>
                                </div>

                                {/* Institution */}
                                <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                                    <GraduationCap className="h-5 w-5 text-sky-500" />
                                    <span className="font-medium">{edu.institution}</span>
                                </div>

                                {/* Period and GPA */}
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-zinc-600 dark:text-zinc-400">
                                        {edu.period}
                                    </span>
                                    {edu.gpa && (
                                        <div className="flex items-center gap-1.5 rounded-lg bg-sky-100 px-3 py-1.5 dark:bg-sky-900/30">
                                            <Award className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                                            <span className="font-semibold text-sky-700 dark:text-sky-400">
                                                GPA: {edu.gpa}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
}
