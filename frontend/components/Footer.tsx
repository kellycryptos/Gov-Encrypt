import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
    return (
        <footer className="py-12 border-t border-white/5 bg-[#020617]">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-indigo-400" fill="currentColor" />
                    </div>
                    <p className="text-slate-500 text-sm">
                        &copy; 2024 Gov Encrypt. Built by <a href="https://x.com/kellycryptos" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">@kellycryptos</a>
                    </p>
                </div>

                <div className="flex items-center gap-6 text-sm text-slate-400">
                    <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
                    <a href="https://github.com/kellycryptos/Gov-Encrypt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        GitHub
                    </a>
                    <a href="https://x.com/gov_encrypt" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                        X (@gov_encrypt)
                    </a>
                </div>
            </div>
        </footer>
    );
}
