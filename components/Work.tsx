"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    num: "001",
    title: "EduFlow",
    category: "EduTech Platform",
    year: "2024",
    desc: "O'zbekistondagi ta'lim muassasalari uchun kurs boshqaruvi, online darslar, progress tracking va sertifikat tizimi bilan to'liq LMS platformasi.",
    tech: ["Django", "React", "PostgreSQL", "AWS S3"],
    accent: "#7C3AED",
  },
  {
    num: "002",
    title: "GreenTrack",
    category: "GreenTech · IoT",
    year: "2024",
    desc: "Quyosh paneli fermalari uchun real-time energiya monitoring, analitik dashboard va avtomatik hisobot generatsiyasi.",
    tech: ["Django", "MQTT", "InfluxDB", "React"],
    accent: "#059669",
  },
  {
    num: "003",
    title: "ShopBot",
    category: "E-Commerce · Telegram",
    year: "2023",
    desc: "Mahsulot katalogi, savat, Click/Payme to'lov, buyurtma boshqaruvi va admin panel bilan to'liq e-commerce Telegram bot.",
    tech: ["Aiogram 3", "Django", "Click API"],
    accent: "#0EA5E9",
  },
  {
    num: "004",
    title: "AutoFlow CRM",
    category: "AI · Business Automation",
    year: "2024",
    desc: "AI-powered CRM: lead tracking, avtomatik follow-up, hisobot va Telegram integratsiyasi. Biznes jarayonlarini to'liq avtomatlashtirish.",
    tech: ["OpenAI", "Django", "Celery", "Redis"],
    accent: "#D97706",
  },
];

const reveal = (delay = 0) => ({
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.33, 1, 0.68, 1] } },
});

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="ishlar"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "#030712" }}
    >
      {/* Top fade */}
      <div
        className="absolute top-0 inset-x-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #0B1120, transparent)" }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-sm opacity-100 pointer-events-none" />

      <div ref={ref} className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              variants={reveal(0)} initial="hidden" animate={inV ? "visible" : "hidden"}
              className="mb-6"
            >
              <span className="badge-gold">
                <span className="w-1 h-1 rounded-full inline-block" style={{ background: "#D4AF37" }} />
                03 — Loyihalar
              </span>
            </motion.div>
            <motion.h2
              variants={reveal(0.08)} initial="hidden" animate={inV ? "visible" : "hidden"}
              className="font-display font-black leading-[0.95] tracking-tight text-white"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
            >
              Tanlangan ishlar
            </motion.h2>
          </div>
          <motion.span
            variants={reveal(0.12)} initial="hidden" animate={inV ? "visible" : "hidden"}
            className="font-mono text-[11px] tracking-[0.3em]"
            style={{ color: "#334155" }}
          >
            — 2023 / 2024
          </motion.span>
        </div>

        {/* Projects list */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {PROJECTS.map((proj, i) => {
            const isH = hovered === i;
            return (
              <motion.div
                key={i}
                variants={reveal(0.1 + i * 0.09)}
                initial="hidden"
                animate={inV ? "visible" : "hidden"}
                className="relative overflow-hidden cursor-default transition-all duration-300"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Hover bg */}
                <AnimatePresence>
                  {isH && (
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: `${proj.accent}08` }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 py-7 grid grid-cols-[auto_1fr_auto] md:grid-cols-[72px_auto_1fr_auto] gap-4 md:gap-8 items-center">
                  {/* Number */}
                  <span
                    className="font-mono text-[10px] tracking-[0.25em] hidden md:block"
                    style={{ color: "#1e3a5f" }}
                  >
                    {proj.num}
                  </span>

                  {/* Title + category */}
                  <div className="flex flex-col gap-1">
                    <h3
                      className="font-display font-black tracking-tight leading-none transition-colors"
                      style={{
                        fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                        color: isH ? "#fff" : "#e2e8f0",
                      }}
                    >
                      {proj.title}
                    </h3>
                    <span
                      className="font-mono text-[10px] tracking-[0.25em] uppercase transition-colors"
                      style={{ color: isH ? proj.accent : "#475569" }}
                    >
                      {proj.category}
                    </span>
                  </div>

                  {/* Desc + tech (hover reveal) */}
                  <AnimatePresence>
                    {isH && (
                      <motion.div
                        className="hidden lg:flex flex-col gap-2"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p
                          className="font-body text-[13px] leading-relaxed max-w-sm"
                          style={{ color: "#94A3B8" }}
                        >
                          {proj.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {proj.tech.map(t => (
                            <span
                              key={t}
                              className="font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5"
                              style={{
                                color: proj.accent,
                                border: `1px solid ${proj.accent}35`,
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Year + arrow */}
                  <div className="flex items-center gap-4">
                    <span
                      className="font-mono text-[11px] tracking-[0.15em]"
                      style={{ color: "#334155" }}
                    >
                      {proj.year}
                    </span>
                    <motion.div
                      className="w-9 h-9 flex items-center justify-center transition-all duration-300"
                      style={{
                        border: isH ? "1px solid rgba(255,255,255,0.6)" : "1px solid rgba(255,255,255,0.08)",
                        background: isH ? "#fff" : "transparent",
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <ArrowUpRight
                        size={13}
                        style={{ color: isH ? "#030712" : "#475569" }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom link */}
        <motion.div
          variants={reveal(0.5)} initial="hidden" animate={inV ? "visible" : "hidden"}
          className="mt-12 text-center"
        >
          <a
            href="#cta"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase transition-colors duration-300"
            style={{ color: "#334155" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#38BDF8")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#334155")}
            onClick={e => {
              e.preventDefault();
              document.querySelector("#cta")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Barcha loyihalar haqida gaplashaylik
            <ArrowUpRight size={11} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
