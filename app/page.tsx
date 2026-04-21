import { Hero } from "@/components/home/Hero";
import { MacStudioReveal } from "@/components/home/MacStudioReveal";
import { PrizeReveal } from "@/components/home/PrizeReveal";
import { ViralContentSection } from "@/components/home/ViralContentSection";
import { SponsorWheel } from "@/components/home/SponsorWheel";
import { SocialMediaLinks } from "@/components/home/SocialMediaLinks";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <MacStudioReveal />
      <PrizeReveal />
      <SponsorWheel />
      <SocialMediaLinks />
      <ViralContentSection />
    </main>
  );
}
