import { Navbar } from "../../components/Navbar";

export default function Docs() {
    return (
        <div className="min-h-screen bg-[#020617] text-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-2">Gov-Encrypt Documentation</h1>
                <p className="text-xl text-slate-400 mb-12">Confidential Governance Infrastructure for DAOs</p>

                <div className="prose prose-invert max-w-none space-y-12">

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-indigo-400 border-b border-white/10 pb-2">Overview</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Gov-Encrypt is a Confidential Governance Layer for DAOs, designed to protect the integrity of decentralized decision-making.
                            By leveraging confidential compute, we enable voting and treasury management without exposing sensitive data to the public chain until finality.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-indigo-400 border-b border-white/10 pb-2">Core Modules</h2>
                        <ul className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: "Private Voting", desc: "Encrypt votes to prevent front-running and coercion." },
                                { title: "Private Delegation", desc: "Delegate voting power without revealing social graphs." },
                                { title: "Encrypted Quorum", desc: "Calculate protocol health without leaking vote tallies." },
                                { title: "Confidential Treasury", desc: "Simulate strategies on private data." }
                            ].map((item, i) => (
                                <li key={i} className="bg-white/5 p-4 rounded-lg border border-white/5">
                                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                                    <p className="text-sm text-slate-400">{item.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-indigo-400 border-b border-white/10 pb-2">Architecture</h2>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 font-mono text-sm text-slate-300">
                            Frontend → Relayer → Confidential Compute Layer → DAO Program
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-indigo-400 border-b border-white/10 pb-2">Security Model</h2>
                        <ul className="space-y-3 text-slate-300 list-disc pl-5">
                            <li><strong className="text-white">No plaintext vote exposure:</strong> Votes are encrypted at the wallet level.</li>
                            <li><strong className="text-white">Delegation graph encrypted:</strong> Prevent social pressure on delegates.</li>
                            <li><strong className="text-white">Reputation-weighted quorum:</strong> Processed privately in TEEs.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-indigo-400 border-b border-white/10 pb-2">Roadmap</h2>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-24 flex-shrink-0 text-sm font-bold text-emerald-400">Phase 1</div>
                                <div className="text-slate-300">UI + Mock Implementation</div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-24 flex-shrink-0 text-sm font-bold text-indigo-400">Phase 2</div>
                                <div className="text-slate-300">Encrypted Payload Routing</div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-24 flex-shrink-0 text-sm font-bold text-indigo-400">Phase 3</div>
                                <div className="text-slate-300">Arcium Integration & TEE Deployment</div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-24 flex-shrink-0 text-sm font-bold text-indigo-400">Phase 4</div>
                                <div className="text-slate-300">Mainnet Deployment</div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
