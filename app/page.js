"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-black to-gray-950 text-white font-poppins">
      {/* Gradient background effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600 opacity-30 blur-[120px] rounded-full"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-400 opacity-30 blur-[140px] rounded-full"></div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center px-6"
      >
        <h1 className="text-5xl sm:text-7xl font-bold mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            CryptoWatch
          </span>{" "}
          Dashboard
        </h1>

        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
          Monitor live cryptocurrency prices, manage your personal watchlist, 
          and make smarter trading decisions — all in one powerful dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-400 text-lg rounded-xl shadow-lg hover:shadow-cyan-400/40 transition-all duration-300"
            >
              Login 🚀
            </motion.button>
          </Link>

          <Link href="/about">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-cyan-400/40 text-lg rounded-xl hover:bg-cyan-400/10 transition-all duration-300"
            >
              Learn More 💡
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Floating crypto logos */}
      <motion.img
        src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
        alt="Bitcoin"
        className="absolute bottom-24 left-20 w-16 opacity-50"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.img
        src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
        alt="Ethereum"
        className="absolute top-24 right-24 w-14 opacity-50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />
    </main>
  );
}
