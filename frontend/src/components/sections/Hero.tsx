import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import UltraScene from "@/components/hero/UltraScene";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = document.getElementById("navbar");
    if (!nav) return;
    const sync = () =>
      document.documentElement.style.setProperty("--nav-h", `${nav.offsetHeight}px`);
    const ro = new ResizeObserver(sync);
    ro.observe(nav);
    sync();
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section ref={sectionRef} id="hero" className="hero">

      <motion.div className="hero-grid-bg" style={{ y: gridY }} />

      <div className="hero-layout">

        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero-eyebrow">Hi, My Name is</p>

          <h1 className="hero-title">
            Rudranil
            <br />
            <span className="hero-title-dim">
              Manna<span style={{ color: "var(--gold)" }}>.</span>
            </span>
          </h1>

          <div className="hero-typewriter">
            <Typewriter
              words={[
                "Full Stack Developer",
                "Java Specialist",
                "Backend Engineer",
                "UI Craftsman",
                "System Architect",
              ]}
              loop
              cursor
              cursorStyle="_"
              typeSpeed={55}
              deleteSpeed={30}
              delaySpeed={2200}
            />
          </div>

          <p className="hero-bio">
            I craft elegant, high-performance digital experiences. Specializing in modern web technologies and complex 
            system architectures, transforming bold ideas into functional, beautiful realities.
          </p>

          <div className="hero-cta">
            <a href="#work" className="btn-fill">
              <span>View Work</span>
            </a>
            <a href="#contact" className="btn-ghost">
              <span>Let's Talk →</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-orbit-col"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <UltraScene />
        </motion.div>

      </div>
    </section>
  );
}