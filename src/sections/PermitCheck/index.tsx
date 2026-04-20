import { Link } from "react-router-dom";

const features = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#82B2CA" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Zertifizierte Monteure",
    description: "Unser Team besteht aus erfahrenen Fachleuten mit jahrelanger Expertise.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#82B2CA" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Schnelle Montage",
    description: "Professionelle Installation in 1–2 Tagen – ohne Schmutz und Stress.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#82B2CA" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Vor-Ort-Beratung",
    description: "Wir kommen zu dir, messen aus und finden die beste Lösung für deinen Außenbereich.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#82B2CA" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Nachsorge & Support",
    description: "Auch nach der Montage stehen wir dir bei Fragen oder Wünschen jederzeit zur Seite.",
  },
];

export const PermitCheck = () => {
  return (
    <section className="bg-white py-14 md:py-28 border-t border-neutral-100">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-14 gap-4 md:gap-6">
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase text-[#82B2CA] mb-2 md:mb-3"
              style={{ fontFamily: "LEMONMILK, sans-serif" }}
            >
              Unser Service
            </p>
            <h2
              className="text-xl md:text-4xl text-[#344148] leading-snug"
              style={{ fontFamily: "LEMONMILK, sans-serif", fontWeight: 400 }}
            >
              Professioneller{" "}
              <span style={{ color: "#82B2CA" }}>Montage Service</span>
            </h2>
          </div>
          <Link
            to="/montage-service"
            className="inline-flex items-center gap-2 self-start md:self-auto rounded-full px-7 py-3 text-sm font-semibold text-white transition-all hover:opacity-85"
            style={{ backgroundColor: "#344148" }}
          >
            Mehr erfahren
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 hover:shadow-md transition-shadow"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#82B2CA]/10">
                {f.icon}
              </div>
              <h3 className="text-[#344148] font-semibold text-base mb-2">{f.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
