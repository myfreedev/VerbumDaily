"use client";

import { useState } from "react";
import { Sparkles, Image as ImageIcon, Loader2, Maximize2, Download, X, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CreatePage() {
    const [verse, setVerse] = useState("");
    const [generatedPrompt, setGeneratedPrompt] = useState("");
    const [generatedImage, setGeneratedImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [isFullViewOpen, setIsFullViewOpen] = useState(false);

    const handleDownload = async () => {
        if (!generatedImage || !verse) return;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = generatedImage;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw image
            ctx.drawImage(img, 0, 0);

            // Add overlay
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Configure text
            const fontSize = Math.floor(canvas.width / 25);
            ctx.font = `bold ${fontSize}px serif`;
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;

            // Wrap text
            const words = verse.trim().split(" ");
            const lines = [];
            let currentLine = words[0];
            const maxWidth = canvas.width * 0.8;

            for (let i = 1; i < words.length; i++) {
                const width = ctx.measureText(currentLine + " " + words[i]).width;
                if (width < maxWidth) {
                    currentLine += " " + words[i];
                } else {
                    lines.push(currentLine);
                    currentLine = words[i];
                }
            }
            lines.push(currentLine);

            // Draw text
            const lineHeight = fontSize * 1.5;
            const totalHeight = lines.length * lineHeight;
            let startY = (canvas.height - totalHeight) / 2;

            lines.forEach((line) => {
                ctx.fillText(line, canvas.width / 2, startY);
                startY += lineHeight;
            });

            // Trigger download
            const link = document.createElement("a");
            link.download = "verbum-daily-creation.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        };
    };

    const generatePrompt = async () => {
        if (!verse.trim()) return;

        setIsLoading(true);
        setGeneratedPrompt("");

        try {
            const response = await fetch("/api/generate-prompt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ verse }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setGeneratedPrompt(data.prompt);

            // Generate image using Pollinations.ai
            setIsGeneratingImage(true);
            const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(data.prompt)}?width=1280&height=720&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;

            // Preload image
            const img = new window.Image();
            img.src = imageUrl;
            img.onload = () => {
                setGeneratedImage(imageUrl);
                setIsGeneratingImage(false);
            };
            img.onerror = () => {
                console.error("Failed to load image");
                setIsGeneratingImage(false);
            };

        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center max-w-4xl mx-auto w-full p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl text-center mb-10"
            >
                <div className="relative w-20 h-20 mx-auto mb-6 animate-float">
                    <Image src="/logo.png" alt="Verbum Daily Logo" fill className="object-contain drop-shadow-md" />
                </div>
                <h1 className="font-serif text-3xl md:text-4xl text-holy-white mb-4 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">Visual Verse Creator</h1>
                <p className="text-sacred-cream/80">Transform scripture into divine art. Enter a verse to generate a unique visual interpretation.</p>
            </motion.div>

            <div className="w-full max-w-2xl space-y-8">
                {/* Input Section - Mobile Optimized */}
                <div className="glass-panel p-4 sm:p-8 rounded-3xl shadow-2xl border-2 border-divine-gold/30 hover:border-divine-gold/50 transition-all duration-500">
                    <textarea
                        value={verse}
                        onChange={(e) => setVerse(e.target.value)}
                        placeholder="Enter a Bible verse (e.g., 'The Lord is my shepherd...')"
                        className="w-full h-32 sm:h-40 bg-transparent resize-none outline-none text-base sm:text-lg text-sacred-cream placeholder:text-sacred-cream/40"
                    />
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={generatePrompt}
                            disabled={isLoading || !verse.trim()}
                            className="flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3 min-h-[44px] bg-gradient-to-br from-divine-blue to-divine-blue/80 text-white rounded-full hover:shadow-lg hover:shadow-divine-blue/30 disabled:opacity-50 transition-all shadow-lg active:scale-95 sm:hover:scale-105 duration-300"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
                            <span>Generate Art</span>
                        </button>
                    </div>
                </div>

                {/* Result Section */}
                {(generatedPrompt || isGeneratingImage) && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel p-8 rounded-3xl border-t border-celestial-gold/30"
                    >
                        <div className="aspect-video bg-gray-100 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden group">
                            {isGeneratingImage ? (
                                <div className="text-center">
                                    <Loader2 className="w-10 h-10 text-divine-gold animate-spin mx-auto mb-2" />
                                    <p className="text-sm text-sacred-cream/60 font-medium">Painting divine imagery...</p>
                                </div>
                            ) : generatedImage ? (
                                <div className="relative w-full h-full group">
                                    <Image
                                        src={generatedImage}
                                        alt={generatedPrompt}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-black/30 transition-opacity duration-500" />

                                    {/* Text Overlay - Mobile Optimized */}
                                    <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
                                        <p className="font-serif text-holy-white text-center text-base sm:text-xl md:text-2xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-relaxed max-w-3xl">
                                            "{verse}"
                                        </p>
                                    </div>

                                    {/* Actions Overlay - Always visible on mobile */}
                                    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 flex gap-1.5 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={() => setIsFullViewOpen(true)}
                                            className="p-2 sm:p-2.5 min-w-[44px] min-h-[44px] bg-black/50 hover:bg-black/70 active:bg-black/80 text-white rounded-full backdrop-blur-sm transition-colors"
                                            title="View Full Screen"
                                        >
                                            <Maximize2 size={20} />
                                        </button>
                                        <button
                                            onClick={handleDownload}
                                            className="p-2 sm:p-2.5 min-w-[44px] min-h-[44px] bg-divine-gold hover:bg-divine-gold-dark active:bg-divine-gold-dark/80 text-divine-blue-deep rounded-full shadow-lg transition-colors"
                                            title="Download Image"
                                        >
                                            <Download size={20} className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-br from-divine-blue-deep/20 to-divine-gold/20 mix-blend-overlay" />
                                    <div className="text-center p-8">
                                        <ImageIcon className="w-16 h-16 text-divine-gold/30 mx-auto mb-4" />
                                        <p className="text-sacred-cream/50 italic">
                                            (Image generation placeholder - In a full version, this would display the generated artwork)
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>

                        {!isGeneratingImage && (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xs font-bold text-divine-gold uppercase tracking-wider mb-2">AI Generated Prompt</h3>
                                    <p className="text-sm text-sacred-cream bg-divine-blue-deep/30 p-4 rounded-xl border border-divine-gold/20 italic">
                                        "{generatedPrompt}"
                                    </p>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <button className="flex items-center gap-2 px-4 py-2 text-divine-blue hover:bg-divine-blue/5 rounded-full transition-colors">
                                        <Share2 size={18} />
                                        <span className="text-sm font-medium">Share</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Full View Modal */}
            {isFullViewOpen && generatedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                    <button
                        onClick={() => setIsFullViewOpen(false)}
                        className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors"
                    >
                        <X size={32} />
                    </button>

                    <div className="relative w-full max-w-6xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10">
                        <Image
                            src={generatedImage}
                            alt={generatedPrompt}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                            <p className="font-serif text-holy-white text-center text-3xl md:text-5xl font-bold drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] leading-relaxed max-w-4xl">
                                "{verse}"
                            </p>
                        </div>

                        <div className="absolute bottom-8 right-8">
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-6 py-3 bg-divine-gold hover:bg-divine-gold-dark text-divine-blue-deep font-bold rounded-full shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all hover:scale-105"
                            >
                                <Download size={20} />
                                <span>Download Creation</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
