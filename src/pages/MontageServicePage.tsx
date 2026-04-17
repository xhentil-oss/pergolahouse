import { Link } from "react-router-dom";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { FAQItem } from "@/sections/FAQ/components/FAQItem";
import heroImg from "@/assets/Photo (9).png";

const steps = [
  {
    number: "01",
    title: "Beratung & Planung",
    description: "Unser Expertenteam berät Sie persönlich und plant die optimale Lösung für Ihren Außenbereich – vor Ort oder per Video-Call.",
  },
  {
    number: "02",
    title: "Terminvereinbarung",
    description: "Wir vereinbaren einen Wunschtermin, der zu Ihrem Zeitplan passt – flexibel auch am Wochenende.",
  },
  {
    number: "03",
    title: "Professionelle Montage",
    description: "Unser zertifiziertes Montageteam installiert Ihre Pergola schnell, sauber und fachgerecht – ohne Schmutz, ohne Stress.",
  },
  {
    number: "04",
    title: "Abnahme & Service",
    description: "Nach der Montage prüfen wir gemeinsam alles – und stehen Ihnen auch danach mit unserem 24/7-Service zur Verfügung.",
  },
];

const included = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Professionelles Werkzeug",
    desc: "Unser Team bringt alles mit – kein Aufwand Ihrerseits.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "2 Jahre Montagegarantie",
    desc: "Vollständige Garantie auf alle Montagearbeiten.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
    title: "Fotodokumentation",
    desc: "Vollständige Dokumentation aller Montagestufen.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    title: "Vollständige Reinigung",
    desc: "Wir hinterlassen Ihren Bereich sauber und besenrein.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Deutschlandweit",
    desc: "Montageservice in allen Bundesländern verfügbar.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Pünktliche Ausführung",
    desc: "Termintreue ist unser Versprechen an jeden Kunden.",
  },
];

const reasons = [
  {
    stat: "10+",
    label: "Jahre Erfahrung",
    desc: "Über ein Jahrzehnt Expertise im Bereich Terrassenüberdachungen und Pergolasysteme.",
    color: "#82B2CA",
  },
  {
    stat: "2.500+",
    label: "Montagen",
    desc: "Tausende erfolgreich montierte Pergolen – jede mit höchster Sorgfalt ausgeführt.",
    color: "#344148",
  },
  {
    stat: "98%",
    label: "Kundenzufriedenheit",
    desc: "Fast alle unsere Kunden empfehlen unseren Montageservice weiter.",
    color: "#82B2CA",
  },
];

const reviews = [
  {
    name: "Thomas K.",
    city: "Frankfurt",
    stars: 5,
    text: "Das Montageteam war absolut professionell – pünktlich, sauber und schnell. Die Pergola steht perfekt und alles wurde genau nach Plan umgesetzt. Klare Empfehlung!",
  },
  {
    name: "Sandra M.",
    city: "München",
    stars: 5,
    text: "Von der Beratung bis zur Abnahme lief alles reibungslos. Die Monteure waren freundlich und haben sogar kleine Änderungswünsche spontan berücksichtigt.",
  },
  {
    name: "Michael B.",
    city: "Hamburg",
    stars: 5,
    text: "Sehr kompetentes Team. Die Installation dauerte nur einen halben Tag – und danach war alles tip-top aufgeräumt. Wir sind begeistert von der Qualität.",
  },
];

const faqs = [
  {
    q: "Wie lange dauert eine typische Pergola-Montage?",
    a: "Je nach Größe und Modell dauert eine Standardmontage zwischen 4 und 8 Stunden. Bei komplexeren Projekten mit Glaswänden oder Beleuchtung kann es 1–2 Tage in Anspruch nehmen.",
  },
  {
    q: "Was muss ich für die Montage vorbereiten?",
    a: "Sie benötigen lediglich einen zugänglichen Bereich für das Montageteam sowie einen Stromanschluss in der Nähe. Alle Werkzeuge, Befestigungsmittel und Materialien bringt unser Team mit.",
  },
  {
    q: "Ist der Montageservice in ganz Deutschland verfügbar?",
    a: "Ja, wir bieten unseren professionellen Montageservice deutschlandweit an. Bitte kontaktieren Sie uns für eine Verfügbarkeitsabfrage in Ihrer Region.",
  },
  {
    q: "Welche Garantie erhalte ich auf die Montage?",
    a: "Auf alle Montagearbeiten gewähren wir eine 2-jährige Handwerkergarantie. Produktgarantien des Herstellers sind davon unabhängig und gelten zusätzlich.",
  },
  {
    q: "Was kostet der Montageservice?",
    a: "Die Montagekosten richten sich nach Modell, Größe und ggf. Sonderwünschen. Nach Ihrer Anfrage erstellen wir ein individuelles und transparentes Angebot.",
  },
  {
    q: "Kann ich einen Wunschtermin für die Montage angeben?",
    a: "Ja, wir stimmen den Montagetermin ganz auf Ihren Zeitplan ab – flexibel auch am Wochenende. Nach Ihrer Anfrage nehmen wir Kontakt auf und vereinbaren gemeinsam einen passenden Termin.",
  },
];

const Stars = ({ count }: { count: number }) => (
  <span className="inline-flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} className="h-4 w-4" viewBox="0 0 24 24" fill={i <= count ? "#82B2CA" : "#e5e7eb"}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </span>
);

export const MontageServicePage = () => {

  return (
    <div className="relative text-neutral-900 bg-white overflow-x-hidden font-inter_tight">
      <Header />
      <main role="main">

        {/* ── Hero ── */}
        <section className="relative isolate overflow-hidden min-h-[380px] md:min-h-[460px] flex items-center justify-center text-center px-4 py-16">
          <img src={heroImg} alt="" className="absolute inset-0 z-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 z-10 bg-zinc-900/50" />
          <div className="relative z-20 max-w-3xl mx-auto">
            <p className="text-[#82B2CA] text-sm font-semibold uppercase tracking-[0.18em] mb-4">
              Von Planung bis Fertigstellung
            </p>
            <h1 className="font-lemonmilk text-white text-3xl md:text-4xl leading-tight mb-4">
              Montage Service
            </h1>
            <p className="text-white/80 text-base md:text-lg">
              Professionelle Installation Ihrer Pergola – schnell, sauber und zuverlässig durch unser zertifiziertes Fachteam.
            </p>
          </div>
        </section>

        {/* ── Process steps ── */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-16 py-16 md:py-24">
          <div className="text-center mb-14">
            <span className="inline-block rounded-full bg-[#82B2CA]/10 border border-[#82B2CA]/30 px-4 py-1.5 text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              So funktioniert es
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">Unser Montageprozess</h2>
            <p className="mt-3 text-neutral-500 max-w-lg mx-auto text-sm">
              Von der ersten Beratung bis zur finalen Abnahme – transparent, strukturiert und professionell.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* connecting line desktop */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-[#82B2CA]/20" style={{ zIndex: 0 }} />
            {steps.map((step, i) => (
              <div key={step.number} className="relative z-10 rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: i % 2 === 0 ? "#82B2CA" : "#344148" }}>
                    {step.number}
                  </div>
                  <div className="h-px flex-1 bg-neutral-100" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── What's included ── */}
        <section className="bg-zinc-50 py-16 md:py-24">
          <div className="max-w-[1440px] mx-auto px-4 md:px-16">
            <div className="text-center mb-14">
              <span className="inline-block rounded-full bg-[#82B2CA]/10 border border-[#82B2CA]/30 px-4 py-1.5 text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                Leistungsumfang
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">Das ist alles inklusive</h2>
              <p className="mt-3 text-neutral-500 max-w-lg mx-auto text-sm">
                Unser Montageservice ist vollständig – ohne versteckte Kosten.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {included.map((item) => (
                <div key={item.title} className="flex gap-4 rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: "#82B2CA1a", color: "#82B2CA" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 mb-1">{item.title}</p>
                    <p className="text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why us ── */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-16 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block rounded-full bg-[#82B2CA]/10 border border-[#82B2CA]/30 px-4 py-1.5 text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.2em] mb-5">
                Warum wir
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-5 leading-tight">
                Ihr Vertrauen ist unser Antrieb
              </h2>
              <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                Wir sind kein anonymes Callcenter – sondern ein eingespieltes Team, das für Qualität und Zuverlässigkeit steht. Jede Montage führen wir so durch, als wäre es unser eigenes Zuhause.
              </p>
              <ul className="space-y-4">
                {[
                  "Zertifizierte Monteure mit langjähriger Erfahrung",
                  "Fixpreisgarantie – keine unerwarteten Mehrkosten",
                  "Persönlicher Ansprechpartner vom ersten Kontakt bis zur Abnahme",
                  "Vollversicherter Service – Ihre Immobilie ist geschützt",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-700">
                    <div className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full mt-0.5" style={{ backgroundColor: "#82B2CA" }}>
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-5">
              {reasons.map((r) => (
                <div key={r.label} className="flex items-center gap-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div className="text-4xl font-bold shrink-0" style={{ fontFamily: "LEMONMILK, sans-serif", color: r.color }}>
                    {r.stat}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 mb-1">{r.label}</p>
                    <p className="text-xs text-neutral-500 leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Reviews ── */}
        <section className="bg-[#344148] py-16 md:py-24">
          <div className="max-w-[1440px] mx-auto px-4 md:px-16">
            <div className="text-center mb-14">
              <span className="inline-block rounded-full border border-[#82B2CA]/40 bg-[#82B2CA]/10 px-4 py-1.5 text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                Kundenstimmen
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Was unsere Kunden sagen</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <div key={r.name} className="flex flex-col gap-4 rounded-2xl bg-white/5 border border-white/10 p-7 hover:bg-white/8 transition-colors">
                  <Stars count={r.stars} />
                  <p className="text-sm text-white/80 leading-relaxed flex-1">"{r.text}"</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                    <div className="h-9 w-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                      style={{ backgroundColor: "#82B2CA" }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{r.name}</p>
                      <p className="text-xs text-white/40">{r.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Guarantee banner ── */}
        <section className="bg-[#82B2CA] py-12">
          <div className="max-w-[1440px] mx-auto px-4 md:px-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-xl">2 Jahre Montagegarantie</p>
                  <p className="text-white/80 text-sm mt-1">
                    Auf alle Montagearbeiten gewähren wir eine vollständige 2-jährige Handwerkergarantie.
                  </p>
                </div>
              </div>
              <Link
                to="/contact"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold transition hover:opacity-90"
                style={{ color: "#344148" }}
              >
                Jetzt anfragen
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white">
          <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#82B2CA]/20 blur-[100px]" />
          <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-[#82B2CA]/15 blur-[100px]" />
          <div className="relative max-w-[1440px] mx-auto px-4 md:px-16 py-16 md:py-[120px]">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#82B2CA]/10 border border-[#82B2CA]/30 px-4 py-1.5 mb-5">
                <svg className="h-4 w-4 text-[#82B2CA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
                <span className="text-sm font-semibold text-[#82B2CA]">Häufig gestellte Fragen</span>
              </div>
              <h2 className="text-zinc-900 text-[32px] font-bold leading-10 md:text-5xl md:leading-[58px]">
                Häufig gestellte Fragen
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-zinc-500 text-base md:text-lg">
                Hier finden Sie Antworten auf die wichtigsten Fragen rund um unseren Montageservice.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
              <div className="flex flex-col gap-4">
                {faqs.slice(0, 3).map((item, i) => (
                  <FAQItem key={i} number={i + 1} question={item.q} content={<p>{item.a}</p>} />
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {faqs.slice(3).map((item, i) => (
                  <FAQItem key={i} number={i + 4} question={item.q} content={<p>{item.a}</p>} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ backgroundColor: "#344148" }} className="py-16 md:py-24">
          <div className="max-w-[1440px] mx-auto px-4 md:px-16 text-center">
            <span className="inline-block rounded-full border border-[#82B2CA]/40 bg-[#82B2CA]/10 px-4 py-1.5 text-[#82B2CA] text-xs font-semibold uppercase tracking-[0.2em] mb-6">
              Jetzt starten
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: "LEMONMILK, sans-serif" }}>
              Bereit für Ihre neue Pergola?
            </h2>
            <p className="text-white/70 text-base mb-10 max-w-xl mx-auto leading-relaxed">
              Lassen Sie sich persönlich beraten und erhalten Sie ein unverbindliches Angebot – direkt von unserem Expertenteam.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full px-9 py-4 text-sm font-bold text-white transition hover:opacity-90 hover:shadow-lg"
                style={{ backgroundColor: "#82B2CA" }}
              >
                Montage anfragen
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a
                href="tel:+4966141087500"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-9 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                </svg>
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
