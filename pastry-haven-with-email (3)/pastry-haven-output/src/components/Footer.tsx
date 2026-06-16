import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Welcome to Pastry Haven! Check your inbox for 10% off.");
    setEmail("");
  };

  return (
    <footer className="relative mt-32 border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="font-display text-2xl font-semibold">Pastry Haven</div>
            <p className="mt-3 text-sm text-background/70">
              Handcrafted pastries and luxurious desserts, baked fresh daily with the finest ingredients.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full bg-background/10 transition hover:bg-background/20" aria-label="Social">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              {[
                { to: "/menu", l: "Menu" },
                { to: "/about", l: "About Us" },
                { to: "/contact", l: "Contact" },
                { to: "/cart", l: "Cart" },
              ].map((x) => (
                <li key={x.to + x.l}>
                  <Link to={x.to} className="transition hover:text-background">{x.l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg">Visit Us</h4>
            <ul className="mt-4 space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> 24 Rue de la Boulangerie, Paris</li>
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" /> +1 (555) 234-7890</li>
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" /> hello@pastryhaven.com</li>
              <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0" /> Mon–Sun · 7am – 9pm</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg">Sweet Updates</h4>
            <p className="mt-3 text-sm text-background/70">Get 10% off your first order.</p>
            <form onSubmit={subscribe} className="mt-4 flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-full border border-background/20 bg-background/5 px-4 py-2.5 text-sm outline-none placeholder:text-background/40 focus:border-background/40"
              />
              <button type="submit" className="rounded-full gradient-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition hover:shadow-glow">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-background/10 pt-6 text-center text-xs text-background/50">
          © {new Date().getFullYear()} Pastry Haven. Crafted with love.
        </div>
      </div>
    </footer>
  );
}
