"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "Muammo, auditoriya, maqsad va funksiyalar aniqlanadi. Raqobatchilar tahlili va user flow tuziladi.",
  },
  {
    num: "02",
    title: "Structure",
    desc: "Sahifa arxitekturasi, user flow va texnik model tuziladi. API va DB sxemasi loyihalanadi.",
  },
  {
    num: "03",
    title: "Design",
    desc: "Premium UI, responsive layout va interactionlar yaratiladi. Component library quriladi.",
  },
  {
    num: "04",
    title: "Build",
    desc: "Frontend, backend, bot, AI yoki API integratsiyalar ishlab chiqiladi. CI/CD o'rnatiladi.",
  },
  {
    num: "05",
    title: "Launch",
    desc: "Hosting, domen, SSL, test va optimizatsiya qilinadi. Performance va SEO tekshiriladi.",
  },
  {
    num: "06",
    title: "Improve",
    desc: "Analytics, feedback va keyingi versiyalar asosida rivojlantiriladi. KPIlar kuzatiladi.",
  },
];

function Step({ step, index, inV }: { step: typeof STEPS[0]; index: number; inV: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inV ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.1, ease: [0.33, 1, 0.68, 1] }}
      className="relative pl-14 pb-16 last:pb-0"
    >
      {/* Milestone dot on the timeline */}
      <div
        className="absolute left-[13px] top-1.5 w-3 h-3 rounded-full z-10 transition-all duration-500"
        style={{
          background: "var(--void)",
          border: "2px solid rgba(0,245,255,0.35)",
          boxShadow: "0 0 8px rgba(0,245,255,0.2)",
        }}
      />

      {/* Giant outlined step number — decorative behind */}
      <div
        className="absolute right-0 top-0 font-display font-bold leading-none select-none pointer-events-none hidden lg:block"
        style={{
          fontSize: "clamp(5rem, 10vw, 9rem)",
          WebkitTextStroke: "1px rgba(0,245,255,0.05)",
          color: "transparent",
          lineHeight: 1,
          top: "-16px",
        }}
      >
        {step.num}
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <span
            className="font-mono text-[10px] tracking-[0.35em] uppercase block mb-3"
            style={{ color: "var(--cyan)" }}
          >
            {step.num}
          </span>
          <h3
            className="font-display font-bold tracking-tight leading-tight"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.8rem)",
              color: "var(--text-primary)",
            }}
          >
            {step.title}
          </h3>
        </div>
        <p
          className="font-body text-sm leading-relaxed md:max-w-xs md:text-right"
          style={{ color: "var(--text-muted)" }}
        >
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inV = useInView(sectionRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end 0.3"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="jarayon"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      {/* Fades */}
      <div
        className="absolute top-0 inset-x-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(180deg, var(--void), transparent)" }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(0deg, var(--void), transparent)" }}
      />

      {/* Orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] orb pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.04) 0%, transparent 65%)" }}
      />

      <div ref={sectionRef} className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="badge-gold">
            <span className="w-1 h-1 rounded-full inline-block" style={{ background: "var(--cyan)" }} />
            07 — Jarayon
          </span>
        </motion.div>

        <motion.h2
          className="font-display font-bold leading-[0.93] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2.4rem, 5vw, 5.5rem)", color: "var(--text-primary)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
        >
          Jarayon ishlashi
        </motion.h2>
        <motion.h2
          className="font-display font-bold leading-[0.93] tracking-[-0.02em] text-gradient-cyan"
          style={{ fontSize: "clamp(2.4rem, 5vw, 5.5rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
        >
          kerak.
        </motion.h2>

        <motion.p
          className="font-body text-sm leading-relaxed mb-20 max-w-lg mt-4"
          style={{ color: "var(--text-muted)" }}
          initial={{ opacity: 0 }}
          animate={inV ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
        >
          Chiroyli sayt yetmaydi. Strategiya, struktura, kod va launch bir tizim bo&apos;lib ishlashi kerak.
        </motion.p>

        {/* Timeline + Steps */}
        <div ref={listRef} className="relative">
          {/* Vertical line track */}
          <div
            className="absolute left-[18px] top-0 bottom-0 w-px"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {/* Animated fill line */}
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{
                height: lineHeight,
                background: "linear-gradient(180deg, var(--cyan) 0%, var(--purple) 100%)",
              }}
            />
          </div>

          {/* Steps */}
          {STEPS.map((step, i) => (
            <Step key={i} step={step} index={i} inV={inV} />
          ))}
        </div>

        <motion.p
          className="mt-16 font-mono text-[10px] tracking-[0.3em] text-center"
          style={{ color: "var(--text-faint)" }}
          initial={{ opacity: 0 }}
          animate={inV ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          Har bir loyiha — individual yondashuv. Muddatlar va narxlar faqat siz bilan kelishiladi.
        </motion.p>
      </div>
    </section>
  );
}
