import Features from "@/components/landing-page/features";
import HeroSection from "@/components/landing-page/hero-section";
import Working from "@/components/landing-page/how-it-works";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <Working />
      <Features />
    </div>
  );
}
