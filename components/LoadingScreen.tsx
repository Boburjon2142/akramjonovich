"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Props { isVisible: boolean }

const LETTERS = "AKRAMJONOVICH".split("");

export default function LoadingScreen({ isVisible }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 3.5 + 0.8;
      setProgress(Math.min(v, 100));
      if (v >= 100) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(180deg, #030712 0%, #071827 100%)" }}
          exit={{
            opacity: 0,
            scale: 1.03,
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Grid */}
          <div className="absolute inset-0 bg-grid opacity-100" />

          {/* Center orb */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] orb pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 65%)" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-10">
            {/* Letters */}
            <div className="flex items-end gap-[2px] overflow-hidden">
              {LETTERS.map((char, i) => (
                <motion.span
                  key={i}
                  className="font-display font-black text-white leading-none"
                  style={{ fontSize: "clamp(2.2rem, 5.5vw, 5rem)", letterSpacing: "0.12em" }}
                  initial={{ opacity: 0, y: 70, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.65,
                    delay: 0.15 + i * 0.055,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Gold badge */}
            <motion.div
              className="badge-gold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <span
                className="w-1 h-1 rounded-full inline-block"
                style={{ background: "#D4AF37" }}
              />
              AI Product Lab · Qarshi
            </motion.div>

            {/* Progress track */}
            <motion.div
              className="relative w-52 h-px overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: "linear-gradient(90deg, #2563EB, #38BDF8)",
                  boxShadow: "0 0 12px rgba(56,189,248,0.6)",
                }}
              />
            </motion.div>

            {/* Count */}
            <motion.span
              className="font-mono text-[10px] tracking-[0.35em]"
              style={{ color: "#94A3B8" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              {String(Math.min(Math.floor(progress), 100)).padStart(3, "0")}
            </motion.span>
          </div>

          {/* Bottom labels */}
          <motion.div
            className="absolute bottom-8 left-8 font-mono text-[9px] tracking-[0.4em] uppercase"
            style={{ color: "#334155" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Akramjonovich.uz
          </motion.div>
          <motion.div
            className="absolute bottom-8 right-8 font-mono text-[9px] tracking-[0.4em] uppercase"
            style={{ color: "#334155" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            © 2024
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
