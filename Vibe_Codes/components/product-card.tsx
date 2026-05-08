"use client";

import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { Pressable } from "./motion-section";

export function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);

  return (
    <Pressable>
      <article className="group overflow-hidden rounded-lg border border-charcoal/10 bg-porcelain">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-[4/5] overflow-hidden bg-linen">
            <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 86vw" className="object-cover transition duration-700 group-hover:scale-[1.045]" />
            <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-charcoal">{product.badge}</span>
          </div>
        </Link>
        <div className="p-3 sm:p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <Link href={`/products/${product.slug}`} className="font-serif text-xl leading-tight sm:text-2xl">{product.name}</Link>
              <p className="mt-1 text-sm text-charcoal/62">{product.palette}</p>
            </div>
            <button aria-label="Add to wishlist" onClick={() => setLiked(!liked)} className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-charcoal/10 bg-cream">
              <Heart size={17} fill={liked ? "#e9c9bd" : "none"} />
            </button>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold">{product.price}</span>
            <Link href={`/products/${product.slug}`} className="inline-flex h-10 items-center gap-2 rounded-full bg-charcoal px-4 text-sm font-semibold text-cream transition hover:bg-sage hover:text-charcoal">
              <ShoppingBag size={15} />
              View
            </Link>
          </div>
        </div>
      </article>
    </Pressable>
  );
}
