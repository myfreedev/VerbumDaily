"use client";

import { useEffect, useState } from "react";
import { getDailyVerse, Verse } from "@/lib/verses";
import { motion } from "framer-motion";
import NextImage from "next/image";

export default function Home() {
  const [verse, setVerse] = useState<Verse | null>(null);

  useEffect(() => {
    setVerse(getDailyVerse());
  }, []);

  if (!verse) return null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-10 relative">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Branding Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center mb-4 relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-holy-white font-bold mb-2"
          style={{ textShadow: '0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(251, 191, 36, 0.3)' }}
        >
          Verbum Daily
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-divine-gold-light text-xs sm:text-sm md:text-base tracking-widest uppercase mb-4"
        >
          Daily Scripture
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-24 sm:w-32 h-0.5 bg-gradient-to-r from-transparent via-divine-gold to-transparent mx-auto"
          style={{ boxShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
        />
      </motion.div>

      {/* Main Card with Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-2xl w-full p-2 sm:p-8 md:p-12 text-center"
      >
        <div className="glass-panel rounded-3xl p-6 sm:p-10 md:p-16 border-t-2 border-divine-gold/30 shadow-2xl relative overflow-hidden group hover:shadow-divine-gold/40 transition-all duration-700">
          {/* Animated Logo in Top Right Corner */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6"
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
              style={{ filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.6))' }}
            >
              <NextImage
                src="/logo.png"
                alt="Verbum Daily"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-br from-divine-gold/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-gradient-to-tr from-divine-gold/5 to-divine-blue-light/5 opacity-50" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative z-10"
          >
            <h2 className="text-divine-gold-light font-sans text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 sm:mb-6">Today's Verse</h2>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-holy-white leading-tight mb-6 sm:mb-8" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(251, 191, 36, 0.2)' }}>
              "{verse.text}"
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-divine-gold to-transparent mx-auto mb-4 sm:mb-6 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
            <p className="font-sans text-base sm:text-lg text-sacred-cream font-medium tracking-wide">
              {verse.reference}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
