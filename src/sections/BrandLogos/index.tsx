const uspCards = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.04-3.36a1.5 1.5 0 010-2.49l5.04-3.36a1.5 1.5 0 012.16 1.25v6.72a1.5 1.5 0 01-2.16 1.24zM20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    title: "Einfache Selbstmontage",
    description: "Schritt-für-Schritt Anleitungen & Video-Tutorials – kein Fachmann nötig.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: "Premium Aluminium",
    description: "Pulverbeschichtetes Aluminium – rostfrei, langlebig & pflegeleicht.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Bis zu 10 Jahre Garantie",
    description: "Sorgenfrei genießen – mit unserer erweiterten Herstellergarantie.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: "Persönliche Beratung",
    description: "Unsere Experten helfen dir bei Planung, Auswahl & allen Fragen.",
  },
];

export const BrandLogos = () => {
  return (
    <section className="bg-stone-50 py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-4 md:px-16">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#82B2CA] mb-3">
            Warum Pergola Haus?
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#344148]">
            Was uns auszeichnet
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {uspCards.map((card, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl p-8 border border-stone-200/80 hover:border-[#82B2CA]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#82B2CA]/5 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#344148]/5 text-[#82B2CA] group-hover:bg-[#82B2CA]/10 group-hover:scale-110 transition-all duration-300">
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#344148] mb-2">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-neutral-500">
                {card.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-[#82B2CA] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
