"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send, ArrowUpRight, User, MessageSquare, CheckCircle, AtSign } from "lucide-react";

const reveal = (delay = 0) => ({
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.33, 1, 0.68, 1] } },
});

const BUDGETS = ["< $500", "$500–$2k", "$2k–$5k", "$5k+"];
const PROJECT_TYPES = ["Web sayt", "E-commerce", "Telegram bot", "AI avtomatlashtirish", "Admin panel", "Boshqa"];

function ContactForm() {
  const [form, setForm] = useState({ name: "", contact: "", projectType: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.message) return;
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Xabar yuborilmadi. Keyinroq urinib ko'ring.");
      }

      setForm({ name: "", contact: "", projectType: "", budget: "", message: "" });
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xabar yuborilmadi. Keyinroq urinib ko'ring.");
    } finally {
      setSending(false);
    }
  };

  const inputBase = {
    background: "rgba(0,245,255,0.02)",
    border: "1px solid rgba(0,245,255,0.1)",
    color: "var(--text-primary)",
    outline: "none",
    width: "100%",
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    transition: "border-color 0.25s, box-shadow 0.25s",
  } as React.CSSProperties;

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(0,245,255,0.35)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,245,255,0.04)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(0,245,255,0.1)";
    e.currentTarget.style.boxShadow = "none";
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-5 text-center h-full min-h-[380px]"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        >
          <CheckCircle size={48} style={{ color: "var(--cyan)" }} />
        </motion.div>
        <div>
          <p className="font-display font-bold text-xl mb-2" style={{ color: "var(--text-primary)" }}>
            Xabar yuborildi!
          </p>
          <p className="font-body text-sm" style={{ color: "var(--text-muted)" }}>
            24 soat ichida bog'lanaman.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: "var(--text-faint)" }}>
            Ismingiz
          </label>
          <div className="relative">
            <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-faint)" }} />
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Ali Karimov"
              className="pl-9 pr-3 py-3"
              style={inputBase}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: "var(--text-faint)" }}>
            Telegram yoki Email
          </label>
          <div className="relative">
            <AtSign size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-faint)" }} />
            <input
              type="text"
              required
              value={form.contact}
              onChange={(e) => set("contact", e.target.value)}
              placeholder="@username yoki email@example.com"
              className="pl-9 pr-3 py-3"
              style={inputBase}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
        </div>
      </div>

      {/* Project type pills */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: "var(--text-faint)" }}>
          Loyiha turi
        </label>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => set("projectType", form.projectType === t ? "" : t)}
              className="font-mono text-[10px] tracking-[0.08em] px-3 py-1.5 transition-all duration-200"
              style={{
                border: `1px solid ${form.projectType === t ? "rgba(0,245,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                background: form.projectType === t ? "rgba(0,245,255,0.08)" : "rgba(255,255,255,0.02)",
                color: form.projectType === t ? "var(--cyan)" : "var(--text-faint)",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Budget pills */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: "var(--text-faint)" }}>
          Budjet <span style={{ opacity: 0.5 }}>(ixtiyoriy)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => set("budget", form.budget === b ? "" : b)}
              className="font-mono text-[10px] tracking-[0.1em] px-3 py-1.5 transition-all duration-200"
              style={{
                border: `1px solid ${form.budget === b ? "rgba(0,245,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                background: form.budget === b ? "rgba(0,245,255,0.08)" : "rgba(255,255,255,0.02)",
                color: form.budget === b ? "var(--cyan)" : "var(--text-faint)",
              }}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: "var(--text-faint)" }}>
          Loyiha haqida
        </label>
        <div className="relative">
          <MessageSquare size={13} className="absolute left-3 top-3.5 pointer-events-none" style={{ color: "var(--text-faint)" }} />
          <textarea
            required
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Qisqacha tushuntiring — nima qilmoqchisiz, muddati, texnologiyalar..."
            rows={4}
            className="pl-9 pr-3 py-3 resize-none"
            style={{ ...inputBase, lineHeight: "1.7" }}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={sending}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-3 py-4 font-display font-semibold text-sm tracking-[0.1em] uppercase transition-all duration-300 mt-1"
        style={{
          background: "var(--cyan)",
          color: "var(--void)",
          boxShadow: sending ? "none" : "0 0 24px rgba(0,245,255,0.3)",
          opacity: sending ? 0.7 : 1,
        }}
      >
        {sending ? "Yuborilmoqda..." : "Yuborish va javob olish"}
        <ArrowUpRight size={14} />
      </motion.button>

      {error && (
        <p className="font-mono text-[9px] tracking-[0.12em] text-center" style={{ color: "#F87171" }}>
          {error}
        </p>
      )}

      <p className="font-mono text-[9px] tracking-[0.15em] text-center" style={{ color: "var(--text-faint)" }}>
        Spam yo'q · Javob 24h ichida · NDA imzolanadi
      </p>
    </form>
  );
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="aloqa"
      className="relative py-10 md:py-12 lg:py-14 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--void) 0%, var(--surface) 50%, var(--void) 100%)" }}
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Orbs */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] orb pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 60%)" }}
      />
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] orb pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)" }}
      />

      {/* Rotating rings */}
      <motion.div
        className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[360px] h-[360px] rounded-full hidden xl:block pointer-events-none"
        style={{ border: "1px solid rgba(0,245,255,0.04)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--cyan)", boxShadow: "0 0 8px rgba(0,245,255,0.8)" }}
        />
      </motion.div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT — copy ── */}
          <div>
            {/* Badge */}
            <motion.div variants={reveal(0)} initial="hidden" animate={inV ? "visible" : "hidden"} className="mb-8">
              <span className="badge-gold">
                <span className="w-1 h-1 rounded-full inline-block" style={{ background: "var(--cyan)" }} />
                05 — Aloqa
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={reveal(0.08)}
              initial="hidden"
              animate={inV ? "visible" : "hidden"}
              className="font-display font-bold leading-[0.93] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 5.5rem)", color: "var(--text-primary)" }}
            >
              Loyihangizni
            </motion.h2>
            <motion.h2
              variants={reveal(0.16)}
              initial="hidden"
              animate={inV ? "visible" : "hidden"}
              className="font-display font-bold leading-[0.93] tracking-[-0.02em] text-gradient-cyan mb-8"
              style={{ fontSize: "clamp(2.4rem, 5vw, 5.5rem)" }}
            >
              boshlaylik.
            </motion.h2>

            <motion.p
              variants={reveal(0.28)}
              initial="hidden"
              animate={inV ? "visible" : "hidden"}
              className="font-body text-base leading-[1.8] mb-10 max-w-lg"
              style={{ color: "var(--text-muted)" }}
            >
              G&apos;oyangiz bor, lekin qayerdan boshlashni bilmayapsizmi? Birinchi qadamdan
              so&apos;nggi deliverygacha yoningizda.
            </motion.p>

            {/* CTA links */}
            <motion.div
              variants={reveal(0.38)}
              initial="hidden"
              animate={inV ? "visible" : "hidden"}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <a
                href="https://t.me/Lazzyproger"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-6 py-3.5 font-display font-bold text-sm tracking-[0.1em] uppercase transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
                  color: "white",
                  boxShadow: "0 0 24px rgba(37,99,235,0.35)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(37,99,235,0.55)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(37,99,235,0.35)"; }}
              >
                <Send size={15} />
                Telegram yozing
              </a>

              <a
                href="mailto:boburjonabduganiyev83@gmail.com"
                className="btn-ghost-gradient group inline-flex items-center justify-center gap-3 px-6 py-3.5 font-display font-bold text-sm tracking-[0.1em] uppercase transition-all duration-300"
              >
                <Mail size={15} />
                Email yuborish
              </a>
            </motion.div>

            {/* Status */}
            <motion.div
              variants={reveal(0.48)}
              initial="hidden"
              animate={inV ? "visible" : "hidden"}
              className="flex flex-wrap items-center gap-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-pulse-glow"
                  style={{ background: "var(--cyan)", boxShadow: "0 0 8px rgba(0,245,255,0.8)" }}
                />
                <span className="font-mono text-[10px] tracking-[0.25em]" style={{ color: "var(--text-faint)" }}>
                  Mavjud · Javob 24h ichida
                </span>
              </div>
              <span className="font-mono text-[10px]" style={{ color: "var(--text-faint)" }}>·</span>
              <span className="font-mono text-[10px] tracking-[0.1em]" style={{ color: "var(--text-faint)" }}>
                boburjonabduganiyev83@gmail.com
              </span>
            </motion.div>
          </div>

          {/* ── RIGHT — form ── */}
          <motion.div
            variants={reveal(0.22)}
            initial="hidden"
            animate={inV ? "visible" : "hidden"}
            className="relative w-full max-w-[540px] lg:max-w-none mx-auto"
          >
            {/* Card glow */}
            <div
              className="absolute -inset-px rounded-none pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.06), rgba(124,58,237,0.06))" }}
            />
            <div
              className="relative p-6 sm:p-8"
              style={{
                background: "rgba(13,13,20,0.7)",
                border: "1px solid rgba(0,245,255,0.1)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Form header */}
              <div className="flex items-center gap-3 mb-6 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div
                  className="w-1 h-8"
                  style={{ background: "linear-gradient(180deg, var(--cyan), var(--purple))" }}
                />
                <div>
                  <p className="font-display font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                    Loyiha haqida yozing
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.15em]" style={{ color: "var(--text-faint)" }}>
                    24h ichida javob
                  </p>
                </div>
              </div>

              <ContactForm />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
