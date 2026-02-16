import React from 'react';
import { Card } from './ui/Card';
import dynamic from 'next/dynamic';

const WalletButton = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

export const Profile: React.FC = () => {
    return (
        <Card className="sticky top-24">
            <div className="flex flex-col items-center text-center p-2">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-[var(--primary)] rounded-2xl mb-4 shadow-sm" />
                <h3 className="text-lg font-bold mb-1">My Governance</h3>
                <p className="text-xs text-[var(--muted-foreground)] mb-6 font-mono">
                    Snapshot Score: <span className="text-[var(--foreground)] font-bold">1,240</span>
                </p>

                <div className="w-full space-y-4 mb-8">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-[var(--muted-foreground)]">Voting Power</span>
                        <span className="font-bold text-indigo-500">12.4k VP</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-[var(--muted-foreground)]">Delegated to me</span>
                        <span className="font-bold text-emerald-500">4.2k VP</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-t border-[var(--border)] pt-4">
                        <span className="text-[var(--muted-foreground)]">GOV Tokens</span>
                        <span className="font-bold">8,200</span>
                    </div>
                </div>

                <div className="w-full pt-2">
                    <WalletButton className="!w-full !rounded-xl !bg-[var(--primary)] !h-12 !text-sm !font-bold transition-all hover:!bg-[#8995ff] !shadow-sm" />
                </div>
            </div>
        </Card>
    );
};
