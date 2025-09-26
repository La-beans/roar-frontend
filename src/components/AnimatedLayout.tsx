"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type Props = { children: ReactNode };

export default function AnimatedLayout({ children }: Props) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex-1 relative overflow-hidden"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
