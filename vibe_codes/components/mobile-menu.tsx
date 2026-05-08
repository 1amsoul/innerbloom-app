"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

const menuSections = [
  {
    id: "shop",
    title: "Shop",
    links: [
      { label: "Bestsellers", href: "/#bestsellers" },
      { label: "Newest drop", href: "/#collections" },
      { label: "Gift favorites", href: "/#social-proof" }
    ]
  },
  {
    id: "collections",
    title: "Collections",
    links: [
      { label: "Soft Shoulder Bags", href: "/#collections" },
      { label: "Lace Layers", href: "/#collections" },
      { label: "Keepsake Accessories", href: "/#collections" }
    ]
  },
  {
    id: "about",
    title: "Studio",
    links: [
      { label: "Founder story", href: "/#founder" },
      { label: "Why handmade", href: "/#why-handmade" },
      { label: "Care + shipping", href: "/#why-handmade" }
    ]
  }
];

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [active, setActive] = useState<string | null>("shop");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-charcoal/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-cream px-6 py-6 shadow-soft"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.35em] text-charcoal/70">
                Studio menu
              </p>
              <button
                type="button"
                onClick={onClose}
                className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/10"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {menuSections.map((section) => {
                const isActive = active === section.id;
                return (
                  <div
                    key={section.id}
                    className="rounded-2xl border border-charcoal/10 bg-porcelain px-4 py-3"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActive((prev) =>
                          prev === section.id ? null : section.id
                        )
                      }
                      className="flex w-full items-center justify-between text-left"
                    >
                      <span className="font-serif text-lg text-charcoal">
                        {section.title}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition",
                          isActive && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          className="mt-3 space-y-2"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          {section.links.map((link) => (
                            <Link
                              key={link.label}
                              href={link.href}
                              onClick={onClose}
                              className="block rounded-full px-3 py-2 text-sm text-charcoal/80 transition hover:bg-mint/60"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl bg-mint/50 px-4 py-4">
              <p className="text-sm text-charcoal/70">Next drop ships in</p>
              <p className="mt-1 font-serif text-xl text-charcoal">
                10-14 studio days
              </p>
              <Link
                href="/#bestsellers"
                onClick={onClose}
                className="mt-4 inline-flex rounded-full bg-charcoal px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream"
              >
                Shop the drop
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
