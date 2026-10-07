import type { ProductWithCategory } from "@/lib/data";
import { Reveal } from "@/components/shared/reveal";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: ProductWithCategory[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {products.map((product, index) => (
        <li key={product.id}>
          {/* No stagger on the first row: it's often already on screen when the page opens. */}
          <Reveal delay={index < 3 ? 0 : (index % 3) * 0.06} className="h-full">
            <ProductCard product={product} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
