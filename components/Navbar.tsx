"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Xizmatlar", href: "#xizmatlar" },
  { label: "Ishlar",    href: "#ishlar"    },
  { label: "Jarayon",   href: "#jarayon"   },
  { label: "Haqida",    href: "#haqida"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-500"
        style={scrolled ? {
          background: "rgba(3,7,18,0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        } : {}}
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
      >
        {/* Logo */}
        <button onClick={() => go("#hero")} className="flex items-center gap-3 group">
          <div
            className="w-8 h-8 flex items-center justify-center"
            style={{
              border: "1px solid rgba(37,99,235,0.5)",
              background: "rgba(37,99,235,0.08)",
            }}
          >
            <span
              className="font-mono font-bold tracking-widest"
              style={{ fontSize: "10px", color: "#38BDF8" }}
            >
              AJ
            </span>
          </div>
          <span className="font-display font-bold tracking-[0.14em] uppercase text-white text-sm hidden sm:block">
            Akramjonovich
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => go(link.href)}
              className="relative font-display text-[13px] tracking-[0.1em] uppercase group"
              style={{ color: "#94A3B8" }}
            >
              <span className="transition-colors duration-300 group-hover:text-white">
                {link.label}
              </span>
              <span
                className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ background: "linear-gradient(90deg, #2563EB, #38BDF8)" }}
              />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="mailto:boburjonabduganiyev83@gmail.com"
            className="hidden md:flex items-center px-5 py-2.5 font-display font-bold text-xs tracking-[0.15em] uppercase text-white transition-all duration-300 glow-blue-hover"
            style={{
              background: "#2563EB",
              boxShadow: "0 0 16px rgba(37,99,235,0.35)",
            }}
          >
            Murojaat
          </a>

          {/* Burger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                className="block w-6 h-px bg-white"
                animate={{
                  rotate: open ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                  y:      open ? (i === 0 ?  5 : i === 2 ? -5 : 0) : 0,
                  opacity: open && i === 1 ? 0 : 1,
                }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7"
            style={{ background: "rgba(3,7,18,0.97)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => go(link.href)}
                className="font-display font-black uppercase text-white"
                style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", letterSpacing: "0.06em" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              href="mailto:boburjonabduganiyev83@gmail.com"
              className="mt-3 px-8 py-4 font-display font-bold text-sm tracking-[0.2em] uppercase text-white"
              style={{ background: "#2563EB", boxShadow: "0 0 24px rgba(37,99,235,0.45)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}
            >
              Murojaat qilish
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
