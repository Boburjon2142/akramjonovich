"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const PHOTOS = [
  {
    src: "/images/gallery/work-1.jpg",
    caption: "Kod yozish jarayoni",
    span: "row-span-2", // tall card
    gradient: "linear-gradient(160deg, #0a1628 0%, #1a2a4a 50%, #0d1f3c 100%)",
    accent: "#3B82F6",
    icon: "💻",
  },
  {
    src: "/images/gallery/work-2.jpg",
    caption: "Loyiha arxitekturasi",
    span: "",
    gradient: "linear-gradient(160deg, #0d0d20 0%, #1a1038 50%, #120d28 100%)",
    accent: "#8B5CF6",
    icon: "🏗️",
  },
  {
    src: "/images/gallery/work-3.jpg",
    caption: "UI dizayn tahlili",
    span: "",
    gradient: "linear-gradient(160deg, #071a18 0%, #0d2e28 50%, #071a18 100%)",
    accent: "#10B981",
    icon: "🎨",
  },
  {
    src: "/images/gallery/work-4.jpg",
    caption: "Deploy va test",
    span: "row-span-2",
    gradient: "linear-gradient(160deg, #1a1005 0%, #2d1c08 50%, #1a1005 100%)",
    accent: "#F59E0B",
    icon: "🚀",
  },
] as const;

function PhotoCard({
  photo,
  index,
  inView,
}: {
  photo: (typeof PHOTOS)[number];
  index: number;
  inView: boolean;
}) {
  const [err, setErr] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.65,
        delay: 0.1 + index * 0.1,
        ease: [0.33, 1, 0.68, 1],
      }}
      className={`relative overflow-hidden rounded-xl group cursor-default ${photo.span}`}
      style={{
        minHeight: photo.span ? "360px" : "180px",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Actual photo */}
      {!err && (
        <Image
          src={photo.src}
          alt={photo.caption}
          fill
          sizes="(max-width: 768px) 90vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setErr(true)}
        />
      )}

      {/* Placeholder (shown when image missing) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-4"
        style={{
          background: photo.gradient,
          opacity: err ? 1 : 0,
          transition: "opacity 0.3s",
          zIndex: err ? 1 : 0,
        }}
      >
        {/* Grid decoration */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <span className="text-4xl relative z-10">{photo.icon}</span>
        <div className="text-center relative z-10 px-4">
          <p
            className="font-mono text-[8px] tracking-[0.3em] uppercase mb-1.5"
            style={{ color: `${photo.accent}bb` }}
          >
            Rasm joylash
          </p>
          <p
            className="font-mono text-[7px] leading-[1.7]"
            style={{ color: "var(--text-faint)" }}
          >
            public/images/gallery/
            <br />
            {photo.src.split("/").pop()}
          </p>
        </div>
      </div>

      {/* Always-present dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(5,5,8,0.75) 0%, rgba(5,5,8,0.1) 50%, transparent 100%)",
        }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background: `${photo.accent}14`,
          borderTop: `2px solid ${photo.accent}55`,
        }}
      />

      {/* Caption */}
      <div className="absolute bottom-0 inset-x-0 p-4">
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{
              background: photo.accent,
              boxShadow: `0 0 6px ${photo.accent}`,
            }}
          />
          <span
            className="font-mono text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            {photo.caption}
          </span>
        </div>
      </div>

      {/* Corner accent */}
      <div
        className="absolute top-3 right-3 font-mono text-[7px] tracking-[0.25em] uppercase px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "rgba(5,5,8,0.75)",
          border: `1px solid ${photo.accent}40`,
          color: photo.accent,
          borderRadius: "3px",
          backdropFilter: "blur(8px)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="gallery"
      className="relative py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "var(--void)" }}
    >
      <div className="absolute inset-0 bg-grid-sm pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="max-w-xl mb-14">
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
              06 — Jarayon
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
            Ish jarayonidan lavhalar
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="font-body text-base mt-3 leading-[1.75]"
            style={{ color: "var(--text-muted)" }}
          >
            Ish maydoni, loyiha jarayoni va texnik yechimlardan lavhalar.{" "}
            <span
              className="font-mono text-[11px]"
              style={{ color: "var(--text-faint)" }}
            >
              {/* Replace placeholder images in public/images/gallery/ */}
              Rasmlarni public/images/gallery/ papkasiga joylashtiring.
            </span>
          </motion.p>
        </div>

        {/* Masonry-style 2-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ gridAutoRows: "180px" }}>
          {PHOTOS.map((photo, i) => (
            <PhotoCard key={photo.src} photo={photo} index={i} inView={inV} />
          ))}
        </div>

      </div>
    </section>
  );
}
