"use client";

import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Dashboard } from "../components/Dashboard";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Devnet Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-arcium-500/10 border-b border-arcium-500/20 py-2.5 text-center backdrop-blur-md relative z-40"
        >
          <p className="text-[13px] font-mono tracking-wider text-arcium-300 font-bold flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-arcium-400 animate-pulse" />
            GOV-ENCRYPT V1.0 LIVE ON SOLANA DEVNET
          </p>
        </motion.div>

        <Hero />

        {/* Launch App CTA Section */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-arcium-600/5 border-y border-arcium-500/10 backdrop-blur-sm" />
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-flex items-center gap-2 mb-6 text-arcium-400">
                    <Activity className="w-5 h-5 animate-pulse" />
                </div>
                <h2 className="text-3xl font-outfit font-bold text-white mb-8">Ready to govern confidentially?</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a href="/governance" className="px-10 py-4 bg-arcium-600 hover:bg-arcium-500 text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(109,69,255,0.4)] hover:shadow-[0_0_40px_rgba(109,69,255,0.6)] hover:-translate-y-1">
                    Launch Application
                  </a>
                </div>
            </motion.div>
          </div>
        </section>

        <Features />

        <section className="py-32 max-w-7xl mx-auto px-6 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-4">Live Governance</h2>
              <p className="text-lg text-slate-400 max-w-xl">Participate in active proposals securely. Your encrypted vote is processed by the Arcium confidential computation network.</p>
            </div>
            <div className="px-5 py-2.5 bg-[#0a0a0f] rounded-xl border border-arcium-500/20 text-arcium-400 text-xs font-mono shadow-[0_0_20px_rgba(109,69,255,0.1)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM STATUS: OPERATIONAL
            </div>
          </motion.div>

          <Dashboard />
        </section>
      </main>
    </div>
  );
}
