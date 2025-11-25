"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightIcon, ZapIcon } from "lucide-react";

type Deal = {
  id: number;
  name: string;
  image: string;
  discountLabel: string;
  price: string;
  oldPrice: string;
  rating: number;
};

const FLASH_DEALS: Deal[] = [
  {
    id: 1,
    name: "Classic Rolex Watch",
    image: "/flash/watch-1.webp",
    discountLabel: "15% off",
    price: "$297.50",
    oldPrice: "$350.00",
    rating: 4,
  },
  {
    id: 2,
    name: "IPhone 13 Pro Max",
    image: "/flash/iphone-13.webp",
    discountLabel: "28% off",
    price: "$108.00",
    oldPrice: "$150.00",
    rating: 5,
  },
  {
    id: 3,
    name: "Mi Led Smart Watch",
    image: "/flash/watch-2.webp",
    discountLabel: "21% off",
    price: "$142.20",
    oldPrice: "$180.00",
    rating: 4,
  },
  {
    id: 4,
    name: "NikeCourt Zoom Vapor Cage",
    image: "/flash/shoe-1.webp",
    discountLabel: "25% off",
    price: "$187.50",
    oldPrice: "$250.00",
    rating: 4,
  },
  {
    id: 5,
    name: "Mi Led Smart Watch",
    image: "/flash/watch-2.webp",
    discountLabel: "21% off",
    price: "$142.20",
    oldPrice: "$180.00",
    rating: 4,
  },
  {
    id: 6,
    name: "NikeCourt Zoom Vapor Cage",
    image: "/flash/shoe-1.webp",
    discountLabel: "25% off",
    price: "$187.50",
    oldPrice: "$250.00",
    rating: 4,
  },
];

export function FlashDealsSection() {
  return (
    <section className="max-w-7xl px-4 py-5">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-rose-500">
            <ZapIcon className="h-6 w-6" />
          </span>
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
            Flash Deals
          </h2>
        </div>
        <button className="text-sm font-medium text-primary hover:text-chart-1 hover:underline hover:cursor-pointer flex items-center gap-1">
          View all{" "}
          <span className="text-xs">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </button>
      </div>

      {/* Slider */}
      <div className="relative">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-4">
            {FLASH_DEALS.map((deal) => (
              <CarouselItem
                key={deal.id}
                className="pl-4 basis-[260px] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Card className="relative h-full ">
                  <CardContent className="relative flex h-full flex-col p-6">
                    {/* Discount pill */}
                    <span className="absolute left-6 top-0 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">
                      {deal.discountLabel}
                    </span>

                    {/* Product image */}
                    <div className="mt-8 mb-6 flex h-40 items-center justify-center">
                      <Image
                        src={deal.image}
                        alt={deal.name}
                        width={180}
                        height={180}
                        className="object-contain"
                      />
                    </div>

                    {/* Name */}
                    <p className="mb-2 text-sm font-medium text-slate-900 md:text-base">
                      {deal.name}
                    </p>

                    {/* Rating */}
                    <div className="mb-3 flex items-center gap-1 text-xs text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < deal.rating ? "★" : "☆"}</span>
                      ))}
                    </div>

                    {/* Prices */}
                    <div className="mt-auto flex items-center justify-between">
                      <div className="space-x-2 text-sm md:text-base">
                        <span className="font-semibold text-rose-500">
                          {deal.price}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          {deal.oldPrice}
                        </span>
                      </div>

                      {/* Add button (right bottom) */}
                      <button className="flex h-8 w-8 items-center justify-center rounded-full border border-rose-100 text-rose-500 hover:bg-rose-500 hover:text-white hover:cursor-pointer">
                        +
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Nav arrows, vertically centered on first / last card edges */}
          <CarouselPrevious className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-2xl bg-slate-900 text-white shadow-lg hover:cursor-pointer" />
          <CarouselNext className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-10 w-10 rounded-2xl bg-slate-900 text-white shadow-lg hover:cursor-pointer" />
        </Carousel>
      </div>
    </section>
  );
}
