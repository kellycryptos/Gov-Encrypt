import React from 'react';
import { Card } from './ui/Card';

interface ProposalCardProps {
    id: number;
    title: string;
    description: string;
    status: 'Active' | 'Passed' | 'Failed';
    yesPercentage: number;
    noPercentage: number;
    deadline: string;
    onClick?: () => void;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({
    id,
    title,
    description,
    status,
    yesPercentage,
    noPercentage,
    deadline,
    onClick
}) => {
    const statusColors = {
        Active: 'bg-indigo-100 text-indigo-600',
        Passed: 'bg-emerald-100 text-emerald-600',
        Failed: 'bg-rose-100 text-rose-600',
    };

    return (
        <Card
            onClick={onClick}
            className="mb-4 group"
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <span className={`pastel-badge ${statusColors[status]}`}>
                        {status}
                    </span>
                    <span className="text-[10px] text-[var(--muted-foreground)] font-medium">#{id}</span>
                </div>
                <span className="text-[10px] text-[var(--muted-foreground)] tabular-nums">
                    Ends in {deadline}
                </span>
            </div>

            <h3 className="text-base font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                {title}
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mb-6 leading-relaxed">
                {description}
            </p>

            <div className="space-y-3">
                <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        <span className="text-indigo-500">For</span>
                        <span className="text-[var(--foreground)]">{yesPercentage}%</span>
                    </div>
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar-fill bg-indigo-400"
                            style={{ width: `${yesPercentage}%` }}
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        <span className="text-rose-500">Against</span>
                        <span className="text-[var(--foreground)]">{noPercentage}%</span>
                    </div>
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar-fill bg-rose-400"
                            style={{ width: `${noPercentage}%` }}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
};
