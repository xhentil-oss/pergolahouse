export const HeroMedia = () => {
  return (
    <div className="relative box-border caret-transparent h-full min-w-[auto] w-full md:w-6/12">
      <div className="relative aspect-[400_/_384] bg-[url('https://pergolux.de/cdn/shop/files/2408_PERGOLUX_Pergola_S2_4x4_Anthracite_Wall-Mounted_Screens_Stoppel_Germany_STD_-005_2_c6947a95-e2de-4f64-8cf4-1f5f15c9aa24.jpg?v=1774416851&width=1')] bg-cover box-border caret-transparent inline-block h-full w-full bg-center md:aspect-[1440_/_1024]">
        <picture className="box-border caret-transparent block h-full max-w-full w-full">
          <img
            src="https://c.animaapp.com/mnd7yb7cX3zmke/assets/92.jpg"
            alt=""
            className="aspect-[auto_375_/_250] box-border caret-transparent h-full max-w-full object-cover w-full"
          />
        </picture>
      </div>
      <div className="absolute bg-[linear-gradient(rgba(0,0,0,0),rgb(0,0,0)_90%)] box-border caret-transparent flex h-3/6 w-full left-0 bottom-0 md:hidden"></div>
    </div>
  );
};
