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
    <div className="w-full min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-[1200px] mx-auto px-4 py-12 md:px-10 relative z-20">
        <h1 className="font-display text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 text-center md:text-left">News & Updates</h1>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[40px] border-2 border-slate-100 dark:border-slate-800 shadow-xl">
            <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-800 border-t-accent rounded-full animate-spin"></div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Memuat berita terbaru...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-[40px] p-16 text-center border-2 border-slate-100 dark:border-slate-800 shadow-xl">
            <i className="bx bx-news text-7xl text-accent mb-6"></i>
            <p className="text-slate-600 dark:text-slate-400 text-xl font-medium">Belum ada berita terbaru saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                      <i className="bx bx-calendar text-accent text-lg"></i>
                    </div>
                    <span className="text-[0.8rem] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                      {new Date(item.date).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-950 dark:text-white mb-6 group-hover:text-accent transition-colors line-clamp-3 leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-accent font-black text-xs uppercase tracking-widest">Read More</span>
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
    </div>
  );
}