"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STACK = [
  { label: "Python / Django",  desc: "Backend & API" },
  { label: "AI / OpenAI",      desc: "Avtomatika" },
  { label: "Next.js / React",  desc: "Frontend" },
  { label: "Telegram Bot API", desc: "Bot & mini-app" },
];

const fade = (delay = 0) => ({
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay, ease: [0.33, 1, 0.68, 1] } },
});

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="haqida"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #030712 0%, #071827 50%, #030712 100%)" }}
    >
      <div
        className="absolute right-0 top-1/4 w-[450px] h-[450px] orb pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 65%)" }}
      />

      <div ref={ref} className="max-w-[1400px] mx-auto">
        {/* Badge */}
        <motion.div
          variants={fade(0)} initial="hidden" animate={inV ? "visible" : "hidden"}
          className="mb-10"
        >
          <span className="badge-gold">
            <span className="w-1 h-1 rounded-full inline-block" style={{ background: "#D4AF37" }} />
            01 — Haqida
          </span>
        </motion.div>

        {/* Full-width headline */}
        <div className="mb-14">
          <div className="overflow-hidden mb-1">
            <motion.h2
              className="font-display font-black leading-[0.92] tracking-[-0.02em] text-white"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 6rem)" }}
              initial={{ opacity: 0, y: 50 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.33, 1, 0.68, 1] }}
            >
              Raqamli mahsulot
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display font-black leading-[0.92] tracking-[-0.02em] text-gradient-blue"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 6rem)" }}
              initial={{ opacity: 0, y: 50 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.33, 1, 0.68, 1] }}
            >
              muhandisi.
            </motion.h2>
          </div>

          {/* Rule */}
          <motion.div
            className="mt-8 w-14 h-px"
            style={{ background: "linear-gradient(90deg, #2563EB, #38BDF8)" }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={inV ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          />
        </div>

        {/* Two-column content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left: description */}
          <div className="flex flex-col gap-5">
            <motion.p
              variants={fade(0.3)} initial="hidden" animate={inV ? "visible" : "hidden"}
              className="text-base leading-[1.85] font-body"
              style={{ color: "#94A3B8" }}
            >
              <span className="text-white font-medium">Boburjon Akramjonovich</span> — oddiy
              freelancer emas. Python/Django, AI avtomatika va zamonaviy web texnologiyalari
              asosida{" "}
              <span className="text-white">real biznes muammolarini</span> yechimlarga
              aylantiruvchi product engineer.
            </motion.p>

            <motion.p
              variants={fade(0.38)} initial="hidden" animate={inV ? "visible" : "hidden"}
              className="text-sm leading-[1.9] font-body"
              style={{ color: "#64748B" }}
            >
              Qarshidan ishlaydi. EduTech, GreenTech va e-commerce sektorlarida
              kuchli tajribaga ega. Har bir loyiha — faqat kod emas, strategik raqamli mahsulot.
            </motion.p>

            {/* Status */}
            <motion.div
              variants={fade(0.46)} initial="hidden" animate={inV ? "visible" : "hidden"}
              className="flex items-center gap-3 mt-4"
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse-glow"
                style={{ background: "#38BDF8", boxShadow: "0 0 8px rgba(56,189,248,0.8)" }}
              />
              <span className="font-mono text-[10px] tracking-[0.25em]" style={{ color: "#475569" }}>
                Qarshi, O&apos;zbekiston — Mavjud
              </span>
            </motion.div>
          </div>

          {/* Right: stack cards */}
          <div className="flex flex-col gap-3">
            <motion.p
              variants={fade(0.22)} initial="hidden" animate={inV ? "visible" : "hidden"}
              className="font-mono text-[10px] tracking-[0.4em] uppercase mb-3"
              style={{ color: "#334155" }}
            >
              Asosiy texnologiyalar
            </motion.p>

            {STACK.map((item, i) => (
              <motion.div
                key={i}
                variants={fade(0.28 + i * 0.08)}
                initial="hidden"
                animate={inV ? "visible" : "hidden"}
                className="glass-navy flex items-center justify-between px-6 py-4 group cursor-default transition-all duration-300"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.35)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(37,99,235,0.07)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[9px]" style={{ color: "#2563EB" }}>
                    0{i + 1}
                  </span>
                  <span className="font-display font-bold text-white tracking-wide text-[14px]">
                    {item.label}
                  </span>
                </div>
                <span className="font-mono text-[10px] tracking-[0.12em]" style={{ color: "#475569" }}>
                  {item.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
