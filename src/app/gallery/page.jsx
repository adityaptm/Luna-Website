import Link from "next/link";

export default function GalleryPage() {
  const photos = [
    { src: "/images/lana1.webp", alt: "Lana 1" },
    { src: "/images/lana2.webp", alt: "Lana 2" },
    { src: "/images/lana3.webp", alt: "Lana 3" },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 md:px-10">
      <div className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-950 dark:text-white mb-4">Gallery Aurhel Alana</h1>
        <p className="text-slate-800 dark:text-slate-300 text-lg mb-8 font-medium">Kumpulan momen dan foto-foto terbaik Lana.</p>

        <Link href="/about-lana" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-[0.9rem] font-semibold transition-all border-2 border-accent text-accent hover:bg-accent/10 hover:-translate-y-0.5">
          <i className="bx bx-left-arrow-alt text-lg"></i> Kembali ke About Lana
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
        {photos.map((p, i) => (
          <a key={i} href={p.src} className="block w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group" target="_blank" rel="noreferrer">
            <img src={p.src} alt={p.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </a>
        ))}
      </div>
    </div>
  );
}
