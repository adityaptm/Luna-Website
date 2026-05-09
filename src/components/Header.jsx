"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuLinkClass = "text-[0.9rem] font-medium text-white/75 px-[14px] py-2 rounded-sm transition-colors duration-200 tracking-[0.01em] hover:text-accent hover:bg-white/5 whitespace-nowrap";

  return (
    <header className="bg-b900 px-4 md:px-10 border-b border-b100/10 sticky top-0 z-50 shadow-[0_2px_20px_rgba(0,0,0,0.25)]">
      <nav className="flex justify-between items-center max-w-[1200px] mx-auto h-16">
        <div className="hover:opacity-80 transition-opacity duration-200">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/luna.webp"
              alt="LUNA Logo"
              width={36}
              height={36}
              className="object-cover rounded-full border border-white/20 drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]"
              priority
            />
            <span className="font-display text-[1.6rem] font-bold text-white tracking-[0.02em]">LUNA.</span>
          </Link>
        </div>

        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-[6px]"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-[2px] bg-white rounded-[2px] transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-x-[5px] translate-y-[5px]" : ""}`}></span>
          <span className={`w-6 h-[2px] bg-white rounded-[2px] transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-[2px] bg-white rounded-[2px] transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 translate-x-[5px] -translate-y-[5px]" : ""}`}></span>
        </button>

        <div className={`flex flex-col md:flex-row md:items-center gap-1 absolute md:static top-16 left-0 right-0 bg-b900 md:bg-transparent px-10 md:px-0 py-4 md:py-0 transition-all duration-300 ${isMobileMenuOpen ? "flex" : "hidden md:flex"}`}>
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={menuLinkClass}>Home</Link>
          <Link href="/news" onClick={() => setIsMobileMenuOpen(false)} className={menuLinkClass}>News</Link>
          
          {/* About Dropdown (Sekarang di samping News) */}
          <div className="relative group" ref={dropdownRef}>
            <button 
              onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
              onMouseEnter={() => !isMobileMenuOpen && setIsAboutDropdownOpen(true)}
              className={`${menuLinkClass} flex items-center gap-1.5 cursor-pointer w-full text-left`}
            >
              About <i className={`bx bx-chevron-down transition-transform ${isAboutDropdownOpen ? 'rotate-180' : ''}`}></i>
            </button>
            
            {(isAboutDropdownOpen) && (
              <div 
                className={`flex flex-col md:absolute md:top-full md:left-0 bg-b900 md:bg-slate-900 border border-white/10 md:rounded-lg md:shadow-xl md:py-2 md:min-w-[160px] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200`}
                onMouseLeave={() => setIsAboutDropdownOpen(false)}
              >
                <Link 
                  href="/about-lana" 
                  onClick={() => { setIsAboutDropdownOpen(false); setIsMobileMenuOpen(false); }}
                  className="px-5 py-2.5 text-[0.85rem] font-medium text-white/75 hover:text-accent hover:bg-white/5 transition-colors"
                >
                  About Lana
                </Link>
                <Link 
                  href="/about-luna" 
                  onClick={() => { setIsAboutDropdownOpen(false); setIsMobileMenuOpen(false); }}
                  className="px-5 py-2.5 text-[0.85rem] font-medium text-white/75 hover:text-accent hover:bg-white/5 transition-colors"
                >
                  About Luna
                </Link>
              </div>
            )}
          </div>

          <Link href="/gallery" onClick={() => setIsMobileMenuOpen(false)} className={menuLinkClass}>Gallery</Link>
          <Link href="/birthday" onClick={() => setIsMobileMenuOpen(false)} className={menuLinkClass}>Birthday</Link>
          <Link href="/show-theater" onClick={() => setIsMobileMenuOpen(false)} className={menuLinkClass}>Show Theater</Link>

          <button
            className="bg-white/10 text-white border border-white/15 px-[14px] py-[7px] rounded-sm cursor-pointer text-[0.85rem] font-body transition-colors duration-200 hover:text-accent hover:bg-white/20 flex items-center gap-2 w-fit ml-2"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <><i className="bx bx-sun text-lg"></i> Light</>
            ) : (
              <><i className="bx bx-moon text-lg"></i> Dark</>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
