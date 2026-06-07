"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  {
    label: "Boshlanish",
    icon: "⚡",
    title: "Birinchi qadam",
    desc: "Dasturlashga qiziqish oddiy saytlar va Python loyihalaridan boshlandi. Terminal, mantiq va muammolarni yechish meni qiziqtirar edi.",
    accent: "#00F5FF",
    done: true,
  },
  {
    label: "Web tizimlar",
    icon: "🖥️",
    title: "Backend va tizimlar",
    desc: "Django, database, admin panel va real foydalanuvchi oqimlari bilan ishlash tajribasi shakllandi. API arxitekturasi o'rganildi.",
    accent: "#3B82F6",
    done: true,
  },
  {
    label: "Biznes yechimlar",
    icon: "🛒",
    title: "Real loyihalar",
    desc: "E-commerce, buyurtma tizimlari, katalog, checkout va admin boshqaruv loyihalari ustida ishladim. Har bir loyiha yangi dars bo'ldi.",
    accent: "#8B5CF6",
    done: true,
  },
  {
    label: "AI & Automation",
    icon: "🤖",
    title: "AI va avtomatlashtirish",
    desc: "AI yordamida kontent, tahlil, Telegram botlar va biznes jarayonlarini optimallashtirish imkoniyatlarini o'rgandim va qo'lladim.",
    accent: "#10B981",
    done: true,
  },
  {
    label: "Hozir",
    icon: "🎯",
    title: "Maqsad",
    desc: "O'zbekistondagi bizneslar va shaxsiy brendlar uchun sifatli, zamonaviy va foydali raqamli mahsulotlar yaratish.",
    accent: "#F59E0B",
    done: false,
  },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="yolim"
      className="relative py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "var(--void)" }}
    >
      <div className="absolute inset-0 bg-grid-sm pointer-events-none" />
      <div
        className="absolute bottom-0 left-1/3 w-[500px] h-[350px] orb pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="max-w-xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-5"
          >
            <span className="badge-cyan">
              <span
                className="w-1 h-1 rounded-full inline-block"
                style={{ background: "var(--cyan)" }}
              />
              03 — Yo&apos;lim
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-display font-bold tracking-[-0.025em] leading-tight"
            style={{
              fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
              color: "var(--text-primary)",
            }}
          >
            Yo&apos;lim
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="font-body text-base mt-3 leading-[1.75]"
            style={{ color: "var(--text-muted)" }}
          >
            Dasturchilik yo&apos;lidagi asosiy bosqichlar va keyingi maqsadlar.
          </motion.p>
        </div>

        {/* Timeline list */}
        <div className="relative max-w-3xl">
          {/* Vertical connecting line */}
          <motion.div
            className="absolute left-5 top-5 w-px pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(0,245,255,0.18) 8%, rgba(0,245,255,0.18) 90%, transparent)",
              bottom: "20px",
            }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inV ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          />

          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -24 }}
                animate={inV ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.15 + i * 0.13,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="relative flex gap-6 sm:gap-8 pb-10 last:pb-0"
              >
                {/* Step dot */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <motion.div
                    className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    style={{
                      background: `${step.accent}18`,
                      border: `1.5px solid ${step.accent}45`,
                      boxShadow: `0 0 20px ${step.accent}22`,
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>

                {/* Content card */}
                <div
                  className="flex-1 p-5 rounded-xl transition-all duration-300 cursor-default"
                  style={{
                    background: "rgba(13,13,20,0.55)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${step.accent}30`;
                    el.style.background = `${step.accent}07`;
                    el.style.boxShadow = `0 4px 30px ${step.accent}10`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.06)";
                    el.style.background = "rgba(13,13,20,0.55)";
                    el.style.boxShadow = "none";
                  }}
                >
                  {/* Label row */}
                  <div className="flex items-center gap-3 mb-2.5 flex-wrap">
                    <span
                      className="font-mono text-[9px] tracking-[0.3em] uppercase px-2.5 py-0.5"
                      style={{
                        background: `${step.accent}14`,
                        border: `1px solid ${step.accent}30`,
                        color: step.accent,
                        borderRadius: "3px",
                      }}
                    >
                      {step.label}
                    </span>
                    {!step.done && (
                      <span
                        className="w-2 h-2 rounded-full animate-pulse-glow"
                        style={{
                          background: step.accent,
                          boxShadow: `0 0 8px ${step.accent}`,
                        }}
                      />
                    )}
                    {step.done && (
                      <span
                        className="font-mono text-[8px] tracking-[0.2em]"
                        style={{ color: "var(--text-faint)" }}
                      >
                        ✓ Yakunlangan
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display font-semibold text-[0.95rem] mb-1.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="font-body text-sm leading-[1.75]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
