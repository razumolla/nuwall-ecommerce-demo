"use client";

import Image from "next/image";
import { ArrowRightIcon, Grid3X3Icon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type TopCategory = {
  id: number;
  name: string;
  image: string;
  ordersLabel: string;
};

const TOP_CATEGORIES: TopCategory[] = [
  {
    id: 1,
    name: "Headphone",
    image: "/categories/headphone.webp",
    ordersLabel: "3k orders this week",
  },
  {
    id: 2,
    name: "Watch",
    image: "/categories/watch.webp",
    ordersLabel: "3k orders this week",
  },
  {
    id: 3,
    name: "Sunglass",
    image: "/categories/sunglass.webp",
    ordersLabel: "3k orders this week",
  },
];

export function TopCategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-5">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-100 text-rose-500">
            <Grid3X3Icon className="h-4 w-4" />
          </span>
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
            Top Categories
          </h2>
        </div>

        <button className="flex items-center gap-1 text-sm font-medium text-primary hover:text-chart-1 hover:underline hover:cursor-pointer">
          View all{" "}
          <span className="text-xs">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </button>
      </div>

      {/* Category cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TOP_CATEGORIES.map((cat) => (
          <Card key={cat.id}>
            <CardContent className="px-5">
              <div className="relative w-full aspect-[3.5/1]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover rounded-xl"
                />

                {/* Left pill: category name */}
                <span className="absolute left-2 top-2 rounded-full bg-slate-900 px-4 py-1 text-xs font-medium text-white">
                  {cat.name}
                </span>

                {/* Right pill: orders info */}
                <span className="absolute right-2 top-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {cat.ordersLabel}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
