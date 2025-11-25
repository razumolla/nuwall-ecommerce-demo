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
} from "@/components/ui/carousel";

type HeroSlide = {
  id: number;
  href: string;
  backgroundImage: string;
};

type SideBanner = {
  id: number;
  href: string;
  image: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    href: "#iphone17",
    backgroundImage: "/hero/hero-1.webp",
  },
  {
    id: 2,
    href: "#iphone17",
    backgroundImage: "/hero/hero-2.webp",
  },
  {
    id: 3,
    href: "#iphone17",
    backgroundImage: "/hero/hero-3.webp",
  },
];

const SIDE_BANNERS: SideBanner[] = [
  {
    id: 1,
    href: "#vivo-y29",
    image: "/hero/hero-promo-1.webp",
  },
  {
    id: 2,
    href: "#pressure-cooker",
    image: "/hero/hero-promo-2.webp",
  },
];

export function HeroSection() {
  const autoplay = React.useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    })
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-5 relative">
      <div className="md:flex gap-6">
        {/* LEFT: hero slider (2/3 on md+) */}
        <div className="w-full md:w-2/3">
          <Carousel
            plugins={[autoplay.current]}
            className="w-full"
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            {/* remove default gutter: -ml-0 */}
            <CarouselContent className="ml-0">
              {HERO_SLIDES.map((slide) => (
                // remove default pl-4 on items: pl-0
                <CarouselItem key={slide.id} className="w-full pl-0">
                  <Card className="border-none bg-transparent shadow-none">
                    <CardContent className="p-0">
                      <div className="relative w-full aspect-[2.5/1] md:rounded-[15px] overflow-hidden">
                        <Link href={slide.href}>
                          <Image
                            src={slide.backgroundImage}
                            alt="Hero banner"
                            fill
                            priority
                            className="object-cover"
                          />
                        </Link>

                        <div className="absolute bottom-8 md:bottom-14 left-6 md:left-8">
                          <Link href={slide.href}>
                            <button className="rounded-full bg-white px-3 md:px-8 py-1 md:py-2 text-[12px] md:text-[20px] font-medium text-[#252525] hover:cursor-pointer hover:text-blue-400 ">
                              Buy Now
                            </button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* RIGHT: stacked promos (1/3 on md+) */}
        <div className="hidden md:flex flex-col gap-6 w-full h-[340px] pt-6 justify-between md:w-1/3">
          {SIDE_BANNERS.map((banner, idx) => (
            <Link
              key={banner.id}
              href={banner.href}
              className="relative block w-full aspect-[2.5/1] rounded-[15px] overflow-hidden"
            >
              <Image
                src={banner.image}
                alt={`Promotion banner ${idx + 1}`}
                fill
                className="object-cover"
              />

              <div className="absolute bottom-6 left-4">
                <button className="rounded-full bg-white px-4 py-1 text-base font-medium text-[#252525] hover:cursor-pointer hover:text-blue-400 ">
                  Order Now
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
