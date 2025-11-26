// src/components/home/GrandeurProductsSection.tsx
import Link from "next/link";
import { ChevronRightIcon, PaletteIcon } from "lucide-react";
import { getGrandeurProductsSSR } from "@/lib/api.ssr";
import type { PiWallProduct } from "@/types";
import { GrandeurProductsGrid } from "./GrandeurProductsGrid";

const GrandeurProductsSection = async () => {
  const products: PiWallProduct[] = await getGrandeurProductsSSR(8, 0);
  const hasProducts = products.length > 0;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-slate-50">
            <PaletteIcon className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
              Grandeur Wallpapers
            </h2>
            <p className="text-xs text-slate-500">
              Premium wallpapers from your purchased PiWall collections
            </p>
          </div>
        </div>

        <Link
          href="#grandeur-collection"
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-slate-900"
        >
          View collection
          <ChevronRightIcon className="h-4 w-4" />
        </Link>
      </div>

      {!hasProducts ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
          No wallpapers found in your purchased collections yet.
        </div>
      ) : (
        <GrandeurProductsGrid products={products} />
      )}
    </section>
  );
};

export default GrandeurProductsSection;
