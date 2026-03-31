import { useRef } from "react";
import { ReviewCard } from "@/sections/ReviewsSlider/components/ReviewCard";

const reviews = [
  {
    imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/24.jpg",
    imageAlt: "Pergola mit Glaswänden im Winter",
    reviewerName: "Stefanie Groß",
    reviewText: "Wir sind sehr zufrieden mit unserer Pergola! Die Bestellung war unkompliziert, und der Support war fantastisch. Alle unsere Fragen wurden freundlich und schnell beantwortet. Die Lieferung war pünktlich und die Installation verlief reibungslos.",
    rating: 5,
  },
  {
    imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/30.jpg",
    imageAlt: "Pergola mit LED-Beleuchtung",
    reviewerName: "Markus Hoppe",
    reviewText: "Wir haben unsere Pergola heute aufgebaut! Es hat alles wunderbar funktioniert! Alle Teile waren vorhanden. Die Schritt für Schritt Anleitung hat an allen Stellen gepasst. Ein Rundum perfektes Produkt!",
    rating: 5,
  },
  {
    imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/34.jpg",
    imageAlt: "Pergola mit LED-Beleuchtung an einem Haus",
    reviewerName: "Rainer Stuhlberger",
    reviewText: "Ich habe mittlerweile eine menge sachen aufgebaut, und bei der pergola muss ich sagen das diese sicher einer der hochwertigsten, durchdachtesten und schönsten sachen war. Einfach top!",
    rating: 5,
  },
  {
    imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/33.jpg",
    imageAlt: "Anthrazitfarbene Pergola als Terrassenüberdachung",
    reviewerName: "Kirsten Güther",
    reviewText: "Kein Vergleich zu unserer Pergola davor!! Sieht super aus und ist auch noch gut verarbeitet! MEEEGA!!",
    rating: 5,
  },
  {
    imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/35.jpg",
    imageAlt: "Weiße Pergola auf einer Terrasse",
    reviewerName: "Silvia Renner",
    reviewText: "Wir haben uns die Pergola in 6x 4 Meter gekauft. Schaut echt wunderschön aus, die Farbe passt perfekt zum Haus! Lieferzeit war top, sehr flott. Kundenservice sehr nett! Ein sehr gutes Produkt.",
    rating: 5,
  },
  {
    imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/31.jpg",
    imageAlt: "Anthrazitfarbene Pergola auf Terrasse mit Glasgeländer",
    reviewerName: "Hoffmann",
    reviewText: "Die Pergola hat alle Erwartungen erfüllt. Selbst das Anpassen der Höhe, sowie der Aufbau auf engstem Raum hat sehr gut geklappt. Wir können die Pergola S2 auf jeden Fall weiter empfehlen.",
    rating: 4,
  },
  {
    imageSrc: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/28.jpg",
    imageAlt: "Einfamilienhaus bei Nacht mit beleuchteter Pergola",
    reviewerName: "Andreas Wolf",
    reviewText: "Wir sind sehr zufrieden mit unserer maßgefertigten Pergola Sundream S2 inkl. LED Beleuchtung und Rollos auf zwei Seiten. Die Pergola ist hochwertig, sieht toll aus und ist auch sehr gut verarbeitet.",
    rating: 5,
  },
];

export const ReviewsSlider = () => {
  const scrollRef = useRef<HTMLUListElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 310 : -310, behavior: "smooth" });
  };

  return (
    <section className="bg-neutral-100 overflow-hidden py-16 md:py-[120px]">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h2 className="text-zinc-900 text-[32px] font-semibold leading-10 md:text-5xl md:leading-[58px] max-w-[500px]">
            Über 100.000 zufriedene Kunden weltweit.
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-neutral-400 text-base font-semibold border-r border-zinc-300 pr-4">
              Folge uns für mehr
            </span>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                <img src="https://c.animaapp.com/mnd7yb7cX3zmke/assets/111.png" alt="Instagram" className="w-7 h-7 object-contain" />
              </a>
              <a href="https://www.youtube.com/channel/UChFl3vWUBB0M5y4egNpDvsw" aria-label="YouTube" className="hover:opacity-80 transition-opacity">
                <img src="https://c.animaapp.com/mnd7yb7cX3zmke/assets/89.png" alt="YouTube" className="w-7 h-7 object-contain" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="max-w-[1440px] mx-auto">
        <ul
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-4 md:px-16 pb-4 snap-x snap-mandatory no-scrollbar"
        >
          {reviews.map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </ul>
      </div>

      {/* Nav buttons */}
      <div className="hidden md:flex justify-end gap-3 pt-8 pr-16 max-w-[1440px] mx-auto">
        <button
          onClick={() => scroll("left")}
          aria-label="Previous"
          className="flex items-center justify-center bg-zinc-300 hover:bg-zinc-400 w-9 h-9 rounded-full transition-colors"
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none"><path d="M8.5 1L1.5 8.5L8.5 16" stroke="#666" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          onClick={() => scroll("right")}
          aria-label="Next"
          className="flex items-center justify-center bg-zinc-300 hover:bg-zinc-400 w-9 h-9 rounded-full transition-colors"
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none"><path d="M1.5 1L8.5 8.5L1.5 16" stroke="#666" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </section>
  );
};
