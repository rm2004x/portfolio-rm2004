import { motion } from "framer-motion";

const SKILL_GROUPS = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", value: 85 },
      { name: "Java", value: 82 },
      { name: "HTML / CSS", value: 92 },
      { name: "C Programming", value: 76 },
      { name: "SQL", value: 73 },
    ],
  },
  {
    title: "Web Development",
    skills: [
      { name: "React / Next.js", value: 84 },
      { name: "Node / Express", value: 80 },
      { name: "Tailwind CSS", value: 88 },
      { name: "REST APIs", value: 82 },
      { name: "MongoDB / MySQL", value: 76 },
    ],
  },
  {
    title: "CS Fundamentals",
    skills: [
      { name: "Data Structures", value: 80 },
      { name: "Algorithms", value: 75 },
      { name: "DBMS", value: 78 },
      { name: "OOP", value: 84 },
    ],
  },
  {
    title: "Tools & Workflow",
    skills: [
      { name: "Git / GitHub", value: 90 },
      { name: "VS Code", value: 94 },
      { name: "Postman", value: 82 },
      { name: "Linux / Terminal", value: 75 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="capabilities" className="py-28 bg-surface-2/30 border-y border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >

          <div className="flex items-center gap-6 mb-14">
            <span className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
              02 — Capabilities
            </span>
            <div className="h-[1px] bg-border flex-1 max-w-[180px]" />
          </div>

          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-12">
            Tools I use <span className="italic text-muted">every day.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
            {SKILL_GROUPS.map((group, groupIdx) => (
              <div key={group.title} className="space-y-6">

                <h3 className="font-mono text-xs uppercase tracking-widest text-gold border-b border-border pb-3">
                  {group.title}
                </h3>

                <div className="space-y-5">
                  {group.skills.map((skill, i) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="font-sans text-sm text-foreground">
                          {skill.name}
                        </span>
                        <span className="font-mono text-[10px] text-muted-dim">
                          {skill.value}%
                        </span>
                      </div>

                      <div className="h-[2px] w-full bg-border overflow-hidden">
                        <motion.div
                          className="h-full bg-gold"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.value}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: i * 0.08 + groupIdx * 0.15,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}