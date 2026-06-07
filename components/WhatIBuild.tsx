"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { scrollTo } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    icon: "🌐",
    title: "Biznes saytlar",
    desc: "Kompaniya, xizmat yoki shaxsiy brend uchun tez, chiroyli va ishonchli web-saytlar.",
    accent: "#3B82F6",
    tags: ["Landing", "Corporate", "Branding"],
  },
  {
    icon: "🛒",
    title: "E-commerce platformalar",
    desc: "Katalog, savat, buyurtma, to'lov, yetkazib berish va admin boshqaruv tizimi.",
    accent: "#10B981",
    tags: ["Catalog", "Cart", "Admin"],
  },
  {
    icon: "🤖",
    title: "Telegram botlar",
    desc: "Buyurtma, tracking, ta'lim, eslatma, CRM yoki avtomatlashtirish uchun botlar.",
    accent: "#00F5FF",
    tags: ["Buyurtma", "CRM", "aiogram"],
  },
  {
    icon: "📊",
    title: "Admin panellar",
    desc: "Kontent, buyurtmalar, foydalanuvchilar va statistikani boshqarish uchun qulay panel.",
    accent: "#8B5CF6",
    tags: ["Dashboard", "Analytics", "Users"],
  },
  {
    icon: "⚡",
    title: "AI avtomatlashtirish",
    desc: "Takroriy ishlarni kamaytirish, kontent, tahlil va biznes jarayonlarini tezlashtirish.",
    accent: "#F59E0B",
    tags: ["AI", "Workflow", "API"],
  },
  {
    icon: "🎯",
    title: "Landing page",
    desc: "Mahsulot yoki xizmatni sotishga yo'naltirilgan zamonaviy, konversiyali sahifalar.",
    accent: "#EC4899",
    tags: ["Sales", "Conversion", "UI/UX"],
  },
] as const;

export default function WhatIBuild() {
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="nimalar"
      className="relative py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "var(--void)" }}
    >
      <div className="absolute inset-0 bg-grid-sm pointer-events-none" />
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[400px] orb pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute top-1/4 left-0 w-[400px] h-[400px] orb pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 65%)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-xl">
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
                04 — Xizmatlar
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
              Nimalar yarataman?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="font-body text-base mt-3 leading-[1.75]"
              style={{ color: "var(--text-muted)" }}
            >
              Har bir loyiha maqsadiga, auditoriyasiga va texnik talabiga mos
              yechim bilan quriladi.
            </motion.p>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={inV ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => scrollTo("#aloqa")}
            className="group hidden lg:flex items-center gap-2.5 px-5 py-2.5 font-display font-bold text-xs tracking-[0.14em] uppercase transition-all duration-300 flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--text-muted)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(0,245,255,0.25)";
              el.style.color = "var(--cyan)";
              el.style.background = "rgba(0,245,255,0.04)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.1)";
              el.style.color = "var(--text-muted)";
              el.style.background = "rgba(255,255,255,0.03)";
            }}
          >
            Loyiha boshlash
            <ArrowRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.button>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: 0.1 + i * 0.09,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="group flex flex-col gap-3 sm:gap-4 p-3 sm:p-6 rounded-lg sm:rounded-xl transition-all duration-300 cursor-default min-w-0"
              style={{
                background: "rgba(13,13,20,0.65)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${s.accent}30`;
                el.style.background = "rgba(13,13,20,0.88)";
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = `0 16px 48px ${s.accent}12`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.background = "rgba(13,13,20,0.65)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Icon */}
              <div
                className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-2xl transition-all duration-300"
                style={{
                  background: `${s.accent}14`,
                  border: `1px solid ${s.accent}28`,
                }}
              >
                {s.icon}
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3
                  className="font-display font-semibold text-[0.78rem] sm:text-[0.95rem] leading-snug mb-1.5 sm:mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {s.title}
                </h3>
                <p
                  className="font-body text-[0.7rem] sm:text-sm leading-[1.55] sm:leading-[1.75]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {s.desc}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[7px] sm:text-[9px] tracking-[0.05em] sm:tracking-[0.1em] px-1.5 sm:px-2 py-0.5 max-w-full"
                    style={{
                      background: `${s.accent}0e`,
                      border: `1px solid ${s.accent}28`,
                      color: `${s.accent}cc`,
                      borderRadius: "3px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex lg:hidden justify-center"
        >
          <button
            onClick={() => scrollTo("#aloqa")}
            className="flex items-center gap-2.5 px-6 py-3 font-display font-bold text-xs tracking-[0.14em] uppercase transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #2563EB, #3B82F6)",
              color: "white",
              boxShadow: "0 0 20px rgba(37,99,235,0.3)",
            }}
          >
            Loyiha boshlash
            <ArrowRight size={12} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
