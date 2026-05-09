"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState(null); // index of open image
  
  const photos = [
    { src: "/images/lana1.webp", alt: "Lana 1" },
    { src: "/images/lana2.webp", alt: "Lana 2" },
    { src: "/images/lana3.webp", alt: "Lana 3" },
    { src: "/images/luna.jpg", alt: "Luna 1" },
    { src: "/images/luna2.jpg", alt: "Luna 2" },
    { src: "/images/luna3.jpg", alt: "Luna 3" },
    { src: "/images/luna4.jpg", alt: "Luna 4" },
    { src: "/images/luna5.jpg", alt: "Luna 5" },
    { src: "/images/luna6.jpg", alt: "Luna 6" },
    { src: "/images/luna7.jpg", alt: "Luna 7" },
    { src: "/images/luna8.jpg", alt: "Luna 8" },
    { src: "/images/luna9.jpg", alt: "Luna 9" },
    { src: "/images/luna10.jpg", alt: "Luna 10" },
    { src: "/images/luna11.jpg", alt: "Luna 11" },
    { src: "/images/luna12.jpg", alt: "Luna 12" },
    { src: "/images/luna13.jpg", alt: "Luna 13" },
    { src: "/images/luna14.jpg", alt: "Luna 14" },
    { src: "/images/luna15.jpg", alt: "Luna 15" },
    { src: "/images/luna16.jpg", alt: "Luna 16" },
    { src: "/images/luna17.jpg", alt: "Luna 17" },
    { src: "/images/luna18.jpg", alt: "Luna 18" },
    { src: "/images/luna19.jpg", alt: "Luna 19" },
    { src: "/images/luna20.jpg", alt: "Luna 20" },
    { src: "/images/luna21.jpg", alt: "Luna 21" },
    { src: "/images/luna22.jpg", alt: "Luna 22" },
    { src: "/images/luna23.jpg", alt: "Luna 23" },
    { src: "/images/luna24.jpg", alt: "Luna 24" },
    { src: "/images/luna25.jpg", alt: "Luna 25" },
    { src: "/images/luna26.jpg", alt: "Luna 26" },
    { src: "/images/luna27.jpg", alt: "Luna 27" },
    { src: "/images/luna28.jpg", alt: "Luna 28" },
    { src: "/images/luna29.jpg", alt: "Luna 29" },
    { src: "/images/luna30.jpg", alt: "Luna 30" },
    { src: "/images/luna31.jpg", alt: "Luna 31" }
  ];

  const reversed = [...photos].reverse();

  const prev = useCallback(() => {
    setLightbox(i => (i <= 0 ? reversed.length - 1 : i - 1));
  }, [reversed.length]);

  const next = useCallback(() => {
    setLightbox(i => (i >= reversed.length - 1 ? 0 : i + 1));
  }, [reversed.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">
          Gallery Aurhel Alana Tirta
        </h1>
        <p className="text-slate-500 dark:text-slate-300 text-lg mb-6 font-medium">
          {reversed.length} foto · Klik untuk melihat lebih besar
        </p>
        <Link
          href="/about-lana"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-[0.9rem] font-semibold transition-all border-2 border-accent text-accent hover:bg-accent/10 hover:-translate-y-0.5"
        >
          <i className="bx bx-left-arrow-alt text-lg"></i> Kembali ke About Lana
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-20">
        {reversed.map((p, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="block w-full aspect-square rounded-xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-accent group relative"
          >
            <img
              src={p.src}
              alt={p.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <i className="bx bx-zoom-in text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg"></i>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-all z-10"
            onClick={() => setLightbox(null)}
          >
            <i className="bx bx-x"></i>
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur">
            {lightbox + 1} / {reversed.length}
          </div>

          {/* Prev */}
          <button
            className="absolute left-4 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-all z-10"
            onClick={e => { e.stopPropagation(); prev(); }}
          >
            <i className="bx bx-chevron-left"></i>
          </button>

          {/* Image */}
          <img
            src={reversed[lightbox].src}
            alt={reversed[lightbox].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />

          {/* Next */}
          <button
            className="absolute right-4 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-all z-10"
            onClick={e => { e.stopPropagation(); next(); }}
          >
            <i className="bx bx-chevron-right"></i>
          </button>

          {/* Thumbnails strip */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 px-4 overflow-x-auto">
            {reversed.map((p, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setLightbox(i); }}
                className={`w-10 h-10 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                  i === lightbox ? "border-accent scale-110" : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <img src={p.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
