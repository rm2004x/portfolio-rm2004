import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, Github, ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    num: "01",
    title: "Banking System",
    tags: ["Java", "JDBC", "MySQL", "OOP", "Exception Handling"],
    description:
      "Command-line banking application implementing core operations — account creation, deposit, withdrawal, balance enquiry, and fund transfer. Designed with OOP principles, JDBC for database connectivity, and robust exception handling.",
    github: "",
    live: "",
  },
  {
    num: "02",
    title: "BlogFlow",
    tags: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    description:
      "Full-stack MERN blog platform featuring rich markdown support, secure JWT authentication, and a custom rich text editor for content creators.",
    github: "",
    live: "",
  },
  {
    num: "03",
    title: "TaskSync",
    tags: ["Node.js", "Socket.io", "React", "Tailwind"],
    description:
      "Real-time task management application allowing multiple users to collaborate on projects simultaneously with instant WebSocket updates.",
    github: "",
    live: "",
  },
  {
    num: "04",
    title: "DSA Visualizer",
    tags: ["JavaScript", "HTML5 Canvas", "Algorithms"],
    description:
      "Interactive educational tool that visualises common data structures and sorting algorithms step-by-step for better conceptual understanding.",
    github: "",
    live: "",
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const hasGithub = !!project.github;
  const hasLive   = !!project.live;

  return (
    <motion.article
      className="proj-card glass group relative flex flex-col h-full"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.62, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <div className="proj-inner flex flex-col h-full p-7 md:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "linear-gradient(130deg, rgba(201,169,110,0.055) 0%, transparent 55%)" }}
          aria-hidden
        />

        <div className="relative z-10 flex justify-between items-start mb-8">
          <span
            className="font-serif text-[--muted-dim] group-hover:text-[--gold] transition-colors duration-400 select-none opacity-40 group-hover:opacity-50"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1 }}
            aria-hidden
          >
            {project.num}
          </span>
          <div className="flex gap-3.5 items-center pt-1">
            {hasGithub ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="text-[--muted-dim] hover:text-[--gold] transition-colors duration-250"
              >
                <Github size={16} />
              </a>
            ) : (
              <span
                title="GitHub — coming soon"
                className="text-[--muted-dim] opacity-30 cursor-not-allowed"
                aria-label="GitHub (coming soon)"
              >
                <Github size={16} />
              </span>
            )}
            {hasLive ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="text-[--muted-dim] hover:text-[--gold] transition-colors duration-250"
              >
                <ArrowUpRight size={16} />
              </a>
            ) : (
              <span
                title="Live demo — coming soon"
                className="text-[--muted-dim] opacity-30 cursor-not-allowed"
                aria-label="Live demo (coming soon)"
              >
                <ArrowUpRight size={16} />
              </span>
            )}
          </div>
        </div>

        <h3
          className="relative z-10 font-serif text-[--fg] group-hover:text-[--gold] transition-colors duration-350 mb-3"
          style={{ fontSize: "clamp(1.35rem, 2.4vw, 1.875rem)" }}
        >
          {project.title}
        </h3>

        <p
          className="relative z-10 font-sans text-[--muted] leading-relaxed mb-7 flex-1"
          style={{ fontSize: "0.8125rem" }}
        >
          {project.description}
        </p>

        <div className="relative z-10 flex flex-wrap gap-1.5 pt-5 border-t border-[--border] group-hover:border-[rgba(201,169,110,0.18)] transition-colors duration-400 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono uppercase text-[--muted-dim]"
              style={{
                fontSize: "0.575rem",
                letterSpacing: "0.14em",
                padding: "0.2rem 0.5rem",
                background: "var(--surface-2)",
                borderRadius: 2,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="work" ref={ref} className="sec-py relative overflow-hidden border-b border-[--border]">
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ y: bgY }}
        aria-hidden
      >
        <div
          className="absolute -bottom-[20%] -right-[5%] w-[50vw] h-[50vw] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 65%)", maxWidth: 600, maxHeight: 600 }}
        />
      </motion.div>

      <div className="inner relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="label-row">
            <span className="label-tag">03 — Selected Work</span>
            <div className="label-line" style={{ width: "clamp(40px,12vw,160px)" }} />
          </div>
          <h2
            className="font-serif text-[--fg] mb-3"
            style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.5rem)" }}
          >
            Selected <span className="italic text-[--muted]">work.</span>
          </h2>
          <div className="flex items-center gap-2 mb-10">
            <Clock size={12} style={{ color: "var(--gold)", opacity: 0.65, flexShrink: 0 }} />
            <span
              className="font-mono uppercase text-[--muted-dim]"
              style={{ fontSize: "0.575rem", letterSpacing: "0.16em" }}
            >
              Project links &amp; GitHub repositories will be updated soon
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}