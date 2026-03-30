import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Capabilities", href: "#capabilities" },
  { name: "Work", href: "#work" },
  { name: "Education", href: "#education" },
  { name: "Resume", href: "#resume" },
];

export default function Navbar({ open, setOpen }: any) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        id="navbar"
        className={cn(
          "fixed top-0 left-0 right-0 z-[9000] transition-all duration-500 border-b",
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-border py-4"
            : "bg-transparent border-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          <a
            href="#"
            className={cn(
              "flex items-center gap-2 group transition-all duration-300",
              open ? "opacity-40 blur-[1px]" : "opacity-100"
            )}
          >
            <span className="font-serif text-base font-semibold tracking-widest text-foreground border border-gold/60 px-2 py-0.5 group-hover:border-gold group-hover:text-gold transition-colors">
              RM
            </span>
            <span className="font-mono text-sm tracking-widest text-gold group-hover:text-foreground transition-colors">
              2004
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-4 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] border border-border text-foreground hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300"
            >
              Connect
            </a>
          </nav>

          <button
            className="md:hidden z-[10000]"
            onClick={() => setOpen(!open)}
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute left-0 w-full h-[2px] bg-gold transition-all duration-300 ${
                  open ? "rotate-45 top-1/2" : "top-1"
                }`}
              />
              <span
                className={`absolute left-0 w-full h-[2px] bg-gold transition-all duration-300 ${
                  open ? "opacity-0" : "top-1/2"
                }`}
              />
              <span
                className={`absolute left-0 w-full h-[2px] bg-gold transition-all duration-300 ${
                  open ? "-rotate-45 top-1/2" : "bottom-1"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[8000] transition-opacity duration-500 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-background z-[9001] transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex flex-col h-full px-6 py-8">

          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <span className="border border-gold/60 px-2 py-0.5 font-serif text-sm text-foreground">
                RM
              </span>
              <span className="text-gold text-sm font-mono tracking-widest">
                2004
              </span>
            </div>

            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="flex flex-col gap-6">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`text-sm tracking-widest text-muted transition-all duration-500 ${
                  open
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex-1" />

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={`mt-6 px-5 py-3 border border-gold text-center text-sm tracking-widest text-gold transition-all duration-500 ${
              open
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            CONNECT
          </a>
        </div>
      </div>
    </>
  );
}