"use client";

import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type NewArrival = {
  id: number;
  name: string;
  image: string;
  price: string;
};

const NEW_ARRIVALS: NewArrival[] = [
  {
    id: 1,
    name: "Sunglass",
    image: "/new-arrivals/sunglass.webp",
    price: "$150.00",
  },
  {
    id: 2,
    name: "Makeup",
    image: "/new-arrivals/makeup.webp",
    price: "$250.00",
  },
  {
    id: 3,
    name: "Smart Watch",
    image: "/new-arrivals/smart-watch.webp",
    price: "$350.00",
  },
  {
    id: 4,
    name: "Lipstick",
    image: "/new-arrivals/lipstick.webp",
    price: "$15.00",
  },
  {
    id: 5,
    name: "Green plant",
    image: "/new-arrivals/green-plant.webp",
    price: "$55.00",
  },
  {
    id: 6,
    name: "Bonsai tree",
    image: "/new-arrivals/bonsai-tree.webp",
    price: "$535.00",
  },
];

export function NewArrivalsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-5">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* small red NEW badge */}
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
            NEW
          </span>
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
            New Arrivals
          </h2>
        </div>

        <button className="flex items-center gap-1 text-sm font-medium text-primary hover:text-chart-1 hover:underline hover:cursor-pointer">
          View all{" "}
          <span className="text-xs">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </button>
      </div>

      {/* Content card */}
      <Card className="rounded-3xl border border-slate-100 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
        <CardContent className="p-5 md:p-6">
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {NEW_ARRIVALS.map((item) => (
              <div key={item.id} className="flex flex-col gap-2">
                {/* Product image */}
                <div className="relative w-full overflow-hidden rounded-2xl bg-slate-50 aspect-4/5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Name */}
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {item.name}
                </p>

                {/* Price */}
                <p className="text-sm font-semibold text-rose-500">
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
