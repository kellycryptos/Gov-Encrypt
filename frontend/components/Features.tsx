import { Shield, EyeOff, Vote, Wallet } from "lucide-react";

export function Features() {
    const features = [
        {
            title: "Private Voting",
            description: "Cast votes without revealing your position until the reveal phase.",
            icon: EyeOff,
            color: "text-indigo-400",
            bg: "bg-indigo-500/10"
        },
        {
            title: "Encrypted Treasury",
            description: "Execute DAO strategies without front-running risks.",
            icon: Wallet,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10"
        },
        {
            title: "Secure Delegation",
            description: "Delegate voting power without doxxing your main wallet.",
            icon: Shield,
            color: "text-violet-400",
            bg: "bg-violet-500/10"
        },
        {
            title: "Reputation Weighted",
            description: "Vote weight based on on-chain reputation, not just tokens.",
            icon: Vote,
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        }
    ];

    return (
        <section className="py-24 bg-[#020617]/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Why Confidential Governance?</h2>
                    <p className="text-slate-400">Existing DAOs are leaky. Gov Encrypt fixes the information asymmetry.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <div key={idx} className="glass-card p-6 hover:translate-y-[-5px] transition-transform duration-300">
                            <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
                                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
