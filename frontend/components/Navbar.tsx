import { Button } from "./ui";
import { Copy, Shield, Menu } from "lucide-react";

export function Navbar() {
    return (
        <header className="h-[72px] border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                {/* Brand */}
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        <Shield className="w-5 h-5 text-white" fill="currentColor" />
                    </div>
                    <span className="font-bold tracking-tight text-xl text-white">Gov Encrypt</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
                    {['Governance', 'Treasury', 'Docs'].map((item) => (
                        <button
                            key={item}
                            className="px-5 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                        >
                            {item}
                        </button>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Button variant="neon" size="sm" className="hidden sm:inline-flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Connect Wallet
                    </Button>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
