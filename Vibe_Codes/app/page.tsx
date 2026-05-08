import { ArrowRight, Check, Heart, Mail, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MotionSection, Pressable } from "@/components/motion-section";
import { ProductCard } from "@/components/product-card";
import { collections, imageUrls, products } from "@/lib/catalog";

const handmadeNotes = [
  ["Craft", "Every stitch is guided by hand, tension, and time."],
  ["Unique", "Small variations make each piece quietly one of one."],
  ["Slow", "Batches stay limited so the studio can protect quality."],
  ["Emotional", "Designed to become part of routines, outfits, and memories."]
];

const reviews = [
  "It felt like opening a tiny piece of art. The packaging, the note, the softness, all of it.",
  "I wore the bolero to dinner and three people asked where it was from before dessert.",
  "The bag is delicate but practical. You can tell it was made by someone who cares."
];

export default function Home() {
  return (
    <main className="overflow-hidden pt-16">
      <section className="relative min-h-[calc(100svh-4rem)] bg-charcoal text-cream">
        <Image
          src={imageUrls.hero}
          alt="Editorial handmade fashion styling"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-78"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/20 to-charcoal/78" />
        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-end px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-xl">
            <p className="mb-4 inline-flex rounded-full border border-cream/30 bg-cream/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur">
              Tiny-batch crochet atelier
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-[0.95] sm:text-7xl">
              Handmade softness for your most saved outfits.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-cream/84">
              Collectible crochet pieces made slowly in limited drops, designed for the Instagram-to-closet moment.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="#bestsellers" className="inline-flex h-12 items-center justify-center rounded-full bg-cream px-6 text-sm font-semibold text-charcoal transition hover:bg-mint">
                Shop the drop
              </Link>
              <Link href="#story" className="inline-flex h-12 items-center justify-center rounded-full border border-cream/35 px-6 text-sm font-semibold text-cream backdrop-blur transition hover:bg-cream/12">
                Meet the maker
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-lg border border-cream/18 bg-cream/12 p-2 text-center text-xs backdrop-blur sm:max-w-lg">
            <span className="py-2">Made to order</span>
            <span className="border-x border-cream/18 py-2">Tracked shipping</span>
            <span className="py-2">Gift-ready wrap</span>
          </div>
        </div>
      </section>

      <MotionSection id="collections" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal/50">Featured collections</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">Made to feel discovered.</h2>
          </div>
          <Link href="#bestsellers" className="hidden items-center gap-2 text-sm font-semibold sm:inline-flex">
            Browse all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {collections.map((collection) => (
            <Pressable key={collection.title}>
              <Link href={collection.href} className="group block overflow-hidden rounded-lg bg-porcelain">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={collection.image} alt={collection.title} fill sizes="(min-width: 768px) 33vw, 92vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-3xl">{collection.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-charcoal/62">{collection.subtitle}</p>
                </div>
              </Link>
            </Pressable>
          ))}
        </div>
      </MotionSection>

      <MotionSection id="bestsellers" className="bg-mint/35 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal/50">Bestsellers</p>
              <h2 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">The pieces people save first.</h2>
            </div>
            <div className="hidden rounded-full bg-porcelain px-4 py-2 text-sm text-charcoal/65 sm:block">
              417 happy studio orders
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="story" className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
        <div className="relative min-h-[430px] overflow-hidden rounded-lg bg-linen">
          <Image src={imageUrls.process} alt="Handmade craft process" fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal/50">Founder story</p>
          <h2 className="mt-3 font-serif text-5xl font-semibold leading-none">A studio note in every stitch.</h2>
          <p className="mt-5 text-base leading-8 text-charcoal/70">
            Loom & Lune is built like a creator-led drop, not a warehouse catalog. Each piece starts with a saved mood, a yarn test, and a small run that can be made beautifully without rushing the hands behind it.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {["Signed maker card", "Batch numbered", "Repair guidance"].map((item) => (
              <div key={item} className="rounded-lg border border-charcoal/10 bg-porcelain p-4 text-sm font-semibold">
                <Check className="mb-3 text-sage" size={18} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="handmade" className="bg-porcelain px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal/50">Why handmade?</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">Because the value is in the slowness.</h2>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {handmadeNotes.map(([title, copy]) => (
              <div key={title} className="rounded-lg border border-charcoal/10 bg-cream p-5">
                <Sparkles className="mb-5 text-sage" size={20} />
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-charcoal/65">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="proof" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal/50">Customer proof</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">Seen in soft little moments.</h2>
          </div>
          <div className="hidden items-center gap-1 text-sm font-semibold sm:flex">
            {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={16} fill="#9faf97" className="text-sage" />)}
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid grid-cols-3 gap-2">
            {[imageUrls.customer1, imageUrls.customer2, imageUrls.customer3].map((image, index) => (
              <div key={image} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-linen">
                <Image src={image} alt={`Customer styling ${index + 1}`} fill sizes="30vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="grid gap-3">
            {reviews.map((review) => (
              <blockquote key={review} className="rounded-lg border border-charcoal/10 bg-porcelain p-5">
                <Heart className="mb-4 text-blush" size={18} fill="#e9c9bd" />
                <p className="font-serif text-2xl leading-8">{review}</p>
              </blockquote>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="newsletter" className="px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-lg bg-sage p-5 text-charcoal sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal/60">Drop alerts</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">First look before the reel goes live.</h2>
          </div>
          <form className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-end">
            <label className="sr-only" htmlFor="email">Email address</label>
            <div className="relative flex-1 lg:max-w-sm">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/45" size={18} />
              <input id="email" type="email" placeholder="your@email.com" className="focus-ring h-12 w-full rounded-full border border-charcoal/10 bg-cream pl-11 pr-4 text-sm" />
            </div>
            <button className="focus-ring h-12 rounded-full bg-charcoal px-6 text-sm font-semibold text-cream">
              Join the list
            </button>
          </form>
        </div>
      </MotionSection>
    </main>
  );
}
