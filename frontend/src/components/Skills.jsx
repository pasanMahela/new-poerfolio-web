import { motion } from "framer-motion";
import { useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import { tech } from "../data/tech";

export default function Skills() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Get unique categories
    const categories = ["All", ...new Set(tech.map(t => t.category))];

    // Filter tech by category
    const filteredTech = selectedCategory === "All"
        ? tech
        : tech.filter(t => t.category === selectedCategory);

    return (
        <Section
            id="skills"
            title="Skills & Technologies"
            subtitle="Tools and technologies I work with to build amazing products."
        >
            <div className="space-y-8">
                {/* Category Filter */}
                <Reveal>
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                        ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                                        : "bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                                    } border border-zinc-200 dark:border-zinc-700`}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </Reveal>

                {/* Skills Grid */}
                <motion.div
                    layout
                    className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                >
                    {filteredTech.map((item, index) => (
                        <Reveal key={item.name} delay={index * 0.03}>
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3 }}
                                className="group relative overflow-hidden rounded-xl border border-zinc-200/60 bg-white/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-500/10 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-sky-500/50"
                            >
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                {/* Shimmer effect */}
                                <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                                <div className="relative space-y-3">
                                    {/* Logo */}
                                    <div className="flex items-center justify-between">
                                        <div className="rounded-lg bg-zinc-100 p-2.5 transition-colors duration-300 group-hover:bg-sky-100 dark:bg-zinc-800 dark:group-hover:bg-sky-900/30">
                                            <img
                                                src={item.logo}
                                                alt={item.name}
                                                className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                        </div>
                                        <span className="rounded-full bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">
                                            {item.category}
                                        </span>
                                    </div>

                                    {/* Name */}
                                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                        {item.name}
                                    </h3>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {item.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </Reveal>
                    ))}
                </motion.div>

                {/* Stats Section */}
                <Reveal delay={0.2}>
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: "Languages", count: tech.filter(t => t.category === "Languages").length, icon: "💻" },
                            { label: "Frontend Tools", count: tech.filter(t => t.category === "Frontend").length, icon: "🎨" },
                            { label: "Backend & DB", count: tech.filter(t => t.category === "Backend").length, icon: "⚙️" },
                            { label: "DevOps & Tools", count: tech.filter(t => t.category === "DevOps" || t.category === "Tools").length, icon: "🚀" }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="rounded-xl border border-zinc-200/60 bg-gradient-to-br from-white to-zinc-50 p-6 text-center backdrop-blur-sm dark:border-white/10 dark:from-zinc-900 dark:to-zinc-900/40"
                            >
                                <div className="text-3xl mb-2">{stat.icon}</div>
                                <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">
                                    {stat.count}+
                                </div>
                                <div className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </Section>
    );
}
