"use client";

import Image from "next/image";
import { ArrowRightIcon, Medal, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type RatingItem = {
  id: number;
  name: string;
  image: string;
  price: string;
  rating: number;
  reviews: number;
};

type BrandItem = {
  id: number;
  name: string;
  image: string;
};

const TOP_RATINGS: RatingItem[] = [
  {
    id: 1,
    name: "Camera",
    image: "/top-ratings/camera.webp",
    price: "$3,300.00",
    rating: 4,
    reviews: 12,
  },
  {
    id: 2,
    name: "Shoe",
    image: "/top-ratings/shoe.webp",
    price: "$400.00",
    rating: 4,
    reviews: 12,
  },
  {
    id: 3,
    name: "Phone",
    image: "/top-ratings/phone.webp",
    price: "$999.00",
    rating: 4,
    reviews: 12,
  },
  {
    id: 4,
    name: "Watch",
    image: "/top-ratings/watch.webp",
    price: "$999.00",
    rating: 4,
    reviews: 12,
  },
];

const FEATURED_BRANDS: BrandItem[] = [
  {
    id: 1,
    name: "London Britches",
    image: "/brands/brand-1.webp",
  },
  {
    id: 2,
    name: "Jim & Jago",
    image: "/brands/brand-2.webp",
  },
];

/* ---------- LEFT PANEL: TOP RATINGS ---------- */

export function TopRatingsPanel() {
  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-500">
            <Medal className="h-4 w-4" />
          </span>
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
            Top Ratings
          </h2>
        </div>

        <button className="flex items-center gap-1 text-sm font-medium text-primary hover:text-chart-1 hover:underline hover:cursor-pointer">
          View all{" "}
          <span className="text-xs">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </button>
      </div>

      {/* Card with 4 products */}
      <Card>
        <CardContent className="px-5 ">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {TOP_RATINGS.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center gap-1"
              >
                {/* image box */}
                <div className="flex w-full items-center justify-center rounded-2xl bg-slate-50 px-4 py-6">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>

                {/* rating */}
                <div className="flex items-center justify-center gap-1 text-xs text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < item.rating ? "★" : "☆"}</span>
                  ))}
                  <span className="text-[11px] text-slate-500">
                    ({item.reviews})
                  </span>
                </div>

                {/* name + price */}
                <p className="text-xs font-medium text-slate-800 md:text-sm">
                  {item.name}
                </p>
                <p className="text-sm font-semibold text-rose-500">
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- RIGHT PANEL: FEATURED BRANDS ---------- */

export function FeaturedBrandsPanel() {
  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-500">
            <Sparkles className="h-4 w-4" />
          </span>
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
            Featured Brands
          </h2>
        </div>

        <button className="flex items-center gap-1 text-sm font-medium text-primary hover:text-chart-1 hover:underline hover:cursor-pointer">
          View all{" "}
          <span className="text-xs">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </button>
      </div>

      {/* Card with brand tiles */}
      <Card className="rounded-3xl border border-slate-100 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
        <CardContent className="p-5 md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {FEATURED_BRANDS.map((brand) => (
              <div key={brand.id} className="flex flex-col">
                <div className="relative mb-3 w-full overflow-hidden rounded-2xl aspect-4/3">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm font-medium text-slate-900">
                  {brand.name}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- CENTRAL WRAPPER: BOTH IN ONE ROW ---------- */

export function RatingsAndBrandsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-5">
      <div className="md:flex gap-6">
        <div className="w-full md:w-2/3">
          <TopRatingsPanel />
        </div>
        <div className="mt-6 w-full md:mt-0 md:w-1/3">
          <FeaturedBrandsPanel />
        </div>
      </div>
    </section>
  );
}
