import { HeroSection } from "@/features/hero";
import { FlashDealsSection } from "@/features/home/FlashDealsSection";
import { TopCategoriesSection } from "@/features/home/TopCategoriesSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FlashDealsSection />
      <TopCategoriesSection />
    </div>
  );
}
