"use client";

import Link from "next/link";

export function MobileStickyCta() {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-30 px-4 sm:hidden">
      <div className="flex items-center justify-between rounded-full bg-charcoal px-5 py-3 text-cream shadow-soft">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cream/70">
            New drop
          </p>
          <p className="font-serif text-lg">Shop Meadowlight</p>
        </div>
        <Link
          href="/#bestsellers"
          className="focus-ring rounded-full bg-cream px-4 py-2 text-xs uppercase tracking-[0.25em] text-charcoal"
        >
          Shop
        </Link>
      </div>
    </div>
  );
}
