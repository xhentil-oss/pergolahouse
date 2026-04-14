import { Link } from "react-router-dom";
import { NavItem } from "@/sections/Header/components/NavItem";

export const DesktopNav = () => {
  return (
    <nav className="hidden items-center gap-x-1 md:flex">
      <Link
        to="/"
        className="relative px-3 py-2 text-sm font-medium text-[#344148] transition-colors hover:text-[#82B2CA] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-[#82B2CA] after:scale-x-0 after:transition-transform hover:after:scale-x-100"
      >
        Startseite
      </Link>
      <NavItem
        label="Pergolen"
        href="/pergola/elegante-pergola"
        dropdownItems={[
          { label: "Elegante Pergola", href: "/pergola/elegante-pergola" },
          { label: "Luxus-Pergola", href: "/pergola/luxus-pergola" },
          { label: "Preiswerte Pergola", href: "/pergola/preiswerte-pergola" },
        ]}
      />
      <Link
        to="/wintergarten"
        className="relative px-3 py-2 text-sm font-medium text-[#344148] transition-colors hover:text-[#82B2CA] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-[#82B2CA] after:scale-x-0 after:transition-transform hover:after:scale-x-100"
      >
        Wintergarden
      </Link>
      <Link
        to="/carports"
        className="relative px-3 py-2 text-sm font-medium text-[#344148] transition-colors hover:text-[#82B2CA] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-[#82B2CA] after:scale-x-0 after:transition-transform hover:after:scale-x-100"
      >
        Carports
      </Link>
      <Link
        to="/zip-screens"
        className="relative px-3 py-2 text-sm font-medium text-[#344148] transition-colors hover:text-[#82B2CA] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-[#82B2CA] after:scale-x-0 after:transition-transform hover:after:scale-x-100"
      >
        Zip-Screen
      </Link>
      <Link
        to="/ueber-uns"
        className="relative px-3 py-2 text-sm font-medium text-[#344148] transition-colors hover:text-[#82B2CA] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-[#82B2CA] after:scale-x-0 after:transition-transform hover:after:scale-x-100"
      >
        Über uns
      </Link>
      <Link
        to="/contact"
        className="relative px-3 py-2 text-sm font-medium text-[#344148] transition-colors hover:text-[#82B2CA] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-[#82B2CA] after:scale-x-0 after:transition-transform hover:after:scale-x-100"
      >
        Kontakt
      </Link>
    </nav>
  );
};
