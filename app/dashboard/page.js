"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 12,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(res.data);
      } catch (err) {
        console.error("Error fetching crypto data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCoins();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white px-6 py-16 font-poppins">
      {/* 🌈 Floating Glow Orbs */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-600/30 blur-[160px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-400/20 blur-[180px] rounded-full animate-pulse"></div>

      {/* 💫 Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12 z-10 relative"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            🚀 CryptoWatch Dashboard
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Track live cryptocurrency prices, with smooth animations and
          real-time updates powered by CoinGecko API.
        </p>
      </motion.div>

      {/* 💹 Coins Grid */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="text-center text-gray-400 text-lg"
          >
            Fetching live crypto data ⏳...
          </motion.p>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {coins.map((coin, index) => (
              <motion.div
                key={coin.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.06, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="group relative backdrop-blur-md bg-gray-900/50 border border-gray-800 rounded-2xl p-6 shadow-lg overflow-hidden hover:shadow-cyan-400/20 transition-all duration-500"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-purple-500/10 via-cyan-400/10 to-transparent blur-xl transition-opacity duration-700"></div>

                {/* Coin Content */}
                <div className="relative flex flex-col items-center">
                  <motion.img
                    src={coin.image}
                    alt={coin.name}
                    className="w-16 h-16 mb-4 drop-shadow-lg"
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <h2 className="text-2xl font-semibold">{coin.name}</h2>
                  <p className="text-gray-400 uppercase text-sm mb-3">
                    {coin.symbol}
                  </p>

                  <motion.p
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold"
                  >
                    ${coin.current_price.toLocaleString()}
                  </motion.p>

                  <p
                    className={`mt-2 font-semibold ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {coin.price_change_percentage_24h >= 0 ? "▲" : "▼"}{" "}
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>

                  <a
                    href={`https://www.coingecko.com/en/coins/${coin.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:underline mt-4"
                  >
                    View on CoinGecko ↗
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
