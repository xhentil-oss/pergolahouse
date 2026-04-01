import { useState } from "react";

const germanStates = [
  "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen",
  "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen",
  "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen",
  "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen",
];

export const PermitCheck = () => {
  const [selectedState, setSelectedState] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [result, setResult] = useState<null | "required" | "not-required">(null);

  const handleCheck = () => {
    if (!selectedState || !width || !depth) return;
    const area = parseFloat(width) * parseFloat(depth);
    // Simplified logic: most states require permit for structures > 30m²
    setResult(area > 30 ? "required" : "not-required");
  };

  return (
    <section className="py-16 md:py-[120px]" style={{ backgroundColor: '#344148' }}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-16">
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-20">
          {/* Left text */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full mb-6" style={{ backgroundColor: 'rgba(130,178,202,0.2)', color: '#82B2CA' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              Baugenehmigung prüfen
            </div>
            <h2 className="text-white text-[32px] font-semibold leading-10 md:text-5xl md:leading-[58px] mb-6">
              Unsicher, ob du eine Baugenehmigung brauchst?
            </h2>
            <p className="text-neutral-400 text-lg font-medium leading-7">
              Mit unserem kurzen Check findest du heraus, ob für dein Vorhaben eine Baugenehmigung erforderlich ist. Falls ja, kannst du direkt im Anschluss ein unverbindliches Angebot anfragen.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#82B2CA"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                Kostenlos & unverbindlich
              </div>
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#82B2CA"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                Sofortergebnis
              </div>
            </div>
          </div>

          {/* Right - check form */}
          <div className="flex-1 bg-white rounded-[28px] p-8">
            <h3 className="text-zinc-900 text-xl font-semibold mb-6">Genehmigungs-Check</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-zinc-700 text-sm font-medium block mb-2">Bundesland</label>
                <select
                  value={selectedState}
                  onChange={(e) => { setSelectedState(e.target.value); setResult(null); }}
                  className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 font-medium bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                >
                  <option value="">Bundesland wählen…</option>
                  {germanStates.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-700 text-sm font-medium block mb-2">Breite (m)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="z.B. 4"
                    value={width}
                    onChange={(e) => { setWidth(e.target.value); setResult(null); }}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 font-medium bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                  />
                </div>
                <div>
                  <label className="text-zinc-700 text-sm font-medium block mb-2">Tiefe (m)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="z.B. 3"
                    value={depth}
                    onChange={(e) => { setDepth(e.target.value); setResult(null); }}
                    className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 font-medium bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-300"
                  />
                </div>
              </div>
              <button
                onClick={handleCheck}
                disabled={!selectedState || !width || !depth}
                className="w-full text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                style={{ backgroundColor: '#344148' }}
              >
                Jetzt prüfen →
              </button>
            </div>

            {/* Result */}
            {result && (
              <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${result === "required" ? "bg-[#82B2CA]/10 border border-[#82B2CA]/30" : "bg-[#82B2CA]/10 border border-[#82B2CA]/30"}`}>
                {result === "required" ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#82B2CA" className="shrink-0 mt-0.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    <div>
                      <p className="text-[#344148] font-semibold text-sm">Baugenehmigung wahrscheinlich erforderlich</p>
                      <p className="text-[#344148]/70 text-xs mt-1">Für dein Vorhaben in {selectedState} wird vermutlich eine Baugenehmigung benötigt. Unser Partner berät dich kostenlos.</p>
                      <a href="/pages/building-permit" className="inline-block mt-3 text-xs font-semibold text-[#82B2CA] underline">Experten kontaktieren →</a>
                    </div>
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#82B2CA" className="shrink-0 mt-0.5"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    <div>
                      <p className="text-[#344148] font-semibold text-sm">Keine Baugenehmigung erforderlich</p>
                      <p className="text-[#344148]/70 text-xs mt-1">Für dein Vorhaben in {selectedState} sollte in der Regel keine Genehmigung nötig sein. Bitte prüfe trotzdem beim lokalen Bauamt.</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
