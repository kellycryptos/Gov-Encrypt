"use client";

import { Navbar } from "../../components/Navbar";
import { Shield, Lock, Eye } from "lucide-react";

export default function Treasury() {
    return (
        <div className="min-h-screen bg-[#020617] text-white flex flex-col">
            <Navbar />

            <div className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">DAO Treasury</h1>
                    <p className="text-slate-400 max-w-2xl">
                        The community treasury is secured by a multi-sig and managed via governance proposals.
                        Arcium ensures that sensitive transaction details remains private until execution.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
                        <p className="text-slate-500 text-sm font-medium mb-1">Total Assets Value</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-white">$4,250,000</span>
                            <span className="text-emerald-400 text-sm font-medium">↑ 12%</span>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
                        <p className="text-slate-500 text-sm font-medium mb-1">Privacy Pool</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-white">$850,000</span>
                            <span className="text-indigo-400 text-xs py-1 px-2 bg-indigo-500/10 rounded-full border border-indigo-500/20">Encrypted</span>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
                        <p className="text-slate-500 text-sm font-medium mb-1">Monthly Spend</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-white">$45,000</span>
                            <span className="text-slate-500 text-sm">/ limit $100k</span>
                        </div>
                    </div>
                </div>

                {/* Transactions */}
                <div className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Recent Transactions</h3>
                        <button className="text-indigo-400 text-sm hover:text-indigo-300">View All</button>
                    </div>

                    <div className="divide-y divide-white/5">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Grant Disbursement #{1020 + i}</p>
                                        <p className="text-sm text-slate-500">To: 0x71C...92F • 2 days ago</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-white">- 5,000 USDC</p>
                                    <div className="flex items-center justify-end gap-1 text-emerald-400 text-xs">
                                        <Lock className="w-3 h-3" />
                                        <span>Verified</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
