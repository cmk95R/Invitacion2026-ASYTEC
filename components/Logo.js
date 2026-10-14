"use client";

import { motion } from "framer-motion";

export default function Logo({
  className = "",
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1.1, ease: [0.2, 0.7, 0.2, 1] },
}) {
  return (
    <motion.img
      src="/logo-blanco.png"
      alt="ASYTEC Sistemas"
      className={`logo-img ${className}`}
      initial={initial}
      animate={animate}
      transition={transition}
    />
  );
}