// Backup of VideoSlide.tsx before deletion
import { useState } from "react";

export type VideoSlideProps = {
	title: string;
	thumbnailUrl: string;
	videoId: string;
	duration?: string;
};

export const VideoSlide = ({ title, thumbnailUrl, videoId, duration }: VideoSlideProps) => {
	const [playing, setPlaying] = useState(false);

	return (
		<>
			<li
				className="relative shrink-0 w-[85vw] md:w-[760px] aspect-video snap-center overflow-hidden rounded-[24px] cursor-pointer group"
				onClick={() => setPlaying(true)}
			>
				<img
					src={thumbnailUrl}
					alt={title}
					className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

				{/* Play button */}
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="bg-white/20 backdrop-blur-sm border-2 border-white/70 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-white/35 group-hover:scale-110 transition-all duration-300">
						<svg width="22" height="26" viewBox="0 0 24 28" fill="white"><path d="M1 1l22 13L1 27V1z"/></svg>
					</div>
				</div>

				{/* Duration badge */}
				{duration && (
					<div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-md backdrop-blur-sm">
						{duration}
					</div>
				)}

				{/* Title */}
				<div className="absolute bottom-8 left-8 right-8 text-white text-xl font-semibold md:text-3xl">
					{title}
				</div>
			</li>

			{playing && (
				<div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90" onClick={() => setPlaying(false)}>
					<div className="relative w-full max-w-4xl mx-4 aspect-video" onClick={(e) => e.stopPropagation()}>
						<button onClick={() => setPlaying(false)} className="absolute -top-10 right-0 text-white text-3xl font-light hover:opacity-70 transition-opacity">✕</button>
						<iframe
							src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
							title={title}
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
