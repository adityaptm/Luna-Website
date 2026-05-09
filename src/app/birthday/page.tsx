"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface BirthdayMember {
  name: string;
  birthdate: string;
  img: string;
  is_birthday_today: boolean;
  next_birthday_countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export default function LanaBirthdayPage() {
  const [timeLeft, setTimeLeft] = useState<CountdownTime | null>(null);
  const [isBirthdayToday, setIsBirthdayToday] = useState(false);
  const [lanaData, setLanaData] = useState<BirthdayMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLanaBirthday() {
      try {
        const res = await fetch("/api/birthday");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const lana = json.data.find((m: any) => 
            m.name?.toLowerCase().includes("lana") || 
            m.url_key?.toLowerCase().includes("lana")
          );
          if (lana) {
            setLanaData(lana);
            setIsBirthdayToday(lana.is_birthday_today);
            setTimeLeft(lana.next_birthday_countdown);
          }
        }
      } catch (err) {
        console.error("Failed to fetch Lana birthday from API:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLanaBirthday();
  }, []);

  // Fallback manual countdown if API fails or doesn't return Lana
  useEffect(() => {
    if (lanaData) return;

    const calculateCountdown = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let birthday = new Date(currentYear, 8, 14); // September 14

      if (now > birthday && (now.getDate() !== 14 || now.getMonth() !== 8)) {
        birthday = new Date(currentYear + 1, 8, 14);
      }

      const diff = birthday.getTime() - now.getTime();

      if (now.getDate() === 14 && now.getMonth() === 8) {
        setIsBirthdayToday(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsBirthdayToday(false);
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, [lanaData]);

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-12 md:px-10 flex flex-col items-center">
      <div className="max-w-[800px] w-full text-center">
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">Lana&apos;s Birthday</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Hitung mundur menuju hari spesial Aurhel Alana Tirta!</p>
        </div>

        <div className="relative mb-16">
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border-2 border-accent/20 shadow-2xl overflow-hidden p-8 md:p-12 relative z-10">
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-accent mb-8 shadow-xl">
                <img 
                  src={lanaData?.img || "/images/lana1.webp"} 
                  alt="Aurhel Alana Tirta" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-slate-950 dark:text-white mb-2">14 September</h2>
              <p className="text-accent font-black uppercase tracking-[0.2em] mb-10 text-sm">Save the Date!</p>

              {isBirthdayToday ? (
                <div className="animate-bounce mb-8">
                  <h3 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent via-amber-500 to-accent">
                    HAPPY BIRTHDAY LANA! 🎂
                  </h3>
                </div>
              ) : timeLeft ? (
                <div className="grid grid-cols-4 gap-4 md:gap-8 w-full max-w-2xl">
                  <CountdownBlock value={timeLeft.days} label="Days" />
                  <CountdownBlock value={timeLeft.hours} label="Hours" />
                  <CountdownBlock value={timeLeft.minutes} label="Mins" />
                  <CountdownBlock value={timeLeft.seconds} label="Secs" />
                </div>
              ) : (
                <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-800 border-t-accent rounded-full animate-spin"></div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-accent/10 border-2 border-accent/20 rounded-3xl p-8 text-slate-900 dark:text-white text-center italic font-medium leading-relaxed shadow-sm">
          &quot;Semoga di umur yang baru, Lana semakin sukses, selalu sehat, dan terus menginspirasi banyak orang dengan pesonanya! Teruslah bersinar seperti bulan, Lana!&quot;
        </div>
      </div>
    </div>
  );
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full aspect-square bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center mb-2 shadow-inner">
        <span className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[0.6rem] md:text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
  );
}
