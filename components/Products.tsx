"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import SectionHeader from "./SectionHeader";

export default function Products() {
  const [active, setActive] = useState(0);
  const product = PRODUCTS[active];

  return (
    <section
      id="mahsulotlar"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "#030712" }}
    >
      {/* Top fade */}
      <div
        className="absolute top-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #071827, transparent)" }}
      />

      {/* Orb */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] orb pointer-events-none"
        style={{ background: `radial-gradient(circle, ${product.accent}09 0%, transparent 65%)` }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <SectionHeader
            badge="05 — Mahsulotlar"
            title="Tayyor"
            titleGradient="yechimlar."
            subtitle="Biznes uchun battle-tested platformalar — deploy-ga tayyor."
          />
        </div>

        {/* Tab selector */}
        <div className="flex gap-2 mb-12 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className="relative px-6 py-3 font-display font-bold text-sm tracking-wide transition-colors duration-300"
              style={{ color: active === i ? "#fff" : "#475569" }}
            >
              {p.title}
              {active === i && (
                <motion.div
                  layoutId="product-tab"
                  className="absolute bottom-0 inset-x-0 h-px"
                  style={{ background: `linear-gradient(90deg, ${p.accent}, ${p.accent}80)` }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Product detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24"
          >
            {/* Left */}
            <div>
              {/* Badge + status */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="font-mono text-[9px] tracking-[0.3em] uppercase px-2.5 py-1"
                  style={{
                    color: product.accent,
                    border: `1px solid ${product.accent}35`,
                    background: `${product.accent}0a`,
                  }}
                >
                  {product.badge}
                </span>
                <span
                  className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5"
                  style={{
                    color: product.status === "Live" ? "#10B981" : "#F59E0B",
                    border: `1px solid ${product.status === "Live" ? "rgba(16,185,129,0.25)" : "rgba(245,158,11,0.25)"}`,
                    background: product.status === "Live" ? "rgba(16,185,129,0.07)" : "rgba(245,158,11,0.07)",
                  }}
                >
                  {product.status}
                </span>
              </div>

              <h3
                className="font-display font-black text-white mb-2 tracking-[-0.02em]"
                style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
              >
                {product.title}
              </h3>
              <p className="font-mono text-sm mb-6" style={{ color: product.accent }}>
                {product.tagline}
              </p>

              <p className="font-body text-base leading-[1.8] mb-8" style={{ color: "#94A3B8" }}>
                {product.desc}
              </p>

              <a
                href={`mailto:boburjonabduganiyev83@gmail.com?subject=${product.title} haqida so'rov`}
                className="inline-flex items-center gap-3 px-6 py-3.5 font-display font-bold text-sm tracking-[0.12em] uppercase text-white transition-all duration-300"
                style={{
                  background: product.accent,
                  boxShadow: `0 0 24px ${product.accent}45`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${product.accent}65`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${product.accent}45`;
                }}
              >
                Demo so&apos;rash
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Right — features */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: "#334155" }}>
                Imkoniyatlar
              </p>
              <div className="flex flex-col gap-3">
                {product.features.map((feat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-4 glass-navy px-5 py-4"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="w-5 h-5 flex items-center justify-center rounded-full shrink-0"
                      style={{
                        background: `${product.accent}15`,
                        border: `1px solid ${product.accent}35`,
                      }}
                    >
                      <Check size={10} style={{ color: product.accent }} />
                    </div>
                    <span className="font-body text-sm" style={{ color: "#94A3B8" }}>
                      {feat}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#38BDF8", boxShadow: "0 0 6px rgba(56,189,248,0.7)" }}
                  />
                  <span className="font-mono text-[10px] tracking-[0.25em]" style={{ color: "#334155" }}>
                    {product.year} · Qarshi, O&apos;zbekiston
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
