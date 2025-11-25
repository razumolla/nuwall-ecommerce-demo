"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightIcon, Gift } from "lucide-react";

type DiscountProduct = {
  id: number;
  name: string;
  image: string;
  price: string;
  oldPrice: string;
};

const BIG_DISCOUNTS: DiscountProduct[] = [
  {
    id: 1,
    name: "RG products",
    image: "/discounts/rg-products.webp",
    price: "$270.00",
    oldPrice: "$300.00",
  },
  {
    id: 2,
    name: "Ranasonic 2019",
    image: "/discounts/panasonic-2019.webp",
    price: "$124.67",
    oldPrice: "$137.00",
  },
  {
    id: 3,
    name: "Dune HD",
    image: "/discounts/dune-hd.webp",
    price: "$105.45",
    oldPrice: "$111.00",
  },
  {
    id: 4,
    name: "Sony CCTV",
    image: "/discounts/Sony-cctv.webp",
    price: "$139.50",
    oldPrice: "$150.00",
  },
  {
    id: 5,
    name: "BenX 2020",
    image: "/discounts/benx-2020.webp",
    price: "$209.70",
    oldPrice: "$233.00",
  },
  {
    id: 6,
    name: "Sony TV 1080p",
    image: "/discounts/sony-tv-1080p.webp",
    price: "$258.54",
    oldPrice: "$278.00",
  },
  {
    id: 7,
    name: "Netgear 2025",
    image: "/discounts/netgear2025.webp",
    price: "$258.54",
    oldPrice: "$278.00",
  },
  {
    id: 8,
    name: "Sony PS4",
    image: "/discounts/sonyPS4.webp",
    price: "$258.54",
    oldPrice: "$278.00",
  },
];

export function BigDiscountsSection() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-5">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-500">
            <Gift className="h-4 w-4" />
          </span>
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
            Big Discounts
          </h2>
        </div>

        <button className="flex items-center gap-1 text-sm font-medium text-primary hover:text-chart-1 hover:underline hover:cursor-pointer">
          View all{" "}
          <span className="text-xs">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </button>
      </div>

      {/* Slider + dots */}
      <div className="relative">
        <Carousel opts={{ align: "start" }} setApi={setApi} className="w-full">
          <CarouselContent className="-ml-4 px-2">
            {BIG_DISCOUNTS.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 p-2 basis-[260px] sm:basis-1/2 lg:basis-1/3 xl:basis-1/6  hover:scale-102 transition"
              >
                <Card>
                  <CardContent>
                    {/* image area */}
                    <div className="mb-6 flex h-36 items-center justify-center rounded-2xl scale-120">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={150}
                        height={150}
                        className="object-contain"
                      />
                    </div>

                    {/* name */}
                    <p className="mb-1 text-sm font-medium text-slate-900">
                      {product.name}
                    </p>

                    {/* prices */}
                    <div className="space-x-2 text-sm">
                      <span className="font-semibold text-rose-500">
                        {product.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {product.oldPrice}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows inside first/last card edges */}
          <CarouselPrevious className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-2xl bg-slate-900 text-white shadow-lg hover:cursor-pointer" />
          <CarouselNext className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-10 w-10 rounded-2xl bg-slate-900 text-white shadow-lg hover:cursor-pointer" />
        </Carousel>

        {/* Dots */}
        {count > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <span
                key={index}
                className={
                  index === current
                    ? "h-2 w-5 rounded-full bg-rose-500"
                    : "h-2 w-2 rounded-full bg-slate-300"
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
