import { SponsorHero } from "@/components/sponsors/SponsorHero";
import { SponsorsGrid } from "@/components/sponsors/SponsorsGrid";

export const metadata = {
  title: "Our Sponsors | ClawComp",
  description:
    "Meet the companies powering ClawComp — from Blitzy and Talvy to Link Ventures and beyond. These sponsors invest in the next generation of OpenClaw builders.",
};

export default function SponsorsPage() {
  return (
    <main className="min-h-screen">
      <SponsorHero />
      <SponsorsGrid />
    </main>
  );
}
