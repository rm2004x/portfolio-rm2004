import { motion } from "framer-motion";

const ED_TIMELINE = [
  {
    period: "2023 — 2027 (Ongoing)",
    degree: "B.Tech in Computer Science & Engineering — Data Science",
    institution: "Brainware University",
    location: "Barasat, West Bengal, India",
    note: "Pursuing core subjects in algorithms, data structures, database management, OOP, and web technologies."
  },
  {
    period: "2021 — 2023",
    degree: "Higher Secondary (Class XII)",
    institution: "Kakgechia Satyanarayan High School (H.S)",
    location: "WBCHSE — West Bengal, India",
    note: "Science background with a focus on logic, mathematics, and structured problem-solving."
  },
];

export default function Education() {
  return (
    <section id="education" className="py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >

          <div className="flex items-center gap-6 mb-14">
            <span className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
              04 — Education
            </span>
            <div className="h-[1px] bg-border flex-1 max-w-[180px]" />
          </div>

          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-12">
            Academic <span className="italic text-muted">foundation.</span>
          </h2>

          <div className="relative pl-6 md:pl-10 border-l border-border space-y-12 max-w-3xl">
            {ED_TIMELINE.map((item, i) => (
              <div key={i} className="relative">

                <div className="absolute -left-[7px] md:-left-[9px] top-2 w-3 h-3 bg-background border border-gold rounded-full" />

                <div className="mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-sm">
                    {item.period}
                  </span>
                </div>

                <h3 className="font-serif text-xl md:text-2xl text-foreground mt-3 mb-1">
                  {item.degree}
                </h3>

                <div className="font-sans text-sm font-medium text-foreground/80 mb-1">
                  {item.institution}
                </div>

                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-dim mb-2">
                  {item.location}
                </div>

                <p className="font-sans text-sm text-muted leading-relaxed">
                  {item.note}
                </p>

              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}