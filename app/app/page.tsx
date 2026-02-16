"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import CreateProposal from "../components/CreateProposal";
import Vote from "../components/Vote";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900 text-white">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Gov Encrypt</h1>
        <WalletMultiButton />
      </div>

      <div className="w-full max-w-5xl mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Actions</h2>
          <CreateProposal />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Active Proposals</h2>
          {/* Placeholder for fetching proposals */}
          <div className="p-4 bg-gray-800 rounded-lg">
            <p>Proposal #0: Treasury Allocation Strategy A</p>
            <p className="text-sm text-gray-400">Status: Active</p>
            <Vote proposalId={0} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-10">
        <h2 className="text-2xl font-bold mb-4">Treasury Simulation</h2>
        <div className="p-6 bg-gray-800 rounded-lg">
          <p className="text-gray-300">
            Submit a strategy to allow MPC nodes to privately verify risk parameters before voting.
          </p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700">
            Simulate New Strategy (Demo)
          </button>
        </div>
      </div>
    </main>
  );
}
