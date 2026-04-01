import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

export type NavItemProps = {
  label: string;
  href: string;
  dropdownItems?: { label: string; href: string }[];
};

export const NavItem = ({ label, href, dropdownItems }: NavItemProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  }, []);

  const handleMouseEnter = () => {
    if (!dropdownItems) return;
    clearCloseTimeout();
    setOpen(true);
  };

  const handleMouseLeave = () => {
    if (!dropdownItems) return;
    closeTimeout.current = setTimeout(() => setOpen(false), 250);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      clearCloseTimeout();
    };
  }, [clearCloseTimeout]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="group flex items-center gap-1 px-3 py-2 rounded-lg transition-colors hover:bg-zinc-50">
        <Link
          to={href}
          className="text-sm font-medium tracking-wide transition-colors"
          style={{ color: '#344148' }}
        >
          {label}
        </Link>
        {dropdownItems && (
          <button
            type="button"
            onClick={() => setOpen((p) => !p)}
            aria-label={`Toggle ${label} submenu`}
            className="cursor-pointer bg-transparent border-0 p-0 ml-0.5"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            >
              <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#344148" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
      {dropdownItems && (
        <div
          className={`absolute top-full left-0 mt-2 min-w-[220px] rounded-2xl bg-white p-2 shadow-xl shadow-black/8 ring-1 ring-black/5 z-50 transition-all duration-200 origin-top ${
            open
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }`}
        >
          {dropdownItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-50 hover:text-zinc-900 hover:pl-4"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
