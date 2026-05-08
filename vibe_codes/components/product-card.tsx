"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-porcelain shadow-soft transition hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>
        <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs uppercase tracking-[0.2em] text-charcoal">
          {product.badge}
        </span>
        <button
          type="button"
          onClick={() => setFavorite((prev) => !prev)}
          className="focus-ring absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-charcoal transition"
          aria-pressed={favorite}
          aria-label="Save to wishlist"
        >
          <Heart
            className={cn("h-4 w-4 transition", favorite && "fill-charcoal")}
          />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-4">
        <div>
          <h3 className="font-serif text-xl text-charcoal">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="mt-1 text-sm text-charcoal/70">{product.palette}</p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-semibold text-charcoal">
            {product.price}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="focus-ring rounded-full border border-charcoal/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-charcoal transition hover:border-charcoal"
          >
            Add to bag
          </Link>
        </div>
      </div>
    </div>
  );
}
