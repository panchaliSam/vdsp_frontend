import { useEffect, useRef, useState } from "react";
import Logo from "@app_assets/logo/svg/logo-no-background.svg";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-4 inset-x-0 z-40 mx-auto w-[min(92%,1280px)] h-[72px]
                 flex items-center justify-between px-6 py-3
                 backdrop-blur-lg bg-night/60 rounded-[28px] ring-1 ring-white/10
                 transition-shadow duration-300"
      data-scrolled={scrolled}
      style={scrolled ? { boxShadow: "0 6px 20px rgba(0,0,0,.4)", background: "rgba(11,11,14,0.8)" } : {}}
    >
      <img src={Logo} alt="Lenxlens logo" className="h-10" />
      <button
        className="px-6 py-2 rounded-xl font-semibold text-smoke bg-graphite/80 hover:bg-graphite/60
                   focus-visible:ring-2 focus-visible:ring-cyan/70 transition"
      >
        Sign In
      </button>
    </header>
  );
} 