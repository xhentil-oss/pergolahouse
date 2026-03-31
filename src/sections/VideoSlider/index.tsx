import { useRef } from "react";
import { VideoSlide } from "@/sections/VideoSlider/components/VideoSlide";

const videos = [
  {
    title: "Einführung der Serie 3",
    thumbnailUrl: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/125.jpg",
    videoId: "LXb3EKWsInQ",
    duration: "2:47",
  },
  {
    title: "Thore kommt aus dem Schwärmen gar nicht mehr heraus",
    thumbnailUrl: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/133.png",
    videoId: "LXb3EKWsInQ",
    duration: "5:13",
  },
  {
    title: "Sundream S3 – jetzt entdecken",
    thumbnailUrl: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/122.png",
    videoId: "LXb3EKWsInQ",
    duration: "3:29",
  },
];

export const VideoSlider = () => {
  const scrollRef = useRef<HTMLUListElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 700 : -700, behavior: "smooth" });
  };

  return (
    <section className="bg-white overflow-hidden py-14 md:py-[120px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 mb-10">
        <h2 className="text-zinc-900 text-[32px] font-semibold leading-10 max-w-[748px] mb-4 md:text-5xl md:leading-[58px]">
          Wie die perfekte Pergola hergestellt wird
        </h2>
        <p className="text-zinc-500 font-medium text-base max-w-[748px] md:text-xl md:leading-7">
          Finde heraus, warum unsere Pergolen so geschätzt werden – und was andere über ihre Erfahrungen mit uns berichten.
        </p>
      </div>

      <div className="max-w-[1440px] mx-auto">
        <ul
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-4 md:px-16 pb-4 snap-x snap-mandatory no-scrollbar"
        >
          {videos.map((video, i) => (
            <VideoSlide key={i} title={video.title} thumbnailUrl={video.thumbnailUrl} videoId={video.videoId} duration={video.duration} />
          ))}
        </ul>
      </div>

      <div className="hidden md:flex justify-end gap-3 pt-8 pr-16 max-w-[1440px] mx-auto">
        <button onClick={() => scroll("left")} aria-label="Previous" className="flex items-center justify-center bg-zinc-200 hover:bg-zinc-300 w-9 h-9 rounded-full transition-colors">
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none"><path d="M8.5 1L1.5 8.5L8.5 16" stroke="#666" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button onClick={() => scroll("right")} aria-label="Next" className="flex items-center justify-center bg-zinc-200 hover:bg-zinc-300 w-9 h-9 rounded-full transition-colors">
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none"><path d="M1.5 1L8.5 8.5L1.5 16" stroke="#666" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </section>
  );
};
