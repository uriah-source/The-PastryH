import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, Sparkles, Truck, ShieldCheck, Heart, Clock, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { products, getBestsellers, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pastry Haven — Freshly Baked Perfection" },
      { name: "description", content: "Discover artisan pastries and irresistible desserts made with passion and the finest ingredients." },
      { property: "og:title", content: "Pastry Haven — Freshly Baked Perfection" },
      { property: "og:description", content: "Handcrafted pastries and luxurious desserts. Order online." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=80" },
    ],
  }),
  component: Index,
});

const heroImgs = [
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
];

function Hero() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative isolate overflow-hidden gradient-hero">
      {/* glow orbs */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-accent/30 blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div className="relative z-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> Award-winning Parisian Pâtisserie
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Freshly Baked <span className="text-gradient italic">Perfection</span>,<br />
            Crafted for Every Craving.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Discover artisan pastries and irresistible desserts made with passion, creativity, and the finest ingredients.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/menu" className="group inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-glow">
              Order Now <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link to="/menu" className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold transition hover:bg-foreground/5">
              Explore Menu
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-6">
            <div className="flex -space-x-2">
              {["1494790108377-be9c29b29330", "1438761681033-6461ffad8d80", "1500648767791-00dcc994a43e", "1534528741775-53994a69daeb"].map((id) => (
                <img key={id} src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=64&h=64&q=80`} alt="" className="h-9 w-9 rounded-full border-2 border-background object-cover" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />)}
              </div>
              <p className="text-xs text-muted-foreground">Loved by 12,000+ customers</p>
            </div>
          </div>
        </div>

        {/* Floating pastries collage */}
        <div className="relative h-[500px] sm:h-[600px]">
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full gradient-gold blur-3xl opacity-40 animate-spin-slow" />

          <div
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-8 border-white shadow-glow"
            style={{ transform: `translate(-50%, calc(-50% + ${scroll * -0.05}px))` }}
          >
            <img src={heroImgs[0]} alt="Signature dessert" className="h-full w-full object-cover animate-spin-slow" />
          </div>

          <div className="absolute -left-2 top-12 h-32 w-32 animate-float">
            <div className="glass-card h-full w-full overflow-hidden rounded-2xl rotate-[-8deg]">
              <img src={heroImgs[1]} alt="Macarons" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="absolute right-0 top-4 h-36 w-36 animate-float-slow">
            <div className="glass-card h-full w-full overflow-hidden rounded-2xl rotate-[10deg]">
              <img src={heroImgs[2]} alt="Tart" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="absolute bottom-8 left-8 h-40 w-40 animate-float" style={{ animationDelay: "1s" }}>
            <div className="glass-card h-full w-full overflow-hidden rounded-2xl rotate-[6deg]">
              <img src={heroImgs[3]} alt="Croissant" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="absolute bottom-16 right-4 animate-float-slow" style={{ animationDelay: "1.5s" }}>
            <div className="glass-card rounded-2xl p-3 shadow-soft">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl gradient-accent text-accent-foreground"><Heart className="h-4 w-4" /></div>
                <div className="leading-tight">
                  <div className="text-xs font-semibold">Fresh daily</div>
                  <div className="text-[10px] text-muted-foreground">Baked at 4am</div>
                </div>
              </div>
            </div>
          </div>

          {/* particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-accent/60 animate-float"
              style={{
                left: `${10 + i * 11}%`,
                top: `${20 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${5 + (i % 4)}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* marquee */}
      <div className="border-y border-border/50 bg-foreground/5 backdrop-blur">
        <div className="flex overflow-hidden py-4">
          <div className="flex shrink-0 animate-marquee gap-12 whitespace-nowrap pr-12">
            {[...Array(2)].flatMap(() => ["Hand-laminated daily", "French butter", "70% Valrhona", "Farm-fresh eggs", "Heritage flour", "Tahitian vanilla", "Sicilian pistachio"]).map((t, i) => (
              <span key={i} className="font-display text-lg italic text-muted-foreground">• {t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const featured = products.slice(0, 8);
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-accent">Featured</div>
          <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Today's Crafted Selection</h2>
        </div>
        <Link to="/menu" className="hidden items-center gap-2 text-sm font-semibold hover:text-accent sm:inline-flex">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="bg-muted/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-accent">Categories</div>
          <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Explore Our Collections</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.slice(0, 8).map((c) => (
            <Link
              key={c.slug}
              to="/menu"
              search={{ category: c.slug } as any}
              className="group relative aspect-square overflow-hidden rounded-3xl shadow-soft hover-lift"
            >
              <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="text-[10px] uppercase tracking-widest text-white/70">{c.group}</div>
                <div className="font-display text-2xl font-semibold text-white">{c.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestSellers() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="mb-12 text-center">
        <div className="text-xs uppercase tracking-[0.25em] text-accent">Best Sellers</div>
        <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Customer Favorites</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">The treats our community can't stop ordering.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {getBestsellers().slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-glow">
            <img src="https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=1000&q=80" alt="Our bakery" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden md:block">
            <div className="glass-card rounded-2xl p-5">
              <div className="font-display text-4xl font-semibold text-gradient">25+</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Years of passion</div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-accent">Our Story</div>
          <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Three generations of artisan baking.</h2>
          <p className="mt-6 text-muted-foreground">
            Pastry Haven began in a tiny Parisian boulangerie in 1998. Today, our master pâtissiers carry forward that same uncompromising obsession with quality — sourcing single-origin chocolate, churning our own butter, and laminating croissants over three meticulous days.
          </p>
          <p className="mt-4 text-muted-foreground">
            Every macaron, every cheesecake, every éclair is made by hand. We don't cut corners — we cut into perfect butter.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6">
            {[{ n: "200+", l: "Recipes" }, { n: "12k", l: "Happy customers" }, { n: "4.9", l: "Average rating" }].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl font-semibold text-gradient">{s.n}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: Sparkles, t: "Fresh Ingredients Daily", d: "Sourced from farms we know by name." },
    { icon: Heart, t: "Handmade with Care", d: "No machines. No shortcuts. Just hands." },
    { icon: Award, t: "Premium Quality", d: "Award-winning recipes, perfected." },
    { icon: Truck, t: "Fast Delivery", d: "Same-day available in metro areas." },
    { icon: ShieldCheck, t: "Secure Ordering", d: "Encrypted checkout, hassle-free." },
    { icon: Clock, t: "24/7 Support", d: "We're here whenever you crave us." },
  ];
  return (
    <section className="bg-foreground py-24 text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-accent">Why Pastry Haven</div>
          <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Crafted with intention.</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="group rounded-3xl border border-background/10 bg-background/5 p-6 backdrop-blur transition hover:border-accent/50 hover:bg-background/10">
              <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-accent text-accent-foreground transition group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl">{t}</h3>
              <p className="mt-2 text-sm text-background/70">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Amélie R.", img: "1494790108377-be9c29b29330", text: "The macarons are unreal. Better than my last trip to Paris.", rating: 5 },
    { name: "Jordan K.", img: "1500648767791-00dcc994a43e", text: "Ordered the Haven Centerpiece for our anniversary. Showstopper.", rating: 5 },
    { name: "Priya M.", img: "1438761681033-6461ffad8d80", text: "Crème brûlée arrived perfectly torched. How?! I'm obsessed.", rating: 5 },
    { name: "Lucas B.", img: "1534528741775-53994a69daeb", text: "Cinnamon rolls are dangerous. Already on subscription.", rating: 5 },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="mb-12 text-center">
        <div className="text-xs uppercase tracking-[0.25em] text-accent">Testimonials</div>
        <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Sweet words from sweet people.</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((r) => (
          <div key={r.name} className="glass-card rounded-3xl p-6 hover-lift">
            <div className="flex items-center gap-3">
              <img src={`https://images.unsplash.com/photo-${r.img}?auto=format&fit=crop&w=80&h=80&q=80`} alt={r.name} className="h-12 w-12 rounded-full object-cover" />
              <div>
                <div className="font-semibold">{r.name}</div>
                <div className="flex items-center gap-0.5">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} className="h-3 w-3 fill-[var(--gold)] text-[var(--gold)]" />)}
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{r.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [
    "1565958011703-44f9829ba187", "1551024506-0bccd828d307", "1571877227200-a0d98ea607e9", "1606313564200-e75d5e30476c",
    "1606890737304-57a1ca8a5b62", "1486427944299-d1955d23e34d", "1612203985729-70726954388c", "1567306226416-28f0efdc88ce",
  ];
  return (
    <section className="bg-muted/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-accent">@pastryhaven</div>
          <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Follow the sweet life.</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
          {imgs.map((id, i) => (
            <a key={id} href="#" className={`group relative overflow-hidden rounded-2xl shadow-soft ${i % 5 === 0 ? "sm:row-span-2 sm:aspect-square" : "aspect-square"}`}>
              <img src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    toast.success("You're in! Check your email for 10% off your first order.");
    setEmail("");
  };
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 text-primary-foreground sm:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[var(--gold)]/30 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">Get Sweet Updates Delivered to Your Inbox.</h2>
            <p className="mt-3 text-primary-foreground/80">Subscribers get 10% off their first order plus first dibs on seasonal specials.</p>
          </div>
          <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/50 outline-none backdrop-blur focus:border-white/40"
            />
            <button type="submit" className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-soft transition hover:shadow-glow">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      <Hero />
      <Featured />
      <Categories />
      <BestSellers />
      <About />
      <WhyUs />
      <Testimonials />
      <Gallery />
      <Newsletter />
    </>
  );
}
