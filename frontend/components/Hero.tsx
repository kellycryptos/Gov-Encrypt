import { Button } from "./ui";
import { ArrowRight, Lock, Activity, Users } from "lucide-react";

export function Hero() {
    return (
        <section className="relative pt-24 pb-24 lg:pt-40 lg:pb-40 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] -z-10 animate-pulse-slow" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
                {/* Left Content */}
                <div className="space-y-8 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium uppercase tracking-wider backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                        Live on Solana Devnet
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                        Privacy for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 animate-gradient-x">
                            DAOs.
                        </span>
                    </h1>

                    <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                        Gov-Encrypt is the Confidential Governance Layer enabling private voting, encrypted delegation, and confidential treasury simulation for decentralized organizations.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <a href="/governance" className="group">
                            <Button size="lg" className="h-14 px-8 text-base bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.4)] border-0 transition-all duration-300 group-hover:scale-105">
                                Launch App <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </a>
                        <a href="/docs" className="group">
                            <Button variant="outline" size="lg" className="h-14 px-8 text-base border-white/10 text-white hover:bg-white/5 transition-all duration-300 group-hover:scale-105">
                                View Docs
                            </Button>
                        </a>
                    </div>

                    <div className="flex items-center gap-8 pt-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-[#020617] flex items-center justify-center text-xs font-bold text-slate-500 transition-transform hover:-translate-y-1">
                                    U{i}
                                </div>
                            ))}
                        </div>
                        <div className="text-sm text-slate-400">
                            <span className="text-white font-bold">2.4k+</span> encrypted votes
                        </div>
                    </div>
                </div>

                {/* Right Preview */}
                <div className="relative animate-fade-in-up delay-200">
                    <div className="relative z-10 glass-card p-1 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700 hover:shadow-[0_20px_50px_rgba(79,70,229,0.2)]">
                        <div className="bg-[#0f172a]/90 backdrop-blur-md rounded-xl p-6 border border-white/5 space-y-6">
                            {/* Fake UI Elements */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="h-2 w-24 bg-slate-700 rounded-full" />
                                <div className="h-2 w-8 bg-slate-700 rounded-full" />
                            </div>

                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                                <Lock className="w-4 h-4 text-indigo-400" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="h-1.5 w-32 bg-slate-600 rounded-full" />
                                                <div className="h-1.5 w-20 bg-slate-700 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="h-6 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-md" />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                                <div className="text-xs text-slate-500">Encrypted State</div>
                                <div className="flex items-center gap-2 text-xs text-emerald-400">
                                    <Activity className="w-3 h-3" /> Verifying
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative elements behind */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-500/30 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>
            </div>
        </section>
    );
}
