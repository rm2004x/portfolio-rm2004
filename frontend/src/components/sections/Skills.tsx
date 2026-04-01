// Skills.tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Skill      { name: string; value: number; }
interface SkillGroup { title: string; skills: Skill[]; }

const GROUPS: SkillGroup[] = [
  {
    title: "Languages",
    skills: [
      { name: "HTML / CSS",    value: 92 },
      { name: "JavaScript",    value: 85 },
      { name: "Java",          value: 82 },
      { name: "C Programming", value: 76 },
      { name: "SQL",           value: 73 },
    ],
  },
  {
    title: "Web Development",
    skills: [
      { name: "Tailwind CSS",   value: 88 },
      { name: "React / Next.js",value: 84 },
      { name: "REST APIs",      value: 82 },
      { name: "Node / Express", value: 80 },
      { name: "MongoDB / MySQL",value: 76 },
    ],
  },
  {
    title: "CS Fundamentals",
    skills: [
      { name: "OOP",             value: 84 },
      { name: "Data Structures", value: 80 },
      { name: "DBMS",            value: 78 },
      { name: "Algorithms",      value: 75 },
    ],
  },
  {
    title: "Tools & Workflow",
    skills: [
      { name: "VS Code",         value: 94 },
      { name: "Git / GitHub",    value: 90 },
      { name: "Postman",         value: 82 },
      { name: "Linux / Terminal",value: 75 },
    ],
  },
];

function Bar({ name, value, delay }: { name: string; value: number; delay: number }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="font-sans text-[--fg]" style={{ fontSize: "0.8125rem" }}>{name}</span>
        <span className="font-mono text-[--muted-dim] tabular-nums" style={{ fontSize: "0.575rem" }}>{value}%</span>
      </div>
      <div className="bar-track">
        <motion.div
          className="bar-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function Card({ group, idx }: { group: SkillGroup; idx: number }) {
  return (
    <motion.div
      className="glass p-6 md:p-7 space-y-5 h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3
        className="font-mono uppercase text-[--gold] border-b border-[--border] pb-3"
        style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}
      >
        {group.title}
      </h3>
      <div className="space-y-4">
        {group.skills.map((s, i) => (
          <Bar key={s.name} name={s.name} value={s.value} delay={i * 0.06 + idx * 0.1} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="capabilities"
      ref={ref}
      className="sec-py relative overflow-hidden border-b border-[--border]"
      style={{ background: "rgba(15,15,13,0.4)" }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ y: bgY }}
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ background: "radial-gradient(ellipse 80% 60% at 65% 50%, var(--gold) 0%, transparent 70%)" }}
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
            <span className="label-tag">02 — Capabilities</span>
            <div className="label-line" />
          </div>
          <h2
            className="font-serif text-[--fg] mb-10"
            style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.2rem)" }}
          >
            Tools I use <span className="italic text-[--muted]">every day.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          {GROUPS.map((g, i) => <Card key={g.title} group={g} idx={i} />)}
        </div>

      </div>
    </section>
  );
}