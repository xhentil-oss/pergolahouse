// Backup of VideoSlider index.tsx before deletion
const video1 = {
	title: "Einführung der Serie 3",
	thumbnailUrl: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/125.jpg",
	videoId: "LXb3EKWsInQ",
	duration: "2:47",
};
const video2 = {
	title: "Thore kommt aus dem Schwärmen gar nicht mehr heraus",
	thumbnailUrl: "https://c.animaapp.com/mnd7yb7cX3zmke/assets/133.png",
	videoId: "LXb3EKWsInQ",
	duration: "5:13",
};
// Section removed as requested
								className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
							/>
							<button
								className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full h-full"
								onClick={() => setOpenIndex(i)}
								aria-label={`Play video: ${video.title}`}
							>
								<svg className="w-16 h-16 text-white mb-2" fill="currentColor" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.4)"/><polygon points="26,20 50,32 26,44" fill="#fff"/></svg>
								<span className="text-white text-lg font-semibold drop-shadow-lg">Shiko Videon</span>
							</button>
							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
								<div className="flex items-center justify-between">
									<span className="text-white font-semibold text-base truncate max-w-[80%]">{video.title}</span>
									<span className="text-white text-xs bg-black/50 rounded px-2 py-0.5 ml-2">{video.duration}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			{/* ...modal handled by playing state above, nothing here... */}
		</section>
	);
};
