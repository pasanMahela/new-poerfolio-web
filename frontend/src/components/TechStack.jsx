// src/components/TechStack.jsx
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";

// Animated flip card component
function TechCard({ item, index }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.03,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="group perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative h-28 w-full transform-style-preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          duration: 0.7,
          ease: [0.25, 0.1, 0.25, 1],
          type: "tween"
        }}
      >
        {/* Front side - Only Tech Name */}
        <div className="absolute inset-0 backface-hidden rounded-2xl border border-zinc-200/60 bg-gradient-to-br from-white/95 to-zinc-50/95 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-zinc-300/60 transition-all duration-300 dark:border-white/10 dark:from-zinc-900/95 dark:to-zinc-800/95 dark:hover:border-white/20">
          <div className="flex h-full items-center justify-center p-4">
            <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100 text-center leading-tight">
              {item.name}
            </h3>
          </div>
        </div>

        {/* Back side - Logo */}
        <div className="absolute inset-0 backface-hidden rounded-2xl border border-zinc-200/60 bg-gradient-to-br from-zinc-50/95 to-white/95 backdrop-blur-sm shadow-sm dark:border-white/10 dark:from-zinc-800/95 dark:to-zinc-900/95 transform rotateY-180">
          <div className="flex h-full items-center justify-center p-5">
            <motion.img
              src={item.logo}
              alt={`${item.name} logo`}
              className="max-h-14 max-w-14 object-contain filter drop-shadow-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: isFlipped ? 1 : 0.8, 
                opacity: isFlipped ? 1 : 0 
              }}
              transition={{ 
                duration: 0.3, 
                delay: isFlipped ? 0.2 : 0,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              draggable="false"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main TechStack component
export default function TechStack({ items = [] }) {
  const [category, setCategory] = useState(() => {
    try { 
      return localStorage.getItem("techStack.category") || "All"; 
    } catch { 
      return "All"; 
    }
  });
  const [query, setQuery] = useState("");

  const categories = ["All", "Frontend", "Backend", "DevOps", "Other"];

  useEffect(() => {
    try { 
      localStorage.setItem("techStack.category", category); 
    } catch {}
  }, [category]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const inCategory =
        category === "All"
          ? true
          : category === "Other"
          ? !["Frontend", "Backend", "DevOps"].includes(item.category)
          : item.category === category;
      
      const matchesSearch = !q || 
        item.name.toLowerCase().includes(q) || 
        (item.tags || []).join(" ").toLowerCase().includes(q);
      
      return inCategory && matchesSearch && !!item.logo;
    });
  }, [items, category, query]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Tech Stack
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Hover cards to see logos
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Category Filter */}
          <div className="flex rounded-lg bg-zinc-100 p-1 ring-1 ring-zinc-200/70 dark:bg-zinc-800 dark:ring-white/10">
            {categories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`min-w-[60px] rounded-md px-2.5 py-1.5 text-sm font-medium transition ${
                    active
                      ? "bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/70 dark:bg-zinc-700 dark:text-zinc-100 dark:ring-white/10"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search technologies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full sm:w-48 rounded-lg border border-zinc-200 bg-white/80 px-3 py-2 text-sm text-zinc-900 outline-none ring-1 ring-transparent placeholder-zinc-500 transition focus:border-sky-500 focus:ring-sky-500/40 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:placeholder-zinc-400"
            />
            <svg
              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tech Cards Grid */}
      {filtered.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((tech, index) => (
            <TechCard key={tech.name} item={tech} index={index} />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid place-items-center rounded-xl border-2 border-dashed border-zinc-200 py-12 text-center dark:border-zinc-700"
        >
          <div className="space-y-2">
            <div className="w-12 h-12 mx-auto bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <p className="font-medium text-zinc-600 dark:text-zinc-400">No results found</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              Try adjusting your search or filter
            </p>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}