"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, Users } from "lucide-react";
import { scrollTo } from "@/lib/utils";
import ParticleField from "./ParticleField";


/* ─── Language SVG icons ────────────────────────────────────────────────────── */
function IcoPython({ w = 22 }: { w?: number }) {
  return (
    <svg width={w} height={w} viewBox="0 0 256 255" fill="none">
      <path d="M126.9 0C62.4 0 66.3 27.3 66.3 27.3v28.2h62.3v8.7H42.2S0 59.2 0 124.8c0 65.5 36.2 63.2 36.2 63.2h21.6v-30.4s-1.2-36.2 35.6-36.2h61.4s34.5.6 34.5-33.3V34.5S194.7 0 126.9 0zm-34.3 19.8c6.2 0 11.1 5 11.1 11.1 0 6.2-5 11.1-11.1 11.1-6.2 0-11.1-5-11.1-11.1 0-6.2 5-11.1 11.1-11.1z" fill="#4B8BBE"/>
      <path d="M129.1 255c64.5 0 60.6-27.3 60.6-27.3v-28.2h-62.3v-8.7h86.4S256 195.8 256 130.2c0-65.5-36.2-63.2-36.2-63.2h-21.6V97.4s1.2 36.2-35.6 36.2h-61.4s-34.5-.6-34.5 33.3v56.6S61.3 255 129.1 255zm34.3-19.8c-6.2 0-11.1-5-11.1-11.1 0-6.2 5-11.1 11.1-11.1 6.2 0 11.1 5 11.1 11.1 0 6.2-5 11.1-11.1 11.1z" fill="#FFE873"/>
    </svg>
  );
}
function IcoJS({ w = 22 }: { w?: number }) {
  return (
    <svg width={w} height={w} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="4" fill="#F7DF1E" />
      <text
        x="27.5"
        y="26.5"
        textAnchor="end"
        fill="#111827"
        fontFamily="Arial, sans-serif"
        fontSize="15"
        fontWeight="800"
        letterSpacing="-1"
      >
        JS
      </text>
    </svg>
  );
}
function IcoTS({ w = 22 }: { w?: number }) {
  return (
    <svg width={w} height={w} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="4" fill="#3178C6" />
      <text
        x="27.5"
        y="26.5"
        textAnchor="end"
        fill="#FFFFFF"
        fontFamily="Arial, sans-serif"
        fontSize="15"
        fontWeight="800"
        letterSpacing="-1"
      >
        TS
      </text>
    </svg>
  );
}
function IcoFlutter({ w = 22 }: { w?: number }) {
  return (
    <svg width={w} height={w} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M18.8 3H27L10.2 19.8 6.1 15.7 18.8 3Z" fill="#54C5F8" />
      <path d="m10.2 19.8 4.1-4.1L27 28.4h-8.2l-8.6-8.6Z" fill="#29B6F6" />
      <path d="m14.3 24 4.1-4.1 4.1 4.1-4.1 4.1-4.1-4.1Z" fill="#01579B" />
      <path d="m18.4 28.1 4.1-4.1 4.1 4.1-4.1 4.1-4.1-4.1Z" fill="#54C5F8" opacity=".9" />
    </svg>
  );
}
function IcoDjango({ w = 22 }: { w?: number }) {
  return (
    <svg width={w} height={w} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="5" fill="#092E20" />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fill="#44B78B"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        fontWeight="800"
        letterSpacing="-1"
      >
        Dj
      </text>
      <circle cx="23.8" cy="7.2" r="1.5" fill="#44B78B" />
    </svg>
  );
}
function IcoReact({ w = 22 }: { w?: number }) {
  return (
    <svg width={w} height={w} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="2.8" fill="#61DAFB"/>
      <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.4"/>
      <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(60 16 16)"/>
      <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(120 16 16)"/>
    </svg>
  );
}

/* ─── Tech card data ─────────────────────────────────────────────────────────── */
const TECH_CARDS: Array<{
  title: string; meta: string; version: string; badge: string;
  accentColor: string; glowBase: string;
  top: string; left?: string; right?: string; width: number;
  rotate: number; delay: number;
}> = [
  { title: "Python",     meta: "Backend • AI • Automation", version: "v3.11+",   badge: "Core Stack", accentColor: "#FFD43B", glowBase: "rgba(55,118,171,0.22)", top: "18px",  left: "8px",   width: 232, rotate: -0.8, delay: 0 },
  { title: "JavaScript", meta: "Interactive UI logic",      version: "ES2024",   badge: "Frontend",   accentColor: "#F7DF1E", glowBase: "rgba(247,223,30,0.18)", top: "62px",  right: "4px", width: 224, rotate: 0.9, delay: 0.5 },
  { title: "TypeScript", meta: "Typed frontend logic",      version: "v5.x",     badge: "Scalable",   accentColor: "#60A5FA", glowBase: "rgba(49,120,198,0.20)", top: "196px", left: "52px",  width: 238, rotate: 0.5, delay: 1.1 },
  { title: "Flutter",    meta: "Cross-platform mobile",     version: "v3.x",     badge: "Mobile",     accentColor: "#54C5F8", glowBase: "rgba(84,197,248,0.18)", top: "270px", right: "0px", width: 226, rotate: -0.7, delay: 0.8 },
  { title: "Django",     meta: "ORM • REST • Admin",        version: "v4.2 LTS", badge: "Production", accentColor: "#44B78B", glowBase: "rgba(68,183,139,0.18)", top: "406px", left: "2px",   width: 236, rotate: 0.7, delay: 1.4 },
  { title: "React",      meta: "Component-based UI",        version: "v18+",     badge: "Frontend UI",accentColor: "#61DAFB", glowBase: "rgba(97,218,251,0.18)", top: "478px", right: "34px",width: 230, rotate: -0.6, delay: 0.3 },
];

function getTechIcon(title: string, w: number): React.ReactNode {
  switch (title) {
    case "Python":     return <IcoPython w={w} />;
    case "JavaScript": return <IcoJS w={w} />;
    case "TypeScript": return <IcoTS w={w} />;
    case "Flutter":    return <IcoFlutter w={w} />;
    case "Django":     return <IcoDjango w={w} />;
    case "React":      return <IcoReact w={w} />;
    default:           return null;
  }
}

/* ─── Premium glassmorphism tech card ───────────────────────────────────────── */
function TechCard({
  title, meta, version, badge, accentColor, glowBase,
  top, left, right, width, rotate, delay,
}: {
  title: string; meta: string; version: string; badge: string;
  accentColor: string; glowBase: string;
  top: string; left?: string; right?: string; width: number;
  rotate: number; delay: number;
}) {
  const normalBox = `0 14px 38px rgba(0,0,0,0.42), 0 0 30px ${glowBase}, inset 0 1px 0 rgba(255,255,255,0.05)`;
  const hoverBox  = `0 20px 52px rgba(0,0,0,0.55), 0 0 46px ${glowBase}, inset 0 1px 0 rgba(255,255,255,0.08)`;

  return (
    <motion.div
      className="absolute"
      style={{ top, left, right, zIndex: 1, rotate }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: [0, -7, 0] }}
      transition={{
        opacity: { duration: 0.5, delay: delay + 0.9 },
        y: { duration: 4.2 + delay * 0.35, repeat: Infinity, ease: "easeInOut", delay: delay + 1.5 },
      }}
    >
      <div
        style={{
          width,
          background: "linear-gradient(145deg, rgba(15,23,42,0.86), rgba(5,9,20,0.76))",
          border: `1px solid ${accentColor}38`,
          backdropFilter: "blur(22px)",
          borderRadius: "18px",
          padding: "16px",
          boxShadow: normalBox,
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease, background 0.28s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-4px)";
          el.style.borderColor = `${accentColor}48`;
          el.style.boxShadow = hoverBox;
          el.style.background = "linear-gradient(145deg, rgba(18,28,50,0.94), rgba(7,12,25,0.9))";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "";
          el.style.borderColor = `${accentColor}28`;
          el.style.boxShadow = normalBox;
          el.style.background = "linear-gradient(145deg, rgba(15,23,42,0.86), rgba(5,9,20,0.76))";
        }}
      >
        {/* Top accent shimmer */}
        <div style={{
          position: "absolute", top: 14, bottom: 14, left: 0,
          width: "2px",
          background: `linear-gradient(180deg, transparent, ${accentColor}, transparent)`,
          pointerEvents: "none",
        }} />
        {/* Corner ambient orb */}
        <div style={{
          position: "absolute", top: -28, left: -28,
          width: 80, height: 80, borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}0a 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ display: "flex", gap: "11px", alignItems: "flex-start", position: "relative" }}>
          {/* 48×48 icon chip */}
          <div style={{
            width: 50, height: 50, borderRadius: "14px",
            background: "rgba(4, 7, 18, 0.80)",
            border: `1px solid ${accentColor}22`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            boxShadow: `0 0 20px ${accentColor}0d, inset 0 1px 0 rgba(255,255,255,0.04)`,
          }}>
            {getTechIcon(title, 26)}
          </div>

          {/* Text block */}
          <div style={{ flex: 1, minWidth: 0, paddingTop: "2px" }}>
            {/* Title + badge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "4px", marginBottom: "4px" }}>
              <span className="font-display" style={{ fontWeight: 700, fontSize: "14px", lineHeight: 1, color: "var(--text-primary)" }}>
                {title}
              </span>
              <span className="font-mono" style={{
                background: `${accentColor}0e`,
                border: `1px solid ${accentColor}2e`,
                color: accentColor,
                fontSize: "7px",
                padding: "2px 5px",
                borderRadius: "30px",
                letterSpacing: "0.07em",
                textTransform: "uppercase" as const,
                flexShrink: 0,
                lineHeight: 1.5,
                whiteSpace: "nowrap" as const,
              }}>
                {badge}
              </span>
            </div>
            {/* Meta description */}
            <p className="font-body" style={{ color: "var(--text-muted)", fontSize: "10px", lineHeight: 1.55, margin: "0 0 7px 0" }}>
              {meta}
            </p>
            {/* Version */}
            <span className="font-mono" style={{ color: accentColor, fontSize: "8.5px", opacity: 0.8, letterSpacing: "0.05em" }}>
              {version}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Boburdev terminal card ────────────────────────────────────────────────── */
function BoburDevTerminal() {
  return (
    <motion.div
      className="absolute w-[194px]"
      style={{
        top: "552px",
        left: "10px",
        zIndex: 2,
        background: "rgba(5,8,15,0.82)",
        border: "1px solid rgba(0,245,255,0.13)",
        borderRadius: "14px",
        backdropFilter: "blur(18px)",
        overflow: "hidden",
        boxShadow: "0 12px 32px rgba(0,0,0,0.45), 0 0 24px rgba(0,245,255,0.06)",
        rotate: "-1.5deg",
      }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="flex items-center gap-1.5 px-3 py-2"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        {["#FF5F57", "#FFBD2E", "#28C840"].map((c) => (
          <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
        ))}
        <span
          className="font-mono text-[8px] ml-1"
          style={{ color: "var(--text-faint)" }}
        >
          terminal
        </span>
      </div>
      <div className="px-3 py-2.5 flex flex-col gap-1">
        {[
          { prompt: "❯", text: "python --version", color: "#94A3B8" },
          { prompt: " ", text: "Python 3.11.0",     color: "#FFD43B" },
          { prompt: "❯", text: "npm run build",     color: "#94A3B8" },
          { prompt: "✓", text: "compiled in 2.1s",  color: "#10B981" },
        ].map((line, i) => (
          <motion.div
            key={i}
            className="font-mono text-[9px] flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.35, duration: 0.3 }}
          >
            <span style={{ color: "#10B981" }}>{line.prompt}</span>
            <span style={{ color: line.color }}>{line.text}</span>
          </motion.div>
        ))}
        <div className="flex items-center gap-1.5 font-mono text-[9px]">
          <span style={{ color: "#10B981" }}>❯</span>
          <motion.span
            className="inline-block w-[6px] h-[11px]"
            style={{ background: "var(--cyan)", borderRadius: "1px" }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.85, repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Mini git card ─────────────────────────────────────────────────────────── */
function MiniGitCard() {
  const commits = [
    { hash: "a3f2c", msg: "feat: auth system",   color: "#10B981", time: "2m" },
    { hash: "b12ef", msg: "fix: query optimize", color: "#38BDF8", time: "1h" },
  ];

  return (
    <motion.div
      className="absolute right-0 w-[178px]"
      style={{
        top: "382px",
        zIndex: 2,
        background: "rgba(8,14,30,0.78)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "14px",
        backdropFilter: "blur(18px)",
        padding: "11px 13px",
        boxShadow: "0 12px 30px rgba(0,0,0,0.42), 0 0 22px rgba(124,58,237,0.06)",
        rotate: "1.8deg",
      }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="font-mono text-[8px] tracking-[0.35em] uppercase"
          style={{ color: "var(--text-faint)" }}
        >
          GIT LOG
        </span>
        <div className="flex items-center gap-1">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#10B981" }}
          />
          <span className="font-mono text-[8px]" style={{ color: "#10B981" }}>
            main
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {commits.map((c) => (
          <div key={c.hash} className="flex items-start gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
              style={{ background: c.color, boxShadow: `0 0 5px ${c.color}80` }}
            />
            <div>
              <div className="flex items-center gap-1">
                <span
                  className="font-mono text-[7px]"
                  style={{ color: "var(--text-faint)" }}
                >
                  {c.hash}
                </span>
                <span
                  className="font-mono text-[7px] ml-auto"
                  style={{ color: "var(--text-faint)" }}
                >
                  {c.time} ago
                </span>
              </div>
              <span
                className="font-mono text-[8.5px] block"
                style={{ color: "#CBD5E1" }}
              >
                {c.msg}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Glowing sphere ────────────────────────────────────────────────────────── */
function GlowSphere({
  size, top, right, left, color, delay,
}: {
  size: number; top?: string; right?: string; left?: string; color: string; delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size, top, right, left,
        background: `radial-gradient(circle at 32% 30%, ${color}ee 0%, ${color}aa 35%, ${color}44 65%, transparent 100%)`,
        boxShadow: `0 0 ${size * 0.6}px ${color}55, 0 0 ${size * 1.2}px ${color}22`,
        filter: "blur(0.5px)",
      }}
      animate={{ y: [0, -10, 0], scale: [1, 1.06, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yParallax  = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacityOut = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--void)" }}
    >
      <ParticleField />
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Background orbs */}
      <div
        className="absolute pointer-events-none orb"
        style={{
          width: 700, height: 700, left: "-8%", top: "5%",
          background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute pointer-events-none orb"
        style={{
          width: 500, height: 500, right: "5%", top: "-5%",
          background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)",
        }}
      />

      <motion.div
        style={{ y: yParallax, opacity: opacityOut }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] xl:grid-cols-[1fr_560px] gap-16 items-center">

          {/* ── LEFT ── */}
          <div>
            {/* Badge */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{
                  background: "rgba(245,158,11,0.1)",
                  border: "1px solid rgba(245,158,11,0.28)",
                  color: "#F59E0B",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "#F59E0B" }}
                />
                Full Stack · Python · AI Automation
              </div>
            </motion.div>

            {/* Headline */}
            <div className="mb-8">
              {[
                { text: "G'oyangiz oddiy sayt emas,", gradient: false },
                { text: "ishlaydigan raqamli",         gradient: true  },
                { text: "mahsulotga aylanishi kerak.",  gradient: false },
              ].map(({ text, gradient }, i) => (
                <motion.h1
                  key={i}
                  className={`font-display font-bold leading-[0.95] tracking-[-0.025em] ${
                    gradient ? "text-gradient-blue" : "text-white"
                  }`}
                  style={{ fontSize: "clamp(2.2rem, 4.5vw, 5rem)" }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.35 + i * 0.13, ease: [0.33, 1, 0.68, 1] }}
                >
                  {text}
                </motion.h1>
              ))}
            </div>

            {/* Supporting text */}
            <motion.p
              className="text-base leading-[1.85] font-body mb-10 max-w-[500px]"
              style={{ color: "var(--text-muted)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.82 }}
            >
              Bizneslar, ta&apos;lim loyihalari va shaxsiy brendlar uchun{" "}
              <span style={{ color: "var(--text-primary)" }}>
                web-saytlar, e-commerce tizimlar, Telegram botlar va AI
                avtomatlashtirish
              </span>{" "}
              yechimlarini ishlab chiqaman.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap gap-3 mb-12"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <button
                onClick={() => scrollTo("#aloqa")}
                className="group flex items-center justify-center gap-3 px-7 py-4 font-display font-bold text-sm tracking-[0.1em] uppercase transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
                  color: "white",
                  boxShadow: "0 0 24px rgba(37,99,235,0.4), 0 0 60px rgba(37,99,235,0.1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 36px rgba(37,99,235,0.6), 0 0 80px rgba(37,99,235,0.18)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 24px rgba(37,99,235,0.4), 0 0 60px rgba(37,99,235,0.1)";
                }}
              >
                Loyiha boshlash
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={() => scrollTo("#haqimda")}
                className="group flex items-center justify-center gap-3 px-7 py-4 font-display font-bold text-sm tracking-[0.1em] uppercase transition-all duration-300 btn-ghost-gradient"
              >
                Men haqimda
                <Users size={14} />
              </button>

              <button
                onClick={() => scrollTo("#loyihalar")}
                className="group flex items-center justify-center gap-3 px-7 py-4 font-display font-bold text-sm tracking-[0.1em] uppercase transition-all duration-300"
                style={{
                  background: "transparent",
                  color: "var(--text-muted)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.22)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                }}
              >
                Portfolio ko&apos;rish
              </button>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              className="flex flex-wrap gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25 }}
            >
              {[
                { value: "30+",  label: "Tamomlangan loyihalar", color: "#2563EB" },
                { value: "3+",   label: "Yillik tajriba",         color: "var(--cyan)" },
                { value: "100%", label: "Mas'uliyat va sifat",     color: "#10B981" },
              ].map((m, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span
                    className="font-display font-black text-2xl leading-none"
                    style={{ color: m.color }}
                  >
                    {m.value}
                  </span>
                  <span
                    className="font-mono text-[9px] tracking-[0.22em] uppercase"
                    style={{ color: "var(--text-faint)" }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — Profile image + floating elements ── */}
          <motion.div
            className="hidden lg:block relative"
            style={{ height: 630 }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.7, ease: [0.33, 1, 0.68, 1] }}
          >
            {/* Ambient radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 38%, rgba(37,99,235,0.07) 0%, transparent 65%)",
                filter: "blur(24px)",
              }}
            />

            {/* Decorative spheres */}
            <GlowSphere size={52} top="-12px" right="60px" color="#3B82F6" delay={0} />
            <GlowSphere size={30} top="320px" right="10px" color="#8B5CF6" delay={1.8} />

            {/* ── Floating tech cards ── */}
            {TECH_CARDS.map((t) => (
              <TechCard key={t.title} {...t} />
            ))}

          </motion.div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("#haqimda")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span
          className="font-mono text-[9px] tracking-[0.45em] uppercase"
          style={{ color: "var(--text-faint)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={13} style={{ color: "#2563EB" }} />
        </motion.div>
      </motion.button>
    </section>
  );
}
