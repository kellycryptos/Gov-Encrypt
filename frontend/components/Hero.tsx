"use client";

import { Button } from "./ui";
import { ArrowRight, Lock, Activity, Shield, Hexagon } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden">
            {/* Elegant Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-arcium-500/20 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
            
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                
                {/* Left Content */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8 relative z-10"
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-arcium-500/10 border border-arcium-500/30 text-arcium-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(109,69,255,0.2)]"
                    >
                        <span className="w-2 h-2 rounded-full bg-arcium-400 animate-pulse" />
                        Live on Solana Devnet
                    </motion.div>

                    <h1 className="text-5xl lg:text-7xl font-outfit font-bold tracking-tight text-white leading-[1.1]">
                        Confidential <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-arcium-300 to-arcium-500">
                            Governance.
                        </span>
                    </h1>

                    <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                        Gov-Encrypt is the ultimate layer for private voting, encrypted delegation, and secure treasury simulation on Solana. By utilizing Arcium, we fix the information asymmetry in DAOs.
                    </p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <a href="/governance" className="group">
                            <Button size="lg" className="h-14 px-8 text-base bg-white text-black hover:bg-slate-200 shadow-[0_0_30px_rgba(255,255,255,0.3)] border-0 transition-all duration-400 group-hover:scale-105 rounded-full font-bold">
                                Launch App <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </a>
                        <a href="/docs" className="group">
                            <Button variant="outline" size="lg" className="h-14 px-8 text-base border-white/10 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-400 group-hover:scale-105 rounded-full">
                                View Docs
                            </Button>
                        </a>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="flex items-center gap-6 pt-4 border-t border-white/10"
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-slate-900 border-2 border-[#020205] flex items-center justify-center text-xs font-bold text-slate-400 transition-transform hover:-translate-y-1 shadow-lg">
                                    <Hexagon className="w-4 h-4 text-arcium-400" />
                                </div>
                            ))}
                        </div>
                        <div className="text-sm text-slate-400">
                            Securing <span className="text-white font-bold">$2.4M+</span> in encrypted votes
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Interactive Preview */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 w-full max-w-md mx-auto lg:mx-0 float-slow perspective-1000"
                >
                    <div className="glass-card p-1 rounded-3xl shadow-[0_20px_50px_rgba(109,69,255,0.2)] transform rotate-y-12 rotate-x-12 hover:rotate-0 transition-transform duration-700">
                        <div className="bg-[#020205]/80 backdrop-blur-xl rounded-[1.4rem] p-6 border border-white/10 space-y-6 relative overflow-hidden">
                            
                            {/* Inner Glow */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-arcium-500/30 blur-[50px] rounded-full" />
                            
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-arcium-400" />
                                    <div className="h-2 w-20 bg-slate-700 rounded-full" />
                                </div>
                                <div className="h-2 w-8 bg-arcium-500/50 rounded-full" />
                            </div>

                            <div className="space-y-4 relative z-10">
                                {[1, 2, 3].map((i) => (
                                    <motion.div 
                                        key={i} 
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 hover:border-arcium-500/30 transition-all cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-arcium-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(109,69,255,0.2)]">
                                                <Lock className="w-4 h-4 text-arcium-300" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-1.5 w-24 bg-slate-500 rounded-full bg-gradient-to-r from-slate-500 to-slate-600" />
                                                <div className="h-1.5 w-16 bg-slate-700 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="h-6 px-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center">
                                            <span className="text-[10px] text-emerald-400 font-mono">ENCRYPTED</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center relative z-10">
                                <div className="text-xs font-mono text-slate-500">NETWORK: ARCIUM</div>
                                <div className="flex items-center gap-2 text-xs font-bold text-arcium-400">
                                    <Activity className="w-4 h-4 animate-pulse" /> SYNCED
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative elements behind */}
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-violet-600/20 rounded-full blur-[60px] animate-pulse" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-arcium-500/20 rounded-full blur-[50px] animate-pulse delay-1000" />
                </motion.div>
            </div>
        </section>
    );
}
