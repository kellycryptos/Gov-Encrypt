"use client";

import { Navbar } from "../../components/Navbar";
import { Dashboard } from "../../components/Dashboard";

export default function Governance() {
    return (
        <div className="min-h-screen bg-[#020617] text-white flex flex-col">
            <Navbar />
            <div className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-4">Governance Dashboard</h1>
                    <p className="text-slate-400">
                        View active proposals, delegate your voting power, and participate in the future of the protocol.
                        All votes are encrypted using Arcium's confidential compute layer.
                    </p>
                </div>

                <Dashboard />
            </div>
        </div>
    );
}
