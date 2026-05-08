import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type CollectionCardProps = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
};

export function CollectionCard({
  title,
  subtitle,
  image,
  href
}: CollectionCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-3xl bg-linen shadow-soft transition hover:-translate-y-1"
    >
      <div className="relative h-64 w-full overflow-hidden md:h-72">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
      </div>
      <div className="absolute bottom-6 left-6 right-6 text-porcelain">
        <p className="text-xs uppercase tracking-[0.3em] text-porcelain/80">
          Featured
        </p>
        <h3 className="mt-2 font-serif text-2xl">{title}</h3>
        <p className="mt-2 text-sm text-porcelain/80">{subtitle}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm">
          View collection
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
