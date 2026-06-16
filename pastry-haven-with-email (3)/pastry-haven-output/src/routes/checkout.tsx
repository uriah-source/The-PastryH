import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Check, ChevronLeft, ChevronRight, Truck, Zap, Clock, CreditCard, Banknote, Wallet, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { sendOrderEmails } from "@/lib/emailjs";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Pastry Haven" }] }),
  component: CheckoutPage,
});

const customerSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Invalid email"),
  phone: z.string().trim().min(7, "Phone is required").max(20),
  address: z.string().trim().min(5, "Address is required").max(300),
  instructions: z.string().max(500).optional(),
});

const deliveryOptions = [
  { id: "standard", icon: Truck, name: "Standard Delivery", desc: "2–3 business days", price: 5.99 },
  { id: "express", icon: Zap, name: "Express Delivery", desc: "Next business day", price: 12.99 },
  { id: "sameday", icon: Clock, name: "Same-Day Delivery", desc: "Within 4 hours (metro)", price: 19.99 },
];

const paymentOptions = [
  { id: "card", icon: CreditCard, name: "Card Payment", desc: "Visa, Mastercard, Amex" },
  { id: "bank", icon: Banknote, name: "Bank Transfer", desc: "Direct wire" },
  { id: "cod", icon: Wallet, name: "Cash on Delivery", desc: "Pay your courier" },
];

const steps = ["Information", "Delivery", "Payment", "Review", "Confirmation"];

function CheckoutPage() {
  const navigate = useNavigate();
  const { detailed, subtotal, clear } = useCart();
  const [step, setStep] = useState(0);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "", instructions: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" });
  const [orderId, setOrderId] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (detailed.length === 0 && step < 4) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Your cart is empty</h1>
        <Link to="/menu" className="mt-6 inline-flex rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Browse menu</Link>
      </div>
    );
  }

  const deliveryFee = deliveryOptions.find((d) => d.id === delivery)?.price ?? 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const validateStep1 = () => {
    const r = customerSchema.safeParse(customer);
    if (!r.success) {
      const e: Record<string, string> = {};
      r.error.issues.forEach((i) => { e[i.path[0] as string] = i.message; });
      setErrors(e);
      return false;
    }
    setErrors({});
    return true;
  };

  const next = async () => {
    if (step === 0 && !validateStep1()) { toast.error("Please fix the errors."); return; }
    if (step === 2 && payment === "card") {
      if (!card.number.replace(/\s/g, "").match(/^\d{12,19}$/)) { toast.error("Enter a valid card number"); return; }
      if (!card.expiry.match(/^\d{2}\/\d{2}$/)) { toast.error("Expiry must be MM/YY"); return; }
      if (!card.cvc.match(/^\d{3,4}$/)) { toast.error("Invalid CVC"); return; }
    }
    if (step === 3) {
      const id = "PH-" + Date.now().toString(36).toUpperCase() + Math.floor(Math.random() * 999);

      const selectedDelivery = deliveryOptions.find((d) => d.id === delivery)!;
      const selectedPayment = paymentOptions.find((p) => p.id === payment)!;
      const estimatedDelivery =
        delivery === "sameday" ? "Today, within 4 hours" :
        delivery === "express" ? "Tomorrow by 6pm" :
        "In 2–3 business days";

      setIsSending(true);
      try {
        await sendOrderEmails({
          orderId: id,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          deliveryAddress: customer.address,
          specialInstructions: customer.instructions,
          deliveryMethod: `${selectedDelivery.name} — ${selectedDelivery.desc}`,
          deliveryFee,
          paymentMethod: selectedPayment.name,
          items: detailed.map((i) => ({
            name: i.product.name,
            qty: i.qty,
            unitPrice: i.product.price,
            lineTotal: i.product.price * i.qty,
          })),
          subtotal,
          tax,
          total,
          estimatedDelivery,
        });
      } catch (err) {
        // Email failures are non-blocking — the order still succeeds
        console.error("[EmailJS] Unexpected error:", err);
      } finally {
        setIsSending(false);
      }

      setOrderId(id);
      clear();
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="gradient-hero">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        {step < 4 && (
          <>
            <h1 className="font-display text-4xl font-semibold sm:text-5xl">Checkout</h1>
            {/* breadcrumb steps */}
            <ol className="mt-8 flex flex-wrap items-center gap-2 text-sm">
              {steps.slice(0, 4).map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <button
                    onClick={() => i < step && setStep(i)}
                    disabled={i > step}
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition ${
                      i === step ? "gradient-primary text-primary-foreground" :
                      i < step ? "glass-card hover:bg-foreground/5 cursor-pointer" : "text-muted-foreground"
                    }`}
                  >
                    <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${i < step ? "bg-accent text-accent-foreground" : i === step ? "bg-white/20" : "bg-muted"}`}>
                      {i < step ? <Check className="h-3 w-3" /> : i + 1}
                    </span>
                    {s}
                  </button>
                  {i < 3 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                </li>
              ))}
            </ol>
          </>
        )}

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {step === 0 && (
              <div className="rounded-3xl glass-card p-6 sm:p-8">
                <h2 className="font-display text-2xl">Customer Information</h2>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Full Name" error={errors.name}>
                    <input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} className="field" placeholder="Marie Laurent" />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} className="field" placeholder="you@example.com" />
                  </Field>
                  <Field label="Phone" error={errors.phone}>
                    <input value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} className="field" placeholder="+1 555 234 7890" />
                  </Field>
                  <Field label="Delivery Address" error={errors.address} className="sm:col-span-2">
                    <input value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} className="field" placeholder="24 Rue de la Boulangerie, Paris" />
                  </Field>
                  <Field label="Special Instructions (optional)" className="sm:col-span-2">
                    <textarea value={customer.instructions} onChange={(e) => setCustomer({ ...customer, instructions: e.target.value })} rows={3} className="field resize-none" placeholder="Leave at the front door, ring twice." />
                  </Field>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="rounded-3xl glass-card p-6 sm:p-8">
                <h2 className="font-display text-2xl">Delivery Method</h2>
                <div className="mt-6 space-y-3">
                  {deliveryOptions.map((o) => {
                    const Icon = o.icon;
                    const active = delivery === o.id;
                    return (
                      <button
                        key={o.id}
                        onClick={() => setDelivery(o.id)}
                        className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition ${active ? "border-accent bg-accent/5" : "border-border hover:border-foreground/30"}`}
                      >
                        <div className={`grid h-12 w-12 place-items-center rounded-xl ${active ? "gradient-accent text-accent-foreground" : "bg-muted"}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{o.name}</div>
                          <div className="text-sm text-muted-foreground">{o.desc}</div>
                        </div>
                        <div className="font-display text-lg font-semibold">${o.price.toFixed(2)}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="rounded-3xl glass-card p-6 sm:p-8">
                <h2 className="font-display text-2xl">Payment Method</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {paymentOptions.map((o) => {
                    const Icon = o.icon;
                    const active = payment === o.id;
                    return (
                      <button
                        key={o.id}
                        onClick={() => setPayment(o.id)}
                        className={`rounded-2xl border-2 p-4 text-left transition ${active ? "border-accent bg-accent/5" : "border-border hover:border-foreground/30"}`}
                      >
                        <Icon className={`h-6 w-6 ${active ? "text-accent" : "text-muted-foreground"}`} />
                        <div className="mt-3 font-semibold">{o.name}</div>
                        <div className="text-xs text-muted-foreground">{o.desc}</div>
                      </button>
                    );
                  })}
                </div>
                {payment === "card" && (
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Card Number" className="sm:col-span-2">
                      <input value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} className="field" placeholder="4242 4242 4242 4242" />
                    </Field>
                    <Field label="Expiry (MM/YY)"><input value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} className="field" placeholder="12/29" /></Field>
                    <Field label="CVC"><input value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} className="field" placeholder="123" /></Field>
                    <Field label="Name on card" className="sm:col-span-2"><input value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} className="field" placeholder="Marie Laurent" /></Field>
                  </div>
                )}
                {payment === "bank" && <p className="mt-6 text-sm text-muted-foreground">Bank details will be emailed to {customer.email || "your email"} after placing the order.</p>}
                {payment === "cod" && <p className="mt-6 text-sm text-muted-foreground">Pay your courier in cash on arrival. Please have the exact amount ready.</p>}
              </div>
            )}

            {step === 3 && (
              <div className="rounded-3xl glass-card p-6 sm:p-8">
                <h2 className="font-display text-2xl">Review Your Order</h2>
                <div className="mt-6 space-y-6">
                  <Review title="Customer">
                    <div>{customer.name}</div>
                    <div className="text-sm text-muted-foreground">{customer.email} · {customer.phone}</div>
                    <div className="text-sm text-muted-foreground">{customer.address}</div>
                    {customer.instructions && <div className="mt-1 text-sm italic text-muted-foreground">"{customer.instructions}"</div>}
                  </Review>
                  <Review title="Delivery">
                    {deliveryOptions.find((d) => d.id === delivery)?.name} — {deliveryOptions.find((d) => d.id === delivery)?.desc}
                  </Review>
                  <Review title="Payment">
                    {paymentOptions.find((p) => p.id === payment)?.name}
                  </Review>
                  <Review title="Items">
                    <ul className="space-y-2">
                      {detailed.map((i) => (
                        <li key={i.id} className="flex justify-between text-sm">
                          <span>{i.qty} × {i.product.name}</span>
                          <span>${(i.product.price * i.qty).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </Review>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="rounded-3xl glass-card p-8 text-center sm:p-12">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full gradient-accent text-accent-foreground shadow-glow">
                  <Sparkles className="h-9 w-9" />
                </div>
                <h2 className="mt-6 font-display text-4xl font-semibold">Thank you!</h2>
                <p className="mt-2 text-muted-foreground">Your order has been placed and is being prepared with love.</p>
                <div className="mx-auto mt-8 max-w-md rounded-2xl bg-foreground/5 p-6 text-left">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Order Number</div>
                  <div className="mt-1 font-display text-2xl font-semibold text-gradient">{orderId}</div>
                  <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">Estimated Delivery</div>
                  <div className="mt-1 font-semibold">
                    {delivery === "sameday" ? "Today, within 4 hours" : delivery === "express" ? "Tomorrow by 6pm" : "In 2–3 business days"}
                  </div>
                  <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">Confirmation sent to</div>
                  <div className="mt-1 font-semibold">{customer.email}</div>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link to="/" className="rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow">Return Home</Link>
                  <Link to="/menu" className="rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-foreground/5">Continue Shopping</Link>
                </div>
              </div>
            )}

            {step < 4 && (
              <div className="mt-6 flex flex-wrap justify-between gap-3">
                <button onClick={step === 0 ? () => navigate({ to: "/cart" }) : back} className="inline-flex items-center gap-1 rounded-full glass px-5 py-3 text-sm font-semibold hover:bg-foreground/5">
                  <ChevronLeft className="h-4 w-4" /> {step === 0 ? "Back to Cart" : "Previous"}
                </button>
                <button onClick={next} disabled={isSending} className="inline-flex items-center gap-1 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-glow disabled:opacity-60 disabled:cursor-not-allowed">
                  {isSending ? "Placing Order…" : step === 3 ? "Place Order" : "Next"} {!isSending && <ChevronRight className="h-4 w-4" />}
                </button>
              </div>
            )}
          </div>

          {step < 4 && (
            <aside className="h-fit rounded-3xl glass-card p-6 lg:sticky lg:top-24">
              <h3 className="font-display text-xl">Order Summary</h3>
              <ul className="mt-4 space-y-3">
                {detailed.map((i) => (
                  <li key={i.id} className="flex gap-3">
                    <img src={i.product.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                    <div className="flex flex-1 justify-between gap-2">
                      <div>
                        <div className="text-sm font-medium leading-tight">{i.product.name}</div>
                        <div className="text-xs text-muted-foreground">Qty {i.qty}</div>
                      </div>
                      <div className="text-sm font-semibold">${(i.product.price * i.qty).toFixed(2)}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd>${deliveryFee.toFixed(2)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Tax (8%)</dt><dd>${tax.toFixed(2)}</dd></div>
                <div className="flex justify-between border-t border-border pt-2 font-display text-lg"><dt>Total</dt><dd className="text-gradient font-semibold">${total.toFixed(2)}</dd></div>
              </dl>
            </aside>
          )}
        </div>
      </div>

      <style>{`.field{width:100%;border-radius:0.75rem;border:1px solid var(--border);background:var(--background);padding:0.75rem 1rem;font-size:0.875rem;outline:none;transition:border-color .2s}.field:focus{border-color:var(--accent)}`}</style>
    </div>
  );
}

function Field({ label, error, children, className = "" }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Review({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border p-4">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
