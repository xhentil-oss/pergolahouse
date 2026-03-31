import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export type NavItemProps = {
  label: string;
  href: string;
  dropdownItems?: { label: string; href: string }[];
};

export const NavItem = ({ label, href, dropdownItems }: NavItemProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => dropdownItems && setOpen(true)}
      onMouseLeave={() => dropdownItems && setOpen(false)}
    >
      <div className="items-center gap-x-1.5 flex font-semibold leading-5 mr-2">
        <Link to={href} className="hover:text-zinc-600 transition-colors">{label}</Link>
        {dropdownItems && (
          <button
            type="button"
            onClick={() => setOpen((p) => !p)}
            aria-label={`Toggle ${label} submenu`}
            className="cursor-pointer bg-transparent border-0 p-0"
          >
            <img
              src="https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-4.svg"
              alt=""
              className={`h-[9px] w-[9px] transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>
      {open && dropdownItems && (
        <div
          className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-zinc-100 py-2 min-w-[200px] z-50"
        >
          {dropdownItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="block px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
