import Image from "next/image";
import Link from "next/link";
import {
  collections,
  communityImages,
  imageUrls,
  products,
  testimonials,
  whyHandmade
} from "@/lib/catalog";
import { SectionReveal } from "@/components/section-reveal";
import { CollectionCard } from "@/components/collection-card";
import { ProductCard } from "@/components/product-card";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { Sparkles, ShieldCheck, Star } from "lucide-react";

const trustItems = [
  {
    title: "Handmade by one maker",
    detail: "Every order is stitched and packed in the studio."
  },
  {
    title: "Slow-fashion timeline",
    detail: "Expect 10-14 studio days with progress updates."
  },
  {
    title: "Tracked, insured shipping",
    detail: "Carefully wrapped and sent with tracking."
  }
];

export default function HomePage() {
  return (
    <main className="bg-cream">
      <section className="relative overflow-hidden bg-porcelain">
        <div className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-mint/60 blur-3xl" />
        <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-blush/50 blur-3xl" />
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
          <SectionReveal>
            <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">
              Handmade crochet atelier
            </p>
            <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl lg:text-6xl">
              Soft editorial crochet for slow mornings and heirloom memories.
            </h1>
            <p className="mt-5 max-w-xl text-base text-charcoal/70">
              Discover collectible crochet pieces crafted in small batches, designed to
              feel like a quiet luxury ritual in your everyday wardrobe.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/#bestsellers"
                className="focus-ring rounded-full bg-charcoal px-6 py-3 text-xs uppercase tracking-[0.3em] text-cream"
              >
                Shop the drop
              </Link>
              <Link
                href="/#collections"
                className="focus-ring rounded-full border border-charcoal/20 px-6 py-3 text-xs uppercase tracking-[0.3em] text-charcoal"
              >
                View collections
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {trustItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-linen bg-cream px-4 py-4 text-sm text-charcoal/70"
                >
                  <p className="font-semibold text-charcoal">{item.title}</p>
                  <p className="mt-2 text-xs text-charcoal/60">{item.detail}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <div className="relative">
              <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full border border-charcoal/20" />
              <Image
                src={imageUrls.hero}
                alt="Model wearing handmade crochet"
                width={720}
                height={900}
                priority
                className="relative z-10 rounded-[2.5rem] object-cover shadow-soft"
              />
              <div className="absolute -right-6 top-10 hidden rounded-3xl bg-cream px-6 py-4 text-sm text-charcoal/70 shadow-soft md:block">
                <p className="text-xs uppercase tracking-[0.3em] text-charcoal/60">
                  Meadowlight drop
                </p>
                <p className="mt-1 font-serif text-lg text-charcoal">
                  Limited batch open now
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section id="collections" className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionReveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">
                  Featured collections
                </p>
                <h2 className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl">
                  Browse by mood and ritual.
                </h2>
              </div>
              <Link
                href="/#bestsellers"
                className="hidden text-xs uppercase tracking-[0.3em] text-charcoal/70 sm:inline"
              >
                Shop all
              </Link>
            </div>
          </SectionReveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {collections.map((collection) => (
              <SectionReveal key={collection.title}>
                <CollectionCard {...collection} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="bestsellers" className="bg-porcelain">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionReveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">
                  Bestsellers
                </p>
                <h2 className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl">
                  The pieces everyone saves on Instagram.
                </h2>
              </div>
              <div className="hidden items-center gap-2 text-sm text-charcoal/60 sm:flex">
                <Star className="h-4 w-4" />
                <span>4.9 average studio rating</span>
              </div>
            </div>
          </SectionReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <SectionReveal key={product.slug}>
                <ProductCard product={product} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="founder" className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
          <SectionReveal>
            <div className="relative overflow-hidden rounded-[2.5rem]">
              <Image
                src={imageUrls.process}
                alt="Handmade crochet process"
                width={720}
                height={820}
                className="object-cover"
              />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">
              Founder story
            </p>
            <h2 className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl">
              One maker, one table, countless quiet hours.
            </h2>
            <p className="mt-4 text-base text-charcoal/70">
              Loom & Lune began as a nightly ritual at the kitchen table, a way to slow
              down and stitch beauty into everyday life. Every piece is handmade by Lina,
              a former stylist who now dedicates her days to thoughtful crochet and
              soft editorial silhouettes.
            </p>
            <div className="mt-6 rounded-2xl border border-linen bg-porcelain px-5 py-4 text-sm text-charcoal/70">
              &ldquo;I want each piece to feel like you found it in a tucked-away boutique on
              a rainy afternoon.&rdquo;
              <p className="mt-3 font-serif text-lg text-charcoal">Lina, maker</p>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section id="why-handmade" className="bg-porcelain">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionReveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">
                  Why handmade
                </p>
                <h2 className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl">
                  Slow fashion with an emotional signature.
                </h2>
              </div>
              <div className="flex items-center gap-3 text-sm text-charcoal/60">
                <Sparkles className="h-4 w-4" />
                <span>Every piece is one-of-a-kind</span>
              </div>
            </div>
          </SectionReveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {whyHandmade.map((item) => (
              <SectionReveal key={item.title}>
                <div className="rounded-3xl border border-linen bg-cream px-6 py-6">
                  <h3 className="font-serif text-2xl text-charcoal">{item.title}</h3>
                  <p className="mt-3 text-sm text-charcoal/70">
                    {item.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
          <SectionReveal delay={0.15}>
            <div className="mt-10 grid gap-6 rounded-3xl border border-linen bg-cream px-6 py-6 lg:grid-cols-[1.1fr,0.9fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-charcoal/60">
                  Materials + care
                </p>
                <p className="mt-3 text-base text-charcoal/70">
                  Natural cotton, plant-dyed yarns, and hand-finished seams. Each order
                  ships with a studio care card and an invitation to keep the piece in
                  your wardrobe for years.
                </p>
              </div>
              <div className="flex flex-col gap-3 text-sm text-charcoal/70">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Hand-checked finishing and packaging
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Limited runs by color palette
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Plastic-free wrapping and tracking
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section id="social-proof" className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionReveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">
                  Community love
                </p>
                <h2 className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl">
                  Worn, gifted, and photographed around the world.
                </h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-charcoal/60">
                <Sparkles className="h-4 w-4" />
                <span>4.8K saves from recent reels</span>
              </div>
            </div>
          </SectionReveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="grid gap-6">
              {testimonials.map((review) => (
                <SectionReveal key={review.name}>
                  <div className="rounded-3xl border border-linen bg-porcelain px-6 py-6">
                    <p className="font-serif text-xl text-charcoal">{review.quote}</p>
                    <p className="mt-4 text-sm text-charcoal/60">
                      {review.name} · {review.detail}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
            <SectionReveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {communityImages.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="relative h-40 overflow-hidden rounded-2xl bg-linen"
                  >
                    <Image
                      src={image}
                      alt="Customer wearing crochet"
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section id="newsletter" className="bg-porcelain">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionReveal>
            <div className="rounded-[2.5rem] border border-linen bg-cream px-6 py-10 sm:px-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">
                    Studio notes
                  </p>
                  <h2 className="mt-3 font-serif text-3xl text-charcoal sm:text-4xl">
                    Get first access to new drops and care guides.
                  </h2>
                  <p className="mt-3 text-sm text-charcoal/70">
                    Monthly letters from the studio, early collection previews, and
                    gentle reminders to slow down.
                  </p>
                </div>
                <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-full border border-charcoal/10 bg-porcelain px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/50"
                  />
                  <button
                    type="submit"
                    className="focus-ring rounded-full bg-charcoal px-6 py-3 text-xs uppercase tracking-[0.3em] text-cream"
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <MobileStickyCta />
    </main>
  );
}
