import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40 rounded-3xl bg-b900 text-white mb-16 border border-b100/10 shadow-lg">
        {/* Dekorasi Background Latar (Tetap sesuai tema warna) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden rounded-3xl">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-b500/20 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-b200/10 blur-[100px]" />
          <div className="absolute inset-0 bg-[radial-gradient(1.5px_1.5px_at_15%_20%,rgba(255,255,255,0.7),transparent),radial-gradient(1px_1px_at_35%_60%,rgba(255,255,255,0.5),transparent),radial-gradient(2px_2px_at_55%_15%,rgba(255,255,255,0.6),transparent)] animate-starsFloat opacity-60"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge Kecil di Atas */}
            <span className="inline-block py-1.5 px-4 rounded-full bg-b600/20 border border-b400/30 text-b100 text-xs font-bold tracking-[0.15em] uppercase mb-6 shadow-sm">
              Official Fan Page
            </span>

            {/* Title dengan Gradient Halus */}
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-b100 leading-tight">
              Aurhel Alana <span className="text-b300">Gen 12</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-b50 font-medium mb-4 opacity-90">
              Selamat datang di website resmi Aurhel Alana Generasi 12
            </p>

            {/* Description */}
            <p className="text-white/75 leading-relaxed max-w-2xl mx-auto mb-10 text-[1.05rem]">
              Kami adalah komunitas yang berdedikasi untuk berkembang bersama
              melalui berbagai kegiatan seni, teater, dan pembelajaran kreatif
              yang menginspirasi setiap langkah perjalanan kami.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/about-lana"
                className="w-full sm:w-auto px-8 py-4 bg-b600 hover:bg-b700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-[0_4px_14px_rgba(24,95,165,0.35)] hover:shadow-[0_6px_20px_rgba(24,95,165,0.45)] flex items-center justify-center gap-2"
              >
                Tentang Lana <i className="bx bx-right-arrow-alt text-xl"></i>
              </Link>

              <Link
                href="/show-theater"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-[1.5px] border-white/40 hover:border-white hover:bg-white/10 text-white font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Lihat Pertunjukan <i className="bx bx-calendar text-xl"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-3xl p-8 text-center shadow-md hover:shadow-xl transition-all relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="w-16 h-16 mx-auto mb-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center text-[2rem] text-accent shadow-sm">
              <i className="bx bx-star"></i>
            </div>
            <h3 className="font-bold text-[1.2rem] text-slate-950 dark:text-white mb-3">Talenta Berbakat</h3>
            <p className="text-slate-700 dark:text-slate-300 text-[0.95rem] leading-relaxed font-medium">Mendukung perkembangan dan perjalanan karir Lana di JKT48.</p>
          </div>

          <div className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-3xl p-8 text-center shadow-md hover:shadow-xl transition-all relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="w-16 h-16 mx-auto mb-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center text-[2rem] text-accent shadow-sm">
              <i className="bx bx-group"></i>
            </div>
            <h3 className="font-bold text-[1.2rem] text-slate-950 dark:text-white mb-3">Komunitas Solid</h3>
            <p className="text-slate-700 dark:text-slate-300 text-[0.95rem] leading-relaxed font-medium">Bergabunglah bersama kami untuk mendukung Aurhel Alana dengan antusiasme.</p>
          </div>

          <div className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-3xl p-8 text-center shadow-md hover:shadow-xl transition-all relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="w-16 h-16 mx-auto mb-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center text-[2rem] text-accent shadow-sm">
              <i className="bx bx-news"></i>
            </div>
            <h3 className="font-bold text-[1.2rem] text-slate-950 dark:text-white mb-3">Update Terbaru</h3>
            <p className="text-slate-700 dark:text-slate-300 text-[0.95rem] leading-relaxed font-medium">Dapatkan informasi jadwal show, aktivitas, dan berita terbaru.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
