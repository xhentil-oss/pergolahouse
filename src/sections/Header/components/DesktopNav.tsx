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
          { label: "Pergola Maßanfertigung", href: "/products/pergola-massanfertigung" },
          { label: "Wintergärten", href: "/collections/wintergarten-1" },
          { label: "Carports", href: "/collections/carports" },
          { label: "Zip-Screens", href: "/collections/zip-screens" },
        ]}
      />
      <NavItem
        label="Zubehör"
        href="/collections/pergola-zubehoer"
        dropdownItems={[
          { label: "Screen Rollos", href: "/products/screen-rollo" },
          { label: "Glaswände", href: "/products/glaswande" },
          { label: "LEDs", href: "/products/led-stripes" },
          { label: "Wärmelampe", href: "/products/waermelampe" },
        ]}
      />
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
