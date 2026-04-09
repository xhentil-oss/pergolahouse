import { Link } from "react-router-dom";

const services = [
  {
    title: "Beratung & Planung",
    description: "Individuelle Beratung für dein Projekt. Wir helfen dir, die perfekte Pergola für deinen Außenbereich zu finden – passend zu deinem Stil und Budget.",
    image: "https://pergolux.de/cdn/shop/files/Background_2925695b-1454-42a8-a462-afa20b8f07be.png?crop=center&height=900&v=1746170598&width=1200",
    link: "/contact",
    linkText: "Jetzt beraten lassen",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    title: "Maßanfertigung",
    description: "Deine Pergola, nach deinen Maßen. Wir fertigen jede Pergola individuell in Europa – millimetergenau für dein Zuhause.",
    image: "https://pergolux.de/cdn/shop/files/S3_Stronger_than_ever5.png?crop=center&height=900&v=1745831741&width=1200",
    link: "/products/pergola-massanfertigung",
    linkText: "Konfigurator starten",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Lieferung & Montage",
    description: "Schnelle Lieferung direkt vor deine Haustür. Einfache Selbstmontage mit unserer App und Video-Anleitungen – oder beauftrage unseren Montageservice.",
    image: "https://pergolux.de/cdn/shop/files/effortless-assembly_a659fcec-e1e2-42e3-8b42-98495d7574a5.png?crop=center&height=900&v=1742387411&width=1200",
    link: "/collections/unsere-pergolen",
    linkText: "Pergolen entdecken",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    title: "Zubehör & Erweiterungen",
    description: "Erweitere deine Pergola mit hochwertigem Zubehör: Screen Rollos, Glaswände, LED-Beleuchtung, Wärmelampen und mehr – alles per SnapFIT™ einfach nachrüstbar.",
    image: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/Sundream_3x4_Screens-4x3.jpg?v=1711543068",
    link: "/collections/pergola-zubehoer",
    linkText: "Zubehör ansehen",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
      </svg>
    ),
  },
  {
    title: "Smart Home Integration",
    description: "Steuere deine Pergola bequem per App, Sprachassistent oder Fernbedienung. Vollautomatische Dach- und Lichtsteuerung für maximalen Komfort.",
    image: "https://cdn.shopify.com/s/files/1/0575/2173/3813/files/PERGOLUXPergola-Series3-Image53.jpg?v=1743753723",
    link: "/products/pergola-s3",
    linkText: "Smart Pergola entdecken",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    title: "Garantie & Service",
    description: "Bis zu 10 Jahre Garantie auf alle Produkte. Unser Kundenservice ist immer für dich da – persönlich, schnell und zuverlässig.",
    image: "https://pergolux.de/cdn/shop/files/PERGOLUX_Story_6_88a3e853-e322-4f21-ab7a-60175e9204a0.jpg?crop=center&format=pjpg&height=900&v=1741620042&width=1200",
    link: "/contact",
    linkText: "Kontakt aufnehmen",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export const FeatureSlider = () => {
  return (
    <div className="bg-neutral-100 overflow-hidden py-16 md:py-[120px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#82B2CA] font-semibold tracking-wider uppercase text-sm mb-3">Was wir bieten</p>
          <h2 className="text-zinc-900 text-[32px] font-semibold leading-10 md:text-5xl md:leading-[58px] max-w-[700px] mx-auto">
            Unsere Leistungen – von der Beratung bis zur Montage.
          </h2>
          <p className="text-neutral-500 text-lg mt-4 max-w-[600px] mx-auto">
            Alles aus einer Hand: Wir begleiten dich von der ersten Idee bis zur fertigen Pergola.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Link
              key={i}
              to={service.link}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  {service.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-zinc-900 text-xl font-semibold mb-2 group-hover:text-[#82B2CA] transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="text-[#82B2CA] font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {service.linkText}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
