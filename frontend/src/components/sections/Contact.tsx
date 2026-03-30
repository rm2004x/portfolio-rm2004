import { motion } from "framer-motion";
import { useState } from "react";
import { Loader2, MessageSquare, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

export default function Contact() {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Fields",
        description: "Please fill all required fields.",
      });
      return;
    }

    const isValidEmail = /\S+@\S+\.\S+/.test(formData.email);

    if (!isValidEmail) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      );

      toast({
        title: "Message Sent 🚀",
        description: "Thank you! I will get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });

    } catch (error: any) {
      console.error(error);

      toast({
        title: "Error",
        description: error?.text || "Failed to send message.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >

          <div className="flex items-center gap-6 mb-14">
            <span className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
              06 — Contact
            </span>
            <div className="h-[1px] bg-border flex-1 max-w-[180px]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            <div>
              <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-6">
                Let's build something <span className="italic text-gold">great.</span>
              </h2>

              <p className="font-sans text-muted mb-6 max-w-md text-sm leading-relaxed">
                Currently seeking new opportunities and open to exciting projects.
                Whether you have a question or just want to say hi — I'll try my best to get back to you!
              </p>

              <div className="flex items-start gap-3 mb-10 p-4 border border-border bg-surface-2/40 max-w-md">
                <MessageSquare className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <p className="font-mono text-[10px] tracking-wide text-muted-dim leading-relaxed uppercase">
                  Chat feature is currently <span className="text-gold">under development</span>.
                </p>
              </div>

              <div className="space-y-8">

                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dim mb-2">
                    Email
                  </span>
                  <a
                    href="mailto:rm2004.dev@gmail.com"
                    className="font-serif text-xl md:text-2xl text-foreground hover:text-gold transition-colors"
                  >
                    rm2004.dev@gmail.com
                  </a>
                </div>

                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-dim mb-3">
                    Social
                  </span>

                  <div className="flex items-center gap-5">
                    <a href="https://www.linkedin.com/in/rudranil-manna" target="_blank" rel="noreferrer" className="text-muted hover:text-gold transition-colors">
                      <Linkedin size={20} />
                    </a>

                    <a href="https://www.instagram.com/rudra_867__" target="_blank" rel="noreferrer" className="text-muted hover:text-gold transition-colors">
                      <Instagram size={20} />
                    </a>

                    <a href="https://www.facebook.com/share/1AG4PWRHja/" target="_blank" rel="noreferrer" className="text-muted hover:text-gold transition-colors">
                      <Facebook size={20} />
                    </a>
                    <a href="https://x.com/RM_2004_" target="_blank" rel="noreferrer" className="text-muted hover:text-gold transition-colors">
                      <Twitter size={20} />
                    </a>
                  </div>
                </div>

              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 glass-panel p-6 md:p-8">

              <input
                type="text"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-surface-2/50 border border-border px-4 py-3 text-sm text-foreground"
              />

              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-surface-2/50 border border-border px-4 py-3 text-sm text-foreground"
              />

              <textarea
                placeholder="Message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-surface-2/50 border border-border px-4 py-3 text-sm text-foreground resize-none"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  "Send Message"
                )}
              </button>

            </form>

          </div>

        </motion.div>
      </div>
    </section>
  );
}