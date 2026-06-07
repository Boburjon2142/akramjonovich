"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send, ArrowUpRight } from "lucide-react";

const reveal = (delay = 0) => ({
  hidden:  { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, delay, ease: [0.33, 1, 0.68, 1] } },
});

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="cta"
      className="relative min-h-[85vh] flex items-center py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #030712 0%, #071827 50%, #030712 100%)" }}
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Large center orb */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] orb pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 60%)" }}
      />
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] orb pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 65%)" }}
      />

      {/* Rotating rings */}
      <motion.div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[480px] h-[480px] rounded-full hidden lg:block pointer-events-none"
        style={{ border: "1px solid rgba(37,99,235,0.08)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: "#2563EB", boxShadow: "0 0 8px rgba(37,99,235,0.8)" }}
        />
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[320px] h-[320px] rounded-full hidden lg:block pointer-events-none"
        style={{ border: "1px solid rgba(56,189,248,0.06)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full"
          style={{ background: "#38BDF8", opacity: 0.6 }}
        />
      </motion.div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Badge */}
        <motion.div
          variants={reveal(0)} initial="hidden" animate={inV ? "visible" : "hidden"}
          className="mb-10"
        >
          <span className="badge-gold">
            <span className="w-1 h-1 rounded-full inline-block" style={{ background: "#D4AF37" }} />
            05 — Aloqa
          </span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-2">
          <motion.h2
            className="font-display font-black leading-[0.9] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(3rem, 7vw, 7.5rem)" }}
            initial={{ y: "105%", opacity: 0 }}
            animate={inV ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.95, ease: [0.33, 1, 0.68, 1] }}
          >
            Loyihangizni
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-12">
          <motion.h2
            className="font-display font-black leading-[0.9] tracking-[-0.02em] text-gradient-blue"
            style={{ fontSize: "clamp(3rem, 7vw, 7.5rem)" }}
            initial={{ y: "105%", opacity: 0 }}
            animate={inV ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.95, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
          >
            boshlaylik.
          </motion.h2>
        </div>

        {/* Sub */}
        <motion.p
          variants={reveal(0.3)} initial="hidden" animate={inV ? "visible" : "hidden"}
          className="font-body text-base leading-[1.8] mb-12 max-w-lg"
          style={{ color: "#64748B" }}
        >
          G&apos;oyangiz bor, lekin qayerdan boshlashni bilmayapsizmi? Biz birinchi qadamdan
          so&apos;nggi deliverygacha yoningizda.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={reveal(0.38)} initial="hidden" animate={inV ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="mailto:boburjonabduganiyev83@gmail.com"
            className="group inline-flex items-center gap-3 px-8 py-5 font-display font-bold text-sm tracking-[0.14em] uppercase text-white transition-all duration-300"
            style={{
              background: "#2563EB",
              boxShadow: "0 0 24px rgba(37,99,235,0.45), 0 0 60px rgba(37,99,235,0.15)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 36px rgba(37,99,235,0.65), 0 0 80px rgba(37,99,235,0.22)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 24px rgba(37,99,235,0.45), 0 0 60px rgba(37,99,235,0.15)";
            }}
          >
            <Mail size={16} />
            Email yuborish
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="https://t.me/Lazzyproger"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-5 font-display font-bold text-sm tracking-[0.14em] uppercase transition-all duration-300"
            style={{
              color: "#94A3B8",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.02)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.5)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
              (e.currentTarget as HTMLElement).style.background = "rgba(37,99,235,0.06)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.10)";
              (e.currentTarget as HTMLElement).style.color = "#94A3B8";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
            }}
          >
            <Send size={16} />
            Telegram
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Status */}
        <motion.div
          variants={reveal(0.5)} initial="hidden" animate={inV ? "visible" : "hidden"}
          className="mt-12 flex flex-wrap items-center gap-5"
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full animate-pulse-glow"
              style={{ background: "#38BDF8", boxShadow: "0 0 8px rgba(56,189,248,0.8)" }}
            />
            <span className="font-mono text-[10px] tracking-[0.25em]" style={{ color: "#334155" }}>
              Mavjud · Response 24h
            </span>
          </div>
          <span className="font-mono text-[10px]" style={{ color: "#1e3a5f" }}>·</span>
          <span className="font-mono text-[10px] tracking-[0.15em]" style={{ color: "#334155" }}>
            boburjonabduganiyev83@gmail.com
          </span>
        </motion.div>
      </div>
    </section>
  );
}
