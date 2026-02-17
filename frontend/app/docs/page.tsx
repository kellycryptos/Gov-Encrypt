import { Navbar } from "../../components/Navbar";

export default function Docs() {
    return (
        <div className="min-h-screen bg-[#020617] text-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-6">Arcium Confidential Governance</h1>

                <div className="prose prose-invert max-w-none">
                    <p className="lead text-xl text-slate-400 mb-8">
                        Learn how Gov Encrypt utilizes Arcium's confidential compute network to enable private voting and secure DAO operations.
                    </p>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-indigo-400">Why Privacy Matters</h2>
                        <p className="text-slate-300 mb-4">
                            Traditional DAOs make every vote public, leading to voter apathy, bribery, and retaliation.
                            **Gov Encrypt** solves this by encrypting votes before they ever touch the blockchain.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-indigo-400">Architecture</h2>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 mb-6">
                            <ul className="space-y-3 text-slate-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-indigo-500 font-mono">1.</span>
                                    <span>User signs vote with wallet.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-indigo-500 font-mono">2.</span>
                                    <span>Vote is encrypted specifically for the Arcium Multiparty Execution (MXE) network.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-indigo-500 font-mono">3.</span>
                                    <span>Arcium nodes compute the tally without ever revealing individual votes.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-indigo-500 font-mono">4.</span>
                                    <span>Final result is posted to the Solana smart contract.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-indigo-400">SDK Integration</h2>
                        <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto text-sm font-mono text-emerald-400">
                            {`// Example of submitting an encrypted vote
const encryptedVote = await arcium.encrypt({
  vote: "yes",
  proposalId: 123
});

await program.methods.submitVote(encryptedVote).rpc();`}
                        </pre>
                    </section>
                </div>
            </div>
        </div>
    );
}
