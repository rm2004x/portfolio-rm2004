import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock } from "lucide-react";

const CHIPS = ["Java", "C", "React", "Node.js", "DSA", "MySQL", "DBMS"];

export default function Resume() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const [on, setOn] = useState(false);

  return (
    <section
      id="resume"
      ref={ref}
      className="sec-py relative overflow-hidden border-b border-[--border]"
      style={{ background: "rgba(15,15,13,0.35)" }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ y: bgY }}
        aria-hidden
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "min(70vw, 800px)",
            height: "min(40vw, 400px)",
            background: "radial-gradient(ellipse, var(--gold) 0%, transparent 65%)",
            opacity: 0.04,
          }}
        />
      </motion.div>

      <div className="inner relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">

          <motion.div
            className="w-full"
            style={{ maxWidth: 500 }}
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="label-row">
              <span className="label-tag">05 — Resume</span>
              <div className="label-line" style={{ width: 80 }} />
            </div>

            <h2
              className="font-serif text-[--fg] mb-4"
              style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.2rem)" }}
            >
              Credentials<br />
              <span className="italic text-[--muted]">on record.</span>
            </h2>

            <p
              className="font-sans font-light text-[--muted] mb-6"
              style={{ fontSize: "0.8125rem", lineHeight: 1.75, maxWidth: 420 }}
            >
              Full Stack Developer · Computer Science undergraduate at Brainware University.
              Seeking internship and entry-level engineering roles with immediate availability.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {CHIPS.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.575rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.7rem",
                    borderRadius: 2,
                    border: "1px solid rgba(242,237,230,0.07)",
                    color: "var(--muted-dim)",
                    transition: "border-color 250ms ease, color 250ms ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--gold)";
                    el.style.color = "var(--gold)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(242,237,230,0.07)";
                    el.style.color = "var(--muted-dim)";
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Clock size={12} style={{ color: "var(--gold)", opacity: 0.65, flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.575rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--muted-dim)",
                }}
              >
                Updated regularly — latest version below
              </span>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-4 shrink-0"
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download resume"
              onMouseEnter={() => setOn(true)}
              onMouseLeave={() => setOn(false)}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                overflow: "hidden",
                width: "clamp(160px, 20vw, 200px)",
                height: "clamp(160px, 20vw, 200px)",
                background: "var(--surface)",
                border: `1px solid ${on ? "var(--gold)" : "rgba(242,237,230,0.07)"}`,
                textDecoration: "none",
                transition: "border-color 0.4s ease",
                flexShrink: 0,
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "var(--gold)",
                  pointerEvents: "none",
                  transform: on ? "translateY(0%)" : "translateY(101%)",
                  transition: "transform 0.52s cubic-bezier(0.76,0,0.24,1)",
                  willChange: "transform",
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.625rem",
                  color: on ? "var(--bg)" : "var(--fg)",
                  transition: "color 0.28s ease",
                  pointerEvents: "none",
                }}
              >
                <svg
                  width="22" height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="11" x2="12" y2="17" />
                  <polyline points="9 14 12 17 15 14" />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.575rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    textAlign: "center",
                    lineHeight: 1.55,
                  }}
                >
                  Download<br />Resume
                </span>
              </div>
            </a>

            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--muted-dim)",
                textAlign: "center",
              }}
            >
              Click to view or download
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}