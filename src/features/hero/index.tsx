"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

type HeroSlide = {
  id: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  href: string;
  backgroundImage: string; // big colorful BG
  productImage: string; // phones on the right
};

type SideBanner = {
  id: number;
  label: string;
  title: string;
  accent?: string;
  href: string;
  image: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    eyebrow: "Pre-Order Now",
    title: "iPhone 17",
    subtitle: "Standard, Air, Pro, or Pro Max",
    description: "Find Your Perfect Match",
    ctaText: "Buy Now",
    href: "#iphone17",
    // 👉 put these files in /public/hero/
    backgroundImage: "/hero/iphone-bg.jpg",
    productImage: "/hero/iphone-phones.png",
  },
  // you can add more slides here later
];

const SIDE_BANNERS: SideBanner[] = [
  {
    id: 1,
    label: "VIVO Y29",
    title: "4 / 64 GB",
    accent: "Order Now",
    href: "#vivo-y29",
    image: "/hero/vivo-y29.png",
  },
  {
    id: 2,
    label: "Multi-Functional",
    title: "Pressure Cooker",
    accent: "UP TO 25% OFF",
    href: "#pressure-cooker",
    image: "/hero/pressure-cooker.png",
  },
];

export function HeroSection() {
  const autoplay = React.useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
    })
  );

  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const totalSlides = HERO_SLIDES.length;

  React.useEffect(() => {
    if (!api) return;

    setActiveIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 pb-6">
      <div className="grid items-stretch gap-6 md:grid-cols-2">
        {/* LEFT: hero carousel with BG + phones */}
        <Carousel
          plugins={[autoplay.current]}
          setApi={setApi}
          className="w-full"
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          <CarouselContent>
            {HERO_SLIDES.map((slide) => (
              <CarouselItem key={slide.id}>
                <Card className="border-none bg-transparent shadow-none">
                  <CardContent className="relative h-80 overflow-hidden rounded-2xl p-0">
                    {/* background image */}
                    <Image
                      src={slide.backgroundImage}
                      alt={`${slide.title} background`}
                      fill
                      priority
                      className="object-cover"
                    />
                    {/* dark gradient overlay to make text readable */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/20" />

                    {/* content */}
                    <div className="relative flex h-full items-center px-8 md:px-10">
                      {/* text on the left */}
                      <div className="max-w-md space-y-3 text-white">
                        <p className="text-xs font-medium uppercase tracking-[0.18em]">
                          {slide.eyebrow}
                        </p>
                        <h1 className="text-4xl font-bold leading-tight">
                          {slide.title}
                        </h1>
                        <p className="text-sm font-medium">{slide.subtitle}</p>
                        <p className="text-sm text-slate-100/80">
                          {slide.description}
                        </p>

                        <Link href={slide.href}>
                          <Button className="mt-4 rounded-full bg-white px-6 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100">
                            {slide.ctaText}
                          </Button>
                        </Link>
                      </div>

                      {/* product image on the right */}
                      <div className="relative ml-auto hidden h-56 w-56 md:block lg:h-64 lg:w-64">
                        <Image
                          src={slide.productImage}
                          alt={slide.title}
                          fill
                          className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                        />
                      </div>
                    </div>

                    {/* dots */}
                    {totalSlides > 1 && (
                      <div className="pointer-events-none absolute bottom-5 left-8 flex gap-2">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                          <span
                            key={index}
                            className={
                              index === activeIndex
                                ? "h-1.5 w-5 rounded-full bg-white"
                                : "h-1.5 w-3 rounded-full bg-white/40"
                            }
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* RIGHT: orange gradient banners with product images */}
        <div className="hidden flex-col gap-6 md:flex">
          {SIDE_BANNERS.map((banner) => (
            <Link key={banner.id} href={banner.href} className="group">
              <Card className="h-[150px] border-none bg-transparent shadow-none">
                <CardContent className="relative h-full overflow-hidden rounded-2xl p-0">
                  {/* orange gradient background */}
                  <div className="absolute inset-0 bg-linear-to-r from-[#FF9D00] to-[#FF6A00]" />

                  <div className="relative flex h-full items-center px-6">
                    {/* text */}
                    <div className="flex-1 space-y-1 text-white">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                        {banner.label}
                      </p>
                      <p className="text-lg font-extrabold leading-tight">
                        {banner.title}
                      </p>
                      {banner.accent && (
                        <p className="text-xs font-semibold text-yellow-300">
                          {banner.accent}
                        </p>
                      )}

                      <button className="mt-2 inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-medium text-slate-900 group-hover:bg-slate-100">
                        Order Now
                      </button>
                    </div>

                    {/* product image */}
                    <div className="relative h-24 w-24 md:h-28 md:w-28">
                      <Image
                        src={banner.image}
                        alt={banner.title}
                        fill
                        className="object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
