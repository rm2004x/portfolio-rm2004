import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FACTS = [
  { value: "2+",   label: "Years of\nCoding"          },
  { value: "10+",  label: "Projects\nCompleted"        },
  { value: "4+",   label: "Technologies\nMastered"     },
  { value: "B.Tech", label: "CSE  Data\nScience"       },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.72, delay, ease: [0.22,1,0.36,1] } },
});

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0,1], ["-8%","8%"]);

  return (
    <section id="about" ref={ref} className="sec-py relative overflow-hidden border-b border-[--border]">

      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ y: bgY }}
        aria-hidden
      >
        <div
          className="absolute top-0 right-[-10%] w-[55vw] h-[55vw] rounded-full opacity-[0.045]"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)", maxWidth: 600, maxHeight: 600 }}
        />
      </motion.div>

      <div className="inner relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[--gap] items-start">

          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="label-row">
              <span className="label-tag">01 — About</span>
              <div className="label-line" />
            </div>

            <h2
              className="font-serif text-[--fg] mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Building things <span className="italic text-[--muted]">that matter.</span>
            </h2>

            <div
              className="font-sans text-[--muted] font-light space-y-4"
              style={{ fontSize: "clamp(0.875rem, 1.1vw, 1rem)", lineHeight: 1.8, maxWidth: 480 }}
            >
              <p>
                I'm Rudranil — a Computer Science undergraduate ,
                specialising in Data Science. I build full-stack web applications and
                deeply enjoy solving complex engineering problems.
              </p>
              <p>
                My approach blends rigorous CS fundamentals — algorithms, data structures,
                OOP — with modern frontend craft. I care about performance, clean code,
                and the fine details that separate good products from great ones.
              </p>
              <p>
                Currently seeking internship and entry-level engineering roles.
                Open to remote and on-site opportunities.
              </p>
            </div>

            <div className="mt-8 inline-flex items-center gap-2.5 px-4 py-2.5 border border-[--border] bg-[--surface]">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: "#4ade80", boxShadow: "0 0 8px #4ade80aa" }}
              />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[--muted-dim]">
                Available for work
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 gap-4 lg:mt-16"
          >
            {FACTS.map((f, i) => (
              <motion.div
                key={f.label}
                className="glass p-5 flex flex-col items-center text-center lg:items-start lg:text-left"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.22,1,0.36,1] }}
              >
                <span
                  className="font-serif text-[--gold] leading-none mb-2 block"
                  style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
                >
                  {f.value}
                </span>
                <span
                  className="font-mono text-[--muted-dim] uppercase tracking-[0.14em] leading-snug"
                  style={{ fontSize: "0.575rem", whiteSpace: "pre-line" }}
                >
                  {f.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}