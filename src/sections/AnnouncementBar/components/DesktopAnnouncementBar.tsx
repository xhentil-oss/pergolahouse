export const DesktopAnnouncementBar = () => {
  return (
    <div className="box-border caret-transparent hidden md:block">
      <div className="items-center box-border caret-transparent gap-x-4 flex justify-between max-w-[1440px] gap-y-4 mx-auto px-4 py-1 md:px-16 md:py-2">
        <div className="text-white box-border caret-transparent min-h-0 min-w-0 w-full md:min-h-[auto] md:min-w-[auto]"></div>
        <div className="items-center box-border caret-transparent hidden h-full justify-center w-full"></div>
        <div className="box-border caret-transparent flex grow shrink-0 h-9 justify-end min-h-0 min-w-0 w-max md:shrink md:min-h-[auto] md:min-w-[auto] md:w-full">
          <div className="box-border caret-transparent block min-h-0 min-w-0 md:min-h-[auto] md:min-w-[auto]"></div>
          <div className="items-center box-border caret-transparent gap-x-2 flex justify-end max-w-max min-h-0 min-w-0 w-full md:gap-x-4 md:max-w-full md:min-h-[auto] md:min-w-[auto]">
            <div className="items-end box-border caret-transparent flex flex-col min-h-0 min-w-0 md:min-h-[auto] md:min-w-[auto]">
              <div className="text-neutral-500 text-xs font-medium box-border caret-transparent gap-x-1 hidden leading-4 min-h-0 min-w-0 gap-y-1 md:text-sm md:flex md:leading-[18px] md:min-h-[auto] md:min-w-[auto]">
                Wir sind
                <span className="text-green-500 text-xs box-border caret-transparent inline leading-4 min-h-0 min-w-0 md:text-sm md:block md:leading-[18px] md:min-h-[auto] md:min-w-[auto]">
                  erreichbar
                </span>
              </div>
              <div
                role="button"
                className="text-white text-base font-semibold box-border caret-transparent block leading-5 min-h-0 min-w-0 text-right w-fit md:text-xs md:leading-4 md:min-h-[auto] md:min-w-[auto]"
              >
                +49 661 4108750
              </div>
            </div>
            <div className="relative box-border caret-transparent min-h-0 min-w-0 md:min-h-[auto] md:min-w-[auto]">
              <div className="relative aspect-square bg-[url('https://pergolux.de/cdn/shop/files/RAY00306.jpg?v=1769676835&width=1')] bg-cover box-border caret-transparent h-full max-h-9 max-w-9 w-full overflow-hidden rounded-[159984px]">
                <picture className="box-border caret-transparent block h-full max-w-full w-full">
                  <img
                    src="https://c.animaapp.com/mnd7yb7cX3zmke/assets/63.jpg"
                    alt=""
                    className="aspect-[auto_375_/_375] box-border caret-transparent h-full max-w-full object-cover w-full"
                  />
                </picture>
              </div>
              <div className="absolute text-green-500 bg-green-500 box-border caret-transparent h-3 w-3 border border-green-900 rounded-[159984px] border-solid left-0 bottom-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
