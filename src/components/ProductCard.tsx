"use client";

import Image from "next/image";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="flex flex-col rounded-lg border bg-background p-4 shadow-sm">
      <div className="relative mb-4 h-40 w-full overflow-hidden rounded-md bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <h2 className="mb-1 text-lg font-semibold">
        <Link href={`/products/${product.id}`} className="hover:underline">
          {product.name}
        </Link>
      </h2>
      <p className="mb-2 text-sm text-gray-500">{product.category}</p>
      <p className="mb-4 font-semibold">${product.price}</p>

      <button
        onClick={() =>
          addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
          })
        }
        className="mt-auto rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 hover:cursor-pointer"
      >
        Add to cart
      </button>
    </div>
  );
}
