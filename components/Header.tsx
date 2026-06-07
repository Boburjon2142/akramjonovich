"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { scrollTo } from "@/lib/utils";
import BrandLogo from "./BrandLogo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => { scrollTo(href); setOpen(false); };

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-[500] flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 transition-all duration-500"
        style={{
          height: scrolled ? "62px" : "78px",
          background: scrolled ? "rgba(5,5,8,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
          aria-label="Bosh sahifaga qaytish"
        >
          <div className="transition-transform duration-300 group-hover:scale-[1.03]">
            <BrandLogo
              priority
              className="w-[160px] sm:w-[205px] md:w-[225px]"
            />
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => go(link.href)}
              className="relative font-mono text-[10px] tracking-[0.22em] uppercase group transition-colors duration-200"
              style={{ color: "var(--text-faint)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-faint)")}
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                style={{ background: "linear-gradient(90deg, #2563EB, #7C3AED)" }}
              />
            </button>
          ))}
        </nav>

        {/* CTA + burger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => go("#aloqa")}
            className="hidden sm:flex items-center gap-2 px-5 py-2 font-display font-bold text-xs tracking-[0.15em] uppercase transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
              color: "white",
              boxShadow: "0 0 18px rgba(37,99,235,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(37,99,235,0.55)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 18px rgba(37,99,235,0.3)";
            }}
          >
            Boshlash
            <ArrowRight size={12} />
          </button>

          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 transition-all duration-300"
            style={{ border: "1px solid rgba(255,255,255,0.07)", color: "var(--text-muted)" }}
            onClick={() => setOpen(true)}
          >
            <Menu size={16} />
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9990] flex flex-col px-6 pt-8 pb-12"
            style={{ background: "rgba(5,5,8,0.97)", backdropFilter: "blur(32px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-16">
              <BrandLogo className="w-[220px]" />
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 flex items-center justify-center"
                style={{ border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-muted)" }}
              >
                <X size={16} />
              </button>
            </div>

            <nav className="flex flex-col gap-5 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.33, 1, 0.68, 1] }}
                  onClick={() => go(link.href)}
                  className="font-display font-bold text-left tracking-tight transition-colors duration-200"
                  style={{ fontSize: "clamp(1.7rem, 5vw, 2.4rem)", color: "var(--text-faint)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-faint)")}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2"
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
                style={{ background: "#2563EB", boxShadow: "0 0 6px rgba(37,99,235,0.8)" }}
              />
              <span className="font-mono text-[10px] tracking-[0.3em]" style={{ color: "var(--text-faint)" }}>
                Qarshi — Mavjud
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
