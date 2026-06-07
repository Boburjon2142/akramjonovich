"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Bot, Globe, Cpu, GraduationCap, Leaf, Terminal } from "lucide-react";

const SERVICES = [
  {
    num: "01", icon: Cpu,
    title: "AI Avtomatika",
    short: "Biznes jarayonlarini AI bilan avtomatlashtirish",
    desc: "OpenAI, LangChain integratsiyasi, aqlli workflow, NLP va ma'lumot tahlili. Kompaniyangiz uchun real AI yechimlar.",
    tags: ["OpenAI", "LangChain", "Python", "FastAPI"],
  },
  {
    num: "02", icon: Globe,
    title: "Web Ilovalar",
    short: "Full-stack Django + Next.js platformalar",
    desc: "Django REST API, Next.js frontend, PostgreSQL, Docker deploy. O'rta va katta biznes uchun kuchli web platformalar.",
    tags: ["Django", "Next.js", "PostgreSQL", "Docker"],
  },
  {
    num: "03", icon: Bot,
    title: "Telegram Botlar",
    short: "Biznes uchun Telegram bot va mini-app",
    desc: "CRM integratsiyasi, to'lov tizimlari, savdo avtomatikasi. Aiogram 3.x asosida professional bot yechimlar.",
    tags: ["Aiogram 3", "Webhook", "Click/Payme"],
  },
  {
    num: "04", icon: GraduationCap,
    title: "EduTech Yechimlar",
    short: "Ta'lim platformasi va LMS tizimlar",
    desc: "Online ta'lim, kurs boshqaruvi, quiz, progress tracking, sertifikat generation va to'lov integratsiyasi.",
    tags: ["LMS", "Video stream", "Quiz", "Cert."],
  },
  {
    num: "05", icon: Leaf,
    title: "GreenTech Tizimlar",
    short: "Energetika monitoring va dashboard",
    desc: "Quyosh paneli, shamol turbinasi tizimlari uchun real-time monitoring, IoT integratsiyasi va analitika.",
    tags: ["IoT", "Real-time", "Dashboard", "MQTT"],
  },
  {
    num: "06", icon: Terminal,
    title: "IT Konsalting",
    short: "Texnik arxitektura va strategiya",
    desc: "Startaplar va kompaniyalar uchun texnik arxitektura, texnologiya tanlash, jamoani o'qitish va code review.",
    tags: ["Arxitektura", "Code review", "DevOps"],
  },
];

const reveal = (delay = 0) => ({
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.33, 1, 0.68, 1] } },
});

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="xizmatlar"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "#0B1120" }}
    >
      {/* Top gradient fade */}
      <div
        className="absolute top-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #030712, transparent)" }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(0deg, #030712, transparent)" }}
      />

      {/* bg orb */}
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[800px] h-[400px] orb pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 65%)" }}
      />

      <div ref={ref} className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              variants={reveal(0)} initial="hidden" animate={inV ? "visible" : "hidden"}
              className="mb-6"
            >
              <span className="badge-gold">
                <span className="w-1 h-1 rounded-full inline-block" style={{ background: "#D4AF37" }} />
                02 — Xizmatlar
              </span>
            </motion.div>
            <motion.h2
              variants={reveal(0.08)} initial="hidden" animate={inV ? "visible" : "hidden"}
              className="font-display font-black leading-[0.95] tracking-tight text-white"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
            >
              Nima qilamiz
            </motion.h2>
          </div>
          <motion.p
            variants={reveal(0.15)} initial="hidden" animate={inV ? "visible" : "hidden"}
            className="font-body text-sm max-w-xs leading-relaxed"
            style={{ color: "#64748B" }}
          >
            Har bir xizmat — alohida muammo uchun aniq yechim.
            Biz faqat kerakli narsani quramiz.
          </motion.p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            const isH = hovered === i;
            return (
              <motion.div
                key={i}
                variants={reveal(0.08 + i * 0.06)}
                initial="hidden"
                animate={inV ? "visible" : "hidden"}
                className="relative flex flex-col gap-5 p-7 cursor-default overflow-hidden transition-all duration-400"
                style={{
                  background: isH ? "#111827" : "#0B1120",
                  boxShadow: isH ? "inset 0 0 40px rgba(37,99,235,0.06)" : "none",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Top accent on hover */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, #2563EB, #38BDF8)" }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: isH ? 1 : 0 }}
                  transition={{ duration: 0.35 }}
                />

                {/* Icon + number */}
                <div className="flex items-start justify-between">
                  <div
                    className="p-3 transition-all duration-300"
                    style={{
                      border: isH ? "1px solid rgba(37,99,235,0.5)" : "1px solid rgba(255,255,255,0.07)",
                      background: isH ? "rgba(37,99,235,0.1)" : "rgba(255,255,255,0.02)",
                    }}
                  >
                    <Icon size={18} style={{ color: isH ? "#38BDF8" : "#475569" }} />
                  </div>
                  <span
                    className="font-display font-black text-4xl transition-colors"
                    style={{ color: isH ? "#1e3a5f" : "#0f1f30" }}
                  >
                    {svc.num}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-display font-bold text-white text-[17px] mb-1 tracking-wide">
                    {svc.title}
                  </h3>
                  <p className="font-body text-[13px] leading-relaxed" style={{ color: "#64748B" }}>
                    {svc.short}
                  </p>
                </div>

                {/* Expanded desc */}
                <AnimatePresence>
                  {isH && (
                    <motion.p
                      className="font-body text-[13px] leading-[1.75]"
                      style={{ color: "#94A3B8" }}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28 }}
                    >
                      {svc.desc}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {svc.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] tracking-[0.18em] uppercase px-2 py-1 transition-all duration-300"
                      style={{
                        color: isH ? "#38BDF8" : "#334155",
                        border: isH ? "1px solid rgba(56,189,248,0.25)" : "1px solid rgba(255,255,255,0.06)",
                        background: isH ? "rgba(56,189,248,0.05)" : "transparent",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
