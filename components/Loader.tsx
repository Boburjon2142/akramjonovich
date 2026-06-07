"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINE1 = "Boburjon".split("");
const LINE2 = "Akramjonovich".split("");

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 3000;
    let raf: number;

    const tick = (now: number) => {
      const p = Math.min(((now - start) / duration) * 100, 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#030712" }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      {/* Background orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Letters */}
      <div className="relative z-10 flex flex-col items-center gap-1 mb-8">
        {/* Line 1 — Boburjon */}
        <div className="flex items-end gap-[0.03em] overflow-hidden">
          {LINE1.map((char, i) => (
            <motion.span
              key={i}
              className="font-display font-black text-white select-none"
              style={{ fontSize: "clamp(1.4rem, 3.2vw, 3.2rem)", letterSpacing: "-0.01em" }}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.045, ease: [0.33, 1, 0.68, 1] }}
            >
              {char}
            </motion.span>
          ))}
        </div>
        {/* Line 2 — Akramjonovich */}
        <div className="flex items-end gap-[0.03em] overflow-hidden">
          {LINE2.map((char, i) => (
            <motion.span
              key={i}
              className="font-display font-black select-none"
              style={{ fontSize: "clamp(1.4rem, 3.2vw, 3.2rem)", letterSpacing: "-0.01em", color: "var(--cyan, #00F5FF)" }}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.04, ease: [0.33, 1, 0.68, 1] }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Gold badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mb-12"
      >
        <span className="badge-gold">
          <span className="w-1 h-1 rounded-full inline-block" style={{ background: "#D4AF37" }} />
          AI Product Lab · Qarshi
        </span>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="relative w-48 h-px"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 origin-left"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #2563EB, #38BDF8)",
            boxShadow: "0 0 12px rgba(56,189,248,0.6)",
          }}
        />
      </motion.div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="font-mono text-[9px] tracking-[0.45em] mt-3"
        style={{ color: "#1e3a5f" }}
      >
        {Math.round(progress)}%
      </motion.span>
    </motion.div>
  );
}
