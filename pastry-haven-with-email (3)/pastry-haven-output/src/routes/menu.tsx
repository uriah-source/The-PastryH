import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

type Search = { category?: string; q?: string; sort?: string; tab?: string };

export const Route = createFileRoute("/menu")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s.category === "string" ? s.category : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
    sort: typeof s.sort === "string" ? s.sort : undefined,
    tab: typeof s.tab === "string" ? s.tab : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Menu — Pastry Haven" },
      { name: "description", content: "Browse our full menu of pastries, cheesecakes, macarons, and signature desserts." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = useState(search.q ?? "");
  const [maxPrice, setMaxPrice] = useState(100);

  const category = search.category ?? "all";
  const sort = search.sort ?? "popular";

  const filtered = useMemo(() => {
    let list = products.slice();
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
    }
    list = list.filter((p) => p.price <= maxPrice);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [category, q, sort, maxPrice]);

  return (
    <div className="gradient-hero">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-accent">The Menu</div>
          <h1 className="mt-2 font-display text-5xl font-semibold sm:text-6xl">Every craving, crafted.</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Browse our full collection of pastries, cheesecakes, and signature desserts.</p>
        </div>

        {/* search & sort */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search pastries, desserts…"
              className="w-full rounded-full glass-card border border-border py-3.5 pl-11 pr-4 text-sm outline-none focus:border-accent"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => navigate({ search: (p: Search) => ({ ...p, sort: e.target.value }) })}
            className="rounded-full glass-card border border-border px-5 py-3.5 text-sm outline-none"
          >
            <option value="popular">Most popular</option>
            <option value="rating">Best rated</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>

        {/* category chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => navigate({ search: (p: Search) => ({ ...p, category: undefined }) })}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${category === "all" ? "gradient-primary text-primary-foreground" : "glass hover:bg-foreground/5"}`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => navigate({ search: (p: Search) => ({ ...p, category: c.slug }) })}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${category === c.slug ? "gradient-primary text-primary-foreground" : "glass hover:bg-foreground/5"}`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* price filter */}
        <div className="mt-6 flex items-center gap-3 text-sm">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Max price:</span>
          <input type="range" min={5} max={100} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="flex-1 max-w-xs accent-[var(--accent)]" />
          <span className="font-semibold">${maxPrice}</span>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "item" : "items"}</div>

        {filtered.length === 0 ? (
          <div className="mt-12 rounded-3xl glass-card p-12 text-center">
            <p className="font-display text-2xl">No matches</p>
            <p className="mt-2 text-muted-foreground">Try a different search or category.</p>
            <Link to="/menu" className="mt-6 inline-flex rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Reset filters</Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}
