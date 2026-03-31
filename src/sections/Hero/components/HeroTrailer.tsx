import { useState } from "react";

export const HeroTrailer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-amber-500 text-xl font-semibold gap-x-3 flex items-center cursor-pointer bg-transparent border-0 p-0 hover:opacity-80 transition-opacity"
      >
        <img src="https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-11.svg" alt="" className="h-[26px] w-[22px]" />
        Trailer ansehen
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl mx-4 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-white text-3xl font-light leading-none hover:opacity-70 transition-opacity"
              aria-label="Close"
            >
              ✕
            </button>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Pergola Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
};
