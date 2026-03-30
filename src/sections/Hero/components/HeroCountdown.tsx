import { useState, useEffect } from "react";

const getTimeLeft = () => {
  // Sale ends in ~14 days from now
  const target = new Date();
  target.setDate(target.getDate() + 14);
  target.setHours(23, 59, 59, 0);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
};

export const HeroCountdown = () => {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-max">
      <div className="text-amber-500 items-center bg-zinc-900/90 gap-x-3 flex flex-wrap h-full justify-center min-h-11 gap-y-2 border border-zinc-700 px-4 py-2.5 rounded-xl md:flex-row">
        <div className="items-center gap-x-2 flex h-max justify-center">
          <img src="https://c.animaapp.com/mnd7yb7cX3zmke/assets/icon-10.svg" alt="" className="shrink-0 h-5 w-5" />
          <div className="font-semibold leading-5 text-sm">Vorabzugang endet in</div>
        </div>
        <div className="text-white font-mono font-bold text-sm">
          {time.d}T : {String(time.h).padStart(2, "0")}H : {String(time.m).padStart(2, "0")}M : {String(time.s).padStart(2, "0")}S
        </div>
      </div>
    </div>
  );
};
