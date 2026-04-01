import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { name: "About",        href: "#about"        },
  { name: "Capabilities", href: "#capabilities" },
  { name: "Work",         href: "#work"         },
  { name: "Education",    href: "#education"    },
  { name: "Resume",       href: "#resume"       },
];

export default function Navbar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      lastY.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        id="navbar"
        className="fixed top-0 left-0 right-0 z-[9000] border-b"
        style={{
          background: scrolled ? "rgba(8,8,7,0.75)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
          borderColor: scrolled ? "var(--border)" : "transparent",
          paddingBlock: scrolled ? "1rem" : "1.5rem",
          transition: "background 0.4s ease, border-color 0.4s ease, padding 0.4s ease",
        }}
      >
        <div className="max-w-[1160px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-2 group"
            style={{
              opacity: open ? 0.4 : 1,
              filter: open ? "blur(1px)" : "none",
              transition: "opacity 0.3s, filter 0.3s",
            }}
          >
            <span
              className="font-serif text-base font-semibold tracking-widest text-[--fg] border border-[rgba(201,169,110,0.6)] px-2 py-0.5 group-hover:border-[--gold] group-hover:text-[--gold] transition-colors"
              style={{ lineHeight: 1.4 }}
            >
              RM
            </span>
            <span className="font-mono text-sm tracking-widest text-[--gold] group-hover:text-[--fg] transition-colors">
              2004
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--muted] hover:text-[--gold] transition-colors duration-250"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-4 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] border border-[--border] text-[--fg] hover:border-[--gold] hover:text-[--gold] transition-all duration-300"
            >
              Connect
            </a>
          </nav>

          <button
            className="md:hidden z-[10000] w-10 h-10 flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            type="button"
          >
            <div className="relative w-6 h-4">
              <span
                className="absolute left-0 w-full h-[1.5px] bg-[--gold] origin-center"
                style={{
                  top: 0,
                  transition: "transform 0.35s ease",
                  transform: open ? "translateY(7px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="absolute left-0 w-full h-[1.5px] bg-[--gold] top-1/2 -mt-[0.75px]"
                style={{
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                  opacity: open ? 0 : 1,
                  transform: open ? "scaleX(0)" : "scaleX(1)",
                }}
              />
              <span
                className="absolute left-0 w-full h-[1.5px] bg-[--gold] origin-center"
                style={{
                  bottom: 0,
                  transition: "transform 0.35s ease",
                  transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
                }}
              />
            </div>
          </button>
        </div>
      </header>

      <div
        className="fixed inset-0 z-[8000]"
        style={{
          background: "rgba(8,8,7,0.6)",
          backdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.5s ease",
        }}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      <div
        className="fixed top-0 right-0 h-full w-[80%] max-w-sm z-[9001] flex flex-col"
        style={{
          background: "var(--surface)",
          borderLeft: "1px solid var(--border)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          opacity: open ? 1 : 0,
          transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease",
          willChange: "transform",
        }}
      >
        <div className="flex flex-col h-full px-6 py-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <span className="border border-[rgba(201,169,110,0.6)] px-2 py-0.5 font-serif text-sm text-[--fg]">
                RM
              </span>
              <span className="text-[--gold] text-sm font-mono tracking-widest">2004</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-[--muted] hover:text-[--fg] transition-colors font-mono text-xs"
              type="button"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-[--muted] hover:text-[--gold] transition-colors duration-300"
                style={{
                  transitionDelay: open ? `${i * 60}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(12px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease, color 0.3s ease",
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex-1" />

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-6 px-5 py-3 border border-[--gold] text-center font-mono text-xs uppercase tracking-[0.2em] text-[--gold] hover:bg-[--gold] hover:text-[--bg] transition-all duration-300"
            style={{
              transitionDelay: open ? "300ms" : "0ms",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease, background 0.3s ease, color 0.3s ease",
            }}
          >
            Connect
          </a>
        </div>
      </div>
    </>
  );
}