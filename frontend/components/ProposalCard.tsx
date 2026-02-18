import React, { useState, useEffect } from 'react';
import { Card } from './ui';
import { Check, X, Loader2 } from "lucide-react";
import { Proposal } from "../lib/mockApi";
import { useWallet } from "@solana/wallet-adapter-react";
import { submitEncryptedVote } from "../lib/program";

interface ProposalCardProps {
    proposal: Proposal;
    onVoteSuccess?: () => void;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, onVoteSuccess }) => {
    const wallet = useWallet();
    const [isVoting, setIsVoting] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch
    if (!mounted) return null;

    const { id, title, description, status, yesVotes, noVotes, deadline } = proposal;

    const totalVotes = Number(yesVotes) + Number(noVotes);
    const yesPercentage = totalVotes === 0 ? 0 : (Number(yesVotes) / totalVotes) * 100;
    // const noPercentage = totalVotes === 0 ? 0 : (Number(noVotes) / totalVotes) * 100;

    const statusKey = (typeof status === 'string' ? status : Object.keys(status)[0] || 'Active').toLowerCase();

    let statusClass = 'bg-slate-700 text-slate-300';
    if (statusKey === 'active') statusClass = 'bg-emerald-500/10 text-emerald-400';
    else if (statusKey === 'passed') statusClass = 'bg-emerald-500/10 text-emerald-400';
    else if (statusKey === 'rejected' || statusKey === 'failed') statusClass = 'bg-red-500/10 text-red-400';

    const handleVote = async (choice: number) => {
        if (!wallet.connected) return;
        setIsVoting(true);
        try {
            await submitEncryptedVote(wallet, Number(id), choice);
            if (onVoteSuccess) onVoteSuccess();
        } catch (e) {
            console.error("Vote failed", e);
            alert("Failed to submit encrypted vote. See console.");
        } finally {
            setIsVoting(false);
        }
    };

    return (
        <Card className="mb-4 group border-l-4 border-l-indigo-500 hover:border-l-indigo-400 transition-all flex flex-col justify-between">
            <div className="flex flex-col gap-6 p-6 h-full">
                <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${statusClass}`}>
                            {statusKey}
                        </span>
                        {deadline && (
                            <span className="text-slate-500 text-xs flex items-center gap-1">
                                Ends {new Date(deadline).toLocaleDateString()}
                            </span>
                        )}
                        <span className="text-[10px] text-slate-500 font-medium">#{id}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-2xl line-clamp-3">
                        {description}
                    </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">Support</span>
                            <span className="text-white font-mono">{yesPercentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-500 transition-all duration-500"
                                style={{ width: `${yesPercentage}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500">
                            <span>{yesVotes} For</span>
                            <span>{noVotes} Against</span>
                        </div>
                    </div>

                    {statusKey === 'active' && wallet.connected && (
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => handleVote(1)}
                                disabled={isVoting}
                                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-sm font-bold transition-colors disabled:opacity-50"
                            >
                                {isVoting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                Vote For
                            </button>
                            <button
                                onClick={() => handleVote(2)}
                                disabled={isVoting}
                                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm font-bold transition-colors disabled:opacity-50"
                            >
                                {isVoting ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                                Vote Against
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};
