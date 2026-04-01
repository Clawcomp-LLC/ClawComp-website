import { Hero } from "@/components/home/Hero";
import { MacMiniReveal } from "@/components/home/MacMiniReveal";
import { ViralContentSection } from "@/components/home/ViralContentSection";
import { SponsorWheel } from "@/components/home/SponsorWheel";
import { SocialMediaLinks } from "@/components/home/SocialMediaLinks";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <MacMiniReveal />
      <SponsorWheel />
      <SocialMediaLinks />
      <ViralContentSection />
    </main>
  );
}
