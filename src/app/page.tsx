import { HeroSection } from "@/features/hero";
import { BigDiscountsSection } from "@/features/home/BigDiscountsSection";
import { DualPromoBanners } from "@/features/home/DualPromoBanners";
import { FlashDealsSection } from "@/features/home/FlashDealsSection";
import { MoreForYouSection } from "@/features/home/MoreForYouSection";
import { NewArrivalsSection } from "@/features/home/NewArrivalsSection";
import { RatingsAndBrandsSection } from "@/features/home/RatingsAndBrandsSection";
import { ServiceHighlights } from "@/features/home/ServiceHighlights";
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
      <DualPromoBanners />
      <MoreForYouSection />
      <ServiceHighlights />
    </div>
  );
}
