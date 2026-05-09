"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAboutDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Check live status
    const checkLive = async () => {
      try {
        const res = await fetch("/api/lana-live");
        const json = await res.json();
        setIsLive(!!(json.success && json.data));
      } catch {}
    };
    checkLive();
    const liveInterval = setInterval(checkLive, 60000);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearInterval(liveInterval);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  const menuLinkClass =
    "text-[0.88rem] font-medium text-white/70 px-3 py-2 rounded-lg transition-all duration-200 tracking-[0.01em] hover:text-white hover:bg-white/8 whitespace-nowrap";

  return (
    <header className="bg-b900 px-4 md:px-8 border-b border-white/5 sticky top-0 z-50 shadow-[0_2px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm">
      <nav className="flex justify-between items-center max-w-[1200px] mx-auto h-16">
        {/* Logo */}
        <div className="hover:opacity-90 transition-opacity duration-200">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative">
              <Image
                src="/images/luna.webp"
                alt="LUNA Logo"
                width={34}
                height={34}
                className="object-cover rounded-full border border-white/20 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                priority
              />
              {/* Live dot on logo */}
              {isLive && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-b900 animate-pulse" />
              )}
            </div>
            <span className="font-display text-[1.55rem] font-bold text-white tracking-[0.02em]">
              LUNA.
            </span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-[6px]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-[2px] bg-white rounded-[2px] transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-x-[5px] translate-y-[5px]" : ""}`} />
          <span className={`w-6 h-[2px] bg-white rounded-[2px] transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-[2px] bg-white rounded-[2px] transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 translate-x-[5px] -translate-y-[5px]" : ""}`} />
        </button>

        {/* Nav links */}
        <div className={`flex flex-col md:flex-row md:items-center gap-1 absolute md:static top-16 left-0 right-0 bg-b900 md:bg-transparent px-6 md:px-0 py-4 md:py-0 transition-all duration-300 ${isMobileMenuOpen ? "flex" : "hidden md:flex"}`}>
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={menuLinkClass}>Home</Link>
          <Link href="/news" onClick={() => setIsMobileMenuOpen(false)} className={menuLinkClass}>News</Link>

          {/* Live link with indicator */}
          <Link
            href="/live"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`${menuLinkClass} flex items-center gap-1.5 ${isLive ? "text-red-400 hover:text-red-300" : ""}`}
          >
            {isLive && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
            Live
            {isLive && (
              <span className="bg-red-500/20 border border-red-500/40 text-red-400 text-[0.6rem] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                ON
              </span>
            )}
          </Link>

          {/* About Dropdown */}
          <div className="relative group" ref={dropdownRef}>
            <button
              onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
              onMouseEnter={() => !isMobileMenuOpen && setIsAboutDropdownOpen(true)}
              className={`${menuLinkClass} flex items-center gap-1 cursor-pointer w-full text-left`}
            >
              About <i className={`bx bx-chevron-down transition-transform duration-200 ${isAboutDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isAboutDropdownOpen && (
              <div
                className="flex flex-col md:absolute md:top-full md:left-0 bg-b900 md:bg-slate-900/95 md:backdrop-blur border border-white/10 md:rounded-xl md:shadow-2xl md:py-1.5 md:min-w-[160px] overflow-hidden"
                onMouseLeave={() => setIsAboutDropdownOpen(false)}
              >
                <Link
                  href="/about-lana"
                  onClick={() => { setIsAboutDropdownOpen(false); setIsMobileMenuOpen(false); }}
                  className="px-4 py-2.5 text-[0.85rem] font-medium text-white/70 hover:text-white hover:bg-white/8 transition-colors flex items-center gap-2"
                >
                  <i className="bx bx-user text-accent text-sm" /> About Lana
                </Link>
                <Link
                  href="/about-luna"
                  onClick={() => { setIsAboutDropdownOpen(false); setIsMobileMenuOpen(false); }}
                  className="px-4 py-2.5 text-[0.85rem] font-medium text-white/70 hover:text-white hover:bg-white/8 transition-colors flex items-center gap-2"
                >
                  <i className="bx bx-star text-accent text-sm" /> About Luna
                </Link>
              </div>
            )}
          </div>

          <Link href="/gallery" onClick={() => setIsMobileMenuOpen(false)} className={menuLinkClass}>Gallery</Link>
          <Link href="/birthday" onClick={() => setIsMobileMenuOpen(false)} className={menuLinkClass}>Birthday</Link>
          <Link href="/show-theater" onClick={() => setIsMobileMenuOpen(false)} className={menuLinkClass}>Show Theater</Link>

          {/* Theme toggle */}
          <button
            className="flex items-center gap-1.5 bg-white/8 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 px-3 py-[7px] rounded-lg cursor-pointer text-[0.82rem] font-medium transition-all duration-200 w-fit ml-1"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <><i className="bx bx-sun text-base text-accent" /> Light</>
            ) : (
              <><i className="bx bx-moon text-base text-accent" /> Dark</>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
