import Counter from "@/components/Counter";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function HomePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Featured products</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div>
        <Counter />
      </div>
    </div>
  );
}
