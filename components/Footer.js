"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="mt-20 py-6 border-t border-gray-800 text-center text-gray-400 bg-gray-900/50 backdrop-blur-md"
    >
    </motion.footer>
  );
}
