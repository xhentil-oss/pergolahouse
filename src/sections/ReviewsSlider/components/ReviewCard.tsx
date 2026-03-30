export type ReviewCardProps = {
  imageSrc: string;
  imageAlt: string;
  reviewerName: string;
  reviewText: React.ReactNode;
  rating: number;
};

export const ReviewCard = (props: ReviewCardProps) => {
  const { imageSrc, imageAlt, reviewerName, reviewText, rating } = props;

  return (
    <li className="relative shrink-0 w-[260px] md:w-[289px] snap-start overflow-hidden rounded-[24px]">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full aspect-[289/456] object-cover"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      {/* Reviewer badge */}
      <div className="absolute top-4 left-4 text-white text-sm font-semibold bg-black/50 px-3 py-1.5 rounded-2xl backdrop-blur-sm">
        {reviewerName}
      </div>
      {/* Review content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
        <p className="text-white text-sm font-medium leading-5 line-clamp-4">
          {reviewText}
        </p>
        <div className="flex items-center gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
          <span className="text-white text-xs font-medium ml-1">{rating}/5</span>
        </div>
      </div>
    </li>
  );
};
