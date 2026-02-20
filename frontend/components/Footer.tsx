import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-12 border-t border-white/5 bg-[#020617] text-center">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-3">
                <p className="text-slate-200 font-medium text-base">
                    &copy; 2026 Gov Encrypt
                </p>
                <div className="flex flex-col items-center gap-1 text-sm text-slate-500">
                    <p>Powered by Arcium</p>
                    <p>
                        Built by <a href="https://x.com/kellycryptos" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">@kellycryptos</a>
                    </p>
                </div>
                {/* Social Links */}
                <div className="flex items-center justify-center gap-6 mt-4 text-sm text-slate-500">
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
