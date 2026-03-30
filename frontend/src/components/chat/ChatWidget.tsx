import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";

type Message = {
  id: number;
  text: string;
  isFromVisitor: boolean;
  timestamp: Date;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "🚧 Chat feature is under development. Please contact me via the contact form.",
      isFromVisitor: false,
      timestamp: new Date(),
    },
  ]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      isFromVisitor: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "🚧 This chat is currently under development.",
          isFromVisitor: false,
          timestamp: new Date(),
        },
      ]);
    }, 700);

    setText("");
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-gold rounded-full flex items-center justify-center text-background shadow-lg shadow-gold/20 z-[9500] hover:scale-105 transition-transform"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 md:bottom-28 md:right-10 w-[350px] sm:w-[400px] h-[500px] max-h-[70vh] bg-surface border border-border shadow-2xl flex flex-col z-[9600] overflow-hidden"
          >
            <div className="bg-surface-2 p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center font-serif font-bold text-gold text-lg">
                    R
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border border-surface-2" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-medium text-foreground">
                    Rudranil Manna
                  </h4>
                  <p className="font-mono text-[9px] text-muted-dim">
                    Chat (Coming Soon)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-foreground transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col gap-1 ${
                    msg.isFromVisitor ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 font-sans text-sm border ${
                      msg.isFromVisitor
                        ? "bg-gold/10 text-gold border-gold/20 rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl"
                        : "bg-surface-2 text-foreground border-border rounded-br-2xl rounded-tr-2xl rounded-tl-2xl"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="font-mono text-[8px] text-muted-dim px-1">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-4 bg-surface-2 border-t border-border flex items-center gap-2"
            >
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm font-sans text-foreground placeholder:text-muted-dim focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                disabled={!text.trim()}
                className="w-9 h-9 rounded-full bg-gold text-background flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold/80 transition-colors"
              >
                <Send className="w-4 h-4 ml-[2px]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}