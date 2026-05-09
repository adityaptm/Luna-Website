"use client";

import React, { useEffect, useState } from "react";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  url: string;
  background_image: string;
  date: string;
  slug: string;
}

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border-2 border-slate-50 dark:border-slate-800 shadow-lg flex flex-col animate-pulse">
      <div className="aspect-[16/10] w-full bg-slate-200 dark:bg-slate-800"></div>
      <div className="p-8 flex-1 flex flex-col gap-3">
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-1/3"></div>
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-full"></div>
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-4/5"></div>
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-3/5 mt-auto"></div>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        const json = await res.json();
        if (json.success) {
          setNews(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch news:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">
          News & Updates
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Berita dan update terbaru seputar Lana JKT48.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : news.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-[40px] p-16 text-center border-2 border-slate-100 dark:border-slate-800 shadow-xl">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="bx bx-news text-4xl text-accent"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Belum Ada Berita</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Belum ada berita terbaru saat ini. Cek lagi nanti ya!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="group bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border-2 border-slate-50 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-3 flex flex-col"
            >
              <div className="aspect-[16/10] w-full overflow-hidden relative bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-6">
                <img
                  src="/images/luna.webp"
                  alt={item.title}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-5 left-5">
                  <span className="bg-accent text-slate-900 px-4 py-1.5 rounded-full text-[0.65rem] font-black uppercase tracking-[0.15em] shadow-lg">
                    {item.category || "Official"}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-lg">
                    <i className="bx bx-link-external text-slate-900 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                    <i className="bx bx-calendar text-accent text-lg"></i>
                  </div>
                  <span className="text-[0.8rem] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                    {new Date(item.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-slate-950 dark:text-white mb-6 group-hover:text-accent transition-colors line-clamp-3 leading-tight tracking-tight">
                  {item.title}
                </h3>

                <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-accent font-black text-xs uppercase tracking-widest">
                    Read More
                  </span>
                  <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-accent group-hover:text-slate-900 transition-all group-hover:translate-x-2">
                    <i className="bx bx-right-arrow-alt text-xl"></i>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}