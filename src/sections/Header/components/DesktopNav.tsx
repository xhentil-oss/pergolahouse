import { NavItem } from "@/sections/Header/components/NavItem";

export const DesktopNav = () => {
  return (
    <nav className="items-center gap-x-1 hidden md:flex">
      <a
        href="/collections/unsere-pergolen"
        className="text-amber-500 font-semibold items-center gap-x-1 flex leading-5 mr-2"
      >
        <img src="https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-3.svg" alt="" className="h-4 w-4" />
        Sale
      </a>
      <NavItem
        label="Pergolen"
        href="/collections/unsere-pergolen"
        dropdownItems={[
          { label: "PERGOLUX Pergola S3", href: "/products/pergolux-pergola-s3" },
          { label: "PERGOLUX Sundream S3", href: "/products/pergolux-sundream-s3" },
          { label: "PERGOLUX Skydance S3", href: "/products/pergolux-skydance-s3" },
          { label: "Maßanfertigung S3", href: "/products/pergola-custom-design" },
          { label: "Alle anzeigen →", href: "/collections/unsere-pergolen" },
        ]}
      />
      <NavItem
        label="Wintergarten"
        href="/collections/wintergarten-1"
        dropdownItems={[
          { label: "Glasdach Wintergarten", href: "/collections/wintergarten-1" },
          { label: "Alle anzeigen →", href: "/collections/wintergarten-1" },
        ]}
      />
      <NavItem
        label="Zubehör"
        href="/collections/pergola-zubehoer"
        dropdownItems={[
          { label: "Screen Rollos", href: "/collections/pergola-zubehoer" },
          { label: "Glaswände", href: "/collections/pergola-zubehoer" },
          { label: "Lamellenwände", href: "/collections/pergola-zubehoer" },
          { label: "LEDs", href: "/collections/pergola-zubehoer" },
          { label: "S3 Wärmelampe", href: "/collections/pergola-zubehoer" },
          { label: "Alle anzeigen →", href: "/collections/pergola-zubehoer" },
        ]}
      />
      <a href="/pages/showroom-3-0" className="font-semibold leading-5 mr-2 hover:text-zinc-600 transition-colors">Showroom</a>
      <a href="/pages/ueber-uns" className="font-semibold leading-5 mr-2 hover:text-zinc-600 transition-colors">Über uns</a>
      <a href="/help-center" className="font-semibold leading-5 mr-2 hover:text-zinc-600 transition-colors">Hilfecenter</a>
    </nav>
  );
};
