"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { collections } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const menuGroups = [
  { title: "Shop", items: ["Bestsellers", "New drops", "Giftable pieces"] },
  { title: "Story", items: ["Founder note", "Why handmade", "Care guide"] },
  { title: "Support", items: ["Shipping timeline", "Sizing help", "Custom requests"] }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState("Shop");

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-charcoal/10 bg-cream/88 backdrop-blur-xl">
        <nav className="mx-auto grid h-16 max-w-7xl grid-cols-3 items-center px-4 sm:px-6 lg:px-8">
          <button aria-label="Open menu" onClick={() => setOpen(true)} className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/10 bg-porcelain">
            <Menu size={20} />
          </button>
          <Link href="/" className="text-center font-serif text-2xl font-semibold tracking-normal">
            Loom & Lune
          </Link>
          <div className="flex justify-end">
            <button aria-label="Cart" className="focus-ring relative flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/10 bg-porcelain">
              <ShoppingBag size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-sage" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div className="fixed inset-0 z-[60]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button aria-label="Close menu overlay" className="absolute inset-0 bg-charcoal/28" onClick={() => setOpen(false)} />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-[86vw] max-w-sm overflow-y-auto bg-cream px-5 py-4 shadow-soft"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-serif text-2xl font-semibold">Loom & Lune</span>
                <button aria-label="Close menu" onClick={() => setOpen(false)} className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/10 bg-porcelain">
                  <X size={18} />
                </button>
              </div>

              <div className="mb-5 rounded-lg border border-charcoal/10 bg-porcelain p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-charcoal/55">Current drop</p>
                <p className="mt-2 font-serif text-2xl leading-none">Soft pieces, made in tiny batches.</p>
                <Link href="/#bestsellers" onClick={() => setOpen(false)} className="mt-4 inline-flex h-11 items-center rounded-full bg-charcoal px-5 text-sm font-semibold text-cream">
                  Shop the drop
                </Link>
              </div>

              <div className="space-y-2">
                {menuGroups.map((group) => (
                  <div key={group.title} className="border-b border-charcoal/10 py-1">
                    <button onClick={() => setExpanded(expanded === group.title ? "" : group.title)} className="flex min-h-12 w-full items-center justify-between text-left text-sm font-semibold">
                      {group.title}
                      <ChevronDown size={17} className={cn("transition-transform", expanded === group.title && "rotate-180")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded === group.title ? (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="grid gap-2 pb-3">
                            {group.items.map((item) => (
                              <Link key={item} href="/#bestsellers" onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm text-charcoal/70">
                                {item}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3">
                {collections.slice(0, 2).map((collection) => (
                  <Link key={collection.title} href={collection.href} onClick={() => setOpen(false)} className="rounded-lg bg-mint/55 p-4">
                    <p className="font-serif text-xl">{collection.title}</p>
                    <p className="mt-1 text-sm text-charcoal/65">{collection.subtitle}</p>
                  </Link>
                ))}
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
