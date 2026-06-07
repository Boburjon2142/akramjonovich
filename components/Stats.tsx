"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  {
    value: 30, suffix: "+", label: "Loyiha",
    sub: "muvaffaqiyatli yetkazilgan",
    color: "#00F5FF",
    sparkData: [4, 8, 10, 14, 18, 22, 26, 30],
  },
  {
    value: 3, suffix: "+", label: "Yil tajriba",
    sub: "Python & Django ecosystem",
    color: "#7C3AED",
    sparkData: [0.8, 1.2, 1.5, 2, 2.4, 2.8, 3, 3.2],
  },
  {
    value: 10, suffix: "+", label: "Texnologiya",
    sub: "Python, Django, Next.js va boshqalar",
    color: "#10B981",
    sparkData: [2, 3, 4, 5, 6, 7, 9, 10],
  },
  {
    value: 100, suffix: "%", label: "Sifat",
    sub: "har bir deliverable uchun",
    color: "#F59E0B",
    sparkData: [70, 78, 82, 88, 92, 95, 98, 100],
  },
];

/* ─── Counter ─────────────────────────────────────────────────────────────── */
function Counter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let v = 0;
    const id = setInterval(() => {
      v += Math.max(1, Math.ceil(target / 55));
      if (v >= target) { setN(target); clearInterval(id); }
      else setN(v);
    }, 18);
    return () => clearInterval(id);
  }, [active, target]);
  return <>{n}{suffix}</>;
}

/* ─── Sparkline ───────────────────────────────────────────────────────────── */
function Sparkline({ data, color, active }: { data: number[]; color: string; active: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = (max - min) || 1;
  const W = 100, H = 28;

  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / range) * H * 0.8 - H * 0.05,
  }));

  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area =
    `M ${pts[0].x},${H} ` +
    pts.map((p) => `L ${p.x},${p.y}`).join(" ") +
    ` L ${pts[pts.length - 1].x},${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full mt-3" style={{ height: H }}>
      <path d={area} fill={`${color}10`} />
      <motion.polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <circle
        cx={pts[pts.length - 1].x}
        cy={pts[pts.length - 1].y}
        r={2}
        fill={color}
      />
    </svg>
  );
}

/* ─── Section ─────────────────────────────────────────────────────────────── */
export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="statistika"
      className="relative py-10 md:py-12 lg:py-14 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "var(--void)" }}
    >
      {/* Scanning line */}
      <motion.div
        className="absolute inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.2), transparent)" }}
        animate={{ top: ["5%", "95%", "5%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Center orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] orb pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,245,255,0.04) 0%, transparent 65%)" }}
      />

      <div ref={ref} className="max-w-[1400px] mx-auto relative z-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-8 h-px" style={{ background: "rgba(37,99,235,0.2)" }} />
          <span className="font-mono text-[10px] tracking-[0.45em] uppercase" style={{ color: "var(--text-faint)" }}>
            Raqamlarda
          </span>
          <div className="w-8 h-px" style={{ background: "rgba(37,99,235,0.2)" }} />
        </motion.div>

        {/* Glass stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
              className="glass-cyan p-8 flex flex-col cursor-default group transition-all duration-300"
              style={{
                boxShadow: `0 0 30px ${s.color}08`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 0 50px ${s.color}18, 0 0 1px ${s.color}30`;
                (e.currentTarget as HTMLElement).style.borderColor = `${s.color}25`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${s.color}08`;
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,245,255,0.1)";
              }}
            >
              {/* Large number */}
              <div
                className="font-display font-bold leading-none"
                style={{
                  fontSize: "clamp(3rem, 5.5vw, 4.5rem)",
                  color: s.color,
                  textShadow: `0 0 30px ${s.color}40`,
                }}
              >
                <Counter target={s.value} suffix={s.suffix} active={inV} />
              </div>

              <div
                className="font-display font-semibold text-base mt-3"
                style={{ color: "var(--text-primary)" }}
              >
                {s.label}
              </div>

              <div
                className="font-mono text-[10px] tracking-[0.12em] leading-relaxed mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                {s.sub}
              </div>

              {/* Sparkline */}
              <Sparkline data={s.sparkData} color={s.color} active={inV} />
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inV ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p
            className="font-body italic text-sm leading-relaxed max-w-md mx-auto"
            style={{ color: "var(--text-faint)" }}
          >
            &ldquo;Har bir kod satri — foydalanuvchi uchun qadriyat yaratishi kerak.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-6 h-px" style={{ background: "rgba(0,245,255,0.12)" }} />
            <span className="font-mono text-[9px] tracking-[0.35em]" style={{ color: "var(--text-faint)" }}>
              Boburjon Akramjonovich
            </span>
            <div className="w-6 h-px" style={{ background: "rgba(0,245,255,0.12)" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
