"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import dynamic from 'next/dynamic';
import { useState } from "react";
import Vote from "../components/Vote";
import CreateProposal from "../components/CreateProposal";
import Delegation from "../components/Delegation";
import TreasurySimulation from "../components/TreasurySimulation";
import { Card } from "../components/ui/Card";

const WalletButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export default function Home() {
  const [activeTab, setActiveTab] = useState<'governance' | 'delegation' | 'treasury'>('governance');

  return (
    <main className="min-h-screen pb-20 bg-[var(--background)]">
      {/* Navbar */}
      <nav className="border-b border-[var(--border)] bg-[var(--card)]/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">G</div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-none">Gov Encrypt</h1>
              <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-widest">Confidential Layer</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://docs.arcium.com" target="_blank" className="text-sm text-[var(--muted-foreground)] hover:text-white transition-colors hidden md:block">Docs</a>
            <WalletButton />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 mt-10">

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" /></svg>
            </div>
            <div className="text-[var(--muted-foreground)] text-xs font-medium uppercase tracking-wider mb-1">Treasury Value</div>
            <div className="text-3xl font-bold text-white">$42,500,000</div>
            <div className="text-emerald-400 text-xs mt-2 flex items-center gap-1">
              <span>↑ 2.4%</span>
              <span className="text-[var(--muted-foreground)]">vs last epoch</span>
            </div>
          </Card>
          <Card>
            <div className="text-[var(--muted-foreground)] text-xs font-medium uppercase tracking-wider mb-1">Active Proposals</div>
            <div className="text-3xl font-bold text-white">3</div>
            <div className="text-[var(--muted-foreground)] text-xs mt-2">
              Next tally in 14h 32m
            </div>
          </Card>
          <Card>
            <div className="text-[var(--muted-foreground)] text-xs font-medium uppercase tracking-wider mb-1">Encrypted Votes</div>
            <div className="text-3xl font-bold text-indigo-400">1,248</div>
            <div className="text-[var(--muted-foreground)] text-xs mt-2 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              MPC Network Active
            </div>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[var(--border)] mb-8 overflow-x-auto">
          {['governance', 'delegation', 'treasury'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-4 font-medium transition-all border-b-2 text-sm uppercase tracking-wide whitespace-nowrap ${activeTab === tab
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--muted-foreground)] hover:text-white hover:border-[var(--border)]'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Primary Column */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'governance' && (
              <>
                <Card className="border-l-4 border-l-emerald-500">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded border border-emerald-500/20">Active</span>
                        <span className="text-xs text-[var(--muted-foreground)]">ID: #42</span>
                      </div>
                      <h2 className="text-xl font-bold text-white mb-2">Treasury Diversification Strategy Alpha</h2>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Time Remaining</div>
                      <div className="font-mono text-sm">14h 32m 15s</div>
                    </div>
                  </div>
                  <p className="text-[var(--muted-foreground)] text-sm mb-6 leading-relaxed border-b border-[var(--border)] pb-6">
                    Proposing to allocate 15% of the USDC treasury into low-risk yield generating protocols.
                    The strategy parameters have been risk-assessed via private MPC simulation.
                    Vote outcomes are encrypted until the tally phase.
                  </p>
                  <Vote proposalId={42} />
                </Card>
              </>
            )}

            {activeTab === 'delegation' && <Delegation />}

            {activeTab === 'treasury' && <TreasurySimulation />}
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <CreateProposal />

            <Card title="Governance Health">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[var(--muted-foreground)]">Quorum Participation</span>
                    <span className="font-mono">12.4%</span>
                  </div>
                  <div className="w-full bg-[var(--secondary)] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[12.4%] rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-[var(--muted-foreground)] mt-1">
                    <span>Current</span>
                    <span>Target: 15%</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Network Status</span>
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Operational
                    </span>
                  </div>
                  <div className="text-xs text-[var(--muted-foreground)]">
                    Arcium Node v1.2.0 • Block 248,192
                  </div>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <p className="text-xs text-[var(--muted-foreground)]">
                &copy; 2024 Gov Encrypt Protocol. <br />
                Built on <span className="text-white">Solana</span> & <span className="text-white">Arcium</span>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
