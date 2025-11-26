"use client";

import { saints } from "@/lib/saints";
import Link from "next/link";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";

export default function SaintsPage() {
    const [selectedSaint, setSelectedSaint] = useState<typeof saints[0] | null>(null);

    return (
        <div className="flex-1 flex flex-col items-center max-w-7xl mx-auto w-full p-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="font-serif text-4xl md:text-5xl text-holy-white mb-5 font-bold" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(251, 191, 36, 0.2)' }}>
                    Chat with the Saints
                </h1>
                <p className="text-sacred-cream max-w-2xl mx-auto text-lg">
                    Choose a saint to guide your spiritual journey. Each brings unique wisdom from their life and teachings.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {saints.map((saint, index) => (
                    <motion.div
                        key={saint.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div
                            onClick={() => setSelectedSaint(saint)}
                            className="glass-panel p-6 rounded-3xl hover:shadow-2xl hover:shadow-divine-gold/60 transition-all duration-500 cursor-pointer group border-2 border-divine-gold/30 hover:border-divine-gold h-full relative overflow-hidden"
                        >
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-divine-gold/0 via-divine-gold/5 to-divine-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="flex flex-col h-full relative z-10">
                                {/* Avatar with premium effects */}
                                <div className="relative w-24 h-24 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-divine-gold/40 to-divine-gold-dark/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-divine-gold/50 group-hover:border-divine-gold shadow-lg group-hover:shadow-divine-gold/50 transition-all duration-500">
                                        <NextImage
                                            src={saint.avatar}
                                            alt={saint.name}
                                            fill
                                            className="object-cover"
                                            sizes="96px"
                                        />
                                    </div>
                                </div>

                                <h3 className="font-serif text-2xl text-holy-white mb-2 font-bold group-hover:text-divine-gold-light transition-colors text-center">
                                    {saint.name}
                                </h3>

                                <p className="text-sm text-divine-gold-light mb-3 font-medium text-center">
                                    {saint.title}
                                </p>

                                <p className="text-sacred-cream mb-4 flex-1 leading-relaxed text-center">
                                    {saint.description}
                                </p>

                                <div className="space-y-2 text-xs text-sacred-cream/80">
                                    <div className="flex items-center gap-2 justify-center">
                                        <Sparkles size={12} className="text-divine-gold" />
                                        <span className="font-medium">{saint.specialty}</span>
                                    </div>
                                    <div className="text-divine-gold-light/60 italic text-center">{saint.era}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bio Modal */}
            <AnimatePresence>
                {selectedSaint && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedSaint(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-panel max-w-2xl w-full p-8 rounded-3xl border-2 border-divine-gold relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Ambient glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-divine-gold/10 via-transparent to-divine-blue-light/10 pointer-events-none" />

                            <button
                                onClick={() => setSelectedSaint(null)}
                                className="absolute top-4 right-4 p-2 hover:bg-divine-gold/20 rounded-full transition-colors z-10"
                            >
                                <X size={24} className="text-sacred-cream" />
                            </button>

                            <div className="text-center mb-6 relative z-10">
                                {/* Large avatar with glow */}
                                <div className="relative w-32 h-32 mx-auto mb-4">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-divine-gold/60 to-divine-gold-dark/60 blur-2xl" />
                                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-divine-gold shadow-2xl shadow-divine-gold/50">
                                        <NextImage
                                            src={selectedSaint.avatar}
                                            alt={selectedSaint.name}
                                            fill
                                            className="object-cover"
                                            sizes="128px"
                                        />
                                    </div>
                                </div>

                                <h2 className="font-serif text-3xl text-holy-white mb-2 font-bold" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(251, 191, 36, 0.2)' }}>
                                    {selectedSaint.name}
                                </h2>
                                <p className="text-divine-gold-light text-lg mb-2">{selectedSaint.title}</p>
                                <p className="text-sacred-cream/60 text-sm italic">{selectedSaint.era}</p>
                            </div>

                            <div className="mb-6 relative z-10">
                                <p className="text-sacred-cream leading-relaxed text-lg">
                                    {selectedSaint.bio}
                                </p>
                            </div>

                            <div className="flex justify-center relative z-10">
                                <Link
                                    href={`/chat?saint=${selectedSaint.id}`}
                                    className="px-8 py-3 bg-gradient-to-br from-divine-gold to-divine-gold-dark text-divine-blue-deep rounded-full font-bold hover:shadow-lg hover:shadow-divine-gold/70 transition-all duration-300 hover:scale-105"
                                >
                                    Begin Conversation
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
