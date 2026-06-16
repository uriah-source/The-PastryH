import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Plus, Minus, ChevronLeft, ZoomIn, Check } from "lucide-react";
import { toast } from "sonner";
import { getProduct, getRelated } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.name} — Pastry Haven` },
      { name: "description", content: loaderData.product.description },
      { property: "og:image", content: loaderData.product.image },
    ] : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Product not found</h1>
      <Link to="/menu" className="mt-6 inline-flex rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Back to menu</Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <button onClick={reset} className="mt-6 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Try again</button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [tab, setTab] = useState<"desc" | "ing" | "nut">("desc");
  const related = getRelated(product.id);

  const onAdd = () => {
    add(product.id, qty);
    toast.success(`${qty} × ${product.name} added to cart`);
  };

  return (
    <div className="gradient-hero">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <Link to="/menu" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" /> Back to menu
        </Link>

        <div className="mt-6 grid gap-12 lg:grid-cols-2">
          <div>
            <div
              onClick={() => setZoom((z) => !z)}
              className="group relative cursor-zoom-in overflow-hidden rounded-3xl shadow-glow"
            >
              <img
                src={product.image}
                alt={product.name}
                className={`aspect-square w-full object-cover transition-transform duration-500 ${zoom ? "scale-150" : "group-hover:scale-105"}`}
              />
              <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass-card">
                <ZoomIn className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[product.image, product.image, product.image, product.image].map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl border border-border opacity-70 hover:opacity-100 cursor-pointer">
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div>
            {product.badge && (
              <span className="rounded-full gradient-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                {product.badge}
              </span>
            )}
            <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-[var(--gold)] text-[var(--gold)]" : "text-muted-foreground/30"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>
            <p className="mt-6 text-lg text-muted-foreground">{product.description}</p>
            <div className="mt-8 font-display text-5xl font-semibold text-gradient">${product.price.toFixed(2)}</div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-full glass-card px-3 py-2">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted" aria-label="Decrease"><Minus className="h-4 w-4" /></button>
                <span className="w-8 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted" aria-label="Increase"><Plus className="h-4 w-4" /></button>
              </div>
              <button onClick={onAdd} className="flex-1 rounded-full gradient-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-soft transition hover:shadow-glow">
                Add to Cart — ${(product.price * qty).toFixed(2)}
              </button>
            </div>

            <div className="mt-10">
              <div className="flex gap-6 border-b border-border">
                {[{ k: "desc", l: "Description" }, { k: "ing", l: "Ingredients" }, { k: "nut", l: "Nutrition" }].map((t) => (
                  <button
                    key={t.k}
                    onClick={() => setTab(t.k as any)}
                    className={`relative pb-3 text-sm font-medium transition ${tab === t.k ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {t.l}
                    {tab === t.k && <span className="absolute inset-x-0 -bottom-px h-0.5 gradient-accent" />}
                  </button>
                ))}
              </div>
              <div className="mt-6 text-sm text-muted-foreground">
                {tab === "desc" && <p>{product.description} Crafted in small batches each morning by our master pâtissiers using time-honored techniques.</p>}
                {tab === "ing" && (
                  <ul className="space-y-2">
                    {product.ingredients.map((i: string) => (
                      <li key={i} className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" />{i}</li>
                    ))}
                  </ul>
                )}
                {tab === "nut" && (
                  <div className="grid grid-cols-4 gap-3">
                    {[{ l: "Calories", v: product.nutrition.calories }, { l: "Fat (g)", v: product.nutrition.fat }, { l: "Carbs (g)", v: product.nutrition.carbs }, { l: "Protein (g)", v: product.nutrition.protein }].map((n) => (
                      <div key={n.l} className="rounded-2xl glass-card p-4 text-center">
                        <div className="font-display text-2xl font-semibold text-foreground">{n.v}</div>
                        <div className="text-xs text-muted-foreground">{n.l}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-3xl font-semibold">You may also love</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
