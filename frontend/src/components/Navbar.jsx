import { Menu, Github, Mail } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import PartyModeToggle from "./PartyModeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-white/10 dark:bg-zinc-950/70 dark:supports-[backdrop-filter]:bg-zinc-950/60">
      <nav className="container flex h-14 items-center justify-between">
        <a href="#" className="font-semibold tracking-tight">Pasan Vithanage</a>

        <div className="hidden md:flex gap-6 text-sm">
          <a href="#about" className="opacity-80 hover:opacity-100">About</a>
          <a href="#experience" className="opacity-80 hover:opacity-100">Experience</a>
          <a href="#skills" className="opacity-80 hover:opacity-100">Skills</a>
          <a href="#work" className="opacity-80 hover:opacity-100">Projects</a>
          <a href="#education" className="opacity-80 hover:opacity-100">Education</a>
          <a href="#contact" className="opacity-80 hover:opacity-100">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <PartyModeToggle />
          <ThemeToggle />
          <a href="https://github.com/pasanMahela" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="opacity-80 hover:opacity-100">
            <Github size={18} />
          </a>
          <a href="mailto:pasancp2000@gmail.com" aria-label="Email" className="opacity-80 hover:opacity-100">
            <Mail size={18} />
          </a>
          <button className="md:hidden" aria-label="Menu"><Menu size={18} /></button>
        </div>
      </nav>
    </header>
  );
}
