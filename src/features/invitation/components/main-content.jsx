import Hero from "@/features/invitation/components/hero";
import CoupleSection from "./couple-section";
import { Story } from "@/features/story";
import { Events } from "@/features/events";
import { Location } from "@/features/location";
import { Wishes } from "@/features/wishes";
import { Gifts } from "@/features/gifts";

// Main Invitation Content
export default function MainContent() {
  return (
    <main className="bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-50/50 via-white to-emerald-50/30 relative">
      {/* Global Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] z-0" />
      
      <div className="relative z-10">
        <Hero />
        <CoupleSection />
        <Story />
        <Events />
        <Location />
        <Gifts />
        <Wishes />
      </div>
    </main>
  );
}
