import { HeroSection } from "@/features/hero";
import { BigDiscountsSection } from "@/features/home/BigDiscountsSection";
import { FlashDealsSection } from "@/features/home/FlashDealsSection";
import { NewArrivalsSection } from "@/features/home/NewArrivalsSection";
import { RatingsAndBrandsSection } from "@/features/home/RatingsAndBrandsSection";
import { TopCategoriesSection } from "@/features/home/TopCategoriesSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FlashDealsSection />
      <TopCategoriesSection />
      <RatingsAndBrandsSection />
      <NewArrivalsSection />
      <BigDiscountsSection />
    </div>
  );
}
