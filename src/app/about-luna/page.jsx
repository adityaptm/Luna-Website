"use client";

import Link from "next/link";
import Image from "next/image";

export default function AboutLuna() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950 px-4 py-12 md:px-10">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-16 text-center">
          <h1 className="font-display text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">About LUNA.</h1>
          <p className="text-slate-600 dark:text-slate-400 text-xl font-medium max-w-2xl mx-auto">The official fansite dedicated to Aurhel Alana Tirta.</p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative aspect-square rounded-[40px] overflow-hidden border-8 border-slate-50 dark:border-slate-900 shadow-2xl">
            <img 
              src="/images/luna.webp" 
              alt="LUNA Brand" 
              className="w-full h-full object-contain p-12 bg-white dark:bg-slate-900"
            />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-950 dark:text-white mb-6 italic">The Team</h2>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border-2 border-slate-100 dark:border-slate-800">
               <h3 className="text-accent font-black uppercase tracking-widest text-sm mb-6">Developed by:</h3>
               <ul className="space-y-4 text-slate-900 dark:text-white font-bold text-2xl mb-8">
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-accent"></span> @adityaptmptr
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-accent"></span> @lavierine
                  </li>
               </ul>
               <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-6">
                  LUNA. dirancang dan dikembangkan dengan penuh dedikasi oleh @adityaptmptr dan @lavierine sebagai bentuk apresiasi dan dukungan nyata bagi perjalanan karier Aurhel Alana Tirta di JKT48.
               </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-accent rounded-full blur-[100px]"></div>
             <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-accent rounded-full blur-[100px]"></div>
          </div>
          
          <h2 className="text-3xl font-black mb-8 relative z-10 uppercase tracking-widest text-accent">Our Vision</h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-3xl mx-auto relative z-10">
            Misi kami adalah menyatukan seluruh elemen pendukung Lana dalam satu platform yang elegan, informatif, dan mudah diakses. 
          </p>
        </section>
      </div>
    </div>
  );
}
