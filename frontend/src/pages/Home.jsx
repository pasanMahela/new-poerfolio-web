import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import Section from "../components/Section";
import About from "../components/About";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Contact from "../components/Contact";
import { projects } from "../data/projects";
import Reveal from "../components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />

      <About />

      <Experience />

      <Skills />

      <Section id="work" title="Selected Projects" subtitle="A showcase of my work and contributions.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.filter(p => p.featured).map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>

        {/* Show all projects button or remaining projects */}
        {projects.filter(p => !p.featured).length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">More Projects</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.filter(p => !p.featured).map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06}>
                  <ProjectCard p={p} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Education />

      <Contact />
    </>
  );
}
