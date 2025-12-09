import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Hero() {
  const [data, setData] = useState({
    name: 'Pasan Vithanage',
    title: 'Associate Software Engineer',
    tagline: 'Building scalable solutions with expertise in enterprise ERP systems, full-stack development, and test automation.',
    github: 'https://github.com/pasanMahela',
    linkedin: 'https://linkedin.com/in/pasan-vithanage',
    email: 'pasancp2000@gmail.com'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/public/settings');
        if (response.data.success && response.data.data) {
          setData(response.data.data.personal);
        }
      } catch (error) {
        console.error("Failed to fetch hero settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="container grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Hi, I'm <span className="bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent">{data.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-2 text-xl font-semibold text-sky-600 dark:text-sky-400"
          >
            {data.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400"
          >
            {data.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <MagneticButton
              as="a"
              href="#contact"
              className="rounded-md bg-sky-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-600 transition-colors"
            >
              Contact Me
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#work"
              className="rounded-md border border-black/10 px-5 py-2.5 text-sm font-medium hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5 transition-colors"
            >
              View Work
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-6 flex gap-4"
          >
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-600 hover:text-sky-600 dark:text-zinc-400 dark:hover:text-sky-400 transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-600 hover:text-sky-600 dark:text-zinc-400 dark:hover:text-sky-400 transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href={`mailto:${data.email}`}
              className="flex items-center gap-2 text-sm text-zinc-600 hover:text-sky-600 dark:text-zinc-400 dark:hover:text-sky-400 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative w-64 h-64">
            {/* Gradient background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>

            {/* Image container */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-sky-500/30 shadow-2xl">
              <img
                src="/pasan.JPG"
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
