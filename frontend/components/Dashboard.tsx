"use client";

import { useEffect, useState } from "react";
import { ProposalCard } from "./ProposalCard";
import { Proposal, QuorumStatus } from "../lib/mockApi"; // Keep type for now
import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "@/hooks/useProgram";
import { mockApi } from "../lib/mockApi";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/Button";

export function Dashboard() {
    const { getProposals, submitVote, isConnected } = useProgram();
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(true);
    const [voting, setVoting] = useState<string | null>(null);
    const [quorum, setQuorum] = useState<QuorumStatus | null>(null);

    // Initial load
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                // Fetch proposals
                const data = await getProposals();
                setProposals(data);

                // Fetch quorum (mock for now)
                const q = await mockApi.getQuorumStatus();
                setQuorum(q);
            } catch (err) {
                console.error("Failed to load dashboard data", err);
                const data = await mockApi.getProposals();
                setProposals(data);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [isConnected]); // Re-run when wallet connection changes, though data might be same public/private

    const handleVote = async (id: string, side: 'for' | 'against') => {
        if (!isConnected) {
            alert("Please connect your wallet first");
            return;
        }
        setVoting(id);
        try {
            await submitVote(id, side);
            alert(`Vote ${side} for proposal ${id} relayed to Arcium MPC`);
            // Refresh data
            const updated = await getProposals();
            setProposals(updated);
        } catch (e) {
            console.error(e);
            alert("Failed to submit vote to MPC relayer");
        } finally {
            setVoting(null);
        }
    };


    if (loading) {
        return (
            <div className="flex items-center justify-center p-20">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Quorum Stats */}
            {quorum && (
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="glass-card p-6">
                        <h3 className="text-sm font-medium text-slate-400 mb-2">Total VP Participating</h3>
                        <p className="text-2xl font-bold text-white">{quorum.current.toLocaleString()}</p>
                    </div>
                    <div className="glass-card p-6">
                        <h3 className="text-sm font-medium text-slate-400 mb-2">Quorum Requirement</h3>
                        <p className="text-2xl font-bold text-white">{quorum.required.toLocaleString()}</p>
                    </div>
                    <div className="glass-card p-6 relative overflow-hidden">
                        <h3 className="text-sm font-medium text-slate-400 mb-2">Network Health</h3>
                        <p className="text-2xl font-bold text-emerald-400">98.5%</p>
                        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 transition-all duration-1000" style={{ width: `${quorum.progress}%` }} />
                    </div>
                </div>
            )}

            {/* Proposals */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Active Proposals <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-full">{proposals.length}</span>
                </h2>

                {proposals.map((prop) => (
                    <ProposalCard
                        key={prop.id}
                        proposal={prop}
                    >
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                className="border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10"
                                onClick={() => handleVote(prop.id, 'for')}
                                disabled={!!voting}
                            >
                                Vote For
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                                onClick={() => handleVote(prop.id, 'against')}
                                disabled={!!voting}
                            >
                                Against
                            </Button>
                        </div>
                    </ProposalCard>
                ))}
            </div>
        </div>
    );
}
