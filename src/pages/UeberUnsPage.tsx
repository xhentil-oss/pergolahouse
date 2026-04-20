import { Link } from "react-router-dom";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import heroPergola from "@/assets/image-pergola.png";
import photo10 from "@/assets/Photo (10).png";
import photo11 from "@/assets/Photo (11).png";
import photo12 from "@/assets/Photo (12).png";
import photo13 from "@/assets/Photo (13).png";
import photo14 from "@/assets/Photo (14).png";


const pillars = [
  {
    number: "01",
    title: "Exklusive Gestaltung",
    text: "Was PergolaHaus auszeichnet, ist die Verbindung aus exklusiver Gestaltung, langlebiger Qualität und einem konsequenten Verständnis für die Ansprüche moderner Wohnkonzepte.",
  },
  {
    number: "02",
    title: "Elegante Lebensräume",
    text: "Unsere Lösungen sind darauf ausgerichtet, Außenbereiche in elegante Lebensräume zu verwandeln – mit Substanz, Charakter und einer Präsenz, die dauerhaft überzeugt.",
  },
  {
    number: "03",
    title: "Echter Luxus",
    text: "Bei PergolaHaus glauben wir, dass echter Luxus in der perfekten Balance aus Schönheit, Funktion und nachhaltiger Qualität liegt – für ein besonderes Lebensgefühl, das bleibt.",
  },
];

export const UeberUnsPage = () => {
  return (
    <div className="relative text-neutral-900 bg-white overflow-x-hidden font-inter_tight">
      <Header />
      <main role="main">

        {/* ── HERO + STATS fused ── */}
        <section className="relative">
          {/* Image */}
          <div className="relative isolate overflow-hidden min-h-[380px] md:min-h-[460px] flex items-center justify-center text-center px-4 py-16">
            <img src={heroPergola} alt="PergolaHaus" className="absolute inset-0 z-0 w-full h-full object-cover object-center" />
            <div className="absolute inset-0 z-10 bg-zinc-900/50" />
            <div className="relative z-20 max-w-3xl mx-auto">
              <p className="text-[#82B2CA] text-sm font-semibold uppercase tracking-[0.18em] mb-4">Über uns</p>
              <h1 className="font-lemonmilk text-2xl md:text-4xl text-white leading-tight mb-4">
                Moderne Eleganz für einen<br />Lebensstil ohne Kompromisse.
              </h1>
              <p className="text-white/80 text-sm md:text-lg">
                PergolaHaus steht für bis ins Detail durchdachte Outdoor-Lösungen – ein Ausdruck von Stil, Komfort und gehobenem Wohnen.
              </p>
            </div>
          </div>
        </section>

        {/* ── ABOUT: text left + image grid right ── */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-16 py-10 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left: all text */}
            <div>
              <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.3em] mb-4">Unser Versprechen</p>
              <h2 className="font-lemonmilk text-2xl md:text-4xl text-[#344148] leading-tight mb-6">
                Wir schaffen Außenbereiche,{" "}
                <span className="text-[#82B2CA]">die begeistern.</span>
              </h2>
              <div className="space-y-4 text-neutral-500 text-sm md:text-base leading-relaxed">
                <p>
                  PergolaHaus steht für moderne Eleganz, kompromisslose Qualität und bis ins Detail durchdachte Outdoor-Lösungen. Wir schaffen Außenbereiche, die weit mehr sind als funktionale Ergänzungen eines Hauses – sie werden zu einem Ausdruck von Stil, Komfort und gehobenem Wohnen.
                </p>
                <p>
                  Unser Anspruch ist es, Architektur und Lebensqualität auf harmonische Weise miteinander zu verbinden. Mit hochwertigen Aluminium-Pergolen, Wintergärten, Carports sowie ausgewählten Ergänzungen wie Zip-Screens, Glassystemen und architektonischer Beleuchtung realisieren wir Lösungen, die Ästhetik, Funktionalität und Beständigkeit in sich vereinen.
                </p>
                <p>
                  Für uns ist der Außenbereich ein Ort mit besonderer Bedeutung. Er erweitert den Wohnraum, schafft Atmosphäre und prägt den Charakter einer Immobilie. Genau aus diesem Verständnis heraus entstehen unsere Konzepte: mit klarer Formensprache, hochwertigen Materialien und einem feinen Gespür für zeitloses Design.
                </p>
                <p>
                  Jedes Projekt beginnt mit dem Anspruch, nicht einfach ein Produkt anzubieten, sondern eine stimmige Gesamtlösung zu schaffen. Von der ersten Beratung bis zur finalen Umsetzung legen wir größten Wert auf Präzision, Verlässlichkeit und eine individuelle Betreuung auf höchstem Niveau. Denn wahre Qualität zeigt sich nicht nur im Ergebnis, sondern in jedem einzelnen Schritt dorthin.
                </p>
                <p>
                  Was PergolaHaus auszeichnet, ist die Verbindung aus exklusiver Gestaltung, langlebiger Qualität und einem konsequenten Verständnis für die Ansprüche moderner Wohnkonzepte. Unsere Lösungen sind darauf ausgerichtet, Außenbereiche in elegante Lebensräume zu verwandeln – mit Substanz, Charakter und einer Präsenz, die dauerhaft überzeugt.
                </p>
                <p>
                  Bei PergolaHaus glauben wir, dass echter Luxus in der perfekten Balance aus Schönheit, Funktion und nachhaltiger Qualität liegt. Deshalb gestalten wir Außenbereiche, die nicht nur beeindrucken, sondern Tag für Tag ein besonderes Lebensgefühl vermitteln.
                </p>
                <p className="font-semibold text-[#344148]">
                  PergolaHaus – moderne Eleganz für einen Lebensstil ohne Kompromisse.
                </p>
              </div>

              {/* Mini stats row */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-neutral-100 pt-8">
                {[
                  { v: "10+", l: "Jahre Erfahrung" },
                  { v: "10 J.", l: "Garantie" },
                  { v: "4,79★", l: "Bewertung" },
                ].map((item) => (
                  <div key={item.l}>
                    <p className="font-lemonmilk text-2xl text-[#344148]">{item.v}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{item.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image collage */}
            <div className="grid grid-cols-2 gap-3 lg:mt-40">
              <div className="col-span-2 overflow-hidden rounded-2xl aspect-video">
                <img src={photo14} alt="Pergola" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="overflow-hidden rounded-2xl aspect-square">
                <img src={photo10} alt="Pergola Detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="overflow-hidden rounded-2xl aspect-square">
                <img src={photo12} alt="Pergola Design" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </section>

        {/* ── PILLARS ── */}
        <section className="bg-[#344148]">
          <div className="max-w-[1440px] mx-auto px-4 md:px-16 py-10 md:py-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
              <div>
                <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Was uns auszeichnet</p>
                <h2 className="font-lemonmilk text-2xl md:text-4xl text-white leading-tight">
                  Drei Prinzipien.<br />Ein Anspruch.
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
              {pillars.map((p) => (
                <div key={p.number} className="bg-[#344148] p-8 md:p-10 group hover:bg-white/5 transition-colors duration-300">
                  <p className="font-lemonmilk text-4xl text-white/10 mb-6 group-hover:text-[#82B2CA]/30 transition-colors duration-300">
                    {p.number}
                  </p>
                  <h3 className="text-white text-base font-semibold mb-3">{p.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STORY ── */}
        <section className="bg-neutral-50">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-14 md:py-20">
            {/* Top: heading + intro */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start mb-12">
              <div>
                <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.3em] mb-4">Unsere Geschichte</p>
                <h2 className="font-lemonmilk text-3xl md:text-4xl text-[#344148] leading-tight">
                  Vom Traum<br />zur Wirklichkeit.
                </h2>
              </div>
              <div className="space-y-4 text-neutral-500 text-sm md:text-base leading-relaxed pt-1">
                <p>
                  Jedes Projekt beginnt mit dem Anspruch, nicht einfach ein Produkt anzubieten, sondern eine stimmige Gesamtlösung zu schaffen. Von der ersten Beratung bis zur finalen Umsetzung legen wir größten Wert auf Präzision, Verlässlichkeit und eine individuelle Betreuung auf höchstem Niveau.
                </p>
                <p>
                  Denn wahre Qualität zeigt sich nicht nur im Ergebnis, sondern in jedem einzelnen Schritt dorthin.
                </p>
              </div>
            </div>

            {/* Bottom: 4 feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0", title: "Persönliche Beratung", text: "Von Anfang an individuell betreut – auf Ihre Wünsche abgestimmt." },
                { icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", title: "Präzise Verarbeitung", text: "Jedes Detail wird mit höchster Sorgfalt und Genauigkeit umgesetzt." },
                { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", title: "Langlebige Materialien", text: "Hochwertige Aluminium-Strukturen mit zeitlosem Design." },
                { icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", title: "Höchstes Niveau", text: "Betreuung und Service, der Ihren Erwartungen übertrifft." },
              ].map((card) => (
                <div key={card.title} className="bg-white rounded-2xl p-6 border border-neutral-100 hover:border-[#82B2CA]/40 hover:shadow-md transition-all duration-300 group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full mb-4" style={{ backgroundColor: "#82B2CA20" }}>
                    <svg className="h-5 w-5" style={{ color: "#82B2CA" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#344148] text-sm mb-2">{card.title}</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PHOTO STRIP + MORE TEXT ── */}
        <section className="max-w-[1440px] mx-auto px-6 md:px-16 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Photos */}
            <div className="grid grid-cols-2 gap-3">
              <div className="overflow-hidden rounded-2xl aspect-[3/4]">
                <img src={photo11} alt="Pergola" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="overflow-hidden rounded-2xl flex-1">
                  <img src={photo13} alt="Pergola Detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="overflow-hidden rounded-2xl flex-1">
                  <img src={photo12} alt="Pergola Design" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </div>

            {/* Text block */}
            <div>
              <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.3em] mb-4">Unser Anspruch</p>
              <h2 className="font-lemonmilk text-3xl md:text-4xl text-[#344148] leading-tight mb-6">
                Schönheit in<br />jedem Detail.
              </h2>
              <div className="space-y-4 text-neutral-500 text-sm leading-relaxed">
                <p>
                  Was PergolaHaus auszeichnet, ist die Verbindung aus exklusiver Gestaltung, langlebiger Qualität und einem konsequenten Verständnis für die Ansprüche moderner Wohnkonzepte. Unsere Lösungen sind darauf ausgerichtet, Außenbereiche in elegante Lebensräume zu verwandeln.
                </p>
                <p>
                  Bei PergolaHaus glauben wir, dass echter Luxus in der perfekten Balance aus Schönheit, Funktion und nachhaltiger Qualität liegt. Deshalb gestalten wir Außenbereiche, die nicht nur beeindrucken, sondern Tag für Tag ein besonderes Lebensgefühl vermitteln.
                </p>
              </div>
              {/* Products block */}
              <div className="mt-10 border-t border-neutral-100 pt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400 mb-5">Unsere Produkte</p>
                <div className="space-y-0 divide-y divide-neutral-100">
                  {[
                    { label: "Pergolen", sub: "Aluminium · Lamellendach", to: "/pergola/elegante-pergola", num: "01" },
                    { label: "Carports", sub: "Modern · Langlebig", to: "/carports", num: "02" },
                    { label: "Zip-Screens", sub: "Sonnenschutz · Windschutz", to: "/zip-screens", num: "03" },
                    { label: "Wintergärten", sub: "Ganzjährig · Komfortabel", to: "/wintergarten", num: "04" },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="group flex items-center justify-between py-3.5 hover:pl-2 transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-semibold text-neutral-300 font-lemonmilk w-5">{item.num}</span>
                        <div>
                          <p className="text-sm font-semibold text-[#344148] group-hover:text-[#82B2CA] transition-colors duration-200">{item.label}</p>
                          <p className="text-[11px] text-neutral-400">{item.sub}</p>
                        </div>
                      </div>
                      <svg className="h-4 w-4 text-neutral-300 group-hover:text-[#82B2CA] group-hover:translate-x-1 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="bg-[#344148]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Bereit für Ihr Projekt?</p>
              <h2 className="font-lemonmilk text-3xl md:text-4xl text-white leading-tight">
                Ihr Projekt.<br />Unsere Leidenschaft.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold transition hover:opacity-90"
                style={{ backgroundColor: "#82B2CA", color: "#fff" }}
              >
                Jetzt beraten lassen
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a
                href="tel:+4966141087500"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                +49 661 4108750
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};
