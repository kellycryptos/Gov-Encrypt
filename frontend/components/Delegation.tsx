"use client";

import { useEffect, useState } from "react";
import { mockApi, Delegate } from "@/lib/mockApi";
import { useProgram } from "@/hooks/useProgram";

import { Button } from "./ui";
import { Loader2, Shield, User } from "lucide-react";

export function Delegation() {
    const [delegates, setDelegates] = useState<Delegate[]>([]);
    const [loading, setLoading] = useState(true);
    const { getDelegations, isConnected } = useProgram();

    useEffect(() => {
        const loadDelegates = async () => {
            try {
                let data: Delegate[] = [];
                if (isConnected) {
                    data = await getDelegations();
                }

                if (data.length === 0) {
                    data = await mockApi.getDelegations();
                }
                setDelegates(data);
            } catch (err) {
                console.error("Failed to load delegates", err);
            } finally {
                setLoading(false);
            }
        };
        loadDelegates();
    }, [isConnected]); // Re-run when wallet connection changes


    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-indigo-500" />
                    Active Delegates
                </h2>
                <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded">Top 3 by Voting Power</span>
            </div>

            <div className="grid gap-4">
                {delegates.map((delegate, i) => (
                    <div key={delegate.address} className="glass-card p-4 flex items-center justify-between group hover:border-indigo-500/30 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white">
                                {delegate.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{delegate.name}</h3>
                                <p className="text-xs text-slate-500 font-mono">{delegate.address}</p>
                            </div>
                        </div>

                        <div className="text-right mr-4">
                            <p className="text-sm font-bold text-white">{delegate.votingPower.toLocaleString()} VP</p>
                            <p className="text-xs text-slate-500">{delegate.proposalsVoted} proposals voted</p>
                        </div>

                        <Button size="sm" variant="neon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            Delegate
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
