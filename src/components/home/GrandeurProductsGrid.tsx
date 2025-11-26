// src/components/home/GrandeurProductsGrid.tsx
import Image from "next/image";
import { StarIcon } from "lucide-react";
import type { PiWallProduct } from "@/types";

type Props = {
  products: PiWallProduct[];
};

export function GrandeurProductsGrid({ products }: Props) {
  return (
    <div
      id="grandeur-collection"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {products.map((product) => (
        <article
          key={product.id}
          className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-200 hover:shadow-lg"
        >
          {/* Image + badging */}
          <div className="relative overflow-hidden rounded-xl bg-slate-50">
            <span className="absolute left-3 top-3 z-10 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-slate-50 shadow-sm">
              {product.product_type}
            </span>

            {!product.is_available && (
              <span className="absolute right-3 top-3 z-10 rounded-full bg-red-500/90 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
                Out of stock
              </span>
            )}

            <div className="relative aspect-3/4 w-full">
              <Image
                src={product.main_image}
                alt={product.name || "Product image"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 100vw"
              />
            </div>
          </div>

          {/* Info */}
          <div className="mt-3 flex flex-1 flex-col">
            <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
              {product.name}
            </h3>

            <p className="mt-1 text-[11px] text-slate-500">
              {product.category?.name} • {product.dimensions}
            </p>

            {/* Visual rating row for aesthetics */}
            <div className="mt-2 flex items-center gap-1 text-xs">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <StarIcon
                    key={idx}
                    className={`h-3.5 w-3.5 ${
                      idx < 4
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-1 text-[11px] text-slate-500">
                Premium finish
              </span>
            </div>

            {/* Price + CTA */}
            <div className="mt-3 flex items-end justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900">
                  {product.formatted_price}
                </span>
                {product.formatted_mrp && (
                  <span className="text-[11px] text-slate-400 line-through">
                    {product.formatted_mrp}
                  </span>
                )}
                {product.discount_percent > 0 && (
                  <span className="text-[11px] font-medium text-emerald-600">
                    {product.discount_percent}% OFF
                  </span>
                )}
              </div>

              <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition group-hover:bg-slate-800">
                View details
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
