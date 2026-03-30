import { useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  useEffect(() => {
    const nav = document.getElementById("navbar")
    if(nav){
      const height = nav.offsetHeight;
      document.documentElement.style.setProperty("--nav-height", `${height + 20}px`);
    }
  }, []);
  return (
    <section className="relative min-h-screen flex items-start justify-center" 
        style={{paddingTop: "var(--nav-height, 50px"}}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col items-start mt-10 md:mt-16">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-gold mb-6 block">
              Hi, my name is
            </span>
          </motion.div>

          <motion.h1
            className="font-serif text-5xl md:text-7xl lg:text-[8rem] leading-[0.9] tracking-tight text-foreground mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Rudranil <br />
            <span className="font-light text-foreground/70">
              Manna<span className="text-gold">.</span>
            </span>
          </motion.h1>

          <motion.div
            className="font-serif text-xl md:text-3xl text-muted-dim mt-6 h-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typewriter
              words={[
                "Full Stack Developer",
                "Java Developer",
                "Problem Solver",
                "Web Engineer",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </motion.div>

          <motion.p
            className="mt-8 max-w-lg text-muted text-sm md:text-base leading-relaxed font-sans font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            I craft elegant, high-performance digital experiences. Specializing in modern web technologies 
            and complex system architectures, transforming bold ideas into functional, beautiful realities.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <a
              href="#work"
              className="group relative px-7 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest overflow-hidden hover:text-background transition-colors"
            >
              <span className="relative z-10">View Work</span>
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
            </a>

            <a
              href="#contact"
              className="group px-7 py-3 border border-border text-foreground font-mono text-xs uppercase tracking-widest hover:border-gold hover:text-gold transition-colors flex items-center gap-3"
            >
              Get in touch
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>
          </motion.div>

        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      <motion.div
        className="absolute bottom-10 left-0 w-full flex flex-col items-center text-muted-dim"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-[10px] tracking-widest">SCROLL</span>
        <span className="text-lg mt-1">↓</span>
      </motion.div>
    </section>
  );
}