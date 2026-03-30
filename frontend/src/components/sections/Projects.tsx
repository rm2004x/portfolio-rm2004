import { motion } from "framer-motion";
import { Clock, Github, ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    num: "01",
    title: "Banking System",
    tags: ["Java", "JDBC", "MySQL", "OOP", "Exception Handling"],
    description: "A command-line banking application implementing core operations — account creation, deposit, withdrawal, balance enquiry, and fund transfer. Designed with OOP principles, JDBC for database connectivity, and robust exception handling for transaction safety.",
  },
  {
    num: "02",
    title: "BlogFlow",
    tags: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    description: "A full-stack MERN blog platform featuring rich markdown support, secure JWT authentication, and a custom rich text editor for content creators.",
  },
  {
    num: "03",
    title: "TaskSync",
    tags: ["Node.js", "Socket.io", "React", "Tailwind"],
    description: "Real-time task management application allowing multiple users to collaborate on projects simultaneously with instant WebSocket updates.",
  },
  {
    num: "04",
    title: "DSA Visualizer",
    tags: ["JavaScript", "HTML5 Canvas", "Algorithms"],
    description: "An interactive educational tool that visualizes common data structures and sorting algorithms step-by-step for better conceptual understanding.",
  },
];

export default function Projects() {
  return (
    <section id="work" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-6 mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase">03 — Selected Work</span>
          <div className="h-[1px] bg-border flex-1 max-w-[200px]" />
        </div>

        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
          Selected <span className="italic text-muted">work.</span>
        </h2>

        
        <div className="flex items-center gap-2 mb-16">
          <Clock className="w-3 h-3 text-gold/70" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-dim">
            Project links &amp; GitHub repositories will be updated soon
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              className="group relative glass-panel p-8 md:p-10 overflow-hidden flex flex-col h-full hover:border-gold/30 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex justify-between items-start mb-12">
                <span className="font-serif text-4xl text-muted-dim/50 group-hover:text-gold/50 transition-colors">
                  {project.num}
                </span>
                <div className="flex gap-4">
                  <a
                    href="#"
                    title="GitHub link coming soon"
                    className="text-muted hover:text-gold transition-colors duration-300"
                    onClick={e => e.preventDefault()}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    title="Live link coming soon"
                    className="text-muted hover:text-gold transition-colors duration-300 hover:translate-x-0.5 hover:-translate-y-0.5 inline-block"
                    onClick={e => e.preventDefault()}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <h3 className="font-serif text-3xl text-foreground mb-4 group-hover:text-gold transition-colors">
                {project.title}
              </h3>

              <p className="font-sans text-sm text-muted leading-relaxed mb-8 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-border group-hover:border-gold/20 transition-colors">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 bg-surface-2 text-muted-dim rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
