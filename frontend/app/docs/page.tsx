import { Navbar } from "../../components/Navbar";
import { Shield, Lock, Users, Activity, Layers, Terminal, Globe, Twitter, Mail } from "lucide-react";

export default function Docs() {
    return (
        <div className="min-h-screen bg-[#020617] text-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-12">
                <header className="mb-16 border-b border-indigo-500/20 pb-8">
                    <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Gov-Encrypt</h1>
                    <p className="text-xl text-slate-400">Confidential Governance Infrastructure for DAOs</p>
                </header>

                <div className="prose prose-invert max-w-none space-y-16">

                    <section id="overview" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-8 h-8 text-indigo-400" />
                            <h2 className="text-3xl font-bold text-white m-0">Overview</h2>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            Gov-Encrypt is a Confidential Governance Layer for DAOs, designed to protect the integrity of decentralized decision-making.
                            By leveraging confidential compute (Arcium), we enable voting and treasury management without exposing sensitive data to the public chain until finality.
                        </p>
                    </section>

                    <section id="modules" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <Layers className="w-8 h-8 text-indigo-400" />
                            <h2 className="text-3xl font-bold text-white m-0">Core Modules</h2>
                        </div>
                        <ul className="grid md:grid-cols-2 gap-6 not-prose">
                            {[
                                { title: "Private Voting", desc: "Encrypt votes to prevent front-running and coercion.", icon: Lock },
                                { title: "Private Delegation", desc: "Delegate voting power without revealing social graphs.", icon: Users },
                                { title: "Encrypted Quorum", desc: "Calculate protocol health without leaking vote tallies.", icon: Activity },
                                { title: "Confidential Treasury", desc: "Simulate strategies on private data.", icon: Shield }
                            ].map((item, i) => (
                                <li key={i} className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-indigo-500/50 transition-colors group">
                                    <div className="mb-4 w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                                        <item.icon className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <h3 className="font-bold text-xl text-white mb-2">{item.title}</h3>
                                    <p className="text-slate-400">{item.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section id="architecture" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <Terminal className="w-8 h-8 text-indigo-400" />
                            <h2 className="text-3xl font-bold text-white m-0">Architecture</h2>
                        </div>
                        <div className="bg-slate-900/50 p-8 rounded-xl border border-white/10 font-mono text-sm text-slate-300 shadow-inner">
                            Frontend → Relayer → Confidential Compute Layer → DAO Program
                        </div>
                    </section>

                    <section id="security" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <Lock className="w-8 h-8 text-indigo-400" />
                            <h2 className="text-3xl font-bold text-white m-0">Security Model</h2>
                        </div>
                        <ul className="space-y-4 text-slate-300 list-none pl-0">
                            {[
                                "No plaintext vote exposure: Votes are encrypted at the wallet level.",
                                "Delegation graph encrypted: Prevent social pressure on delegates.",
                                "Reputation-weighted quorum: Processed privately in TEEs."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section id="roadmap" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <Globe className="w-8 h-8 text-indigo-400" />
                            <h2 className="text-3xl font-bold text-white m-0">Roadmap</h2>
                        </div>
                        <div className="space-y-6 relative border-l border-white/10 ml-3 pl-8">
                            {[
                                { phase: "Phase 1", title: "UI + Mock Implementation", active: true },
                                { phase: "Phase 2", title: "Encrypted Payload Routing", active: false },
                                { phase: "Phase 3", title: "Arcium Integration & TEE Deployment", active: false },
                                { phase: "Phase 4", title: "Mainnet Deployment", active: false },
                            ].map((item, i) => (
                                <div key={i} className="relative">
                                    <div className={`absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 ${item.active ? 'bg-indigo-500 border-indigo-500' : 'bg-[#020617] border-slate-600'}`} />
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                        <div className={`text-sm font-bold ${item.active ? 'text-indigo-400' : 'text-slate-500'}`}>{item.phase}</div>
                                        <div className="text-slate-300 font-medium">{item.title}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="socials" className="scroll-mt-24 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-3 mb-6">
                            <Users className="w-8 h-8 text-indigo-400" />
                            <h2 className="text-3xl font-bold text-white m-0">Contact / Socials</h2>
                        </div>
                        <div className="flex gap-4">
                            <a
                                href="https://x.com/kellycryptos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-colors text-white font-medium"
                            >
                                <Twitter className="w-5 h-5" />
                                Follow @kellycryptos
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
