"use client";

import Image from "next/image";
import Link from "next/link";

export function DualPromoBanners() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-5">
      <div className="flex flex-col gap-4 md:flex-row md:gap-6 lg:gap-8 xl:gap-10">
        {/* Left banner - 1/3 on desktop */}
        <Link
          href="/flash-deal"
          className="group block w-full overflow-hidden rounded-2xl bg-white shadow-sm md:w-1/3"
        >
          <div className="relative h-48 md:h-56 lg:h-64">
            <Image
              src="/banners/flash-watch.webp"
              alt="30% OFF flash deal on smart watches"
              fill
              priority
              className="object-fill transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          </div>
        </Link>

        {/* Right banner - 2/3 on desktop */}
        <Link
          href="/minimal-light-bulb"
          className="group block w-full overflow-hidden rounded-2xl bg-white shadow-sm md:w-2/3"
        >
          <div className="relative h-48 md:h-56 lg:h-64">
            <Image
              src="/banners/minimal-lightbulb.webp"
              alt="Minimal light bulb limited edition sale"
              fill
              className="object-fill transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 67vw, 100vw"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
