import { ArrowLeft, Check, Clock, HeartHandshake, PackageCheck, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AddToCartBar } from "@/components/add-to-cart-bar";
import { MotionSection } from "@/components/motion-section";
import { ProductCard } from "@/components/product-card";
import { getProduct, products } from "@/lib/catalog";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  return {
    title: product ? `${product.name} | Loom & Lune` : "Product | Loom & Lune",
    description: product?.description
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const recommendations = products.filter((item) => item.slug !== product!.slug).slice(0, 3);

  return (
    <main className="pb-20 pt-16 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/#bestsellers" className="inline-flex h-11 items-center gap-2 text-sm font-semibold text-charcoal/70">
          <ArrowLeft size={16} />
          Back to the drop
        </Link>
      </div>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2">
          {product!.gallery.map((image, index) => (
            <div key={image} className={index === 0 ? "relative aspect-[4/5] overflow-hidden rounded-lg bg-linen sm:col-span-2" : "relative aspect-square overflow-hidden rounded-lg bg-linen"}>
              <Image src={image} alt={`${product!.name} view ${index + 1}`} fill priority={index === 0} sizes="(min-width: 1024px) 52vw, 92vw" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 inline-flex rounded-full bg-mint px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/65">
            {product!.badge}
          </p>
          <h1 className="font-serif text-5xl font-semibold leading-none sm:text-6xl">{product!.name}</h1>
          <p className="mt-4 text-2xl font-semibold">{product!.price}</p>
          <p className="mt-5 text-base leading-8 text-charcoal/70">{product!.description}</p>

          <div className="mt-6 rounded-lg border border-charcoal/10 bg-porcelain p-4">
            <p className="text-sm font-semibold text-charcoal">{product!.scarcity}</p>
            <p className="mt-2 text-sm leading-6 text-charcoal/62">No pressure countdowns, just honest studio capacity and batch timing.</p>
          </div>

          <button className="focus-ring mt-5 hidden h-12 w-full items-center justify-center gap-2 rounded-full bg-charcoal text-sm font-semibold text-cream transition hover:bg-sage hover:text-charcoal md:inline-flex">
            <ShoppingBag size={17} />
            Add to cart
          </button>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs text-charcoal/65">
            <div className="rounded-lg bg-porcelain p-3">
              <ShieldCheck className="mx-auto mb-2 text-sage" size={18} />
              Secure checkout
            </div>
            <div className="rounded-lg bg-porcelain p-3">
              <PackageCheck className="mx-auto mb-2 text-sage" size={18} />
              Tracked delivery
            </div>
            <div className="rounded-lg bg-porcelain p-3">
              <HeartHandshake className="mx-auto mb-2 text-sage" size={18} />
              Maker support
            </div>
          </div>
        </div>
      </section>

      <MotionSection className="bg-porcelain px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-4">
          <InfoBlock title="Details" icon={<Sparkles size={18} />} items={product!.details} />
          <InfoBlock title="Materials" icon={<Check size={18} />} items={product!.materials} />
          <InfoBlock title="Care" icon={<HeartHandshake size={18} />} items={product!.care} />
          <div className="rounded-lg border border-charcoal/10 bg-cream p-5">
            <Clock className="mb-4 text-sage" size={18} />
            <h2 className="font-serif text-3xl">Shipping</h2>
            <p className="mt-3 text-sm leading-6 text-charcoal/68">{product!.shipping}</p>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal/50">Handmade process</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">Made after you choose it.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Yarn is matched to the batch", "Piece is crocheted and blocked", "Packed with care notes"].map((step, index) => (
              <div key={step} className="rounded-lg border border-charcoal/10 bg-porcelain p-5">
                <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-mint text-sm font-semibold">{index + 1}</span>
                <p className="text-sm leading-6 text-charcoal/70">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="bg-mint/35 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-serif text-4xl font-semibold sm:text-5xl">Pairs beautifully with</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {recommendations.map((item) => <ProductCard key={item.slug} product={item} />)}
          </div>
        </div>
      </MotionSection>

      <AddToCartBar product={product!} />
    </main>
  );
}

function InfoBlock({ title, icon, items }: { title: string; icon: ReactNode; items: string[] }) {
  return (
    <div className="rounded-lg border border-charcoal/10 bg-cream p-5">
      <div className="mb-4 text-sage">{icon}</div>
      <h2 className="font-serif text-3xl">{title}</h2>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-charcoal/68">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
