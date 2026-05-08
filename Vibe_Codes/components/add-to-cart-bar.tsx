"use client";

import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/catalog";

export function AddToCartBar({ product }: { product: Product }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-charcoal/10 bg-cream/94 p-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{product.name}</p>
          <p className="text-xs text-charcoal/60">{product.price} · {product.badge}</p>
        </div>
        <button className="focus-ring inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-charcoal px-5 text-sm font-semibold text-cream">
          <ShoppingBag size={16} />
          Add
        </button>
      </div>
    </div>
  );
}
