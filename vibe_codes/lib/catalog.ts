export type Product = {
  slug: string;
  name: string;
  price: string;
  badge: string;
  image: string;
  gallery: string[];
  palette: string;
  description: string;
  details: string[];
  materials: string[];
  care: string[];
  shipping: string;
  scarcity: string;
};

export const imageUrls = {
  hero:
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=82",
  process:
    "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1400&q=82",
  yarn:
    "https://images.unsplash.com/photo-1584992236310-6dedf0799bd5?auto=format&fit=crop&w=1400&q=82",
  studio:
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=82",
  knit1:
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=82",
  knit2:
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=82",
  knit3:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=82",
  knit4:
    "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?auto=format&fit=crop&w=1200&q=82",
  customer1:
    "https://images.unsplash.com/photo-1502720705749-3cbd24d2934c?auto=format&fit=crop&w=900&q=82",
  customer2:
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=82",
  customer3:
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=82"
};

export const collections = [
  {
    title: "Soft Shoulder Bags",
    subtitle: "Small-batch companions for everyday rituals.",
    image: imageUrls.knit1,
    href: "/#bestsellers"
  },
  {
    title: "Lace Layers",
    subtitle: "Delicate boleros, wraps, and after-sunset pieces.",
    image: imageUrls.knit2,
    href: "/#bestsellers"
  },
  {
    title: "Keepsake Accessories",
    subtitle: "Tiny heirlooms made for gifting and collecting.",
    image: imageUrls.yarn,
    href: "/#bestsellers"
  }
];

export const products: Product[] = [
  {
    slug: "sage-ritual-shoulder-bag",
    name: "Sage Ritual Shoulder Bag",
    price: "$168",
    badge: "Only 4 left",
    image: imageUrls.knit1,
    gallery: [imageUrls.knit1, imageUrls.yarn, imageUrls.studio],
    palette: "Pastel mint",
    description:
      "A soft structured crochet bag made for cafe mornings, market flowers, and every little errand that deserves to feel considered.",
    details: ["Hand-crocheted floral body", "Cotton-lined interior", "Magnetic brass closure"],
    materials: ["Organic cotton cord", "Recycled cotton lining", "Nickel-free brass hardware"],
    care: ["Spot clean with cool water", "Store filled to preserve shape", "Do not machine wash"],
    shipping: "Made to order in 10-14 studio days, then shipped with tracking.",
    scarcity: "Next restock opens after this batch sells through."
  },
  {
    slug: "ivory-moonlace-bolero",
    name: "Ivory Moonlace Bolero",
    price: "$214",
    badge: "Made to order",
    image: imageUrls.knit2,
    gallery: [imageUrls.knit2, imageUrls.process, imageUrls.hero],
    palette: "Warm ivory",
    description:
      "An airy crochet layer designed to make a simple slip dress feel like an editorial moment.",
    details: ["Open lace stitch", "Cropped relaxed drape", "Scalloped sleeve finish"],
    materials: ["Pima cotton blend", "Soft plant-based viscose", "Hand-finished seams"],
    care: ["Fold instead of hanging", "Steam lightly from a distance", "Hand wash cold only"],
    shipping: "Made slowly in 12-16 studio days with progress updates by email.",
    scarcity: "Two maker slots remain in this week's queue."
  },
  {
    slug: "blush-heirloom-hair-scarf",
    name: "Blush Heirloom Hair Scarf",
    price: "$74",
    badge: "Gift favorite",
    image: imageUrls.knit4,
    gallery: [imageUrls.knit4, imageUrls.yarn, imageUrls.customer2],
    palette: "Dusty blush",
    description:
      "A ribbon-like crochet scarf for buns, bags, and wrapped gifting, finished with a soft heirloom edge.",
    details: ["Lightweight lace stitch", "Tapered tie ends", "Limited blush dye lot"],
    materials: ["Mercerized cotton", "Plant-dyed yarn", "Compostable paper wrap"],
    care: ["Hand wash when needed", "Lay flat to dry", "Keep away from jewelry snags"],
    shipping: "Ready-to-ship pieces leave the studio in 2-4 business days.",
    scarcity: "This blush yarn will not be repeated exactly."
  },
  {
    slug: "oat-market-tote",
    name: "Oat Market Tote",
    price: "$188",
    badge: "Bestseller",
    image: imageUrls.knit3,
    gallery: [imageUrls.knit3, imageUrls.studio, imageUrls.process],
    palette: "Warm oat",
    description:
      "A relaxed handmade tote with a dense stitch, generous handles, and the quiet confidence of an everyday signature piece.",
    details: ["Reinforced base", "Double-handle construction", "Interior key loop"],
    materials: ["Reclaimed cotton rope", "Cotton twill pocket", "Low-waste studio offcuts"],
    care: ["Brush gently after use", "Spot clean only", "Air dry away from direct sun"],
    shipping: "Made to order in 8-12 studio days, packed in reusable cotton.",
    scarcity: "Batch closes Sunday at midnight."
  }
];

export const whyHandmade = [
  {
    title: "Slow-made craftsmanship",
    description:
      "Each piece is stitched by one maker in small batches, never rushed, never duplicated exactly."
  },
  {
    title: "Collectible, not disposable",
    description:
      "Natural yarns and heirloom stitches hold their shape, color, and story for seasons."
  },
  {
    title: "Emotion-led design",
    description:
      "Every silhouette begins with a feeling and a sketch, then grows into a wearable keepsake."
  }
];

export const testimonials = [
  {
    quote:
      "The Sage Ritual bag looks like it came from a boutique in Paris. I feel so put together carrying it.",
    name: "Maya R.",
    detail: "Verified buyer"
  },
  {
    quote:
      "My bolero shipped with a handwritten note and feels like a piece of art. Worth every day of the wait.",
    name: "Danielle S.",
    detail: "Repeat client"
  },
  {
    quote:
      "Soft, warm, and so thoughtfully packed. I can see the hours in every stitch.",
    name: "Priya K.",
    detail: "First-time shopper"
  }
];

export const communityImages = [
  imageUrls.customer1,
  imageUrls.customer2,
  imageUrls.customer3,
  imageUrls.knit2,
  imageUrls.knit4
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
