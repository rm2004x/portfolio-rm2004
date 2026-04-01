import { useState } from "react";
  import Preloader from "@/components/layout/Preloader";
  import CustomCursor from "@/components/layout/CustomCursor";
  import CanvasBackground from "@/components/layout/CanvasBackground";
  import ScrollProgress from "@/components/layout/ScrollProgress";
  import Navbar from "@/components/layout/Navbar";
  import Footer from "@/components/layout/Footer";
  import Hero from "@/components/sections/Hero";
  import Ticker from "@/components/sections/Ticker";
  import About from "@/components/sections/About";
  import Skills from "@/components/sections/Skills";
  import Projects from "@/components/sections/Projects";
  import Education from "@/components/sections/Education";
  import Resume from "@/components/sections/Resume";
  import Contact from "@/components/sections/Contact";
  import ChatWidget from "@/components/chat/ChatWidget";

  export default function Home() {
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
      <>
        <CustomCursor />
        <ScrollProgress />
        <CanvasBackground />

        {loading && <Preloader onComplete={() => setLoading(false)} />}

        {!loading && (
          <div className="relative flex flex-col min-h-screen">
            <Navbar open={menuOpen} setOpen={setMenuOpen} />

            <main
              className="flex-1"
              style={{
                transition: "filter 0.5s ease",
                filter: menuOpen ? "blur(4px)" : "none",
                pointerEvents: menuOpen ? "none" : "auto",
              }}
            >
              <Hero />
              <Ticker />
              <About />
              <Skills />
              <Projects />
              <Education />
              <Resume />
              <Contact />
            </main>

            <Footer />

            {!menuOpen && <ChatWidget />}
          </div>
        )}
      </>
    );
  }
  