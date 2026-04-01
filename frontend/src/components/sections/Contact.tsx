import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Loader2, MessageSquare, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

interface FormState { name: string; email: string; message: string; }
type FormErrors  = Partial<Record<keyof FormState, string>>;

const SOCIALS = [
  { Icon: Linkedin,  href: "https://www.linkedin.com/in/rudranil-manna",  label: "LinkedIn"   },
  { Icon: Instagram, href: "https://www.instagram.com/rudra_867__",        label: "Instagram"  },
  { Icon: Facebook,  href: "https://www.facebook.com/share/1AG4PWRHja/",   label: "Facebook"   },
  { Icon: Twitter,   href: "https://x.com/RM_2004_",                        label: "X / Twitter"},
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = (form: FormState): FormErrors => {
  const errs: FormErrors = {};
  if (!form.name.trim())                    errs.name    = "Name is required.";
  else if (form.name.trim().length < 2)     errs.name    = "Name must be at least 2 characters.";
  if (!form.email.trim())                   errs.email   = "Email is required.";
  else if (!EMAIL_RE.test(form.email))      errs.email   = "Enter a valid email address.";
  if (!form.message.trim())                 errs.message = "Message is required.";
  else if (form.message.trim().length < 10) errs.message = "Message must be at least 10 characters.";
  return errs;
};

const INPUT_BASE =
  "w-full font-sans text-[--fg] border px-4 py-3 text-[0.8125rem] " +
  "bg-[rgba(24,24,22,0.5)] placeholder:text-[--muted-dim] " +
  "outline-none transition-colors duration-250 rounded-none appearance-none";

export default function Contact() {
  const { toast }  = useToast();
  const [form, setForm]       = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors]   = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const patch = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = e.target.value;

      const updatedForm = { ...form, [field]: val };
      setForm(updatedForm);

      if (touched[field]) {
        const newErrors = validate(updatedForm);

        setErrors((prev) => ({
          ...prev,
          [field]: newErrors[field] || ""
        }));
      }
    };

  const handleBlur = (field: keyof FormState) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    const newErrors = validate(form);

    setErrors((prev) => ({
      ...prev,
      [field]: newErrors[field] || ""
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID  ?? "",
        import.meta.env.VITE_EMAIL_TEMPLATE_ID ?? "",
        { from_name: form.name.trim(), from_email: form.email.trim(), message: form.message.trim() },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY  ?? ""
      );
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTouched({});
      setErrors({});
      toast({ title: "Message sent", description: "I'll get back to you soon." });
    } catch (err: unknown) {
      const msg = (err as { text?: string })?.text ?? "Failed to send. Please try again.";
      toast({ title: "Error", description: msg });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof FormState) =>
    `${INPUT_BASE} border-[${touched[field] && errors[field] ? "rgba(239,68,68,0.6)" : "--border"}] focus:border-[${touched[field] && errors[field] ? "rgba(239,68,68,0.8)" : "--gold"}]`;

  return (
    <section id="contact" ref={ref} className="sec-py relative overflow-hidden">
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ y: bgY }}
        aria-hidden
      >
        <div
          className="absolute -bottom-[25%] left-1/2 -translate-x-1/2 w-[75vw] h-[50vw] opacity-[0.05]"
          style={{ background: "radial-gradient(ellipse, var(--gold) 0%, transparent 65%)", maxWidth: 900, maxHeight: 500 }}
        />
      </motion.div>

      <div className="inner relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="label-row">
            <span className="label-tag">06 — Contact</span>
            <div className="label-line" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="font-serif text-[--fg] mb-5"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)", lineHeight: 1.0 }}
            >
              Let's build<br />something{" "}
              <span className="italic" style={{ color: "var(--gold)" }}>great.</span>
            </h2>
            <p
              className="font-sans text-[--muted] mb-8"
              style={{ fontSize: "0.8125rem", lineHeight: 1.8, maxWidth: 400 }}
            >
              Currently seeking new opportunities and open to exciting projects.
              Whether you have a question or just want to say hi — I'll get back to you.
            </p>

            <div className="flex items-start gap-3 mb-10 p-4 border border-[--border] bg-[rgba(24,24,22,0.4)]" style={{ maxWidth: 340 }}>
              <MessageSquare size={14} style={{ color: "var(--gold)", flexShrink: 0, marginTop: 1 }} />
              <p className="font-mono uppercase text-[--muted-dim] leading-relaxed" style={{ fontSize: "0.575rem", letterSpacing: "0.12em" }}>
                Chat feature is currently{" "}
                <span style={{ color: "var(--gold)" }}>under development</span>.
              </p>
            </div>

            <div className="mb-8">
              <span className="block font-mono uppercase text-[--muted-dim] mb-2" style={{ fontSize: "0.575rem", letterSpacing: "0.18em" }}>
                Email
              </span>
              <a
                href="mailto:rm2004.dev@gmail.com"
                className="font-serif text-[--fg] hover:text-[--gold] transition-colors duration-280"
                style={{ fontSize: "clamp(1rem, 2vw, 1.45rem)" }}
              >
                rm2004.dev@gmail.com
              </a>
            </div>

            <div>
              <span className="block font-mono uppercase text-[--muted-dim] mb-4" style={{ fontSize: "0.575rem", letterSpacing: "0.18em" }}>
                Social
              </span>
              <div className="flex items-center gap-5">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit ${label}`}
                    className="text-[--muted] hover:text-[--gold] transition-colors duration-250"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {sent ? (
              <div className="glass p-7 md:p-9 flex flex-col items-center justify-center gap-5 text-center" style={{ minHeight: 340 }}>
                <span style={{ fontSize: "2.5rem", lineHeight: 1 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </span>
                <h3 className="font-serif text-[--fg]" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                  Message sent.
                </h3>
                <p className="font-sans text-[--muted]" style={{ fontSize: "0.8125rem", lineHeight: 1.75, maxWidth: 300 }}>
                  Thank you for reaching out. I'll be in touch soon.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn-ghost mt-2"
                  type="button"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="glass p-7 md:p-9 space-y-5"
                aria-label="Contact form"
              >
                <div>
                  <label htmlFor="c-name" className="sr-only">Name</label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    autoComplete="name"
                    value={form.name}
                    onChange={patch("name")}
                    onBlur={handleBlur("name")}
                    aria-invalid={!!(touched.name && errors.name)}
                    aria-describedby={touched.name && errors.name ? "err-name" : undefined}
                    className={INPUT_BASE}
                    style={{ borderColor: touched.name && errors.name ? "rgba(239,68,68,0.6)" : "var(--border)" }}
                  />
                  {touched.name && errors.name && (
                    <p id="err-name" role="alert" className="font-mono text-[0.55rem] mt-1.5 tracking-wide" style={{ color: "rgba(239,68,68,0.85)" }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="c-email" className="sr-only">Email</label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={form.email}
                    onChange={patch("email")}
                    onBlur={handleBlur("email")}
                    aria-invalid={!!(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? "err-email" : undefined}
                    className={INPUT_BASE}
                    style={{ borderColor: touched.email && errors.email ? "rgba(239,68,68,0.6)" : "var(--border)" }}
                  />
                  {touched.email && errors.email && (
                    <p id="err-email" role="alert" className="font-mono text-[0.55rem] mt-1.5 tracking-wide" style={{ color: "rgba(239,68,68,0.85)" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="c-message" className="sr-only">Message</label>
                  <textarea
                    id="c-message"
                    name="message"
                    placeholder="Message"
                    rows={5}
                    value={form.message}
                    onChange={patch("message")}
                    onBlur={handleBlur("message")}
                    aria-invalid={!!(touched.message && errors.message)}
                    aria-describedby={touched.message && errors.message ? "err-message" : undefined}
                    className={INPUT_BASE}
                    style={{ borderColor: touched.message && errors.message ? "rgba(239,68,68,0.6)" : "var(--border)" }}
                  />
                  {touched.message && errors.message && (
                    <p id="err-message" role="alert" className="font-mono text-[0.55rem] mt-1.5 tracking-wide" style={{ color: "rgba(239,68,68,0.85)" }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  aria-disabled={loading}
                  className="btn-fill w-full disabled:opacity-50 disabled:pointer-events-none"
                >
                  <span>
                    {loading
                      ? <span className="flex items-center justify-center gap-2"><Loader2 size={14} className="animate-spin" /> Sending…</span>
                      : "Send Message"
                    }
                  </span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}