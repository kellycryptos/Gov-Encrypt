"use client";

import { useState } from "react";

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
        <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Treasury Strategy Simulation</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">
                Before execution, strategies are privately simulated against risk models using MPC.
                Only the aggregated risk score is revealed.
            </p>

            <div className="bg-[var(--background)] p-4 rounded-lg mb-6 border border-[var(--border)]">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-[var(--muted-foreground)]">Strategy</span>
                    <span className="font-mono">Yield_Optimization_Alpha_v2</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-[var(--muted-foreground)]">Allocation</span>
                    <span className="font-mono">500,000 USDC</span>
                </div>
            </div>

            {riskScore !== null && (
                <div className="mb-6 text-center">
                    <div className="text-sm text-[var(--muted-foreground)] mb-1">Composite Risk Score</div>
                    <div className={`text-4xl font-bold ${riskScore > 50 ? 'text-[var(--destructive)]' : 'text-emerald-500'}`}>
                        {riskScore}/100
                    </div>
                </div>
            )}

            <button
                onClick={runSimulation}
                disabled={simulating}
                className="w-full py-3 px-4 bg-[var(--accent)] text-white rounded-lg hover:bg-sky-600 disabled:opacity-50 font-medium transition-colors"
            >
                {simulating ? "Running MPC Simulation..." : "Simulate Strategy"}
            </button>
        </div>
    );
}
