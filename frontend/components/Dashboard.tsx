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

            {/* Voting Notice */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 text-yellow-500"
                    >
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-yellow-500 font-bold mb-1">Voting Notice</h3>
                    <p className="text-yellow-200/80 text-sm leading-relaxed">
                        Voting is temporarily disabled while the confidential computation layer (Arcium MPC) is being finalized.
                        <br className="my-2" />
                        All proposals and governance actions are currently view-only. Once the Arcium integration is complete, votes will be fully private, tallied securely, and published on Solana Devnet.
                    </p>
                </div>
            </div>

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
                                className="border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 opacity-50 cursor-not-allowed"
                                onClick={() => alert("Voting is temporarily disabled while Arcium MPC is being integrated.")}
                                disabled={true}
                            >
                                Vote For
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500/20 text-red-400 hover:bg-red-500/10 opacity-50 cursor-not-allowed"
                                onClick={() => alert("Voting is temporarily disabled while Arcium MPC is being integrated.")}
                                disabled={true}
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
