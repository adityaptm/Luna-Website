"use client";

import { useEffect, useState } from "react";
import LiveStatus from "@/components/LiveStatus";
import Link from "next/link";

export default function LivePage() {
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

  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950 px-4 py-12 md:px-10">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">Lana Live Status</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Pantau aktivitas live stream Lana di sini.</p>
        </div>

        <div className="mb-12">
          <LiveStatus data={liveData} loading={liveLoading} />
        </div>

        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body text-[0.9rem] font-semibold transition-all border-2 border-accent text-accent hover:bg-accent/10 hover:-translate-y-0.5">
            <i className="bx bx-left-arrow-alt text-lg"></i> Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
}
