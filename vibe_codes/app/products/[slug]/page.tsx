import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, products } from "@/lib/catalog";
import { SectionReveal } from "@/components/section-reveal";
import { ShieldCheck, Sparkles, Truck } from "lucide-react";

type ProductPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProduct(params.slug);
  if (!product) {
    return {
      title: "Product | Loom & Lune"
    };
  }
  return {
    title: `${product.name} | Loom & Lune`,
    description: product.description
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-cream">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <SectionReveal>
          <div className="text-xs uppercase tracking-[0.4em] text-charcoal/60">
            <Link href="/">Home</Link> / {product.name}
          </div>
        </SectionReveal>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          <SectionReveal>
            <div className="grid gap-4">
              <div className="relative h-[420px] overflow-hidden rounded-[2.5rem] bg-linen sm:h-[520px]">
                <Image
                  src={product.gallery[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {product.gallery.slice(1).map((image) => (
                  <div
                    key={image}
                    className="relative h-44 overflow-hidden rounded-3xl bg-linen"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} detail`}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="lg:sticky lg:top-24">
              <p className="text-xs uppercase tracking-[0.4em] text-charcoal/60">
                {product.badge}
              </p>
              <h1 className="mt-3 font-serif text-4xl text-charcoal">
                {product.name}
              </h1>
              <p className="mt-3 text-lg text-charcoal/70">{product.description}</p>
              <div className="mt-6 flex items-center gap-4">
                <span className="text-2xl font-semibold text-charcoal">
                  {product.price}
                </span>
                <span className="rounded-full bg-mint/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-charcoal">
                  {product.scarcity}
                </span>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  className="focus-ring rounded-full bg-charcoal px-6 py-3 text-xs uppercase tracking-[0.3em] text-cream"
                >
                  Add to bag
                </button>
                <button
                  type="button"
                  className="focus-ring rounded-full border border-charcoal/20 px-6 py-3 text-xs uppercase tracking-[0.3em] text-charcoal"
                >
                  Request a fitting note
                </button>
              </div>
              <div className="mt-8 grid gap-4 rounded-3xl border border-linen bg-porcelain px-5 py-5 text-sm text-charcoal/70">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Handmade to order in the Loom & Lune studio
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  {product.shipping}
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Tracked shipping with care instructions included
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-porcelain">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 lg:grid-cols-3">
          <SectionReveal>
            <div className="rounded-3xl border border-linen bg-cream px-6 py-6">
              <p className="text-xs uppercase tracking-[0.3em] text-charcoal/60">
                Details
              </p>
              <ul className="mt-4 space-y-2 text-sm text-charcoal/70">
                {product.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          </SectionReveal>
          <SectionReveal>
            <div className="rounded-3xl border border-linen bg-cream px-6 py-6">
              <p className="text-xs uppercase tracking-[0.3em] text-charcoal/60">
                Materials
              </p>
              <ul className="mt-4 space-y-2 text-sm text-charcoal/70">
                {product.materials.map((material) => (
                  <li key={material}>{material}</li>
                ))}
              </ul>
            </div>
          </SectionReveal>
          <SectionReveal>
            <div className="rounded-3xl border border-linen bg-cream px-6 py-6">
              <p className="text-xs uppercase tracking-[0.3em] text-charcoal/60">
                Care
              </p>
              <ul className="mt-4 space-y-2 text-sm text-charcoal/70">
                {product.care.map((care) => (
                  <li key={care}>{care}</li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </div>
      </section>

      <div className="fixed bottom-4 left-0 right-0 z-40 px-4 sm:hidden">
        <div className="flex items-center justify-between rounded-full bg-charcoal px-4 py-3 text-cream shadow-soft">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cream/70">
              {product.price}
            </p>
            <p className="font-serif text-lg">{product.name}</p>
          </div>
          <button
            type="button"
            className="focus-ring rounded-full bg-cream px-4 py-2 text-xs uppercase tracking-[0.25em] text-charcoal"
          >
            Add to bag
          </button>
        </div>
      </div>
    </main>
  );
}
