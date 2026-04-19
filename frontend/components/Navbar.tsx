"use client";

import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "./ui";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className={`flex items-center justify-between transition-all duration-300 rounded-2xl ${scrolled ? 'bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-4 py-3' : 'bg-transparent px-2'}`}>
                    
                    {/* Brand */}
                    <Link href="/" onClick={closeMenu} className="flex items-center gap-3 hover:opacity-80 transition-opacity z-50 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-arcium-600 to-arcium-400 flex items-center justify-center shadow-glow transition-transform group-hover:scale-105">
                            <Shield className="w-5 h-5 text-white" fill="currentColor" />
                        </div>
                        <span className="font-outfit font-bold tracking-tight text-xl text-white">Gov Encrypt</span>
                    </Link>

                    {/* Desktop Nav - Pill Shape */}
                    <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/5 backdrop-blur-md">
                        <Link href="/governance" className="px-6 py-2 text-sm font-medium text-slate-300 hover:text-white transition-all rounded-full hover:bg-white/10 hover:shadow-glow-sm">Launch App</Link>
                        <Link href="/treasury" className="px-6 py-2 text-sm font-medium text-slate-300 hover:text-white transition-all rounded-full hover:bg-white/10 hover:shadow-glow-sm">Treasury</Link>
                        <Link href="/docs" className="px-6 py-2 text-sm font-medium text-slate-300 hover:text-white transition-all rounded-full hover:bg-white/10 hover:shadow-glow-sm">Docs</Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3 z-50">
                        <div className="hidden md:block">
                            <WalletMultiButton />
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
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 top-[80px] bg-[#020205]/95 backdrop-blur-2xl border-t border-white/10 flex flex-col p-6 gap-4 md:hidden z-40"
                    >
                        <div className="flex justify-center mb-6">
                            <WalletMultiButton className="w-full justify-center" />
                        </div>
                        <Link href="/governance" onClick={closeMenu} className="p-4 text-xl font-outfit font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10">Launch App</Link>
                        <Link href="/treasury" onClick={closeMenu} className="p-4 text-xl font-outfit font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10">Treasury</Link>
                        <Link href="/docs" onClick={closeMenu} className="p-4 text-xl font-outfit font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10">Docs</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
