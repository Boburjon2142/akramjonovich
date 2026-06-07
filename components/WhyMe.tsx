"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import { scrollTo } from "@/lib/utils";

const REASONS = [
  {
    icon: "💬",
    num: "01",
    title: "Tushunarli aloqa",
    desc: "Texnik gaplarni murakkablashtirmay, oddiy tilda tushuntiraman. Har bir qadam aniq va shaffof — sir yo'q.",
    accent: "#00F5FF",
  },
  {
    icon: "🔧",
    num: "02",
    title: "Real muammo — real yechim",
    desc: "Faqat chiroyli interfeys emas, biznes jarayoningizga mos, amaliy va kengayadigan tizim quraman.",
    accent: "#3B82F6",
  },
  {
    icon: "📈",
    num: "03",
    title: "Kengayadigan kod",
    desc: "Bugungi loyiha ertaga kattalashsa ham, asosiy arxitektura bardosh beradi. Texnik qarz minimal.",
    accent: "#8B5CF6",
  },
  {
    icon: "✅",
    num: "04",
    title: "Mas'uliyat",
    desc: "Boshlashdan oldin talablarni aniqlayman, keyin bosqichma-bosqich ishlayman. Muddatga hurmat.",
    accent: "#10B981",
  },
] as const;

export default function WhyMe() {
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="nega"
      className="relative py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--void) 0%, var(--surface) 55%, var(--void) 100%)",
      }}
    >
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[450px] orb pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(37,99,235,0.05) 0%, transparent 65%)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto">

        {/* Header — centered */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 flex justify-center"
          >
            <span className="badge-cyan">
              <span
                className="w-1 h-1 rounded-full inline-block"
                style={{ background: "var(--cyan)" }}
              />
              07 — Afzalliklar
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
            Nega men bilan ishlash kerak?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="font-body text-base mt-3 leading-[1.75]"
            style={{ color: "var(--text-muted)" }}
          >
            Har bir loyiha boshlashdan oldin maqsad va natijani birga aniqlaymiz.
            Shunchaki kod yozmayman — tizim quraman.
          </motion.p>
        </div>

        {/* Reason cards — 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 32 }}
              animate={inV ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: 0.12 + i * 0.1,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="flex gap-5 p-6 rounded-xl transition-all duration-300 cursor-default"
              style={{
                background: "rgba(13,13,20,0.65)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${r.accent}28`;
                el.style.boxShadow = `0 4px 40px ${r.accent}0a`;
                el.style.background = "rgba(13,13,20,0.85)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.boxShadow = "none";
                el.style.background = "rgba(13,13,20,0.65)";
              }}
            >
              {/* Icon container */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{
                    background: `${r.accent}14`,
                    border: `1px solid ${r.accent}28`,
                  }}
                >
                  {r.icon}
                </div>
                <span
                  className="font-mono text-[9px] tracking-[0.2em]"
                  style={{ color: `${r.accent}66` }}
                >
                  {r.num}
                </span>
              </div>

              {/* Text */}
              <div>
                <h3
                  className="font-display font-semibold text-[0.95rem] mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {r.title}
                </h3>
                <p
                  className="font-body text-sm leading-[1.75]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {r.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.52 }}
          className="relative overflow-hidden rounded-2xl p-8 sm:p-10 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(124,58,237,0.08) 100%)",
            border: "1px solid rgba(37,99,235,0.2)",
          }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.12), transparent 60%)",
            }}
          />

          <div className="relative z-10">
            <p
              className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4"
              style={{ color: "var(--cyan)", opacity: 0.8 }}
            >
              Bepul maslahat
            </p>
            <h3
              className="font-display font-bold mb-3"
              style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Loyihangizni boshlaymizmi?
            </h3>
            <p
              className="font-body text-sm leading-[1.8] mb-8 max-w-md mx-auto"
              style={{ color: "var(--text-muted)" }}
            >
              Qisqacha g&apos;oyangizni yozing — men uni texnik, dizayn va biznes
              tomonidan qanday amalga oshirish mumkinligini tushuntirib beraman.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://t.me/Lazzyproger"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 font-display font-bold text-sm tracking-[0.1em] uppercase transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #2563EB, #3B82F6)",
                  color: "white",
                  boxShadow: "0 0 24px rgba(37,99,235,0.35)",
                  borderRadius: "6px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 40px rgba(37,99,235,0.55)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 24px rgba(37,99,235,0.35)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                }}
              >
                <Send size={14} />
                Telegram yozish
              </a>

              <button
                onClick={() => scrollTo("#aloqa")}
                className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 font-display font-bold text-sm tracking-[0.1em] uppercase btn-ghost-gradient transition-all duration-300"
                style={{ borderRadius: "6px" }}
              >
                Forma to&apos;ldirish
                <ArrowRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
