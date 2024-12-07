"use client";

const HeroSection = () => {
  return (
    <div className="h-screen font-sans relative flex items-center justify-center text-primary-text">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 -z-20 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Revolutionizing Crypto Airdrops
        </h1>

        <p className="text-lg md:text-xl font-light mb-8">
          Leverage GitHub insights to create fair and impactful token
          distributions for genuine contributors.
        </p>
        {/* Call-to-Action Buttons */}
        <div className="space-x-4">
          <button className="px-6 py-3 hover:bg-primary-text hover:text-primary-bg font-semibold border border-primary-text backdrop-blur-sm rounded-full text-lg transition duration-500">
            Register Your Organization
          </button>
          <button className="px-6 py-3 hover:bg-transparent text-primary-bg bg-primary-text hover:text-primary-text font-semibold border border-primary-text backdrop-blur-sm rounded-full text-lg transition duration-500">
            Learn More
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 px-6 py-3 rounded-lg backdrop-blur-md shadow-lg">
        <p className="text-sm md:text-base">
          <span className="font-bold">$20M+</span> Tokens Distributed |{" "}
          <span className="font-bold">500+</span> Projects Rewarded
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
