import { Github, Linkedin, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border mt-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">

        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-dim">
          &copy; {new Date().getFullYear()} Rudranil Manna. All rights reserved.
        </p>

        <div className="flex items-center gap-5">

          <a
            href=""
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-gold transition-colors"
          >
            <Github size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/rudranil-manna"
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-gold transition-colors"
          >
            <Linkedin size={18} />
          </a>

          <a
            href="https://x.com/RM_2004_"
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-gold transition-colors"
          >
            <Twitter size={18} />
          </a>

          <a
            href="https://www.instagram.com/rudra_867__"
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-gold transition-colors"
          >
            <Instagram size={18} />
          </a>

        </div>

      </div>
    </footer>
  );
}