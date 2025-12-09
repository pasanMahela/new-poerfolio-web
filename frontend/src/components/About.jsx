import Section from "./Section";
import Reveal from "./Reveal";
import { motion } from "framer-motion";
import { Download, Code, Briefcase, Award } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function About() {
    const [aboutData, setAboutData] = useState({
        summary: "I'm a motivated and aspiring Software Engineering undergraduate with hands-on experience in enterprise ERP systems, full-stack development, and test automation.",
        stats: {
            experience: '2+',
            projects: '8+',
            technologies: '35+'
        },
        strengths: ["Problem Solving", "Critical Thinking", "Teamwork", "Communication", "Time Management"]
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/public/settings`);
                if (response.data.success && response.data.data) {
                    setAboutData(response.data.data.about);
                }
            } catch (error) {
                console.error("Failed to fetch about settings:", error);
            }
        };
        fetchSettings();
    }, []);

    const stats = [
        { icon: Briefcase, label: "Years Experience", value: aboutData.stats.experience, color: "sky" },
        { icon: Code, label: "Projects Completed", value: aboutData.stats.projects, color: "cyan" },
        { icon: Award, label: "Technologies", value: aboutData.stats.technologies, color: "blue" }
    ];

    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = '/cv.pdf';
        link.download = 'Pasan_Vithanage_CV.pdf';

        fetch('/cv.pdf')
            .then(response => {
                if (response.ok) {
                    link.click();
                } else {
                    alert("CV file not found. Please add cv.pdf to the public folder, or contact me at pasancp2000@gmail.com for my CV!");
                }
            })
            .catch(() => {
                alert("CV file not found. Please email me at pasancp2000@gmail.com for my CV!");
            });
    };

    return (
        <Section id="about" title="About Me" subtitle="Get to know me better.">
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Left Column - Profile */}
                <Reveal>
                    <div className="space-y-4">
                        <div className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
                            {aboutData.summary}
                        </div>

                        {/* Download CV Button */}
                        <motion.button
                            onClick={handleDownloadCV}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-4 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-2.5 font-medium text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                        >
                            <Download className="h-5 w-5" />
                            Download CV
                        </motion.button>
                    </div>
                </Reveal>

                {/* Right Column - Stats */}
                <Reveal delay={0.2}>
                    <div className="space-y-4">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="rounded-xl border border-zinc-200/60 bg-white/60 p-4 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.02]"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-sky-500/10 p-2.5">
                                            <Icon className="h-5 w-5 text-sky-500" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                                {stat.value}
                                            </div>
                                            <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                                {stat.label}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Key Strengths */}
                        <div className="mt-4 space-y-2">
                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                Key Strengths
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {aboutData.strengths.map((strength) => (
                                    <span
                                        key={strength}
                                        className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                                    >
                                        {strength}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </Section>
    );
}
