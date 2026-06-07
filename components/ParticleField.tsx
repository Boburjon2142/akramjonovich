"use client";

import { useRef, useEffect } from "react";

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mx = useRef(-9999);
  const my = useRef(-9999);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf: number;
    let W = 0, H = 0;

    interface P {
      x: number; y: number;
      vx: number; vy: number;
      r: number; a: number;
    }

    let pts: P[] = [];

    const resize = () => {
      W = c.offsetWidth;
      H = c.offsetHeight;
      c.width = W * dpr;
      c.height = H * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    const init = () => {
      const N = Math.min(Math.floor((W * H) / 9500), 110);
      pts = Array.from({ length: N }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.3 + 0.3,
        a: Math.random() * 0.45 + 0.1,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        const dx = p.x - mx.current;
        const dy = p.y - my.current;
        const d2 = dx * dx + dy * dy;
        if (d2 < 22500) {
          const d = Math.sqrt(d2);
          const f = ((150 - d) / 150) * 0.5;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx *= 0.986;
        p.vy *= 0.986;
        p.x = ((p.x + p.vx) % W + W) % W;
        p.y = ((p.y + p.vy) % H + H) % H;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = `rgba(0,245,255,${p.a})`;
        ctx.fill();
      }

      /* Constellation lines */
      for (let i = 0; i < pts.length - 1; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14400) {
            const alpha = (1 - Math.sqrt(d2) / 120) * 0.1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,245,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mx.current = e.clientX - r.left;
      my.current = e.clientY - r.top;
    };
    const onLeave = () => { mx.current = -9999; my.current = -9999; };
    const onResize = () => { resize(); init(); };

    resize();
    init();
    tick();

    c.addEventListener("mousemove", onMove);
    c.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      c.removeEventListener("mousemove", onMove);
      c.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}
