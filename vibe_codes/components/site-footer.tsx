import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-linen bg-porcelain">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-charcoal/60">
            Loom & Lune
          </p>
          <p className="mt-3 font-serif text-2xl text-charcoal">
            Handmade crochet, slow fashion, forever pieces.
          </p>
        </div>
        <div className="space-y-2 text-sm text-charcoal/70">
          <p className="text-xs uppercase tracking-[0.3em] text-charcoal/50">
            Shop
          </p>
          <Link href="/#bestsellers" className="block hover:text-charcoal">
            Bestsellers
          </Link>
          <Link href="/#collections" className="block hover:text-charcoal">
            Collections
          </Link>
          <Link href="/#why-handmade" className="block hover:text-charcoal">
            Why handmade
          </Link>
        </div>
        <div className="space-y-2 text-sm text-charcoal/70">
          <p className="text-xs uppercase tracking-[0.3em] text-charcoal/50">
            Studio
          </p>
          <Link href="/#founder" className="block hover:text-charcoal">
            Founder story
          </Link>
          <Link href="/#social-proof" className="block hover:text-charcoal">
            Community gallery
          </Link>
          <Link href="/#newsletter" className="block hover:text-charcoal">
            Join newsletter
          </Link>
        </div>
        <div className="space-y-2 text-sm text-charcoal/70">
          <p className="text-xs uppercase tracking-[0.3em] text-charcoal/50">
            Support
          </p>
          <p>Handmade in small batches</p>
          <p>Studio shipping updates</p>
          <p>Care guide included</p>
        </div>
      </div>
      <div className="border-t border-linen py-6 text-center text-xs text-charcoal/60">
        © 2026 Loom & Lune. Crafted with care in a small studio.
      </div>
    </footer>
  );
}
