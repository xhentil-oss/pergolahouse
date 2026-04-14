import video1 from "@/assets/Photo 1 (1).webm";

export const PermitCheck = () => {
  return (
    <section className="relative overflow-hidden h-[55vh] md:h-[65vh]">
      <video
        src={video1}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
    </section>
  );
};
