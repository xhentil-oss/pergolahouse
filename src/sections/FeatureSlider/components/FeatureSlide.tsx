export type FeatureSlideProps = {
  imageSrc: string;
  imageAlt: string;
  imageClassName: string;
  strongText: string;
  bodyText: React.ReactNode;
};

export const FeatureSlide = (props: FeatureSlideProps) => {
  return (
    <li className="flex flex-col gap-6 shrink-0 w-[260px] md:w-[480px] snap-start">
      <div className="overflow-hidden rounded-[28px] aspect-square w-full">
        <img
          src={props.imageSrc}
          alt={props.imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-neutral-500 font-semibold leading-5">
        <p>
          <strong className="text-zinc-900">{props.strongText}</strong>
          {props.bodyText}
        </p>
      </div>
    </li>
  );
};
