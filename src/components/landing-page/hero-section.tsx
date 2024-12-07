// "use client";
const HeroSection = () => {
  return (
    <div className="h-screen border relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 -z-20 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HeroSection;
