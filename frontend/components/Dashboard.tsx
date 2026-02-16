import React from 'react';
import { ProposalCard } from './ProposalCard';

export const Dashboard: React.FC = () => {
    const proposals = [
        {
            id: 42,
            title: "Strategy: Diversification Alpha-V",
            description: "Allocate 15% of the USDC treasury to diversified yield protocols. Strategy verified via MPC stress-test.",
            status: "Active" as const,
            yesPercentage: 68,
            noPercentage: 12,
            deadline: "2d 14h"
        },
        {
            id: 41,
            title: "DAO Fee Restructuring Phase 2",
            description: "Lower protocol fees for high-frequency stakers to encourage long-term liquidity provision.",
            status: "Passed" as const,
            yesPercentage: 88,
            noPercentage: 8,
            deadline: "Ended"
        },
        {
            id: 40,
            title: "Security Partner Retention",
            description: "Renew the audit retainer with BlockSec for the next 6 months of development.",
            status: "Passed" as const,
            yesPercentage: 94,
            noPercentage: 2,
            deadline: "Ended"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold tracking-tight">Proposals</h2>
                <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-white border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-all shadow-sm">
                        Core
                    </button>
                    <button className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 shadow-sm">
                        Community
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {proposals.map((p) => (
                    <ProposalCard key={p.id} {...p} />
                ))}
            </div>
        </div>
    );
};
