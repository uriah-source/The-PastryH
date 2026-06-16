import { Link } from "@tanstack/react-router";
import { Star, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-card shadow-soft hover-lift">
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full gradient-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground shadow-soft">
              {product.badge}
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link to="/product/$id" params={{ id: product.id }} className="font-display text-lg font-semibold leading-tight hover:text-accent">
              {product.name}
            </Link>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-[var(--gold)] text-[var(--gold)]" />
              {product.rating.toFixed(1)} <span className="text-muted-foreground/60">({product.reviews})</span>
            </div>
          </div>
          <div className="font-display text-xl font-semibold text-foreground">${product.price.toFixed(2)}</div>
        </div>
        <button
          onClick={() => { add(product.id); toast.success(`${product.name} added to cart`); }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:shadow-glow"
        >
          <Plus className="h-4 w-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
