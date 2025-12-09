import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [data, setData] = useState({
    name: 'Pasan Vithanage',
    tagline: 'Building scalable solutions with expertise in enterprise ERP systems and modern web technologies.',
    github: 'https://github.com/pasanMahela',
    linkedin: 'https://www.linkedin.com/in/pasan-vithanage',
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
        console.error("Failed to fetch footer settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="border-t border-zinc-200/60 bg-zinc-50/50 dark:border-white/5 dark:bg-zinc-950/50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand & Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {data.name}
            </h3>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {data.tagline}
            </p>
            <div className="flex gap-4">
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition-colors hover:text-sky-500 dark:text-zinc-400 dark:hover:text-sky-400"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition-colors hover:text-sky-500 dark:text-zinc-400 dark:hover:text-sky-400"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href={`mailto:${data.email}`}
                className="text-zinc-500 transition-colors hover:text-sky-500 dark:text-zinc-400 dark:hover:text-sky-400"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li><a href="#about" className="transition-colors hover:text-sky-500 hover:underline">About</a></li>
              <li><a href="#experience" className="transition-colors hover:text-sky-500 hover:underline">Experience</a></li>
              <li><a href="#skills" className="transition-colors hover:text-sky-500 hover:underline">Skills</a></li>
              <li><a href="#work" className="transition-colors hover:text-sky-500 hover:underline">Projects</a></li>
              <li><a href="#contact" className="transition-colors hover:text-sky-500 hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Legal / Status */}
          <div className="flex flex-col justify-between gap-4 md:items-end">
            <div className="text-right hidden md:block">
              {/* Placeholder for future content or just spacing */}
            </div>

            <div className="grid justify-items-start md:justify-items-end gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <p>
                &copy; {currentYear} {data.name}. All rights reserved.
              </p>
              <p className="flex items-center gap-1.5">
                Made in Sri Lanka
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
