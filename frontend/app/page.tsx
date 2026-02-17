"use client";

import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Dashboard } from "../components/Dashboard";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <Features />

        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white">Live Governance</h2>
              <p className="text-slate-400">Participate in decision making securely.</p>
            </div>
            <div className="px-4 py-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-400 text-xs font-mono">
              System Status: OPERATIONAL
            </div>
          </div>

          <Dashboard />
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-500 text-sm">
            &copy; 2024 Gov Encrypt. Built with <span className="text-indigo-500">Next.js 15</span> & <span className="text-violet-500">Arcium</span>.
          </p>
        </div>
      </footer>
    </div>
  );
}
