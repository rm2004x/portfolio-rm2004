import { useEffect, useRef } from "react";

const GOLD = "201,169,110";

interface Node {
  x: number; y: number;
  r: number;
  pulse: number;
  phaseX: number; phaseY: number;
  freqX: number;  freqY: number;
  label?: string;
}

const TECH_LABELS = [
  "React", "Java", "Node.js", "JavaScript",
  "Spring", "PostgreSQL", "Docker", "Git",
];

function makeNodes(): Node[] {
  const nodes: Node[] = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const d = 0.50 + (Math.random() - 0.5) * 0.12;
    nodes.push({
      x: Math.cos(a) * d, y: Math.sin(a) * d,
      r: 4.5,
      pulse:  Math.random() * Math.PI * 2,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      freqX:  0.18 + Math.random() * 0.12,
      freqY:  0.14 + Math.random() * 0.12,
      label: TECH_LABELS[i],
    });
  }
  for (let i = 0; i < 28; i++) {
    const a = Math.random() * Math.PI * 2;
    const d = 0.1 + Math.random() * 0.78;
    nodes.push({
      x: Math.cos(a) * d, y: Math.sin(a) * d,
      r: 1.4 + Math.random() * 2.0,
      pulse:  Math.random() * Math.PI * 2,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      freqX:  0.10 + Math.random() * 0.18,
      freqY:  0.10 + Math.random() * 0.18,
      label: undefined,
    });
  }
  return nodes;
}

interface Packet { fromIdx: number; toIdx: number; t: number; speed: number; }

export default function UltraScene() {
  const cvRef    = useRef<HTMLCanvasElement>(null);
  const rafRef   = useRef<number>(0);
  const t0Ref    = useRef<number>(-1);
  const nodesRef = useRef<Node[]>(makeNodes());
  const pktsRef  = useRef<Packet[]>([]);
  const pktTimer = useRef<number>(0);

  useEffect(() => {
    const cv  = cvRef.current!;
    const ctx = cv.getContext("2d")!;

    const resize = () => {
      const p = cv.parentElement!;
      cv.width  = p.clientWidth;
      cv.height = p.clientHeight;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(cv.parentElement!);
    resize();

    const tick = (now: number) => {
      if (t0Ref.current < 0) t0Ref.current = now;
      const elapsed = (now - t0Ref.current) / 1000;

      const CW = cv.width;
      const CH = cv.height;
      const cx = CW / 2;
      const cy = CH / 2;
      const D  = Math.min(CW, CH) * 0.44;

      ctx.clearRect(0, 0, CW, CH);

      const pos = nodesRef.current.map((n) => {
        const dx  = Math.sin(elapsed * n.freqX + n.phaseX) * 0.06;
        const dy  = Math.cos(elapsed * n.freqY + n.phaseY) * 0.06;
        const ang = elapsed * 0.04;
        return {
          wx:    cx + ((n.x + dx) * Math.cos(ang) - (n.y + dy) * Math.sin(ang)) * D,
          wy:    cy + ((n.x + dx) * Math.sin(ang) + (n.y + dy) * Math.cos(ang)) * D,
          r:     n.r,
          label: n.label,
          pulse: n.pulse,
        };
      });

      const CONN = D * 0.62;
      const edges: [number, number, number][] = [];
      for (let a = 0; a < pos.length; a++) {
        for (let b = a + 1; b < pos.length; b++) {
          const dx = pos[a].wx - pos[b].wx;
          const dy = pos[a].wy - pos[b].wy;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONN) edges.push([a, b, d]);
        }
      }

      for (const [a, b, d] of edges) {
        ctx.beginPath();
        ctx.moveTo(pos[a].wx, pos[a].wy);
        ctx.lineTo(pos[b].wx, pos[b].wy);
        ctx.strokeStyle = `rgba(${GOLD},${(1 - d / CONN) * 0.20})`;
        ctx.lineWidth   = 0.7;
        ctx.stroke();
      }

      pktTimer.current += 1 / 60;
      if (pktTimer.current > 0.7 + Math.random() * 0.8 && edges.length > 0) {
        pktTimer.current = 0;
        const e = edges[Math.floor(Math.random() * edges.length)];
        pktsRef.current.push({ fromIdx: e[0], toIdx: e[1], t: 0, speed: 0.35 + Math.random() * 0.35 });
      }

      pktsRef.current = pktsRef.current.filter(pkt => {
        pkt.t += pkt.speed / 60;
        if (pkt.t >= 1) return false;
        const f  = pos[pkt.fromIdx], to = pos[pkt.toIdx];
        const px = f.wx + (to.wx - f.wx) * pkt.t;
        const py = f.wy + (to.wy - f.wy) * pkt.t;
        const g  = ctx.createRadialGradient(px, py, 0, px, py, 5);
        g.addColorStop(0, `rgba(${GOLD},0.88)`);
        g.addColorStop(1, `rgba(${GOLD},0)`);
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        return true;
      });

      for (const p of pos) {
        const pa = 0.55 + 0.18 * Math.sin(elapsed * 1.4 + p.pulse);

        if (p.label) {
          const glow = ctx.createRadialGradient(p.wx, p.wy, 0, p.wx, p.wy, p.r * 4.5);
          glow.addColorStop(0, `rgba(${GOLD},0.20)`);
          glow.addColorStop(1, `rgba(${GOLD},0)`);
          ctx.beginPath();
          ctx.arc(p.wx, p.wy, p.r * 4.5, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.wx, p.wy, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${GOLD},${pa})`;
          ctx.fill();

          const fs  = Math.max(8, Math.min(11, D * 0.052));
          ctx.save();
          ctx.font         = `400 ${fs}px 'JetBrains Mono','Courier New',monospace`;
          ctx.textAlign    = "center";
          ctx.textBaseline = "middle";
          const tw  = ctx.measureText(p.label!).width;
          const ph  = fs * 1.55;
          const pw  = tw + fs;
          const plx = p.wx - pw / 2;
          const ply = p.wy + p.r + 5;
          ctx.fillStyle = "rgba(8,8,7,0.88)";
          ctx.beginPath();
          if ((ctx as any).roundRect) (ctx as any).roundRect(plx, ply, pw, ph, ph / 2);
          else ctx.rect(plx, ply, pw, ph);
          ctx.fill();
          ctx.fillStyle = `rgba(${GOLD},0.82)`;
          ctx.fillText(p.label!, p.wx, ply + ph / 2);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.wx, p.wy, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${GOLD},${pa * 0.5})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={cvRef} style={{ display: "block", width: "100%", height: "100%" }} />
  );
}