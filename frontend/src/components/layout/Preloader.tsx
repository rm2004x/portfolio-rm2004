import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const duration = 2000;
    const interval = 20;
    let current = 0;

    const timer = setInterval(() => {
      current += 100 / (duration / interval);

      if (current >= 100) {
        current = 100;
        clearInterval(timer);

        setTimeout(() => {
          document.body.style.overflow = "auto";
          window.scrollTo(0, 0);

          onComplete();
        }, 400);
      }

      setProgress(Math.floor(current));
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center"
    >
      <div className="relative flex flex-col items-center gap-10">

        <div className="flex items-center gap-3">
          <span className="font-serif text-4xl md:text-6xl font-semibold tracking-widest text-foreground border border-gold/60 px-4 py-1 leading-tight">
            RM
          </span>
          <span className="font-mono text-3xl md:text-5xl tracking-widest text-gold">
            2004
          </span>
        </div>

        <div className="w-56 md:w-72 h-[1px] bg-border relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gold"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        <div className="font-mono text-[10px] tracking-[0.3em] text-muted-dim uppercase">
          {progress.toString().padStart(3, "0")}% — Initializing Experience
        </div>

      </div>
    </motion.div>
  );
}