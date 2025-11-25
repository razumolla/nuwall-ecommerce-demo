import { HeroSection } from "@/components/hero";
import { BigDiscountsSection } from "@/components/home/BigDiscountsSection";
import { DualPromoBanners } from "@/components/home/DualPromoBanners";
import { FlashDealsSection } from "@/components/home/FlashDealsSection";
import ProductsSection from "@/components/home/ProductsSection";
import { NewArrivalsSection } from "@/components/home/NewArrivalsSection";
import { RatingsAndBrandsSection } from "@/components/home/RatingsAndBrandsSection";
import { ServiceHighlights } from "@/components/home/ServiceHighlights";
import { TopCategoriesSection } from "@/components/home/TopCategoriesSection";

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
      <ProductsSection />
      <ServiceHighlights />
    </div>
  );
}
