"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { getSaintById } from "@/lib/saints";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface Message {
    role: "user" | "model";
    parts: { text: string }[];
}

// Define the approximate height of the fixed input section (e.g., 100-120px)
// We'll use a custom utility class or hardcoded padding value to ensure clearance.
const INPUT_AREA_PADDING = 'pb-32'; // Equivalent to ~128px, which should clear the input (p-2, py-3, pt-10 gradient)

export default function ChatContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const saintId = searchParams.get("saint") || "shepherd";
    const saint = getSaintById(saintId);

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [input]);

    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    };

    useEffect(() => {
        scrollToBottom("smooth");
    }, [messages]);

    // Scroll to bottom on resize (keyboard open/close)
    useEffect(() => {
        const handleResize = () => {
            // Use 'auto' behavior on resize to prevent jank
            scrollToBottom("auto");
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Reset messages when saint changes
    useEffect(() => {
        setMessages([]);
    }, [saintId]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", parts: [{ text: userMessage }] }]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.map((m) => ({
                        role: m.role,
                        parts: m.parts,
                    })),
                    saintId: saintId,
                }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setMessages((prev) => [
                ...prev,
                { role: "model", parts: [{ text: data.response }] },
            ]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    role: "model",
                    parts: [
                        {
                            text: "I apologize, but I am having trouble connecting at the moment. Please try again later.",
                        },
                    ],
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!saint) {
        router.push("/saints");
        return null;
    }

    return (
        <div className="fixed inset-0 z-10 flex flex-col pt-32 h-[100dvh]">
            <div className="w-full max-w-5xl mx-auto flex-1 relative px-4 flex flex-col min-h-0">
                {/* Saint Header - Fixed at top of container */}
                <div className="glass-panel p-4 rounded-3xl mb-4 border-2 border-divine-gold/30 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <Link href="/saints" className="p-2 hover:bg-divine-gold/20 rounded-full transition-colors">
                            <ArrowLeft size={20} className="text-sacred-cream hover:text-divine-gold" />
                        </Link>
                        <div className="relative w-14 h-14">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-divine-gold/30 to-divine-gold-dark/30 blur-md" />
                            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-divine-gold/50 shadow-lg">
                                <Image
                                    src={saint.avatar}
                                    alt={saint.name}
                                    fill
                                    className="object-cover"
                                    sizes="56px"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="font-serif text-xl text-holy-white font-bold">{saint.name}</h2>
                            <p className="text-sm text-divine-gold-light">{saint.title}</p>
                        </div>
                    </div>
                </div>

                {/* Messages Area - Scrollable with bottom padding for fixed footer 
                    CHANGE: Use the INPUT_AREA_PADDING variable in the class list.
                */}
                <div className="flex-1 overflow-y-auto px-2 space-y-6 custom-scrollbar min-h-0 pb-32 sm:pb-40">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-80 py-12">
                            <div className="relative w-32 h-32 mx-auto mb-6">
                                <div className="absolute inset-0 bg-divine-gold/20 blur-2xl rounded-full animate-pulse" />
                                <Image
                                    src={saint?.avatar || "/saints/shepherd.png"}
                                    alt="Saint Avatar"
                                    fill
                                    className="object-cover rounded-full border-4 border-divine-gold/30 shadow-[0_0_30px_rgba(251,191,36,0.2)]"
                                />
                            </div>
                            <h2 className="text-2xl font-serif text-divine-gold mb-2">
                                Speak with {saint?.name}
                            </h2>
                            <p className="text-sacred-cream/60 max-w-md mx-auto px-4">
                                {saint?.description}
                            </p>
                        </div>
                    )}

                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            {msg.role === "model" && (
                                <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 mt-1">
                                    <Image
                                        src={saint?.avatar || "/saints/shepherd.png"}
                                        alt={saint?.name || "Saint"}
                                        fill
                                        className="object-cover rounded-full border border-divine-gold/30 shadow-md"
                                    />
                                </div>
                            )}

                            <div
                                className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-2xl text-sm sm:text-base leading-relaxed shadow-md ${msg.role === "user"
                                    ? "bg-divine-gold/10 border border-divine-gold/20 text-sacred-cream rounded-tr-sm"
                                    : "bg-divine-blue-light/40 border border-divine-gold/10 text-sacred-cream/90 rounded-tl-sm backdrop-blur-sm"
                                    }`}
                            >
                                <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                            </div>
                        </motion.div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start gap-3">
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 mt-1">
                                <Image
                                    src={saint?.avatar || "/saints/shepherd.png"}
                                    alt="Saint"
                                    fill
                                    className="object-cover rounded-full border border-divine-gold/30"
                                />
                            </div>
                            <div className="bg-divine-blue-light/20 p-4 rounded-2xl rounded-tl-sm flex gap-2 items-center">
                                <div className="w-2 h-2 bg-divine-gold/50 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                                <div className="w-2 h-2 bg-divine-gold/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                                <div className="w-2 h-2 bg-divine-gold/50 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-4" />
                </div>

                {/* Bottom Section: Input - Optimized for Mobile */}
                <div className="absolute bottom-0 left-0 right-0 px-2 sm:px-4 pb-safe pb-3 sm:pb-4 pt-6 sm:pt-10 bg-gradient-to-t from-divine-blue-deep via-divine-blue-deep/95 to-transparent z-20">
                    <div className="glass-panel rounded-[2rem] p-1.5 sm:p-2 flex items-end gap-1.5 sm:gap-2 shadow-2xl border-2 border-divine-gold/40 hover:border-divine-gold transition-all duration-300">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                            placeholder="Ask for guidance..."
                            rows={1}
                            className="flex-1 bg-transparent px-3 sm:px-4 py-3 sm:py-3.5 outline-none text-sacred-cream placeholder:text-sacred-cream/40 text-base sm:text-lg resize-none max-h-32 custom-scrollbar"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isLoading || !input.trim()}
                            className="p-3 sm:p-3.5 min-w-[44px] min-h-[44px] bg-gradient-to-br from-divine-gold to-divine-gold-dark text-divine-blue-deep rounded-full hover:shadow-lg hover:shadow-divine-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 active:scale-95 sm:hover:scale-105"
                            aria-label="Send message"
                        >
                            <Send size={20} className="sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}