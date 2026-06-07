"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LAB_ITEMS } from "@/lib/data";
import { fadeUp } from "@/lib/utils";
import SectionHeader from "./SectionHeader";

const STATUS_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  stable:       { color: "#10B981", bg: "rgba(16,185,129,0.07)", border: "rgba(16,185,129,0.25)" },
  beta:         { color: "#F59E0B", bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.25)" },
  experimental: { color: "#8B5CF6", bg: "rgba(139,92,246,0.07)", border: "rgba(139,92,246,0.25)" },
};

export default function LabShowcase() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section
      id="lab"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #030712 0%, #071827 60%, #030712 100%)" }}
    >
      {/* Grid texture */}
      <div className="absolute inset-0 bg-grid-sm opacity-60 pointer-events-none" />

      {/* Orb right */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] orb pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 65%)" }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <SectionHeader
            badge="04 — Lab"
            title="Tajriba"
            titleGradient="laboratoriyasi."
            subtitle="Eksperimental vositalar, tekshiruv loyihalari va texnik tadqiqotlar."
          />
        </div>

        {/* Lab grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LAB_ITEMS.map((item, i) => {
            const s = STATUS_STYLE[item.status];
            const isActive = activeIdx === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.33, 1, 0.68, 1] }}
                className="glass-navy p-6 cursor-pointer group transition-all duration-300"
                style={{ borderColor: isActive ? "rgba(37,99,235,0.35)" : "rgba(255,255,255,0.07)" }}
                onClick={() => setActiveIdx(isActive ? null : i)}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.2)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[9px]" style={{ color: "#2563EB" }}>
                    {item.number}
                  </span>
                  <span
                    className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5"
                    style={{ color: s.color, border: `1px solid ${s.border}`, background: s.bg }}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-white text-base mb-2 tracking-tight">
                  {item.title}
                </h3>

                {/* Desc */}
                <p className="font-body text-sm leading-relaxed mb-5" style={{ color: "#64748B" }}>
                  {item.desc}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[9px] px-2 py-0.5"
                      style={{
                        color: "#475569",
                        border: "1px solid rgba(255,255,255,0.07)",
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Expand indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "#334155" }}>
                          Demo yaqinda · GitHub da mavjud
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Terminal footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass-navy px-6 py-4 inline-flex items-center gap-3"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <span className="font-mono text-[10px]" style={{ color: "#38BDF8" }}>$</span>
          <span className="font-mono text-[11px] tracking-wide" style={{ color: "#475569" }}>
            git clone https://github.com/akramjonovich/
          </span>
          <motion.span
            className="w-2 h-4 inline-block"
            style={{ background: "#38BDF8" }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
