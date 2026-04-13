import { useState } from "react";

const germanStates = [
  "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen",
  "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen",
  "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen",
  "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen",
];

export const PermitCheck = () => {
  return (
    <section className="bg-white py-16 md:py-[120px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Text and Button */}
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full mb-6" style={{ backgroundColor: 'rgba(130,178,202,0.2)', color: '#82B2CA' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              Kostenlose Beratung
            </div>
            <h2 className="text-[#344148] text-2xl md:text-4xl font-semibold leading-9 md:leading-[44px] mb-5">
              Vereinbare jetzt eine kostenlose Beratung mit unseren Experten!
            </h2>
            <p className="text-neutral-600 text-base md:text-lg font-medium leading-6 md:leading-7">
              Hast du Fragen zu Pergolen, Materialien oder Montage? Unser Team steht dir unverbindlich zur Verfügung. Buche ein kurzes Gespräch und erhalte professionelle Tipps für dein Projekt.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center gap-2 text-neutral-500 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#82B2CA"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                Kostenlos & unverbindlich
              </div>
              <div className="flex items-center gap-2 text-neutral-500 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#82B2CA"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                Experten-Tipps
              </div>
            </div>
            <a
              href="/pages/contact"
              className="inline-block bg-[#82B2CA] text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-md hover:bg-[#6ea0b7] transition-colors mt-10"
            >
              Kostenlose Beratung vereinbaren
            </a>
          </div>
          {/* Right: Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/src/assets/pergola.png"
              alt="Pergola Beratung"
              className="w-full max-w-[560px] rounded-xl shadow-lg object-cover"
              style={{ aspectRatio: '4/3' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
