"use client";

import Image from "next/image";
import Link from "next/link";
import {
  PlusIcon,
  StarIcon,
  ChevronRightIcon,
  MoreVerticalIcon,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  image: string;
  discountLabel: string;
  price: string;
  oldPrice: string;
  rating: number;
  href: string;
};

const MORE_FOR_YOU_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Tarz T3",
    image: "/products/tarz-t3.webp",
    discountLabel: "10% off",
    price: "$164.70",
    oldPrice: "$183.00",
    rating: 4,
    href: "/products/tarz-t3",
  },
  {
    id: 2,
    name: "Yamaha R15 Black",
    image: "/products/yamaha-r15-black.webp",
    discountLabel: "10% off",
    price: "$162.00",
    oldPrice: "$180.00",
    rating: 4,
    href: "/products/xamaha-r15-black",
  },
  {
    id: 3,
    name: "Yamaha R15 Blue",
    image: "/products/yamaha-r15-blue.webp",
    discountLabel: "10% off",
    price: "$249.30",
    oldPrice: "$277.00",
    rating: 4,
    href: "/products/xamaha-r15-blue",
  },
  {
    id: 4,
    name: "Xevel 2020",
    image: "/products/xevel.webp",
    discountLabel: "5% off",
    price: "$256.50",
    oldPrice: "$270.00",
    rating: 4,
    href: "/products/xevel-2020",
  },
  {
    id: 5,
    name: "Jackson TB1",
    image: "/products/yamaha-r15-blue.webp",
    discountLabel: "5% off",
    price: "$112.10",
    oldPrice: "$118.00",
    rating: 4,
    href: "/products/jackson-tb1",
  },
  {
    id: 6,
    name: "Siri 2020",
    image: "/products/siri-2020.webp",
    discountLabel: "6% off",
    price: "$122.20",
    oldPrice: "$130.00",
    rating: 4,
    href: "/products/siri-2020",
  },
  {
    id: 7,
    name: "COSORI",
    image: "/products/cosori.webp",
    discountLabel: "5% off",
    price: "$273.60",
    oldPrice: "$288.00",
    rating: 4,
    href: "/products/cosori",
  },
  {
    id: 8,
    name: "Ranasonic Charger",
    image: "/products/ranasonic-charger.webp",
    discountLabel: "10% off",
    price: "$107.10",
    oldPrice: "$119.00",
    rating: 4,
    href: "/products/ranasonic-charger",
  },
];

export function MoreForYouSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-500">
            <MoreVerticalIcon className="h-4 w-4" />
          </span>
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
            More For You
          </h2>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-rose-500"
        >
          View all
          <ChevronRightIcon className="h-4 w-4" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MORE_FOR_YOU_PRODUCTS.map((product) => (
          <Link
            key={product.id}
            href={product.href}
            className="group flex h-full flex-col rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* Discount badge */}
            <span className="inline-flex w-fit rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-600">
              {product.discountLabel}
            </span>

            {/* Image */}
            <div className="relative mt-4 h-32 w-full sm:h-40">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 20vw, 50vw"
              />
            </div>

            {/* Info */}
            <div className="mt-4 flex flex-1 flex-col">
              <p className="text-sm font-medium text-gray-900">
                {product.name}
              </p>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`h-4 w-4 ${
                      index < product.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Price & add button */}
              <div className="mt-4 flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-rose-500">
                    {product.price}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                </div>

                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rose-200 text-rose-500 transition group-hover:bg-rose-500 group-hover:text-white"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
