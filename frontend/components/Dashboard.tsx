"use client";

import { useEffect, useState } from "react";
import { mockApi, Proposal, QuorumStatus } from "@/lib/mockApi";
import { useProgram } from "@/hooks/useProgram";
import { Button, Card, CardHeader, CardTitle, CardContent } from "./ui";
import { ProposalCard } from "./ProposalCard";
import { Check, X, Clock, Loader2, AlertCircle } from "lucide-react";

export function Dashboard() {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [quorum, setQuorum] = useState<QuorumStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [voting, setVoting] = useState<string | null>(null);
    const { getProposals, isConnected, submitVote } = useProgram();

    useEffect(() => {
        const loadData = async () => {
            try {
                // Direct call to getProposals will now use relayer
                const props = await getProposals();
                const quor = await mockApi.getQuorumStatus();

                setProposals(props.length > 0 ? props : await mockApi.getProposals());
                setQuorum(quor);
            } catch (err) {
                console.error("Failed to load data", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [isConnected]); // Re-run when wallet connection changes

    const handleVote = async (id: string, side: 'for' | 'against') => {
        setVoting(id);
        try {
            await submitVote(id, side);
            alert(`Vote ${side} for proposal ${id} relayed to Arcium MPC`);
            // Refresh data
            const updated = await getProposals();
            setProposals(updated);
        } catch (e) {
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
                    active Proposals <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-full">{proposals.length}</span>
                </h2>

                {proposals.map((prop) => {
                    const totalVotes = prop.votesFor + prop.votesAgainst;
                    const yesPercentage = totalVotes > 0 ? (prop.votesFor / totalVotes) * 100 : 0;
                    const noPercentage = totalVotes > 0 ? (prop.votesAgainst / totalVotes) * 100 : 0;

                    return (
                        <ProposalCard
                            key={prop.id}
                            id={prop.id}
                            title={prop.title}
                            description={prop.description}
                            status={prop.status}
                            yesPercentage={yesPercentage}
                            noPercentage={noPercentage}
                            deadline={new Date(prop.endDate).toLocaleDateString()}
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
                    );
                })}
            </div>
        </div>
    );
}
