"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function SectionReveal({
  children,
  className,
  delay = 0
}: SectionRevealProps) {
  return (
    <motion.div
      className={cn("will-change-transform", className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
