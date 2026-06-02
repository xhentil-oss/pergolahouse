import { useState, useEffect } from "react";
import { HeaderLogo } from "@/sections/Header/components/HeaderLogo";
import { DesktopNav } from "@/sections/Header/components/DesktopNav";
import { HeaderActions } from "@/sections/Header/components/HeaderActions";
import { MobileMenu } from "@/sections/Header/components/MobileMenu";

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white ${
        scrolled
          ? "shadow-md shadow-black/5 border-b border-transparent"
          : "border-b border-zinc-100"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between pl-4 pr-4 py-0 md:pl-6 md:pr-6 lg:pl-8 lg:pr-8 xl:pl-10 xl:pr-10" style={{ minHeight: 72 }}>

        {/* Hamburger - mobile only */}
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-zinc-100 xl:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#344148" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Logo */}
        <HeaderLogo />

        {/* Nav - centered */}
        <div className="flex-1 hidden xl:flex justify-center">
          <DesktopNav />
        </div>

        {/* Actions */}
        <HeaderActions />
      </div>

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
    <div className="h-[72px]" />
    </>
  );
};
