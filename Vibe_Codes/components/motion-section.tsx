"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MotionSection({
  children,
  className = "",
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.section>
  );
}

export function Pressable({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn("will-change-transform", className)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
