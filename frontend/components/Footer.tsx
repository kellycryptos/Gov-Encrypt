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
            </div>
        </footer>
    );
}
