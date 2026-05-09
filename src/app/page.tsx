"use client";

import { useEffect, useState } from "react";
import ShowTheaterLanaPage from "./show-theater/page";
import GameLanaPage from "./game/page";
import MessageBoard from "@/components/MessageBoard";
import LiveStatus from "@/components/LiveStatus";

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

  const [liveData, setLiveData] = useState(null);
  const [liveLoading, setLiveLoading] = useState(true);

  const loadLiveStatus = async () => {
    setLiveLoading(true);
    try {
      const res = await fetch("/api/lana-live");
      const json = await res.json();
      if (json.success) {
        setLiveData(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch live status:", err);
    } finally {
      setLiveLoading(false);
    }
  };

  useEffect(() => {
    loadLiveStatus();
    const id = setInterval(loadLiveStatus, 60000); // 1 minute
    return () => clearInterval(id);
  }, []);

  const tabs = [
    { key: "tentang", label: "Tentang Lana", icon: "bx-user" },
    { key: "theater", label: "Show Theater", icon: "bx-calendar-star" },
    { key: "live", label: "Live", icon: "bx-broadcast" },
    { key: "game", label: "Game", icon: "bx-game" },
    { key: "pesan", label: "Pesan", icon: "bx-envelope" },
    { key: "hashtag", label: "Hashtag", icon: "bx-hash" },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-14 md:py-24 px-4 md:px-10 text-center rounded-3xl mb-10 relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(1.5px_1.5px_at_15%_20%,rgba(255,255,255,0.7),transparent),radial-gradient(1px_1px_at_35%_60%,rgba(255,255,255,0.5),transparent),radial-gradient(2px_2px_at_55%_15%,rgba(255,255,255,0.6),transparent)] animate-starsFloat opacity-40"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-slate-900/60 z-0"></div>
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-5">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            JKT48 Gen 12 Fansite
          </span>
          <h1 className="font-display text-4xl md:text-[4.5rem] font-black mb-4 tracking-tight leading-tight">Aurhel Alana Tirta</h1>
          <p className="text-[1.1rem] mb-8 opacity-75 font-light max-w-lg mx-auto">
            Temukan semua informasi, jadwal, dan aktivitas terbaru Lana JKT48 di satu tempat.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => setActiveTab('live')} className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 shadow-lg shadow-red-900/40">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Cek Status Live
            </button>
            <button onClick={() => setActiveTab('theater')} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 backdrop-blur-sm">
              <i className="bx bx-calendar-star text-accent"></i>
              Jadwal Theater
            </button>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[0.85rem] font-bold transition-all duration-200 border ${
              activeTab === tab.key
                ? "bg-accent text-b900 border-accent shadow-md transform -translate-y-0.5 shadow-accent/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
            } ${
              tab.key === 'live' && !liveLoading && liveData ? 'ring-2 ring-red-500 ring-offset-1' : ''
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            <i className={`bx ${tab.icon} text-sm`}></i>
            {tab.label}
            {tab.key === 'live' && !liveLoading && liveData && (
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse ml-0.5"></span>
            )}
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



        {activeTab === "live" && (
          <section className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-[32px] shadow-xl p-10 md:p-12 transition-all">
            <h1 className="font-display text-4xl font-bold text-slate-950 dark:text-white mb-8 border-b-2 border-slate-100 dark:border-slate-700 pb-4">
              <i className="bx bx-broadcast text-accent"></i> Live Lana
            </h1>
            <LiveStatus data={liveData} loading={liveLoading} />
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { tag: "#VoyageOfLana", desc: "Dukungan Umum", icon: "bx bx-rocket", color: "text-purple-500" },
                { tag: "#LaNaight", desc: "Ucapan Selamat Malam", icon: "bx bx-moon", color: "text-indigo-400" },
                { tag: "#PremierJourLana", desc: "Dukungan Show Setlist Pertama", icon: "bx bx-star", color: "text-accent" },
                { tag: "#AurheLive", desc: "Nonton Live SR/IDN", icon: "bx bx-broadcast", color: "text-red-500" },
                { tag: "#AurheView", desc: "Review Penampilan Theater", icon: "bx bx-show", color: "text-blue-400" },
                { tag: "#LanAffirmation", desc: "Dukungan Oshi / Balas PM", icon: "bx bx-heart", color: "text-pink-500" },
                { tag: "#CeritaLana", desc: "Balas PM", icon: "bx bx-book-open", color: "text-emerald-500" },
                { tag: "#RaBulana", desc: "Upload Foto Hari Rabu", icon: "bx bx-image", color: "text-cyan-500" },
                { tag: "#RHenaiKinshiJourei", desc: "Request Hour 2026", icon: "bx bx-music", color: "text-rose-400" },
                { tag: "#JKT48RequestAURhel2026", desc: "Request Hour 2026", icon: "bx bx-trophy", color: "text-accent" },
                { tag: "#JKT48RequestHour2026", desc: "Request Hour 2026", icon: "bx bx-medal", color: "text-accent" }
              ].map((item) => (
                <button
                  key={item.tag}
                  onClick={() => {
                    navigator.clipboard.writeText(item.tag);
                    const el = document.getElementById('hashtag-toast');
                    if (el) { el.textContent = `${item.tag} disalin!`; el.classList.remove('opacity-0'); setTimeout(() => el.classList.add('opacity-0'), 2000); }
                  }}
                  className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 rounded-2xl hover:border-accent hover:scale-[1.02] transition-all group cursor-pointer shadow-sm text-left w-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <i className={`${item.icon} ${item.color} text-xl`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-950 dark:text-white font-black text-[0.95rem] truncate">{item.tag}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[0.8rem] font-medium">{item.desc}</p>
                  </div>
                  <i className="bx bx-copy text-slate-400 group-hover:text-accent transition-colors text-lg flex-shrink-0"></i>
                </button>
              ))}
            </div>
            <div id="hashtag-toast" className="opacity-0 transition-opacity duration-300 mt-4 text-center text-sm font-bold text-accent"></div>
          </section>
        )}


      </div>
    </div>
  );
}
