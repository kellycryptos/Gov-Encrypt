"use client";

import React from 'react';
import { Card } from './ui';

interface ProposalCardProps {
    id: number | string;
    title: string;
    description: string;
    status: string;
    yesPercentage: number;
    noPercentage: number;
    deadline?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({
    id,
    title,
    description,
    status,
    yesPercentage,
    noPercentage,
    deadline,
    onClick,
    children
}) => {
    // Normalize status to lowercase for comparison
    const statusKey = status.toLowerCase();

    let statusClass = 'bg-slate-700 text-slate-300';
    if (statusKey === 'active') statusClass = 'bg-emerald-500/10 text-emerald-400';
    else if (statusKey === 'passed') statusClass = 'bg-emerald-500/10 text-emerald-400';
    else if (statusKey === 'rejected' || statusKey === 'failed') statusClass = 'bg-red-500/10 text-red-400';

    return (
        <Card
            onClick={onClick}
            className="mb-4 group border-l-4 border-l-indigo-500 hover:border-l-indigo-400 transition-all"
        >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 p-6">
                <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${statusClass}`}>
                            {status}
                        </span>
                        {deadline && (
                            <span className="text-slate-500 text-xs flex items-center gap-1">
                                Ends {deadline}
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

                <div className="space-y-3 min-w-[200px]">
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

                    {/* Action buttons (children) */}
                    {children && (
                        <div className="pt-2">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};
