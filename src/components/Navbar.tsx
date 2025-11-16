"use client";

import { useCartStore } from "@/store/cart-store";
import Link from "next/link";

export default function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="text-xl font-bold">
          <Link href="/">MyShop</Link>
        </div>

        <Link href="/cart">
          <button className="relative rounded-full border px-4 py-2 text-sm hover:cursor-pointer">
            Cart
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {totalItems}
              </span>
            )}
          </button>
        </Link>
      </div>
    </header>
  );
}
