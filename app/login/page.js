"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    if (email === "admin@gmail.com" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid email or password 😢");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-950 text-white font-poppins relative overflow-hidden">
      {/* background glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900/30 to-cyan-900/20 blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-gray-900/60 backdrop-blur-md p-10 rounded-2xl shadow-lg w-[90%] sm:w-[400px] border border-gray-700"
      >
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          CryptoWatch Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 outline-none"
            required
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-cyan-400 text-white py-3 rounded-lg mt-2 font-semibold shadow-lg"
          >
            Login 🚀
          </motion.button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Don’t have an account? <span className="text-cyan-400">Sign up soon</span>
        </p>
      </motion.div>
    </main>
  );
}
