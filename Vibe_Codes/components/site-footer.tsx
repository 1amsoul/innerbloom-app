import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-charcoal/10 bg-charcoal text-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-serif text-3xl font-semibold">Loom & Lune</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-cream/70">Collectible crochet pieces made slowly for everyday softness, gifting, and little main-character rituals.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div className="grid gap-3">
            <p className="font-semibold text-cream">Shop</p>
            <Link href="/#bestsellers" className="text-cream/70">Bestsellers</Link>
            <Link href="/#collections" className="text-cream/70">Collections</Link>
            <Link href="/#story" className="text-cream/70">Story</Link>
          </div>
          <div className="grid gap-3">
            <p className="font-semibold text-cream">Care</p>
            <Link href="/#handmade" className="text-cream/70">Why handmade</Link>
            <Link href="/#proof" className="text-cream/70">Reviews</Link>
            <Link href="/#newsletter" className="text-cream/70">Drop alerts</Link>
          </div>
        </div>
        <div className="text-sm text-cream/65 lg:text-right">
          <p>Handmade in small batches.</p>
          <p className="mt-2">No mass production, no rushed restocks.</p>
        </div>
      </div>
    </footer>
  );
}
