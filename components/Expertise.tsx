"use client";

import { motion } from "framer-motion";
import {
  Globe, Bot, ShoppingCart, Layout,
  AppWindow, Link2, Smartphone, Server,
  ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  {
    Icon: Globe,
    title: "Web Saytlar",
    desc: "Zamonaviy, tezkor va SEO optimallashtirilgan web saytlar.",
    accent: "#00F5FF",
  },
  {
    Icon: Bot,
    title: "AI / Chatbotlar",
    desc: "Sun'iy intellekt asosidagi chatbot va avtomatlashtrish.",
    accent: "#F59E0B",
  },
  {
    Icon: ShoppingCart,
    title: "E-commerce",
    desc: "Savdo platformalari va to'lov tizimi integratsiyasi.",
    accent: "#7C3AED",
  },
  {
    Icon: Layout,
    title: "UI/UX Dizayn",
    desc: "Foydalanuvchi uchun qulay va zamonaviy dizayn.",
    accent: "#2563EB",
  },
  {
    Icon: AppWindow,
    title: "Web App",
    desc: "Interaktiv va kuchli web ilovalar.",
    accent: "#00F5FF",
  },
  {
    Icon: Link2,
    title: "Custom API",
    desc: "Tezkor va xavfsiz RESTful API ishlab chiqish.",
    accent: "#F59E0B",
  },
  {
    Icon: Smartphone,
    title: "Mobil-First",
    desc: "Mobil qurilmalarga mos va responsiv yechimlar.",
    accent: "#7C3AED",
  },
  {
    Icon: Server,
    title: "SLA & DevOps",
    desc: "Xosting, deploy, monitoring va qo'llab-quvvatlash.",
    accent: "#10B981",
  },
];

export default function Expertise() {
  return (
    <section
      id="xizmatlar"
      className="relative py-12 md:py-14 lg:py-16 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--void) 0%, var(--surface) 50%, var(--void) 100%)" }}
    >
      {/* Orbs */}
      <div
        className="absolute left-0 top-1/3 w-[500px] h-[500px] orb pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 65%)" }}
      />
      <div
        className="absolute right-0 bottom-1/3 w-[400px] h-[400px] orb pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)" }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[9px] tracking-[0.35em] uppercase"
              style={{
                background: "rgba(37,99,235,0.08)",
                border: "1px solid rgba(37,99,235,0.2)",
                color: "#3B82F6",
              }}
            >
              <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "#3B82F6" }} />
              Xizmatlarim
            </div>
          </motion.div>

          <motion.h2
            className="font-display font-bold leading-[0.93] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 5.8rem)", color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
          >
            Men nimalarda
          </motion.h2>
          <motion.h2
            className="font-display font-bold leading-[0.93] tracking-[-0.02em] text-gradient-blue"
            style={{ fontSize: "clamp(2.4rem, 5vw, 5.8rem)" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
          >
            kuchliman?
          </motion.h2>

          <motion.p
            className="font-body text-sm mt-6 max-w-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            Har bir xizmatga sifat, tezlik va natijaga e&apos;tibor beraman. Loyihangizni keyingi bosqichga olib chiqamiz.
          </motion.p>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.33, 1, 0.68, 1] }}
              className="group relative p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(13,13,20,0.6)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${svc.accent}25`;
                (e.currentTarget as HTMLElement).style.background = `rgba(13,13,20,0.85)`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 30px ${svc.accent}10`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.background = "rgba(13,13,20,0.6)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Top row: icon + arrow */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-sm transition-all duration-300"
                  style={{
                    background: `${svc.accent}12`,
                    border: `1px solid ${svc.accent}22`,
                  }}
                >
                  <svc.Icon size={22} style={{ color: svc.accent }} />
                </div>
                <div
                  className="w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <ArrowUpRight size={13} style={{ color: "var(--text-muted)" }} />
                </div>
              </div>

              <h3
                className="font-display font-semibold text-[1rem] mb-2.5 leading-snug"
                style={{ color: "var(--text-primary)" }}
              >
                {svc.title}
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {svc.desc}
              </p>

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${svc.accent}60, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
