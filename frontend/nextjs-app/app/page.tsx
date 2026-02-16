"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import dynamic from 'next/dynamic';
import { useState } from "react";
import Vote from "../components/Vote";
import CreateProposal from "../components/CreateProposal";
import Delegation from "../components/Delegation";
import TreasurySimulation from "../components/TreasurySimulation";

// Disable SSR for wallet components to avoid hydration mismatch
const WalletButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export default function Home() {
  const [activeTab, setActiveTab] = useState<'governance' | 'treasury' | 'delegation'>('governance');

  return (
    <main className="min-h-screen pb-20">
      {/* Navbar */}
      <nav className="border-b border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">G</div>
            <h1 className="text-xl font-bold tracking-tight">Gov Encrypt <span className="text-[var(--muted-foreground)] font-normal text-sm ml-2">Protocol v1</span></h1>
          </div>
          <WalletButton />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 mt-10">

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <div className="text-[var(--muted-foreground)] text-sm mb-1">Total Treasury Value</div>
            <div className="text-3xl font-bold text-white">$42,500,000</div>
          </div>
          <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <div className="text-[var(--muted-foreground)] text-sm mb-1">Active Proposals</div>
            <div className="text-3xl font-bold text-emerald-400">3</div>
          </div>
          <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <div className="text-[var(--muted-foreground)] text-sm mb-1">Encrypted Votes Cast</div>
            <div className="text-3xl font-bold text-indigo-400">1,248</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--border)] mb-8">
          <button
            onClick={() => setActiveTab('governance')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${activeTab === 'governance' ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-[var(--muted-foreground)] hover:text-white'}`}
          >
            Governance
          </button>
          <button
            onClick={() => setActiveTab('delegation')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${activeTab === 'delegation' ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-[var(--muted-foreground)] hover:text-white'}`}
          >
            Private Delegation
          </button>
          <button
            onClick={() => setActiveTab('treasury')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${activeTab === 'treasury' ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-[var(--muted-foreground)] hover:text-white'}`}
          >
            Treasury
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'governance' && (
              <>
                <div className="p-8 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded mb-2">Active</span>
                      <h2 className="text-xl font-bold">Proposal #42: Treasury Diversification Strategy</h2>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[var(--muted-foreground)]">Ends in</div>
                      <div className="font-mono">14h 32m</div>
                    </div>
                  </div>
                  <p className="text-[var(--muted-foreground)] mb-6 leading-relaxed">
                    Proposing to allocate 15% of the USDC treasury into low-risk yield generating protocols.
                    Risk assessment has been simulated via MPC.
                  </p>
                  <Vote proposalId={42} />
                </div>
              </>
            )}

            {activeTab === 'delegation' && <Delegation />}

            {activeTab === 'treasury' && <TreasurySimulation />}
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">
            <CreateProposal />

            <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <h3 className="font-semibold mb-4">Governance Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[var(--muted-foreground)]">Quorum Participation</span>
                    <span>12.4%</span>
                  </div>
                  <div className="w-full bg-[var(--background)] h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[12.4%]"></div>
                  </div>
                </div>
                <div className="p-3 bg-[var(--background)] rounded-lg text-xs text-[var(--muted-foreground)]">
                  ⚠️ Quorum threshold is 15%. 2.6% more participation needed.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
