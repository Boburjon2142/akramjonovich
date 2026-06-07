"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const VALUES = [
  {
    icon: "🔍",
    title: "Aniq tahlil",
    desc: "Avval muammoni chuqur tushunaman — keyin yechim yozaman.",
    accent: "#00F5FF",
  },
  {
    icon: "🏗️",
    title: "Toza arxitektura",
    desc: "Keyinchalik kengayadigan, o'qish oson va qo'llab-quvvatlash arzon kod yozaman.",
    accent: "#3B82F6",
  },
  {
    icon: "🎯",
    title: "Natijaga yo'naltirilganlik",
    desc: "Chiroyli dizayn — albatta. Lekin asosiysi — loyiha biznesga real foyda keltirishi.",
    accent: "#8B5CF6",
  },
];

const rv = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay, ease: [0.33, 1, 0.68, 1] },
  },
});

function ProfileImage() {
  const [err, setErr] = useState(false);

  return (
    <div className="relative mx-auto" style={{ width: "fit-content" }}>
      {/* Outer ambient glow */}
      <div
        className="absolute -inset-6 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,245,255,0.12) 0%, rgba(124,58,237,0.08) 55%, transparent 80%)",
          filter: "blur(24px)",
        }}
      />

      {/* Image frame */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "clamp(260px, 34vw, 500px)",
          aspectRatio: "3/4",
          borderRadius: "24px",
          border: "1px solid rgba(0,245,255,0.18)",
          boxShadow:
            "0 0 0 1px rgba(124,58,237,0.12), 0 24px 64px rgba(0,0,0,0.5), 0 0 80px rgba(0,245,255,0.06)",
        }}
      >
        {/* Actual image */}
        {!err && (
          <Image
            src="/images/about-profile.jpg"
            alt="Boburjon Abdug'aniyev — Full Stack Developer"
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1280px) 38vw, 500px"
            className="object-cover"
            style={{ objectPosition: "50% 52%" }}
            onError={() => setErr(true)}
            priority={false}
          />
        )}

        {/* Placeholder shown when image missing */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-5"
          style={{
            background:
              "linear-gradient(160deg, #0D0D18 0%, rgba(37,99,235,0.2) 45%, rgba(124,58,237,0.15) 100%)",
            opacity: err ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,245,255,0.12), rgba(124,58,237,0.12))",
              border: "2px solid rgba(0,245,255,0.25)",
            }}
          >
            <span
              className="font-display font-black"
              style={{ fontSize: "2.5rem", color: "var(--cyan)" }}
            >
              B
            </span>
          </div>
          {/* Upload hint */}
          <div className="text-center px-6">
            <p
              className="font-mono text-[9px] tracking-[0.25em] uppercase mb-1"
              style={{ color: "var(--cyan)", opacity: 0.7 }}
            >
              Rasm joylash
            </p>
            <p
              className="font-mono text-[8px] leading-[1.7]"
              style={{ color: "var(--text-faint)" }}
            >
              public/images/
              <br />
              about-profile.jpg
            </p>
          </div>
        </div>

        {/* Bottom gradient overlay */}
        <div
          className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(5,5,8,0.65), transparent)",
          }}
        />

        {/* Corner badge */}
        <div
          className="absolute top-4 left-4 font-mono text-[8px] tracking-[0.28em] uppercase px-2.5 py-1"
          style={{
            background: "rgba(0,245,255,0.07)",
            border: "1px solid rgba(0,245,255,0.22)",
            color: "var(--cyan)",
            backdropFilter: "blur(8px)",
            borderRadius: "4px",
          }}
        >
          BOBURDEV
        </div>
      </div>

      {/* Floating years badge */}
      <motion.div
        className="absolute -top-5 -right-5 flex flex-col items-center justify-center px-4 py-3"
        style={{
          background: "rgba(37,99,235,0.12)",
          border: "1px solid rgba(37,99,235,0.3)",
          backdropFilter: "blur(16px)",
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      >
        <span
          className="font-display font-black text-2xl leading-none"
          style={{ color: "#3B82F6" }}
        >
          3+
        </span>
        <span
          className="font-mono text-[8px] tracking-[0.22em] mt-0.5"
          style={{ color: "var(--text-faint)" }}
        >
          YIL
        </span>
      </motion.div>
    </div>
  );
}

export default function AboutMe() {
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="haqimda"
      className="relative py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--void) 0%, var(--surface) 55%, var(--void) 100%)",
      }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Orbs */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] orb pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-0 w-[400px] h-[400px] orb pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 65%)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(380px,5fr)_minmax(0,7fr)] gap-16 xl:gap-20 2xl:gap-24 items-center">

          {/* ── LEFT — Image ── */}
          <motion.div
            variants={rv(0.1)}
            initial="hidden"
            animate={inV ? "visible" : "hidden"}
            className="flex justify-center lg:justify-start 2xl:pl-4"
          >
            <ProfileImage />
          </motion.div>

          {/* ── RIGHT — Content ── */}
          <div className="flex flex-col gap-7">

            {/* Section label */}
            <motion.div
              variants={rv(0)}
              initial="hidden"
              animate={inV ? "visible" : "hidden"}
            >
              <span className="badge-cyan">
                <span
                  className="w-1 h-1 rounded-full inline-block"
                  style={{ background: "var(--cyan)" }}
                />
                02 — Men haqimda
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              variants={rv(0.08)}
              initial="hidden"
              animate={inV ? "visible" : "hidden"}
            >
              <h2
                className="font-display font-bold tracking-[-0.025em] leading-[1.05]"
                style={{
                  fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
                  color: "var(--text-primary)",
                }}
              >
                Men haqimda
              </h2>
              <p
                className="font-body text-base leading-[1.75] mt-3"
                style={{ color: "var(--text-muted)" }}
              >
                Kod, dizayn va biznes mantiqni birlashtirib, foydalanuvchiga
                qulay raqamli tizimlar yarataman.
              </p>
            </motion.div>

            {/* Bio card */}
            <motion.div
              variants={rv(0.16)}
              initial="hidden"
              animate={inV ? "visible" : "hidden"}
            >
              <div
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(13,13,20,0.65)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  lineHeight: "1.85",
                }}
              >
                <p
                  className="font-body text-[0.9rem]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Men{" "}
                  <span
                    style={{ color: "var(--text-primary)", fontWeight: 600 }}
                  >
                    Boburjon Abdug&apos;aniyev
                  </span>{" "}
                  — Python va web texnologiyalar asosida real muammolarga
                  amaliy yechimlar yaratadigan dasturchiman.
                </p>
                <p
                  className="font-body text-[0.9rem] mt-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  Asosiy yo&apos;nalishlarim:{" "}
                  <span style={{ color: "var(--cyan)" }}>Django web ilovalar</span>
                  ,{" "}
                  <span style={{ color: "#A78BFA" }}>e-commerce platformalar</span>
                  ,{" "}
                  <span style={{ color: "#10B981" }}>Telegram botlar</span>
                  , admin panellar va AI yordamida biznes jarayonlarini
                  optimallashtirish.
                </p>
                <p
                  className="font-body text-[0.9rem] mt-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  Mening yondashuvim:{" "}
                  <em style={{ color: "var(--text-primary)", fontStyle: "normal" }}>
                    loyiha chiroyli ko&apos;rinishi kerak — lekin undan ham
                    muhimrog&apos;i, u ishlashi, tez yuklanishi va biznesga
                    real foyda keltirishi kerak.
                  </em>
                </p>
              </div>
            </motion.div>

            {/* Value cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  variants={rv(0.24 + i * 0.08)}
                  initial="hidden"
                  animate={inV ? "visible" : "hidden"}
                  className="flex flex-col gap-2.5 p-4 rounded-xl transition-all duration-300 cursor-default"
                  style={{
                    background: "rgba(13,13,20,0.65)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${v.accent}28`;
                    el.style.background = `${v.accent}06`;
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.06)";
                    el.style.background = "rgba(13,13,20,0.65)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <span className="text-xl">{v.icon}</span>
                  <span
                    className="font-display font-semibold text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {v.title}
                  </span>
                  <span
                    className="font-body text-xs leading-[1.7]"
                    style={{ color: "var(--text-faint)" }}
                  >
                    {v.desc}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
