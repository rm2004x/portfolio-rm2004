import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone]         = useState(false);
  const calledRef               = useRef(false);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position  = "fixed";
    document.body.style.top       = `-${scrollY}px`;
    document.body.style.width     = "100%";
    document.body.style.overflowY = "scroll";

    // Fast-complete for reduced motion users
    if (reducedMotion) {
      document.body.style.position  = "";
      document.body.style.top       = "";
      document.body.style.width     = "";
      document.body.style.overflowY = "";
      window.scrollTo(0, 0);
      onComplete();
      return;
    }

    const duration = 1700;
    const interval = 16;
    let current = 0;

    const timer = setInterval(() => {
      current += 100 / (duration / interval);
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        if (!calledRef.current) {
          calledRef.current = true;
          setTimeout(() => {
            setDone(true);
            setTimeout(() => {
              document.body.style.position  = "";
              document.body.style.top       = "";
              document.body.style.width     = "";
              document.body.style.overflowY = "";
              window.scrollTo(0, 0);
              onComplete();
            }, 650);
          }, 250);
        }
      }
      setProgress(Math.floor(current));
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.position  = "";
      document.body.style.top       = "";
      document.body.style.width     = "";
      document.body.style.overflowY = "";
    };
  }, [onComplete, reducedMotion]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-4%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ background: "var(--bg)" }}
          aria-label="Loading"
          role="status"
          aria-live="polite"
        >
          <div className="relative flex flex-col items-center gap-10">
            <div className="flex items-center gap-3" aria-hidden>
              <span className="font-serif text-4xl md:text-6xl font-semibold tracking-widest text-[--fg] border border-[rgba(201,169,110,0.6)] px-4 py-1 leading-tight">
                RM
              </span>
              <span className="font-mono text-3xl md:text-5xl tracking-widest text-[--gold]">
                2004
              </span>
            </div>

            <div
              className="w-56 md:w-72 relative overflow-hidden"
              style={{ height: "1px", background: "var(--border)" }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                className="absolute left-0 top-0 h-full"
                style={{ background: "var(--gold)" }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.016 }}
              />
            </div>

            <span className="font-mono text-[10px] tracking-[0.3em] text-[--muted-dim] uppercase" aria-hidden>
              {progress.toString().padStart(3, "0")}% — Initializing Experience
            </span>
            <span className="sr-only">{progress}% loaded</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}