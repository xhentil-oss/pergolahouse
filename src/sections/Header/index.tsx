import { useState } from "react";
import { HeaderLogo } from "@/sections/Header/components/HeaderLogo";
import { DesktopNav } from "@/sections/Header/components/DesktopNav";
import { HeaderActions } from "@/sections/Header/components/HeaderActions";
import { MobileMenu } from "@/sections/Header/components/MobileMenu";

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky bg-white min-h-[56px] z-40 top-0 shadow-sm">
      <div className="relative border-zinc-300 border-b border-solid">
        <div className="items-center flex justify-between max-w-[1440px] mx-auto px-4 py-3 md:px-16 md:py-2">
          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
            className="block h-6 w-6 md:hidden"
          >
            <img src="https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-2.svg" alt="Menu" className="h-6 w-6" />
          </button>

          <HeaderLogo />
          <DesktopNav />
          <HeaderActions />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  );
};
