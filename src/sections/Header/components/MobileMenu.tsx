import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/pergolo.logo.png";
import pergolaImg from "@/assets/ikona-thjesht.png";

type MobileMenuProps = {
  onClose: () => void;
};

const pergolDropdown = [
  { label: "Elegante Pergola", href: "/pergola/elegante-pergola" },
  { label: "Luxus-Pergola", href: "/pergola/luxus-pergola" },
  { label: "Preiswerte Pergola", href: "/pergola/preiswerte-pergola" },
];

const simpleLinks = [
  { label: "Wintergarden", href: "/wintergarten" },
  { label: "Carports", href: "/carports" },
  { label: "Zip-Screen", href: "/zip-screens" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/contact" },
  { label: "Montage Service", href: "/montage-service" },
];

export const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const [pergolaOpen, setPergolaOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      {/* Drawer */}
      <div className="relative bg-white w-80 max-w-[90vw] h-full overflow-y-auto z-10 flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200">
          <img
            src={logo}
            alt="Logo"
            className="h-10 object-contain"
          />
          <button onClick={onClose} aria-label="Close" className="text-2xl font-light leading-none">
            ✕
          </button>
        </div>
        <nav className="flex-1 px-5 py-4 space-y-1">
          {/* Pergolen with dropdown */}
          <div>
            <button
              onClick={() => setPergolaOpen(!pergolaOpen)}
              className="flex items-center justify-between w-full font-semibold py-3 border-b border-zinc-100 text-left text-[#344148]"
            >
              Pergolen
              <span className="text-zinc-400 text-sm">{pergolaOpen ? "▲" : "▼"}</span>
            </button>
            {pergolaOpen && (
              <div className="pl-4 pb-2 space-y-2">
                {pergolDropdown.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block text-sm text-zinc-600 py-1 hover:text-[#82B2CA]"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {simpleLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="block font-semibold py-3 border-b border-zinc-100 text-[#344148] hover:text-[#82B2CA]"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Decorative pergola icon */}
        <div className="px-4 py-4">
          <img
            src={pergolaImg}
            alt="Pergola"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            className="opacity-80"
          />
        </div>
        <div className="px-5 pb-6">
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
