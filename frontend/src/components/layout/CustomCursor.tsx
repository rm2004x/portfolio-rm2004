import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cur = useRef({ x: -300, y: -300 });
  const lag = useRef({ x: -300, y: -300 });
  const raf = useRef(0);
  const st  = useRef({ visible: false, hover: false, click: false });

  useEffect(() => {
    if (window.matchMedia("(hover:none) and (pointer:coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      cur.current = { x: e.clientX, y: e.clientY };
      st.current.visible = true;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      st.current.hover = !!(
        t.closest("a,button,[role='button'],input,textarea,label,select")
      );
    };
    const onDown  = () => { st.current.click = true; };
    const onUp    = () => { st.current.click = false; };
    const onLeave = () => { st.current.visible = false; };
    const onEnter = () => { st.current.visible = true; };

    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mouseover",  onOver,  { passive: true });
    window.addEventListener("mousedown",  onDown,  { passive: true });
    window.addEventListener("mouseup",    onUp,    { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    const tick = () => {
      raf.current = requestAnimationFrame(tick);
      const dot  = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;

      lag.current.x = lerp(lag.current.x, cur.current.x, 0.11);
      lag.current.y = lerp(lag.current.y, cur.current.y, 0.11);

      const { visible, hover, click } = st.current;
      const dotScale  = click ? 0.35 : 1;
      const ringScale = click ? 0.7 : hover ? 1.65 : 1;

      dot.style.opacity    = visible && !hover ? "1" : "0";
      dot.style.transform  = `translate(${cur.current.x - 4}px,${cur.current.y - 4}px) scale(${dotScale})`;
      ring.style.opacity   = visible ? "1" : "0";
      ring.style.transform = `translate(${lag.current.x - 17}px,${lag.current.y - 17}px) scale(${ringScale})`;
      ring.style.background = hover ? "rgba(201,169,110,0.09)" : "transparent";
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseover",  onOver);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed", inset: 0, top: 0, left: 0,
          width: 8, height: 8, borderRadius: "50%",
          background: "var(--gold)",
          pointerEvents: "none", zIndex: 99999,
          opacity: 0,
          mixBlendMode: "difference",
          willChange: "transform, opacity",
          transition: "opacity 0.12s ease, transform 0.08s ease",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed", inset: 0, top: 0, left: 0,
          width: 34, height: 34, borderRadius: "50%",
          border: "1px solid rgba(201,169,110,0.55)",
          pointerEvents: "none", zIndex: 99998,
          opacity: 0,
          willChange: "transform, opacity",
          transition: "background 0.22s ease, opacity 0.12s ease, transform 0.32s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </>
  );
}