import { Link } from "react-router-dom";
import { NavItem } from "@/sections/Header/components/NavItem";

export const DesktopNav = () => {
  return (
    <nav className="hidden items-center gap-x-0.5 md:flex">
      <Link
        to="/"
        className="rounded-lg px-3 py-2 text-sm font-medium tracking-wide transition-colors hover:bg-zinc-50"
        style={{ color: '#344148' }}
      >
        Startseite
      </Link>
      <NavItem
        label="Pergolen"
        href="/collections/unsere-pergolen"
        dropdownItems={[
          { label: "Elegante Pergola", href: "/products/pergola-s3" },
          { label: "Luxus-Pergola", href: "/products/pergola-custom-design" },
          { label: "Preiswerte Pergola", href: "/products/preiswerte-pergola" },
        ]}
      />
      
      <Link
        to="/collections/wintergarten-1"
        className="rounded-lg px-3 py-2 text-sm font-medium tracking-wide transition-colors hover:bg-zinc-50"
        style={{ color: '#344148' }}
      >
        Wintergarden
      </Link>
      <Link
        to="/collections/carports"
        className="rounded-lg px-3 py-2 text-sm font-medium tracking-wide transition-colors hover:bg-zinc-50"
        style={{ color: '#344148' }}
      >
        Carports
      </Link>
      <Link
        to="/collections/zip-screens"
        className="rounded-lg px-3 py-2 text-sm font-medium tracking-wide transition-colors hover:bg-zinc-50"
        style={{ color: '#344148' }}
      >
        Zip-Screen
      </Link>
      <Link
        to="/pages/ueber-uns"
        className="rounded-lg px-3 py-2 text-sm font-medium tracking-wide transition-colors hover:bg-zinc-50"
        style={{ color: '#344148' }}
      >
        Über uns
      </Link>
      <Link
        to="/contact"
        className="rounded-lg px-3 py-2 text-sm font-medium tracking-wide transition-colors hover:bg-zinc-50"
        style={{ color: '#344148' }}
      >
        Kontakt
      </Link>
    </nav>
  );
};
