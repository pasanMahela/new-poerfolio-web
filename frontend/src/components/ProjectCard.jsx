import { motion } from "framer-motion";
import TechPill from "./TechPill";
import ParallaxImage from "./ParallaxImage";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectCard({ p }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="group relative rounded-xl border border-zinc-200/60 bg-white p-4 shadow-sm transition-colors dark:border-white/10 dark:bg-white/[0.02] md:p-5"
    >
      {p.cover && (
        <div className="mb-4 overflow-hidden rounded-lg aspect-video">
          <ParallaxImage
            src={p.cover}
            alt={`${p.title} cover`}
            strength={12}
            className="w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold">{p.title}</h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{p.desc}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {p.tech.map((t) => <TechPill key={t}>{t}</TechPill>)}
      </div>
      <div className="mt-4 flex gap-3">
        {p.link && (
          <a className="text-sm inline-flex items-center gap-1 opacity-80 hover:opacity-100" href={p.link} target="_blank" rel="noreferrer">
            <ExternalLink size={16}/> Live
          </a>
        )}
        {p.repo && (
          <a className="text-sm inline-flex items-center gap-1 opacity-80 hover:opacity-100" href={p.repo} target="_blank" rel="noreferrer">
            <Github size={16}/> Code
          </a>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-2 ring-sky-500/20 transition group-hover:opacity-100" />
    </motion.article>
  );
}
