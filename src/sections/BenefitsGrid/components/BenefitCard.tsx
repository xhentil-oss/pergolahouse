export type BenefitCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  linkHref?: string;
  linkText?: string;
};

export const BenefitCard = (props: BenefitCardProps) => {
  return (
    <div className="box-border caret-transparent flex justify-center min-h-[auto] min-w-[auto] w-full">
      <div className="items-start bg-white box-border caret-transparent gap-x-3 flex flex-col justify-start max-w-[368px] min-h-[auto] min-w-[auto] gap-y-3 text-left w-full p-6 rounded-[28px]">
        <div className="relative aspect-[46_/_46] bg-cover box-border caret-transparent h-full max-h-[46px] max-w-[46px] min-h-[auto] min-w-[auto] w-full md:aspect-[92_/_92]">
          <picture className="box-border caret-transparent block h-full max-w-full w-full">
            <img
              src={props.imageSrc}
              alt={props.imageAlt}
              className="aspect-[auto_375_/_375] box-border caret-transparent h-full max-w-full object-cover w-full"
            />
          </picture>
        </div>
        <div className="box-border caret-transparent gap-x-2 flex flex-col max-w-[263.008px] min-h-[auto] min-w-[auto] gap-y-2">
          <div className="text-black text-2xl font-semibold box-border caret-transparent leading-7 min-h-[auto] min-w-[auto]">
            {props.title}
          </div>
          <div className="text-neutral-500 text-xl font-medium box-border caret-transparent min-h-[auto] min-w-[auto]">
            <div className="box-border caret-transparent">
              <p className="box-border caret-transparent inline">
                {props.description}
              </p>
            </div>
            {props.linkHref && props.linkText && (
              <a
                href={props.linkHref}
                className="text-blue-800 font-semibold box-border caret-transparent w-fit after:accent-auto after:bg-blue-800 after:box-border after:caret-transparent after:text-blue-800 after:hidden after:text-xl after:not-italic after:normal-nums after:font-semibold after:h-[13.6px] after:tracking-[normal] after:leading-6 after:list-outside after:list-disc after:[mask-image:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2718%27%20height=%2714%27%20fill=%27none%27%3E%3Cpath%20stroke=%27%231C274C%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%20stroke-width=%271.75%27%20d=%27M1%207h16m0%200-6-6m6%206-6%206%27/%3E%3C/svg%3E)] after:[mask-repeat:no-repeat] after:[mask-size:contain] after:pointer-events-auto after:text-left after:no-underline after:indent-[0px] after:normal-case after:align-middle after:visible after:w-[13.6px] after:ml-1.5 after:border-separate after:font-ui_sans_serif"
              >
                {props.linkText}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
