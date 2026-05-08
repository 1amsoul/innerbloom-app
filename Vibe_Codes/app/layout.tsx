import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Loom & Lune | Handmade Crochet Atelier",
  description:
    "A premium creator-led crochet storefront for collectible handmade pieces, slow fashion drops, and soft editorial shopping."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
