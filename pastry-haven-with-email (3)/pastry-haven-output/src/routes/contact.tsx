import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Pastry Haven" },
      { name: "description", content: "Get in touch with our bakery. We'd love to hear from you." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name required").max(100),
  email: z.string().trim().email("Invalid email"),
  phone: z.string().trim().min(7, "Phone required").max(20),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const e2: Record<string, string> = {};
      r.error.issues.forEach((i) => { e2[i.path[0] as string] = i.message; });
      setErrors(e2);
      toast.error("Please fix the form errors.");
      return;
    }
    setErrors({});
    toast.success("Message sent! We'll be in touch soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="gradient-hero">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-accent">Contact</div>
          <h1 className="mt-2 font-display text-5xl font-semibold sm:text-6xl">Let's talk pastry.</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Custom orders, events, or just to say hi.</p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            {[
              { icon: MapPin, t: "Visit", d: "24 Rue de la Boulangerie, Paris" },
              { icon: Phone, t: "Call", d: "+1 (555) 234-7890" },
              { icon: Mail, t: "Email", d: "hello@pastryhaven.com" },
              { icon: Clock, t: "Hours", d: "Mon–Sun · 7am – 9pm" },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="flex gap-4 rounded-3xl glass-card p-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl gradient-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t}</div>
                  <div className="mt-1 font-semibold">{d}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={submit} className="rounded-3xl glass-card p-6 sm:p-8">
            <h2 className="font-display text-2xl">Send a message</h2>
            <div className="mt-6 space-y-4">
              {[
                { k: "name", l: "Your name", t: "text" },
                { k: "email", l: "Email", t: "email" },
                { k: "phone", l: "Phone", t: "tel" },
              ].map((f) => (
                <label key={f.k} className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{f.l}</span>
                  <input
                    type={f.t}
                    value={(form as any)[f.k]}
                    onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                  {errors[f.k] && <span className="mt-1 block text-xs text-destructive">{errors[f.k]}</span>}
                </label>
              ))}
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</span>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
                />
                {errors.message && <span className="mt-1 block text-xs text-destructive">{errors.message}</span>}
              </label>
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full gradient-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-soft hover:shadow-glow">
                <Send className="h-4 w-4" /> Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
