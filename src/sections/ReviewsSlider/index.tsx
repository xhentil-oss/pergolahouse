
const reviews = [
  {
    imageSrc: "/src/assets/Photo%20(1).png",
    imageAlt: "Pergola im Garten",
    reviewerName: "Lena Schneider",
    reviewText: "Die Pergola ist ein absoluter Hingucker in unserem Garten. Die Qualität ist hervorragend und die Montage war unkompliziert. Wir genießen jetzt jeden Sommertag draußen!",
    rating: 5,
  },
  {
    imageSrc: "/src/assets/Photo%20(2).png",
    imageAlt: "Pergola mit LED-Beleuchtung",
    reviewerName: "Johannes Weber",
    reviewText: "Super Service und tolle Beratung! Die Lieferung erfolgte schnell und die Pergola entspricht genau unseren Vorstellungen. Sehr empfehlenswert!",
    rating: 5,
  },
  {
    imageSrc: "/src/assets/Photo%20(3).png",
    imageAlt: "Pergola am Haus",
    reviewerName: "Sabine Müller",
    reviewText: "Wir sind begeistert von der Stabilität und dem modernen Design. Auch bei Regenwetter können wir die Terrasse nutzen. Danke für die tolle Umsetzung!",
    rating: 5,
  },
  {
    imageSrc: "/src/assets/Photo%20(4).png",
    imageAlt: "Pergola auf der Terrasse",
    reviewerName: "Thomas Fischer",
    reviewText: "Die Investition hat sich gelohnt. Die Pergola ist hochwertig verarbeitet und sieht einfach klasse aus. Der Kundenservice war jederzeit erreichbar.",
    rating: 5,
  },
  {
    imageSrc: "/src/assets/Photo%20(5).png",
    imageAlt: "Weiße Pergola auf einer Terrasse",
    reviewerName: "Katrin Hoffmann",
    reviewText: "Wir haben lange nach einer passenden Lösung gesucht und hier gefunden. Die Pergola passt perfekt zu unserem Haus und die Nachbarn sind auch begeistert.",
    rating: 5,
  },
  {
    imageSrc: "/src/assets/Photo%20(6).png",
    imageAlt: "Pergola mit Glasgeländer",
    reviewerName: "Michael Braun",
    reviewText: "Sehr gute Qualität und ein schönes Design. Die Montageanleitung war verständlich und alles hat auf Anhieb gepasst. Gerne wieder!",
    rating: 4,
  },
];

export const ReviewsSlider = () => {
  return (
    <section className="bg-neutral-100 py-16 md:py-[120px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16">
        <h2 className="text-zinc-900 text-3xl md:text-5xl font-bold mb-12 text-center">Was unsere Kunden über uns sagen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-zinc-100 hover:shadow-2xl transition-shadow">
              <img
                src={review.imageSrc}
                alt={review.imageAlt}
                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-[#82B2CA] shadow"
              />
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <svg
                    key={idx}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill={idx < review.rating ? "#FFD700" : "#E5E7EB"}
                  >
                    <polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,18.99 10,15.27 4.18,18.99 6,12.14 0.49,7.64 7.41,7.36" />
                  </svg>
                ))}
              </div>
              <p className="text-zinc-800 text-base font-medium mb-4">“{review.reviewText}”</p>
              <span className="text-[#82B2CA] font-semibold text-lg">{review.reviewerName}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
