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

        {/* Launch App CTA Section - Added per instructions */}
        <section className="py-12 bg-indigo-500/5 border-y border-indigo-500/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to participate?</h2>
            <div className="flex justify-center gap-4">
              <a href="/governance" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20">
                Launch App
              </a>
              <a href="/docs" className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-medium transition-all">
                Read Docs
              </a>
            </div>
          </div>
        </section>

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
    </div>
  );
}
