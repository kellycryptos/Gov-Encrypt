"use client";

import "@solana/wallet-adapter-react-ui/styles.css";
import { useState } from "react";
import { Dashboard } from "../components/Dashboard";
import { Delegation } from "../components/Delegation";
import { Profile } from "../components/Profile";
import { Button } from "../components/ui";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'governance' | 'delegation' | 'treasury'>('governance');

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Soft Pastel Header */}
      <header className="h-16 border-b border-[var(--border)] bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--primary)] to-[#b4beff] flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs">G</span>
              </div>
              <span className="font-bold tracking-tight text-lg">Gov Encrypt</span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {['governance', 'delegation', 'spaces'].map((item) => (
                <button
                  key={item}
                  className="px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--secondary)] capitalize"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">How it works</Button>
            <div className="w-px h-4 bg-[var(--border)] hidden sm:block mx-1" />
            <ProfileSectionSmall />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Sidebar Area (Left) */}
          <aside className="lg:col-span-3 space-y-6 hidden lg:block">
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-200 border-2 border-white shadow-sm overflow-hidden animate-pulse" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-500">Member Space</h4>
                  <p className="text-sm font-bold">ArciumDAO</p>
                </div>
              </div>
              <Button className="w-full !rounded-xl text-xs uppercase tracking-widest font-bold h-9">Join Space</Button>
            </div>

            <nav className="space-y-1">
              {[
                { label: 'Proposals', icon: '📝', id: 'governance' },
                { label: 'Delegates', icon: '🤝', id: 'delegation' },
                { label: 'Treasury', icon: '🏛️', id: 'treasury' },
                { label: 'Settings', icon: '⚙️', id: 'settings' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === item.id
                      ? 'bg-[var(--primary)]/10 text-[var(--primary)] shadow-sm border border-[var(--primary)]/20'
                      : 'text-[var(--muted-foreground)] hover:bg-[var(--secondary)]'
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Feed Area (Middle) */}
          <section className="lg:col-span-6 space-y-8">
            {activeTab === 'governance' && <Dashboard />}
            {activeTab === 'delegation' && <Delegation />}
            {activeTab === 'treasury' && (
              <div className="text-center py-20 bg-white border border-[var(--border)] rounded-2xl">
                <p className="text-[var(--muted-foreground)]">Treasury module transition in progress...</p>
              </div>
            )}
          </section>

          {/* Stats Area (Right) */}
          <aside className="lg:col-span-3 space-y-6">
            <Profile />

            <div className="p-6 rounded-2xl bg-white border border-[var(--border)] shadow-sm">
              <h4 className="text-sm font-bold mb-4">Space Info</h4>
              <div className="space-y-4">
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--muted-foreground)]">Network</span>
                  <span className="font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Solana Devnet
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--muted-foreground)]">MPC Status</span>
                  <span className="font-bold text-indigo-500">Active (Arcium)</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--muted-foreground)]">Min. Quorum</span>
                  <span className="font-bold font-mono">15.00%</span>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-[var(--border)] bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
          <div className="flex gap-6 text-[var(--muted-foreground)] text-xs font-medium">
            <a href="#" className="hover:text-[var(--primary)]">Twitter</a>
            <a href="#" className="hover:text-[var(--primary)]">Discord</a>
            <a href="#" className="hover:text-[var(--primary)]">Github</a>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]/60 font-medium">
            &copy; 2024 Gov Encrypt Protocol • Powered by Arcium
          </p>
        </div>
      </footer>
    </div>
  );
}

function ProfileSectionSmall() {
  return (
    <div className="flex items-center gap-3 pl-2 border-l border-[var(--border)]">
      <div className="hidden lg:block text-right">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Voting Power</p>
        <p className="text-xs font-bold font-mono">12.4k VP</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 border border-indigo-100 flex items-center justify-center shadow-sm">
        <span className="text-[10px]">👤</span>
      </div>
    </div>
  );
}
