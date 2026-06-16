import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Pastry Haven" }] }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, subtotal, clear } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SWEET10") {
      setDiscount(0.1);
      toast.success("10% discount applied!");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code.");
    }
  };

  const total = subtotal * (1 - discount);

  if (detailed.length === 0) {
    return (
      <div className="gradient-hero">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full glass-card">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">Your cart is empty</h1>
          <p className="mt-3 text-muted-foreground">Time to fill it with something sweet.</p>
          <Link to="/menu" className="mt-8 inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow">
            Browse the menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="gradient-hero">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-5xl font-semibold">Your Cart</h1>
        <p className="mt-2 text-muted-foreground">{detailed.length} {detailed.length === 1 ? "item" : "items"} in your basket.</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {detailed.map((i) => (
              <div key={i.id} className="flex gap-4 rounded-3xl glass-card p-4">
                <Link to="/product/$id" params={{ id: i.id }} className="block h-24 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-32">
                  <img src={i.product.image} alt={i.product.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <Link to="/product/$id" params={{ id: i.id }} className="font-display text-lg font-semibold hover:text-accent">{i.product.name}</Link>
                    <button onClick={() => { remove(i.id); toast.success("Removed from cart"); }} className="text-muted-foreground hover:text-destructive" aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-sm text-muted-foreground">${i.product.price.toFixed(2)} each</div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2 rounded-full border border-border bg-background px-2 py-1">
                      <button onClick={() => setQty(i.id, i.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-muted"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-6 text-center text-sm font-semibold">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-muted"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <div className="font-display text-xl font-semibold">${(i.product.price * i.qty).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-3">
              <Link to="/menu" className="rounded-full glass px-5 py-2.5 text-sm font-semibold hover:bg-foreground/5">Continue Shopping</Link>
              <button onClick={() => { clear(); toast.success("Cart cleared"); }} className="rounded-full text-sm font-semibold text-muted-foreground hover:text-destructive px-5 py-2.5">Clear cart</button>
            </div>
          </div>

          <aside className="h-fit rounded-3xl glass-card p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-2xl font-semibold">Order Summary</h2>
            <div className="mt-4 flex gap-2">
              <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-accent" />
              <button onClick={applyCoupon} className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background">Apply</button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Try <span className="font-mono font-semibold">SWEET10</span> for 10% off.</p>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
              {discount > 0 && <div className="flex justify-between text-accent"><dt>Discount (10%)</dt><dd>−${(subtotal * discount).toFixed(2)}</dd></div>}
              <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd className="text-muted-foreground">At checkout</dd></div>
              <div className="border-t border-border pt-3 flex justify-between font-display text-xl"><dt>Total</dt><dd className="text-gradient font-semibold">${total.toFixed(2)}</dd></div>
            </dl>

            <Link to="/checkout" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full gradient-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow">
              Checkout <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
