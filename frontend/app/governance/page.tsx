"use client";

import { Navbar } from "../../components/Navbar";
import { Dashboard } from "../../components/Dashboard";

export default function Governance() {
    return (
        <div className="min-h-screen bg-[#020617] text-white flex flex-col">
            <Navbar />
            <div className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">Governance Dashboard</h1>
                        <p className="text-slate-400 max-w-2xl">
                            Vote on active proposals using your encrypted identity.
                            Your choices remain private until the voting period ends, preventing bribery and coercion.
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        {/* CTA button as requested - functional via Dashboard components mainly, but emphasized here visually if needed, 
                             or we can rely on the buttons in the proposal cards. 
                             Adding a top-level action button for effect. */}
                        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all">
                            Submit Encrypted Vote
                        </button>
                    </div>
                </div>

                <Dashboard />
            </div>
        </div>
    );
}
