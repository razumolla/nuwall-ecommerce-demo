import Image from "next/image";
import Link from "next/link";
import {
  PlusIcon,
  StarIcon,
  ChevronRightIcon,
  MoreVerticalIcon,
  HeartIcon,
} from "lucide-react";
import type { Product } from "@/types";

// SSR fetch
async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://api.escuelajs.co/api/v1/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await res.json();
  return data;
}

const ProductsSection = async () => {
  const products = await getProducts();
  const visibleProducts = products.slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-500">
            <MoreVerticalIcon className="h-4 w-4" />
          </span>
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
            All Products
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
        {visibleProducts.map((product) => {
          const imageUrl =
            product.images?.[0] ?? "https://placehold.co/600x400";

          return (
            <Link
              key={product.id}
              href={`/products/${product.slug ?? product.id}`}
              className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition-all hover:-translate-y-1  hover:shadow-lg"
            >
              {/* Image + category + wishlist */}
              <div className="relative overflow-hidden rounded-xl bg-slate-50">
                {/* Category badge */}
                <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm">
                  {product.category?.name ?? "Others"}
                </span>

                {/* Wishlist (no onClick in server component) */}
                <span className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-500 opacity-0 shadow-sm transition group-hover:opacity-100">
                  <HeartIcon className="h-4 w-4" />
                </span>

                {/* Image */}
                <div className="relative aspect-4/3 w-full">
                  <Image
                    src={imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 100vw"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="mt-3 flex flex-1 flex-col">
                {/* Title */}
                <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                  {product.description}
                </p>

                {/* Rating (dummy) */}
                <div className="mt-2 flex items-center gap-1 text-xs">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`h-3.5 w-3.5 ${
                          index < 3
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-1 text-[11px] text-slate-500">(120)</span>
                </div>

                {/* Price + Add (no onClick here) */}
                <div className="mt-3 flex items-end justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-rose-600">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition group-hover:bg-rose-600">
                    <PlusIcon className="h-4 w-4" />
                    Add
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsSection;
