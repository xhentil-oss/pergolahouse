import { useState } from "react";
import { Link } from "react-router-dom";

type MobileMenuProps = {
  onClose: () => void;
};

const navGroups = [
  {
    label: "Pergolen",
    items: [
      { label: "Pergola S3", href: "/products/pergola-s3" },
      { label: "Sundream S3", href: "/products/sundream-s3" },
      { label: "Skydance S3", href: "/products/skydance-s3" },
      { label: "Maßanfertigung S3", href: "/products/pergola-custom-design" },
      { label: "Alle anzeigen", href: "/collections/unsere-pergolen" },
    ],
  },
  {
    label: "Wintergarten",
    items: [
      { label: "Glasdach Wintergarten", href: "/collections/wintergarten-1" },
      { label: "Alle anzeigen", href: "/collections/wintergarten-1" },
    ],
  },
  {
    label: "Zubehör",
    items: [
      { label: "Screen Rollos", href: "/collections/pergola-zubehoer" },
      { label: "Glaswände", href: "/collections/pergola-zubehoer" },
      { label: "Lamellenwände", href: "/collections/pergola-zubehoer" },
      { label: "LEDs", href: "/collections/pergola-zubehoer" },
      { label: "Alle anzeigen", href: "/collections/pergola-zubehoer" },
    ],
  },
];

export const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      {/* Drawer */}
      <div className="relative bg-white w-80 max-w-[90vw] h-full overflow-y-auto z-10 flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200">
          <img
            src="https://c.animaapp.com/mnd7yb7cX3zmke/assets/45.avif"
            alt="Logo"
            className="h-8 object-contain"
          />
          <button onClick={onClose} aria-label="Close" className="text-2xl font-light leading-none">
            ✕
          </button>
        </div>
        <nav className="flex-1 px-5 py-4 space-y-1">
          <Link to="/collections/unsere-pergolen" className="flex items-center gap-1 font-semibold py-3 border-b border-zinc-100" style={{ color: '#82B2CA' }}>
            <img src="https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-3.svg" alt="" className="h-4 w-4" />
            Sale
          </Link>
          {navGroups.map((group) => (
            <div key={group.label}>
              <button
                onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                className="flex items-center justify-between w-full font-semibold py-3 border-b border-zinc-100 text-left"
              >
                {group.label}
                <span className="text-zinc-400 text-sm">{openGroup === group.label ? "▲" : "▼"}</span>
              </button>
              {openGroup === group.label && (
                <div className="pl-4 pb-2 space-y-2">
                  {group.items.map((item) => (
                    <Link key={item.label} to={item.href} className="block text-sm text-zinc-600 py-1 hover:text-zinc-900" onClick={onClose}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {[
            { label: "Showroom", href: "/pages/showroom-3-0" },
            { label: "Über uns", href: "/pages/ueber-uns" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <Link key={item.label} to={item.href} className="block font-semibold py-3 border-b border-zinc-100">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-5 pb-6">
          <a
            href="/collections/unsere-pergolen"
            className="block text-center text-white bg-zinc-900 font-medium px-4 py-3 rounded-md w-full"
          >
            Modelle entdecken
          </a>
          <div className="mt-4 border-t pt-4">
            <div className="text-neutral-500 text-sm font-medium flex items-center gap-1 justify-center">
              Wir sind <span className="text-[#82B2CA]">erreichbar</span>
            </div>
            <a href="tel:+4966141087500" className="text-white font-semibold text-center block mt-1 bg-zinc-800 py-2 px-4 rounded">
              +49 661 4108750
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
