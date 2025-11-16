import AddToCartButton from "@/components/AddToCartButton";
import { products } from "@/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product!.image}
          alt={product!.name}
          fill
          className="object-cover"
        />
      </div>

      <div>
        <h1 className="mb-2 text-3xl font-semibold">{product!.name}</h1>
        <p className="mb-4 text-gray-500">{product!.category}</p>
        <p className="mb-6 text-2xl font-semibold">${product!.price}</p>
        <p className="mb-6 text-sm text-gray-700">{product!.description}</p>

        <AddToCartButton product={product!} />
      </div>
    </div>
  );
}
