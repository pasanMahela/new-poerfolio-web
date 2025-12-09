import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Experience() {
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/public/experience`);
                if (response.data.success) {
                    const sortedData = response.data.data.sort((a, b) => {
                        // Helper to get end date timestamp
                        const getEndDate = (period) => {
                            if (!period) return 0;
                            const parts = period.split(' - ');
                            const endStr = parts[1] || parts[0]; // Fallback to start if no end
                            if (endStr.toLowerCase().includes('present')) return new Date().getTime();
                            return new Date(endStr).getTime();
                        };

                        return getEndDate(b.period) - getEndDate(a.period);
                    });
                    setExperience(sortedData);
                }
            } catch (error) {
                console.error("Failed to fetch experience:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExperience();
    }, []);

    if (loading) {
        return (
            <Section
                id="experience"
                title="Professional Experience"
                subtitle="My journey in software engineering and development."
            >
                <div className="flex justify-center items-center py-20">
                    <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
                </div>
            </Section>
        );
    }

    return (
        <Section
            id="experience"
            title="Professional Experience"
            subtitle="My journey in software engineering and development."
        >
            <div className="relative max-w-4xl mx-auto">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 via-cyan-500 to-sky-500 md:left-1/2 md:-translate-x-1/2" />

                <div className="space-y-12">
                    {experience.map((exp, index) => (
                        <Reveal key={exp.id} delay={index * 0.1}>
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`relative grid gap-8 md:grid-cols-2 md:gap-12 ${index % 2 === 0 ? "" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-8 top-6 -translate-x-1/2 md:left-1/2">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                                        className="relative"
                                    >
                                        <div className="h-4 w-4 rounded-full bg-sky-500 ring-4 ring-white dark:ring-zinc-950" />
                                        <div className="absolute inset-0 h-4 w-4 animate-ping rounded-full bg-sky-400 opacity-75" />
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className={`pl-20 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}>
                                    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-500/10 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-sky-500/50">
                                        {/* Gradient overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                        <div className="relative space-y-4">
                                            {/* Header */}
                                            <div className="space-y-2">
                                                <div className="flex items-start gap-3">
                                                    <div className="rounded-lg bg-sky-500/10 p-2">
                                                        <Briefcase className="h-5 w-5 text-sky-500" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                                            {exp.role}
                                                        </h3>
                                                        <p className="text-lg font-medium text-sky-600 dark:text-sky-400">
                                                            {exp.company}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>{exp.period}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{exp.location}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Achievements */}
                                            <div className="space-y-2">
                                                <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                                                    {exp.achievements.map((achievement, i) => (
                                                        <motion.li
                                                            key={i}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: index * 0.1 + i * 0.05 }}
                                                            className="flex gap-2"
                                                        >
                                                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-500" />
                                                            <span className="leading-relaxed text-left">{achievement}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Type badge */}
                                            <div className="pt-2">
                                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${exp.type === 'full-time'
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : exp.type === 'internship'
                                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                        : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                                    }`}>
                                                    {exp.type === 'full-time' ? 'Full-time' : exp.type === 'internship' ? 'Internship' : 'Freelance'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Spacer for alternating layout */}
                                <div className={`hidden md:block ${index % 2 === 0 ? "" : "md:col-start-1 md:row-start-1"}`} />
                            </motion.div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </Section>
    );
}
