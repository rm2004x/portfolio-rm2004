import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function Resume() {
  return (
    <section id="resume" className="py-24 px-6 md:px-12 bg-surface-2/50 border-y border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-6 mb-8">
            <span className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
              05 — Resume
            </span>
            <div className="h-[1px] bg-border flex-1 w-24" />
          </div>

          <h2 className="font-serif text-4xl text-foreground mb-4">
            Credentials<br />
            <span className="italic text-muted">on record.</span>
          </h2>

          <p className="font-sans text-sm text-muted font-light leading-relaxed mb-6">
            Full Stack Developer · Computer Science undergraduate at Brainware University.
            Seeking internship and entry-level engineering roles with immediate availability.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {["Java", "C", "React", "Node.js", "DSA", "MySQL", "DBMS"].map((s) => (
              <span
                key={s}
                className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 border border-border text-muted-dim"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-gold/70" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-dim">
              Updated regularly — latest version available below
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          
          <a
            href="https://drive.google.com/your-resume-link"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-48 h-48 rounded-full border border-border hover:border-gold transition-colors overflow-hidden bg-surface cursor-pointer"
          >
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />

            <div className="relative z-10 flex flex-col items-center gap-3 text-foreground group-hover:text-background transition-colors duration-300">
              <span className="text-2xl">📄</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-center leading-relaxed">
                Download<br />Resume
              </span>
            </div>
          </a>

          <p className="font-mono text-[9px] uppercase tracking-widest text-muted-dim text-center">
            Click to view or download
          </p>
        </motion.div>

      </div>
    </section>
  );
}