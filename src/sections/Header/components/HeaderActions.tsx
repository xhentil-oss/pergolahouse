import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import photo2 from "@/assets/Photo (2).png";
import photo3 from "@/assets/Photo (3).png";
import photo4 from "@/assets/Photo (4).png";
import photo5 from "@/assets/Photo (5).png";
import photo6 from "@/assets/Photo (6).png";

const modelCards = [
  { url: "/products/pergola-s3", img: photo2, savings: "35% sparen", name: "Elegante Pergola", price: "2.589 €", oldPrice: "3.990 €", spec1: "Manuelles Lamellendach", spec2: "Windfest bis 100km/h", colors: ["#2D3436","#F1EDE5","#0A0A0A","#8E9499","#D4BC6A"] },
  { url: "/products/pergola-custom-design", img: photo3, savings: "35% sparen", name: "Luxus-Pergola", price: "3.429 €", oldPrice: "5.290 €", spec1: "Elektrisches Lamellendach", spec2: "Bis zu 120km/h (Sturm)", colors: ["#2D3436","#F1EDE5","#0A0A0A","#8E9499","#D4BC6A"] },
  { url: "/products/preiswerte-pergola", img: photo4, savings: "30% sparen", name: "Preiswerte Pergola", price: "5.099 €", oldPrice: "7.290 €", spec1: "Elektrische LED-Lamellen", spec2: "Bis zu 140km/h (Orkan)", colors: ["#2D3436","#F1EDE5","#0A0A0A","#8E9499","#D4BC6A"] },
  { url: "/collections/wintergarten-1", img: photo5, savings: "30% sparen", name: "Wintergärten", price: "6.785 €", oldPrice: "9.694 €", spec1: "Elektrisches Lamellendach", spec2: "Bis zu 120km/h (Sturm)", colors: ["#2D3436","#F1EDE5","#0A0A0A","#8E9499","#D4BC6A"] },
  { url: "/products/pergola-massanfertigung", img: photo6, savings: "30% sparen", name: "Pergola Maßanfertigung", price: "4.899 €", oldPrice: "6.990 €", spec1: "Individuelle Maße & Ausstattung", spec2: "Bis zu 120km/h (Sturm)", colors: ["#2D3436","#F1EDE5","#0A0A0A","#8E9499","#D4BC6A"] },
];

const formatPrice = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export const HeaderActions = () => {
  const { items, removeFromCart, updateQuantity, cartOpen, setCartOpen, totalItems, totalPrice } = useCart();
  const [modelsOpen, setModelsOpen] = useState(false);
  const modelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else if (!modelsOpen) {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen, modelsOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modelsRef.current && !modelsRef.current.contains(e.target as Node)) {
        setModelsOpen(false);
      }
    };
    if (modelsOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [modelsOpen]);

  return (
    <>
      <div className="flex items-center gap-3">
        <div ref={modelsRef} className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setModelsOpen(!modelsOpen)}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
            style={{ backgroundColor: '#344148' }}
          >
            <span>Modelle entdecken</span>
            <svg className={`h-4 w-4 transition-transform ${modelsOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {/* Mega dropdown */}
          {modelsOpen && (
            <div className="fixed inset-x-0 top-full z-[100] mt-0 border-t border-stone-200 bg-white shadow-2xl"
                 style={{ top: modelsRef.current?.getBoundingClientRect().bottom ?? 0 }}>
              <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-16">
                <div className="mb-6 flex items-end justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#82B2CA]">Unsere Kollektion</span>
                    <h3 className="mt-1 text-2xl font-semibold text-[#344148]">Pergola Modelle</h3>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-5 xl:grid-cols-6">
                  {modelCards.map((m) => (
                    <Link
                      key={m.url}
                      to={m.url}
                      onClick={() => setModelsOpen(false)}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition-all hover:border-[#82B2CA]/30 hover:shadow-xl hover:shadow-[#82B2CA]/5"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img src={m.img} alt={m.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        {/* badge removed */}
                        <span className="absolute right-2 top-2 rounded-full bg-[#344148] px-2 py-1 text-[10px] font-bold uppercase text-white">{m.savings}</span>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h4 className="text-sm font-semibold text-[#344148] mb-1">{m.name}</h4>
                        <div className="flex items-baseline gap-1.5 mb-2">
                          <span className="text-sm font-bold text-[#344148]">{m.price}</span>
                          <span className="text-xs text-neutral-400 line-through">{m.oldPrice}</span>
                        </div>
                        <div className="space-y-1 mb-3">
                          <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                            <svg className="h-3 w-3 shrink-0 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {m.spec1}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                            <svg className="h-3 w-3 shrink-0 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {m.spec2}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          {m.colors.map((c, i) => (
                            <div key={i} className="h-4 w-4 rounded-full ring-1 ring-stone-300/60 shadow-sm" style={{ backgroundColor: c }} />
                          ))}
                          <span className="ml-1 text-[10px] text-neutral-400">{m.colors.length} Farben</span>
                        </div>
                        <div className="mt-auto">
                          <span className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#344148] py-2.5 text-xs font-semibold text-white transition hover:bg-[#2a353b]">
                            Jetzt entdecken
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          aria-label="Cart"
          role="button"
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-zinc-100"
          onClick={() => setCartOpen(true)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#344148" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: '#344148' }}>
              {totalItems}
            </span>
          )}
        </div>
      </div>

      {/* Cart Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/50 transition-opacity duration-300 ${cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setCartOpen(false)}
      />

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 z-[9999] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            Warenkorb {totalItems > 0 && <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#344148' }}>{totalItems}</span>}
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="Schließen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Sale Banner */}
        <div className="mx-4 mt-4 flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: '#344148' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Sale endet bald – jetzt zuschlagen!
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 text-6xl">📦</div>
              <h3 className="text-lg font-semibold text-zinc-900">Deine Pergola wartet</h3>
              <p className="mt-2 max-w-xs text-sm text-zinc-500">
                Entdecke unsere Modelle und lass es uns wissen, wenn du Hilfe benötigst. :)
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="group overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition-all hover:border-[#82B2CA]/30 hover:shadow-lg">
                  {/* Image with badges */}
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={item.image} alt={item.productName} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#344148] backdrop-blur-sm">
                      {item.productName}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute right-3 top-3 rounded-full bg-[#344148] px-2.5 py-1.5 text-[11px] font-bold uppercase text-white transition hover:bg-red-600"
                      aria-label="Entfernen"
                    >
                      Entfernen
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Name */}
                    <h3 className="text-lg font-semibold text-[#344148] mb-1.5">{item.productName}</h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg font-bold text-[#344148]">{formatPrice(item.totalPrice)}</span>
                      {item.basePrice < item.totalPrice && (
                        <span className="text-sm text-neutral-400 line-through">{formatPrice(item.basePrice)}</span>
                      )}
                    </div>

                    {/* Specs with checkmarks */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <svg className="h-3.5 w-3.5 shrink-0 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Farbe: {item.color}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <svg className="h-3.5 w-3.5 shrink-0 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Größe: {item.size}
                      </div>
                      {item.mount && (
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <svg className="h-3.5 w-3.5 shrink-0 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          Aufbau: {item.mount}{item.mountSurcharge > 0 && ` (+${formatPrice(item.mountSurcharge)})`}
                        </div>
                      )}
                      {item.sides.length > 0 && item.sides.map((s) => (
                        <div key={s.key} className="flex items-center gap-2 text-sm text-neutral-600">
                          <svg className="h-3.5 w-3.5 shrink-0 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {s.label}: {s.type} (+{formatPrice(s.price)})
                        </div>
                      ))}
                      {item.accessories.length > 0 && item.accessories.map((a) => (
                        <div key={a.label} className="flex items-center gap-2 text-sm text-neutral-600">
                          <svg className="h-3.5 w-3.5 shrink-0 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {a.label} (+{formatPrice(a.price)})
                        </div>
                      ))}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-1.5 mb-4">
                      <div className="flex items-center rounded-lg border border-stone-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-sm text-zinc-600 transition hover:bg-stone-100 disabled:opacity-30"
                          disabled={item.quantity <= 1}
                        >−</button>
                        <span className="min-w-[1.75rem] text-center text-sm font-semibold text-zinc-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-sm text-zinc-600 transition hover:bg-stone-100"
                        >+</button>
                      </div>
                      <span className="text-xs text-neutral-400 ml-1">Menge</span>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#344148] py-3 text-sm font-semibold text-white transition hover:bg-[#2a353b]"
                    >
                      Entfernen
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-200 bg-white px-6 py-5">
          <div className="flex items-center justify-between text-sm text-zinc-700">
            <span>Zwischensumme</span>
            <span className="text-lg font-semibold text-zinc-900">{formatPrice(totalPrice)}</span>
          </div>
          <button className="mt-3 w-full rounded-md px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90" style={{ backgroundColor: '#344148' }}>
            Weiter zum Checkout
          </button>
          <button
            onClick={() => setCartOpen(false)}
            className="mt-2 w-full text-center text-sm text-zinc-500 underline transition hover:text-zinc-700"
          >
            oder weiter entdecken
          </button>
        </div>
      </div>
    </>
  );
};
