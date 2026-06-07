"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import SectionHeader from "./SectionHeader";

export default function BlogPreview() {
  return (
    <section
      id="blog"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #030712 0%, #071827 50%, #030712 100%)" }}
    >
      {/* Orb */}
      <div
        className="absolute right-0 bottom-1/4 w-[400px] h-[400px] orb pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 65%)" }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <SectionHeader
            badge="06 — Blog"
            title="Texnik"
            titleGradient="maqolalar."
            subtitle="Amaliy tajriba, arxitektura qarorlari va muhandislik fikrlari."
          />
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BLOG_POSTS.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
              className="glass-navy flex flex-col p-7 group cursor-pointer transition-all duration-300"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${post.accent}30`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${post.accent}06`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              {/* Top accent line */}
              <div
                className="w-full h-px mb-6 origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"
                style={{ background: `linear-gradient(90deg, ${post.accent}, transparent)` }}
              />

              {/* Badge */}
              <span
                className="font-mono text-[9px] tracking-[0.3em] uppercase px-2.5 py-1 self-start mb-5"
                style={{
                  color: post.accent,
                  border: `1px solid ${post.accent}30`,
                  background: `${post.accent}0a`,
                }}
              >
                {post.badge}
              </span>

              {/* Title */}
              <h3
                className="font-display font-bold text-white text-base leading-snug tracking-tight mb-4 flex-1"
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="font-body text-sm leading-[1.75] mb-6" style={{ color: "#64748B" }}>
                {post.excerpt}
              </p>

              {/* Meta + CTA */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[9px]" style={{ color: "#334155" }}>
                    {formatDate(post.date)}
                  </span>
                  <span className="font-mono text-[9px]" style={{ color: "#1e3a5f" }}>
                    {post.readTime}
                  </span>
                </div>

                <motion.div
                  className="w-8 h-8 flex items-center justify-center transition-all duration-300"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  whileHover={{ background: "#ffffff" }}
                >
                  <ArrowUpRight
                    size={13}
                    className="transition-colors duration-200 group-hover:text-[#030712]"
                    style={{ color: "#475569" }}
                  />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* More articles CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "#1e3a5f" }}>
            Ko&apos;proq maqolalar · Yaqinda
          </span>
        </motion.div>
      </div>
    </section>
  );
}
