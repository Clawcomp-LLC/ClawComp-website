import { AboutHero } from "@/components/about/AboutHero";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata = {
  title: "About | ClawComp",
  description:
    "Everything you need to know about ClawComp — a month-long OpenClaw build program hosted by Link Ventures. Free Mac Studios, $17,500 in prizes, and a trip to Boston.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <AboutContent />
    </main>
  );
}
