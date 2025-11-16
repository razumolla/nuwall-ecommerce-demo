"use client";

import { Product } from "@/data/products";
import { useCartStore } from "@/store/cart-store";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      onClick={() =>
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        })
      }
      className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 hover:cursor-pointer"
    >
      Add to cart
    </button>
  );
}
