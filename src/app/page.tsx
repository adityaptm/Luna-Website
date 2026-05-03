"use client";

import { useEffect, useState } from "react";
import ShowTheaterLanaPage from "./show-theater/page";
import GameLanaPage from "./game/page";
import MessageBoard from "@/components/MessageBoard";

function AnimatedNumber({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1400;
    const step = value / (duration / 16);

    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
}

export default function AboutLanaPage() {
  const [activeTab, setActiveTab] = useState("tentang");
  const [openQ, setOpenQ] = useState<number | null>(null);
  const [openSetlist, setOpenSetlist] = useState<number | null>(null);

  const tabs = [
    { key: "tentang", label: "Tentang Lana" },

    { key: "theater", label: "Show Theater Lana" },
    { key: "game", label: "Game Lana" },
    { key: "pesan", label: "Pesan" },
    { key: "hashtag", label: "Hashtag" },

  ];

  return (
    <div className="w-full">
      <section className="bg-slate-900 text-white py-12 md:py-20 px-4 md:px-10 text-center rounded-3xl mb-16 relative overflow-hidden shadow-lg border border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(1.5px_1.5px_at_15%_20%,rgba(255,255,255,0.7),transparent),radial-gradient(1px_1px_at_35%_60%,rgba(255,255,255,0.5),transparent),radial-gradient(2px_2px_at_55%_15%,rgba(255,255,255,0.6),transparent)] animate-starsFloat opacity-40"></div>
        <div className="relative z-10">
          <h1 className="font-display text-4xl md:text-[3.8rem] font-black mb-4 tracking-tight leading-tight">Aurhel Alana Tirta</h1>
          <p className="text-[1.3rem] mb-[18px] opacity-90 font-light flex items-center justify-center gap-2">
            <i className="bx bx-info-circle text-accent"></i> Halaman informasi dan aktivitas Lana.
          </p>
        </div>
      </section>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-5 py-2.5 rounded-full text-[0.9rem] font-bold transition-all duration-200 border ${
              activeTab === tab.key
                ? "bg-accent text-b900 border-accent shadow-md transform -translate-y-0.5"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-theme-border hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-[960px] mx-auto">
        {activeTab === "tentang" && (
          <section className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-[32px] shadow-lg p-10 md:p-12 transition-all">
            <h1 className="font-display text-4xl font-bold text-slate-950 dark:text-white mb-8 border-b-2 border-slate-100 dark:border-slate-700 pb-4">
              <i className="bx bx-user-circle text-accent"></i> Tentang Lana
            </h1>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Profil Aurhel Alana Tirta</h2>

            <div className="space-y-6">
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-[1.05rem] font-medium">
                Aurhel Alana Tirta merupakan salah satu member JKT48 Generasi ke-12 yang
                memiliki aura lembut dan pembawaan yang tenang namun penuh pesona.
                Lahir pada 14 September 2006 di Bekasi, ia memiliki zodiak Virgo dengan tinggi sekitar 162 cm.
              </p>

              <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-[1.05rem] font-medium">
                Lana pertama kali diperkenalkan sebagai trainee pada event
                Jak-Japan Matsuri 2023 tanggal 18 November 2023. Ia kemudian
                melakukan debut theater pertamanya pada setlist
                <strong className="text-accent font-bold mx-1">Ingin Bertemu</strong>
                tanggal 1 Maret 2024.
              </p>

              <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-[1.05rem] font-medium">
                Dengan kesukaan terhadap strawberry dan warna pink, Lana dikenal
                sebagai pribadi yang hangat serta memiliki ketertarikan di bidang
                public speaking. Ia mampu beradaptasi dengan cepat dan membuat
                suasana di sekitarnya terasa nyaman serta penuh cerita.
              </p>
            </div>
          </section>
        )}



        {activeTab === "theater" && (
          <section className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-[32px] shadow-xl p-10 md:p-12 transition-all">
            <h1 className="font-display text-4xl font-bold text-slate-950 dark:text-white mb-8 border-b-2 border-slate-100 dark:border-slate-700 pb-4">
              <i className="bx bx-calendar-star text-accent"></i> Jadwal Theater
            </h1>
            <ShowTheaterLanaPage />
          </section>
        )}

        {activeTab === "game" && (
          <div className="transition-all w-full">
            <GameLanaPage />
          </div>
        )}

        {activeTab === "pesan" && (
          <section className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-[32px] shadow-xl p-10 md:p-12 transition-all">
            <MessageBoard />
          </section>
        )}

        {activeTab === "hashtag" && (
          <section className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-[32px] shadow-xl p-10 md:p-12 transition-all">
            <h1 className="font-display text-4xl font-bold text-slate-950 dark:text-white mb-8 border-b-2 border-slate-100 dark:border-slate-700 pb-4">
              <i className="bx bx-hash text-accent"></i> Hashtag Support
            </h1>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">Official Hashtag Lana</h2>
            <p className="text-slate-700 dark:text-slate-300 mb-8 text-[1rem] font-medium italic">Gunakan hashtag ini untuk mendukung Lana di media sosial!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { tag: "#VoyageOfLana", desc: "Dukungan Umum", icon: "bx bx-rocket" },
                { tag: "#LaNaight", desc: "Ucapan Selamat Malam", icon: "bx bx-moon" },
                { tag: "#PremierJourLana", desc: "Dukungan Show Setlist Pertama", icon: "bx bx-star" },
                { tag: "#AurheLive", desc: "Pengalaman Nonton Live SR/IDN", icon: "bx bx-broadcast" },
                { tag: "#AurheView", desc: "Review Penampilan Theater", icon: "bx bx-show" },
                { tag: "#LanAffirmation", desc: "Dukungan Oshi / Balas PM", icon: "bx bx-heart" },
                { tag: "#CeritaLana", desc: "Balas PM", icon: "bx bx-book-open" },
                { tag: "#RaBulana", desc: "Upload Foto Hari Rabu", icon: "bx bx-image" },
                { tag: "#RHenaiKinshiJourei", desc: "Request Hour 2026", icon: "bx bx-music" },
                { tag: "#JKT48RequestAURhel2026", desc: "Request Hour 2026", icon: "bx bx-trophy" },
                { tag: "#JKT48RequestHour2026", desc: "Request Hour 2026", icon: "bx bx-medal" }
              ].map((item) => (
                <div key={item.tag} className="flex flex-col p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 rounded-2xl hover:border-accent hover:scale-[1.03] transition-all group cursor-default shadow-sm">
                  <span className="text-slate-950 dark:text-white font-black text-[1.15rem] mb-1.5 flex items-center gap-3">
                    <i className={`${item.icon} text-accent text-xl`}></i> {item.tag}
                  </span>
                  <span className="text-slate-800 dark:text-slate-300 text-[0.95rem] font-bold">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}


      </div>
    </div>
  );
}
