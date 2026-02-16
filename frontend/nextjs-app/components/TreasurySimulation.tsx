"use client";

import { useState } from "react";
import { Card } from "../ui/Card";

export default function TreasurySimulation() {
    const [simulating, setSimulating] = useState(false);
    const [riskScore, setRiskScore] = useState<number | null>(null);

    const runSimulation = async () => {
        setSimulating(true);
        // Mock MPC delay
        await new Promise(r => setTimeout(r, 2000));
        setRiskScore(Math.floor(Math.random() * 100)); // 0-100 risk score
        setSimulating(false);
    };

    return (
        <Card title="Treasury Strategy Simulation" className="max-w-2xl mx-auto">
            <p className="text-sm text-[var(--muted-foreground)] mb-6 leading-relaxed">
                Before execution, treasury strategies are privately simulated against proprietary risk models using MPC.
                Only the aggregated risk score and allocation summary are revealed on-chain.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                    <label className="block text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Strategy</label>
                    <div className="font-mono text-sm text-[var(--foreground)]">Yield_Optimization_Alpha_v2</div>
                </div>
                <div className="p-4 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                    <label className="block text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Proposal Allocation</label>
                    <div className="font-mono text-sm text-[var(--foreground)]">500,000 USDC</div>
                </div>
            </div>

            {riskScore !== null && (
                <div className="mb-8 p-6 rounded-lg bg-[var(--background)] border border-[var(--border)] text-center relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-1 h-full ${riskScore > 50 ? 'bg-[var(--destructive)]' : 'bg-emerald-500'}`}></div>
                    <div className="text-sm text-[var(--muted-foreground)] mb-2">Composite Risk Score</div>
                    <div className={`text-5xl font-bold tracking-tight ${riskScore > 50 ? 'text-[var(--destructive)]' : 'text-emerald-500'}`}>
                        {riskScore}<span className="text-2xl text-[var(--muted-foreground)] font-normal">/100</span>
                    </div>
                    <div className="mt-2 text-xs text-[var(--muted-foreground)]">
                        {riskScore > 50 ? "High Risk - Requires Supermajority" : "Low Risk - Standard Quorum"}
                    </div>
                </div>
            )}

            <button
                onClick={runSimulation}
                disabled={simulating}
                className="w-full py-3 px-4 bg-[var(--accent)] text-white rounded-lg hover:bg-sky-600 disabled:opacity-50 font-medium transition-colors shadow-lg shadow-sky-900/20"
            >
                {simulating ? (
                    <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Running MPC Simulation...
                    </span>
                ) : "Simulate Strategy Risk"}
            </button>
        </Card>
    );
}
