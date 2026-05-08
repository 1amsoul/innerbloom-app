"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag } from "lucide-react";
import { MobileMenu } from "@/components/mobile-menu";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-linen bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/10"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/" className="text-center">
          <span className="block text-[0.65rem] uppercase tracking-[0.45em] text-charcoal/60">
            Loom & Lune
          </span>
          <span className="font-serif text-lg text-charcoal">Handmade Atelier</span>
        </Link>
        <button
          type="button"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/10"
          aria-label="View cart"
        >
          <ShoppingBag className="h-5 w-5" />
        </button>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
