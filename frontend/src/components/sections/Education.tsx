import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TIMELINE = [
  {
    period: "2023 — 2027",
    badge: "Ongoing",
    degree: "B.Tech — Computer Science & Engineering (Data Science)",
    institution: "Brainware University",
    location: "Barasat, West Bengal, India",
    note: "Pursuing core subjects in algorithms, data structures, DBMS, OOP, and web technologies.",
  },
  {
    period: "2021 — 2023",
    badge: null,
    degree: "Higher Secondary (Class XII)",
    institution: "Kakgechia Satyanarayan High School (H.S)",
    location: "WBCHSE — West Bengal, India",
    note: "Science stream with focus on logic, mathematics, and structured problem-solving.",
  },
];

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="education" ref={ref} className="sec-py relative overflow-hidden border-b border-[--border]">

      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ y: bgY }}
        aria-hidden
      >
        <div
          className="absolute top-[5%] -left-[8%] w-[45vw] h-[45vw] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)", maxWidth: 500, maxHeight: 500 }}
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
            <span className="label-tag">04 — Education</span>
            <div className="label-line" />
          </div>
          <h2
            className="font-serif text-[--fg] mb-12"
            style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.2rem)" }}
          >
            Academic <span className="italic text-[--muted]">foundation.</span>
          </h2>
        </motion.div>

        <div className="relative" style={{ maxWidth: 720 }}>
          <motion.div
            className="absolute top-2 bottom-0 left-0 w-px origin-top"
            style={{ background: "var(--border)" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />

          <div style={{ paddingLeft: "clamp(1.5rem, 4vw, 2.5rem)" }} className="space-y-12">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.65, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="absolute top-2 rounded-full border border-[--gold]"
                  style={{
                    left: "clamp(-1.87rem, -3.8vw, -2.87rem)",
                    width: 9, height: 9,
                    background: "var(--bg)",
                  }}
                  aria-hidden
                />

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className="font-mono uppercase text-[--gold]"
                    style={{
                      fontSize: "0.575rem",
                      letterSpacing: "0.18em",
                      background: "var(--gold-10)",
                      padding: "0.22rem 0.65rem",
                      borderRadius: 2,
                    }}
                  >
                    {item.period}
                  </span>
                  {item.badge && (
                    <span
                      className="font-mono uppercase text-[--bg]"
                      style={{
                        fontSize: "0.5rem",
                        letterSpacing: "0.16em",
                        background: "var(--gold)",
                        padding: "0.22rem 0.5rem",
                        borderRadius: 2,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3
                  className="font-serif text-[--fg] mb-1"
                  style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.4rem)" }}
                >
                  {item.degree}
                </h3>

                <p
                  className="font-sans font-medium mb-1"
                  style={{ fontSize: "0.8125rem", color: "rgba(242,237,230,0.75)" }}
                >
                  {item.institution}
                </p>

                <p
                  className="font-mono uppercase text-[--muted-dim] mb-3"
                  style={{ fontSize: "0.575rem", letterSpacing: "0.14em" }}
                >
                  {item.location}
                </p>

                <p className="font-sans text-[--muted]" style={{ fontSize: "0.8125rem", lineHeight: 1.75 }}>
                  {item.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}