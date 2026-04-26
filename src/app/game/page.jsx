"use client";
import Link from "next/link";

export default function GameLanaPage() {
  const GAME_URL = "https://adityaptm.github.io/Game-Lana-Go-Fight/?fbclid=PAT01DUARbDPVleHRuA2FlbQIxMABzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAaeEaHZzRdb8WL8F3ixucebeykAJuQ5Wez3ZcK2hIimrWzdiABAuzYM0Wkrqzg_aem_nmnpIgrBOGe3vJzK_ikqdQ";

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-10">
      <div className="mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-4">
          Lana Go Fight! <i className="bx bx-game text-accent"></i>
        </h1>
        <p className="text-slate-800 dark:text-slate-300 text-lg font-medium">Mainkan game seru bertema Lana langsung dari browser kamu.</p>
      </div>

      <section className="bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border-4 border-accent relative aspect-video w-full mb-12">
        <iframe 
          src={GAME_URL}
          className="w-full h-full border-0"
          title="Game Lana Go Fight"
          allow="autoplay; fullscreen; keyboard"
        />
      </section>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-slate-800 p-10 rounded-[32px] border-2 border-slate-100 dark:border-slate-700 mb-20 shadow-xl">
        <div>
          <h3 className="text-2xl font-black text-slate-950 dark:text-white mb-2">Suka Gamenya?</h3>
          <p className="text-slate-700 dark:text-slate-300 font-medium">Dukung terus kreator game Lana agar bisa membuat karya-karya keren lainnya!</p>
        </div>
        <Link href="/about-lana" className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black bg-accent text-slate-900 hover:scale-105 transition-transform shadow-lg uppercase tracking-wider text-sm">
          <i className="bx bx-left-arrow-alt text-xl"></i> Kembali ke Profil
        </Link>
      </div>
    </div>
  );
}
