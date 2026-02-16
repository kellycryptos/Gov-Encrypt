"use client";

import "@solana/wallet-adapter-react-ui/styles.css";
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
  const [quorum, setQuorum] = useState({ percentage: 0, status: 'Loading...' });

  const fetchQuorum = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_RELAYER_URL || 'http://localhost:3001'}/api/quorum`);
      const data = await res.json();
      setQuorum(data);
    } catch (e) {
      console.error("Failed to fetch quorum", e);
      setQuorum({ percentage: 84, status: 'Standard (Fallback)' });
    }
  };

  useState(() => {
    fetchQuorum();
  });

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

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <Card className="bg-slate-900/40 border-slate-800">
            <div className="text-[var(--muted-foreground)] text-[10px] font-bold uppercase tracking-widest mb-1">Active Proposals</div>
            <div className="text-2xl font-bold text-white">03</div>
            <div className="h-1 w-full bg-slate-800 mt-3 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-1/3"></div>
            </div>
          </Card>
          <Card className="bg-slate-900/40 border-slate-800">
            <div className="text-[var(--muted-foreground)] text-[10px] font-bold uppercase tracking-widest mb-1">Avg. Risk Score</div>
            <div className="text-2xl font-bold text-emerald-400">12.5%</div>
            <div className="text-[10px] text-emerald-500/60 mt-2 font-mono">MPC VERIFIED</div>
          </Card>
          <Card className="bg-slate-900/40 border-slate-800">
            <div className="text-[var(--muted-foreground)] text-[10px] font-bold uppercase tracking-widest mb-1">Quorum Status</div>
            <div className="text-2xl font-bold text-white">{quorum.percentage}%</div>
            <div className="text-[10px] text-slate-500 mt-1">{quorum.status}</div>
          </Card>
          <Card className="bg-slate-900/40 border-slate-800">
            <div className="text-[var(--muted-foreground)] text-[10px] font-bold uppercase tracking-widest mb-1">Encrypted Votes</div>
            <div className="text-2xl font-bold text-indigo-400">8.2k</div>
            <div className="text-[10px] text-indigo-500/60 mt-1 animate-pulse">SYNCING...</div>
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
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'governance' && (
              <>
                {/* Featured Proposal */}
                <Card className="border-l-4 border-l-indigo-600 bg-indigo-500/5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded border border-emerald-500/20">Voting Active</span>
                        <span className="text-xs text-[var(--muted-foreground)]">ID: #42</span>
                      </div>
                      <h2 className="text-xl font-bold text-white mb-2">Strategy: Diversification Alpha-V</h2>
                    </div>
                  </div>
                  <p className="text-[var(--muted-foreground)] text-sm mb-6 leading-relaxed border-b border-slate-800 pb-6">
                    Allocate 15% of the USDC treasury to diversified yield protocols. Strategy verified via MPC stress-test.
                    Results will be aggregated and revealed upon finalization.
                  </p>
                  <Vote proposalId={42} />
                </Card>

                {/* Recent Proposal Table */}
                <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/20 backdrop-blur-sm">
                  <div className="px-6 py-4 border-b border-slate-800 bg-slate-800/20">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Protocol Ledger</h3>
                  </div>
                  <table className="w-full text-left text-sm">
                    <thead className="text-[10px] text-slate-500 uppercase tracking-widest bg-slate-800/10">
                      <tr>
                        <th className="px-6 py-3 font-semibold">Proposal</th>
                        <th className="px-6 py-3 font-semibold text-center">Aggregation</th>
                        <th className="px-6 py-3 font-semibold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {[
                        { id: '#41', title: 'DAO Fee Restructuring', res: '64% / 36%', status: 'FAILED' },
                        { id: '#40', title: 'Security Partner Retention', res: '92% / 8%', status: 'PASSED' },
                        { id: '#39', title: 'Arcium Liquidity Bootstrapping', res: '88% / 12%', status: 'PASSED' },
                      ].map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/10 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-white">{p.title}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{p.id}</div>
                          </td>
                          <td className="px-6 py-4 text-center font-mono text-xs text-indigo-400">
                            {p.res}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${p.status === 'PASSED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                              }`}>
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
