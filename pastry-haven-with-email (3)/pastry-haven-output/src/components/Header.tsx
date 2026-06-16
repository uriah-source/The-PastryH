import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu as MenuIcon, X, Search } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/menu", label: "Categories", search: { tab: "categories" } as any },
  { to: "/menu", label: "Best Sellers", search: { sort: "popular" } as any },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-[var(--glass-border)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-primary-foreground shadow-soft">
              <span className="font-display text-xl font-bold">P</span>
            </div>
            <div className="leading-tight">
              <div className="font-display text-xl font-semibold tracking-tight">Pastry Haven</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Artisan Bakery</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n, i) => (
              <Link
                key={i}
                to={n.to}
                className="relative text-sm font-medium text-foreground/80 transition hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/menu" className="hidden h-10 w-10 place-items-center rounded-full hover:bg-muted md:grid" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
            <Link to="/cart" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-muted" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full gradient-accent px-1 text-[10px] font-bold text-accent-foreground shadow-soft">
                  {count}
                </span>
              )}
            </Link>
            <button onClick={() => setOpen((x) => !x)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted md:hidden" aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-[var(--glass-border)] md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4">
              {nav.map((n, i) => (
                <Link key={i} to={n.to} onClick={() => setOpen(false)} className="py-3 text-sm font-medium">
                  {n.label}
                </Link>
              ))}
              <Link to="/cart" onClick={() => setOpen(false)} className="py-3 text-sm font-medium">
                Cart ({count})
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
