import { motion } from "framer-motion";

const TECH_KEYWORDS = [
  "Full Stack Development", "React.js", "Node.js", "Java",
  "Data Structures", "Algorithms", "DBMS", "MySQL", 
  "C Programming", "rm2004", "Open to Work"
];

export default function Ticker() {
  return (
    <div className="py-8 bg-surface border-y border-border overflow-hidden flex whitespace-nowrap">
      <motion.div
        className="flex gap-12 items-center"
        animate={{ x: [0, -1035] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...TECH_KEYWORDS, ...TECH_KEYWORDS, ...TECH_KEYWORDS].map((tech, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-dim whitespace-nowrap">
              {tech}
            </span>
            <span className="text-gold text-xs">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
