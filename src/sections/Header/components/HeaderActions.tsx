import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const formatPrice = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export const HeaderActions = () => {
  const { items, removeFromCart, updateQuantity, cartOpen, setCartOpen, totalItems, totalPrice } = useCart();

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen]);

  return (
    <>
      <div className="items-center box-border caret-transparent gap-x-2 flex min-h-[auto] min-w-[auto] gap-y-2">
        <Link
          to="/collections/unsere-pergolen"
          className="text-white font-medium items-center bg-zinc-900 box-border caret-transparent gap-x-2 hidden leading-5 max-h-10 min-h-0 min-w-0 gap-y-2 w-max border border-zinc-900 px-4 py-3 rounded-md border-solid md:flex md:min-h-[auto] md:min-w-[auto]"
        >
          <span className="box-border caret-transparent inline min-h-0 min-w-0 md:block md:min-h-[auto] md:min-w-[auto]">
            Modelle entdecken
          </span>
        </Link>
        <div className="relative box-border caret-transparent h-6 min-h-[auto] min-w-[auto] w-6">
          <div
            aria-label="Cart"
            role="button"
            className="box-border caret-transparent cursor-pointer"
            onClick={() => setCartOpen(true)}
          >
            <img
              src="https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-5.svg"
              alt="Warenkorb"
              className="box-border caret-transparent h-6 w-6"
            />
            {totalItems > 0 && (
              <span className="absolute flex items-center justify-center h-4 w-4 rounded-full bg-amber-500 text-white text-[10px] font-bold -right-1.5 -top-1.5">
                {totalItems}
              </span>
            )}
          </div>
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
            Warenkorb {totalItems > 0 && <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">{totalItems}</span>}
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
        <div className="mx-4 mt-4 flex items-center justify-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white">
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
                <div key={item.id} className="rounded-xl border border-stone-200 bg-white p-4">
                  {/* Product header */}
                  <div className="flex gap-3">
                    <img src={item.image} alt={item.productName} className="h-20 w-20 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-zinc-900">{item.productName}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="shrink-0 text-zinc-400 transition hover:text-red-500"
                          aria-label="Entfernen"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                      </div>
                      <p className="mt-0.5 text-lg font-semibold text-zinc-900">{formatPrice(item.totalPrice)}</p>
                    </div>
                  </div>

                  {/* Configuration details */}
                  <div className="mt-3 space-y-1.5 rounded-lg bg-stone-50 px-3 py-2.5 text-xs text-zinc-600">
                    <div className="flex justify-between">
                      <span className="font-medium text-zinc-500">Farbe</span>
                      <span className="font-semibold text-zinc-800">{item.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-zinc-500">Größe</span>
                      <span className="font-semibold text-zinc-800">{item.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-zinc-500">Aufbau</span>
                      <span className="font-semibold text-zinc-800">{item.mount}{item.mountSurcharge > 0 && ` (+${formatPrice(item.mountSurcharge)})`}</span>
                    </div>
                    {item.sides.length > 0 && (
                      <>
                        <div className="border-t border-stone-200 pt-1.5 font-medium text-zinc-500">Seitenelemente</div>
                        {item.sides.map((s) => (
                          <div key={s.key} className="flex justify-between pl-2">
                            <span>{s.label}</span>
                            <span className="font-semibold text-zinc-800">{s.type} (+{formatPrice(s.price)})</span>
                          </div>
                        ))}
                      </>
                    )}
                    {item.accessories.length > 0 && (
                      <>
                        <div className="border-t border-stone-200 pt-1.5 font-medium text-zinc-500">Zubehör</div>
                        {item.accessories.map((a) => (
                          <div key={a.label} className="flex justify-between pl-2">
                            <span>{a.label}</span>
                            <span className="font-semibold text-zinc-800">+{formatPrice(a.price)}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs font-medium text-zinc-500">Menge:</span>
                    <div className="flex items-center rounded-lg border border-stone-200">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-sm text-zinc-600 transition hover:bg-stone-100 disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >−</button>
                      <span className="min-w-[2rem] text-center text-sm font-semibold text-zinc-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-sm text-zinc-600 transition hover:bg-stone-100"
                      >+</button>
                    </div>
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
          <button className="mt-3 w-full rounded-md bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800">
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
