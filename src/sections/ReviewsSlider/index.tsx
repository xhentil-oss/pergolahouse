import { Link } from "react-router-dom";

const items = [
  {
    number: '01.',
    title: 'Elegante Pergola',
    description: 'Exklusive Aluminium-Pergola mit drehbaren Lamellen, integriertem Wasserablauf und modernem Design. Bietet optimalen Schutz und Komfort für anspruchsvolle Außenbereiche – optional mit LED, Sensoren und Glas- oder Zip-Systemen.',
    link: '/pergola/elegante-pergola',
  },
  {
    number: '02.',
    title: 'Luxus-Pergola',
    description: 'Luxus-Pergola aus Aluminium mit komplett einfahrbaren und drehbaren Lamellen für maximalen Komfort und Raumgefühl. Dach lässt sich vollständig öffnen, bietet flexiblen Schutz und individuelle Lichtsteuerung. Optional mit LED, Sensoren und Glas- oder Zip-Systemen.',
    link: '/pergola/luxus-pergola',
  },
  {
    number: '03.',
    title: 'Preiswerte Pergola',
    description: 'Preiswerte Aluminium-Pergola im Kit-System: moderne Optik, zuverlässiger Schutz und einfache Montage zum attraktiven Preis. Ideal für stilvolle Außenbereiche mit effizienter Planung.',
    link: '/pergola/preiswerte-pergola',
  },
  {
    number: '04.',
    title: 'Wintergärten',
    description: 'Wintergarten aus Aluminium und Glas mit festem Glasdach: lichtdurchflutete Räume, moderner Look und zuverlässiger Wetterschutz. Optional mit Schiebe-, Guillotine- oder Zip-Systemen und Automatisierung.',
    link: '/wintergarten',
  },
  {
    number: '05.',
    title: 'Carports',
    description: 'Carport aus Aluminium mit isolierten Sandwichpaneelen: langlebig, pflegeleicht und wetterfest. Schützt Fahrzeuge zuverlässig und bietet optional LED, Sensoren und smarte Steuerung.',
    link: '/carports',
  },
  {
    number: '06.',
    title: 'Zip-Screens',
    description: 'Zip-Screen-System für effektiven Sonnen-, Sicht- und Windschutz: robust, modern und vielseitig für Pergolen, Fassaden und Glasdächer. Optional mit Motor, Fernbedienung und vielen Stoffvarianten.',
    link: '/zip-screens',
  },
];

export const ReviewsSlider = () => {
  return (
    <section className="bg-[#232323] py-14 md:py-[120px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16">
        <div className="mb-8 md:mb-12">
          <h2 className="text-white text-2xl md:text-5xl font-extrabold leading-tight">
            Wir bieten Experten für Ihr Projekt
          </h2>
        </div>
        <div className="divide-y divide-[#444]">
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-[auto_1fr_auto] md:flex md:flex-row md:items-center py-5 md:py-10 gap-x-4 gap-y-2 md:gap-0 relative">
              <span className="text-2xl md:text-5xl font-extrabold text-white md:mr-10 md:min-w-[90px] self-center">{item.number}</span>
              <div className="flex flex-col md:flex-row md:flex-1 md:items-center gap-1 md:gap-0">
                <span className="text-sm md:text-xl font-bold text-white uppercase tracking-wide md:w-1/3">{item.title}</span>
                <p className="text-neutral-300 text-sm md:text-lg font-medium md:pl-8 md:flex-1">{item.description}</p>
              </div>
              <div className="flex-shrink-0 self-center md:ml-10">
                <Link
                  to={item.link}
                  className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#82B2CA] hover:bg-[#6ea0b7] transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
