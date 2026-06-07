"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  {
    num: "01",
    icon: "🔍",
    title: "Tahlil",
    desc: "Loyiha maqsadi, auditoriya, funksiyalar va texnik talablarni birga aniqlaymiz. Ortiqcha taxmin yo'q — hamma narsa yozma.",
    accent: "#00F5FF",
  },
  {
    num: "02",
    icon: "🗂️",
    title: "Struktura",
    desc: "Sahifalar, ma'lumotlar oqimi, admin panel va foydalanuvchi yo'lini rejalashtiramiz. Ishlash mantiqini chizamiz.",
    accent: "#3B82F6",
  },
  {
    num: "03",
    icon: "🎨",
    title: "Dizayn",
    desc: "Premium, tushunarli va mobilga mos interfeys tayyorlanadi. Har bir element maqsadga xizmat qiladi.",
    accent: "#8B5CF6",
  },
  {
    num: "04",
    icon: "⚙️",
    title: "Dasturlash",
    desc: "Frontend, backend, database, API va admin imkoniyatlari ishlab chiqiladi. Toza, kengayadigan kod.",
    accent: "#10B981",
  },
  {
    num: "05",
    icon: "🚀",
    title: "Test va deploy",
    desc: "Xatolar tekshiriladi, hostingga joylanadi, domen va SSL sozlanadi. Loyiha foydalanuvchilarga tayyor.",
    accent: "#F59E0B",
  },
  {
    num: "06",
    icon: "🤝",
    title: "Qo'llab-quvvatlash",
    desc: "Kerak bo'lsa keyingi rivojlantirish va texnik yordam davom ettiriladi. Yolg'iz qoldirilmaysiz.",
    accent: "#EC4899",
  },
] as const;

function StepCard({
  step, index, inView,
}: {
  step: (typeof STEPS)[number]; index: number; inView: boolean;
}) {
  const isLast = index === STEPS.length - 1;

  return (
    <motion.div
      className="relative flex gap-5"
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: 0.12 + index * 0.1,
        ease: [0.33, 1, 0.68, 1],
      }}
    >
      {/* Step indicator + connecting line */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 48 }}>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 z-10"
          style={{
            background: `${step.accent}12`,
            border: `1px solid ${step.accent}30`,
            boxShadow: `0 0 16px ${step.accent}12`,
          }}
        >
          {step.icon}
        </div>
        {!isLast && (
          <div
            className="w-px flex-1 mt-2"
            style={{
              background: `linear-gradient(180deg, ${step.accent}30, transparent)`,
              minHeight: 32,
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 mb-6 p-5 rounded-xl transition-all duration-300 cursor-default group"
        style={{
          background: "rgba(13,13,20,0.65)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = `${step.accent}28`;
          el.style.boxShadow = `0 4px 32px ${step.accent}0a`;
          el.style.background = "rgba(13,13,20,0.88)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "rgba(255,255,255,0.06)";
          el.style.boxShadow = "none";
          el.style.background = "rgba(13,13,20,0.65)";
        }}
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className="font-display font-semibold text-[0.95rem]"
            style={{ color: "var(--text-primary)" }}
          >
            {step.title}
          </h3>
          <span
            className="font-mono text-[9px] tracking-[0.28em] flex-shrink-0 mt-0.5"
            style={{ color: `${step.accent}88` }}
          >
            {step.num}
          </span>
        </div>
        <p
          className="font-body text-sm leading-[1.75]"
          style={{ color: "var(--text-muted)" }}
        >
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function WorkProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="jarayon"
      className="relative py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--void) 0%, var(--surface) 55%, var(--void) 100%)",
      }}
    >
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[500px] orb pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 65%)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto">
        {/* ── Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="badge-cyan">
                <span
                  className="w-1 h-1 rounded-full inline-block"
                  style={{ background: "var(--cyan)" }}
                />
                08 — Jarayon
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="font-display font-bold tracking-[-0.025em] leading-tight mb-4"
              style={{
                fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
                color: "var(--text-primary)",
              }}
            >
              Loyiha qanday yuzaga keladi?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="font-body text-base leading-[1.8] mb-8"
              style={{ color: "var(--text-muted)" }}
            >
              Har bir loyiha tasodifiy emas — aniq bosqichlarga bo&apos;lingan
              jarayon orqali yuzaga keladi. Siz har doim nima bo&apos;layotganini
              bilasiz.
            </motion.p>

            {/* Summary pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inV ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {["Shaffof jarayon", "Muddatga hurmat", "Bosqichli yetkazish"].map(
                (pill) => (
                  <span
                    key={pill}
                    className="font-mono text-[9px] tracking-[0.18em] uppercase px-3 py-1.5"
                    style={{
                      background: "rgba(0,245,255,0.05)",
                      border: "1px solid rgba(0,245,255,0.12)",
                      color: "var(--cyan)",
                      borderRadius: "6px",
                    }}
                  >
                    {pill}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* ── Steps ── */}
          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} inView={inV} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
