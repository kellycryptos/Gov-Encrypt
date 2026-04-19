"use client";

import { Shield, EyeOff, Vote, Wallet } from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
    const features = [
        {
            title: "Private Voting",
            description: "Cast votes without revealing your position until the reveal phase. Prevent voter coercion.",
            icon: EyeOff,
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
            borderHover: "hover:border-indigo-500/40",
            shadowHover: "hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
        },
        {
            title: "Encrypted Treasury",
            description: "Execute DAO strategies confidentially to prevent MEV and front-running on trades.",
            icon: Wallet,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            borderHover: "hover:border-emerald-500/40",
            shadowHover: "hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
        },
        {
            title: "Secure Delegation",
            description: "Delegate voting power anonymously. Whales can participate without doxxing themselves.",
            icon: Shield,
            color: "text-violet-400",
            bg: "bg-violet-500/10",
            borderHover: "hover:border-violet-500/40",
            shadowHover: "hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]"
        },
        {
            title: "Reputation Weighted",
            description: "Calculate vote weight securely based on on-chain reputation and dynamic factors.",
            icon: Vote,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            borderHover: "hover:border-blue-500/40",
            shadowHover: "hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="py-32 relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-2xl mx-auto mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-widest mb-6">
                        The Arcium Advantage
                    </div>
                    <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-6 leading-tight">
                        Why Confidential <br className="hidden md:block"/> Governance?
                    </h2>
                    <p className="text-lg text-slate-400">
                        Existing DAOs are leaky. Full transparency creates information asymmetry that hurts the protocol. Gov Encrypt fixes this.
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {features.map((feature, idx) => (
                        <motion.div 
                            key={idx} 
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            className={`glass-card p-8 rounded-2xl border border-white/5 bg-[#0a0a0f]/40 transition-all duration-300 ${feature.borderHover} ${feature.shadowHover} group cursor-default`}
                        >
                            <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className={`w-7 h-7 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-outfit font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
