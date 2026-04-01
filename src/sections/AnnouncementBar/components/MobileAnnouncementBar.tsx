export const MobileAnnouncementBar = () => {
  return (
    <div className="box-border caret-transparent block max-w-[1440px] mx-auto px-4 py-2 md:hidden md:px-16">
      <div className="box-border caret-transparent">
        <div className="box-border caret-transparent overflow-hidden">
          <div className="box-border caret-transparent w-full overflow-hidden">
            <ul className="box-border caret-transparent flex flex-col h-full list-none max-h-9 overflow-x-hidden overflow-y-auto scroll-smooth pl-0">
              <li className="items-center box-border caret-transparent flex shrink-0 h-9 justify-center min-h-[auto] min-w-[auto] snap-start w-full md:min-h-0 md:min-w-0">
                <div className="box-border caret-transparent block min-h-[auto] min-w-[auto] md:min-h-0 md:min-w-0"></div>
                <div className="items-center box-border caret-transparent gap-x-2 flex justify-center min-h-[auto] min-w-[auto] w-full md:gap-x-4 md:min-h-0 md:min-w-0">
                  <div className="items-end box-border caret-transparent flex flex-col min-h-[auto] min-w-[auto] md:min-h-0 md:min-w-0">
                    <div className="text-neutral-500 text-xs font-medium box-border caret-transparent gap-x-1 hidden leading-4 gap-y-1 md:text-sm md:flex md:leading-[18px]">
                      Wir sind
                      <span className="text-[#82B2CA] text-xs box-border caret-transparent inline leading-4 md:text-sm md:block md:leading-[18px]">
                        erreichbar
                      </span>
                    </div>
                    <div
                      role="button"
                      className="text-white text-base font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] text-right w-fit md:text-xs md:leading-4 md:min-h-0 md:min-w-0"
                    >
                      +49 661 4108750
                    </div>
                  </div>
                  <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] md:min-h-0 md:min-w-0">
                    <div className="relative aspect-square bg-[url('https://pergolux.de/cdn/shop/files/RAY00306.jpg?v=1769676835&width=1')] bg-cover box-border caret-transparent h-full max-h-9 max-w-9 w-full overflow-hidden rounded-[159984px]">
                      <picture className="box-border caret-transparent block h-full max-w-full w-full">
                        
                      </picture>
                    </div>
                    <div className="absolute text-[#82B2CA] bg-[#82B2CA] box-border caret-transparent h-3 w-3 border border-[#344148] rounded-[159984px] border-solid left-0 bottom-0"></div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
