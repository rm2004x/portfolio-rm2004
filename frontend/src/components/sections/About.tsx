import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >

          <div className="flex items-center gap-6 mb-14">
            <span className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
              01 — About
            </span>
            <div className="h-[1px] bg-border flex-1 max-w-[180px]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">

            <div className="lg:col-span-7">
              <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">
                The person behind the{" "}
                <span className="italic text-gold">code.</span>
              </h2>

              <div className="space-y-5 text-muted font-sans font-light leading-relaxed max-w-xl">
                <p>
                  I am Rudranil Manna, a passionate software developer based in West Bengal, India. 
                  My journey in tech began with a deep curiosity about how systems work under the hood, 
                  which naturally evolved into a focused pursuit of web engineering and system architecture.
                </p>

                <p>
                  I bridge the gap between complex backend logic and intuitive user interfaces. Whether I'm 
                  optimizing a database query or crafting a fluid React component, my goal is always to deliver 
                  performant, scalable, and beautifully engineered solutions.
                </p>

                <p>
                  When I'm not pushing code, you can find me solving algorithmic puzzles to sharpen my logic, 
                  exploring new open-source technologies, or refining my design sensibilities.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 pt-6 border-t border-border max-w-lg">
                <div>
                  <div className="font-serif text-3xl text-foreground mb-1">
                    50<span className="text-gold">+</span>
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-dim">
                    DSA Problems
                  </div>
                </div>

                <div>
                  <div className="font-serif text-3xl text-foreground mb-1">
                    4<span className="text-gold">+</span>
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-dim">
                    Projects Built
                  </div>
                </div>

                <div>
                  <div className="font-serif text-3xl text-foreground mb-1">
                    2<span className="text-gold">+</span>
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-dim">
                    Years Coding
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass-panel p-6 md:p-8 max-w-md lg:ml-auto">
                <h3 className="font-mono text-xs uppercase tracking-widest text-foreground mb-6 border-b border-border pb-3">
                  Fast Facts
                </h3>

                <ul className="space-y-5">
                  <li className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-dim">
                      Location
                    </span>
                    <span className="font-sans text-sm text-foreground">
                      Tamluk, West Bengal, India
                    </span>
                  </li>

                  <li className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-dim">
                      Role
                    </span>
                    <span className="font-sans text-sm text-foreground">
                      Full Stack Developer
                    </span>
                  </li>

                  <li className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-dim">
                      Focus
                    </span>
                    <span className="font-sans text-sm text-foreground">
                      Web Dev & System Design
                    </span>
                  </li>

                  <li className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-dim">
                      GitHub
                    </span>
                    <a
                      href=""
                      target="_blank"
                      rel="noreferrer"
                      className="font-sans text-sm text-gold hover:underline"
                    >
                      {/* github.com/rm2004x */}
                    </a>
                  </li>

                  <li className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-dim">
                      LeetCode
                    </span>
                    <a
                      href=""
                      target="_blank"
                      rel="noreferrer"
                      className="font-sans text-sm text-gold hover:underline"
                    >
                      {/* leetcode.com/rm2004 */}
                    </a>
                  </li>

                  <li className="flex flex-col gap-1 pt-3 border-t border-border mt-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-dim">
                      Status
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <span className="font-sans text-sm text-success">
                        Open to Opportunities
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}