import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Pastry Haven" },
      { name: "description", content: "Three generations of artisan baking, crafted with passion in every pastry." },
      { property: "og:title", content: "About — Pastry Haven" },
      { property: "og:description", content: "Three generations of artisan baking." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="gradient-hero">
      <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6">
        <div className="text-xs uppercase tracking-[0.25em] text-accent">Our Story</div>
        <h1 className="mt-2 font-display text-5xl font-semibold sm:text-7xl">A love letter, baked daily.</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          From a tiny corner of Paris in 1998 to a beloved digital pâtisserie, Pastry Haven has spent three generations perfecting the art of butter, flour, and patience.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="overflow-hidden rounded-3xl shadow-glow">
          <img src="https://images.unsplash.com/photo-1568827999250-3f6afff96e66?auto=format&fit=crop&w=1600&q=80" alt="Our bakery" className="aspect-[16/9] w-full object-cover" />
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl gap-12 text-lg leading-relaxed text-muted-foreground">
          <p>It began with Madeleine, our founder, who believed a single croissant could change someone's morning. Over three days she'd laminate the dough, folding French butter into heritage flour until each layer whispered.</p>
          <p>Today our master pâtissiers continue her obsession — sourcing single-origin chocolate from Madagascar, churning butter from a farm in Brittany, and treating every macaron shell like a tiny piece of architecture.</p>
          <p className="text-foreground italic font-display text-2xl">"We don't cut corners. We cut into perfect butter."</p>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[{ n: "1998", l: "Founded in Paris" }, { n: "25+", l: "Years of craft" }, { n: "200+", l: "Original recipes" }, { n: "12k+", l: "Happy customers" }].map((s) => (
            <div key={s.l} className="rounded-3xl glass-card p-6 text-center">
              <div className="font-display text-4xl font-semibold text-gradient">{s.n}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link to="/menu" className="inline-flex items-center gap-2 rounded-full gradient-primary px-8 py-4 font-semibold text-primary-foreground shadow-soft hover:shadow-glow">
            Taste our work
          </Link>
        </div>
      </section>
    </div>
  );
}
