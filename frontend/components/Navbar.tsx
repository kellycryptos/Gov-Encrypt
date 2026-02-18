"use client";

import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "./ui";
import { useState } from "react";


export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className="h-[72px] border-b border-white/5 bg-[#000000]/80 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                {/* Brand */}
                <Link href="/" onClick={closeMenu} className="flex items-center gap-2 hover:opacity-80 transition-opacity z-50">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-arcium-500 to-arcium-300 flex items-center justify-center shadow-glow">
                        <Shield className="w-5 h-5 text-white" fill="currentColor" />
                    </div>
                    <span className="font-bold tracking-tight text-xl text-white">Gov Encrypt</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
                    <Link href="/governance" className="px-5 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5">Launch App</Link>
                    <Link href="/treasury" className="px-5 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5">Treasury</Link>
                    <Link href="/docs" className="px-5 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5">Docs</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3 z-50">
                    <div className="max-w-[140px] md:max-w-none">
                        <WalletMultiButton className="!bg-[var(--primary)] hover:!bg-[var(--accent)] !rounded-lg !font-medium" />
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-white hover:bg-white/10"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 top-[72px] bg-black/95 backdrop-blur-xl border-t border-white/10 flex flex-col p-6 gap-2 md:hidden animate-in slide-in-from-top-5">
                    <Link href="/governance" onClick={closeMenu} className="p-4 text-xl font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all">Launch App</Link>
                    <Link href="/treasury" onClick={closeMenu} className="p-4 text-xl font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all">Treasury</Link>
                    <Link href="/docs" onClick={closeMenu} className="p-4 text-xl font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all">Docs</Link>
                </div>
            )}
        </header>
    );
}
