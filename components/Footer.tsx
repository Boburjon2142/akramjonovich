"use client";

import { motion } from "framer-motion";
import { Github, Send, Linkedin, Instagram, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import BrandLogo from "./BrandLogo";

const MENU = [
  { label: "Bosh sahifa", href: "#hero"      },
  { label: "Men haqimda", href: "#haqimda"   },
  { label: "Xizmatlar",   href: "#nimalar"   },
  { label: "Loyihalar",   href: "#loyihalar" },
  { label: "Aloqa",       href: "#aloqa"     },
];

const SERVICES_LIST = [
  "Web sayt",
  "E-commerce",
  "Telegram bot",
  "AI avtomatlashtirish",
  "Admin panel",
];

const TECH_LIST = [
  "Python",
  "Django",
  "Next.js",
  "Tailwind CSS",
  "PostgreSQL",
];

const SOCIALS = [
  { Icon: Send,      href: "https://t.me/Lazzyproger",              label: "Telegram" },
  { Icon: Linkedin,  href: "https://linkedin.com/in/akramjonovich", label: "LinkedIn" },
  { Icon: Github,    href: "https://github.com/akramjonovich",      label: "GitHub"   },
  { Icon: Instagram, href: "https://instagram.com/akramjonovich",   label: "Instagram"},
];

export default function Footer() {
  const go = (href: string) => {
    if (href === "#hero") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "var(--void)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top, rgba(37,99,235,0.06) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-20 pt-16 pb-8">
        <div className="max-w-[1400px] mx-auto">

          {/* Top grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

            {/* Brand col — spans 2 on large */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <button
                onClick={() => go("#hero")}
                className="w-fit rounded-lg transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
                aria-label="Bosh sahifaga qaytish"
              >
                <BrandLogo className="w-[245px]" />
              </button>

              <p
                className="font-body text-sm leading-relaxed max-w-[220px]"
                style={{ color: "var(--text-muted)" }}
              >
                Kod orqali g&apos;oyalarni haqiqiyga aylantiramiz.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 flex items-center justify-center transition-all duration-300"
                    style={{
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "var(--text-muted)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.4)";
                      (e.currentTarget as HTMLElement).style.color = "#3B82F6";
                      (e.currentTarget as HTMLElement).style.background = "rgba(37,99,235,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Menyu */}
            <div className="flex flex-col gap-3">
              <span
                className="font-mono text-[8px] tracking-[0.45em] uppercase mb-1"
                style={{ color: "#8B96BD" }}
              >
                Menyu
              </span>
              {MENU.map((link) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className="font-body text-sm text-left w-fit transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Xizmatlar */}
            <div className="flex flex-col gap-3">
              <span
                className="font-mono text-[8px] tracking-[0.45em] uppercase mb-1"
                style={{ color: "#8B96BD" }}
              >
                Xizmatlar
              </span>
              {SERVICES_LIST.map((s) => (
                <span key={s} className="font-body text-sm" style={{ color: "var(--text-muted)" }}>
                  {s}
                </span>
              ))}
            </div>

            {/* Texnologiyalar */}
            <div className="flex flex-col gap-3">
              <span
                className="font-mono text-[8px] tracking-[0.45em] uppercase mb-1"
                style={{ color: "#8B96BD" }}
              >
                Texnologiyalar
              </span>
              {TECH_LIST.map((t) => (
                <span key={t} className="font-body text-sm" style={{ color: "var(--text-muted)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Contact row */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-8 mb-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="flex flex-wrap gap-6">
              <a
                href="mailto:boburjonabduganiyev83@gmail.com"
                className="flex items-center gap-2 font-body text-sm transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
              >
                <Mail size={13} />
                boburjonabduganiyev83@gmail.com
              </a>
              <a
                href="tel:+998901234567"
                className="flex items-center gap-2 font-body text-sm transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
              >
                <Phone size={13} />
                +998 90 123 45 67
              </a>
              <div className="flex items-center gap-2 font-body text-sm" style={{ color: "var(--text-muted)" }}>
                <MapPin size={13} />
                Qarshi, O&apos;zbekiston
              </div>
            </div>

            <motion.button
              onClick={() => go("#aloqa")}
              className="flex items-center gap-2.5 px-5 py-2.5 font-display font-bold text-xs tracking-[0.15em] uppercase transition-all duration-300 shrink-0"
              style={{
                background: "linear-gradient(135deg, #2563EB, #3B82F6)",
                color: "white",
                boxShadow: "0 0 16px rgba(37,99,235,0.25)",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Loyiha boshlash
              <ArrowRight size={12} />
            </motion.button>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "#8B96BD" }}>
              © 2026 BOBURDEV. Barcha huquqlar himoyalangan.
            </span>
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#10B981", boxShadow: "0 0 6px rgba(16,185,129,0.7)" }}
              />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "#8B96BD" }}>
                Mavjud — Qarshi
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
