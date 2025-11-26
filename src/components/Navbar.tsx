"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, MessageCircle, PenTool, Sparkles, Info } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Daily Verse", href: "/", icon: BookOpen },
        { name: "Saints", href: "/saints", icon: Sparkles },
        { name: "Chat", href: "/chat", icon: MessageCircle },
        { name: "Create", href: "/create", icon: PenTool },
        { name: "About", href: "/about", icon: Info },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-3 sm:p-6 pointer-events-none">
            <div className="pointer-events-auto glass-panel flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-6 sm:py-3 rounded-full bg-divine-blue-deep/60 backdrop-blur-xl border border-divine-gold/20 shadow-[0_0_30px_rgba(251,191,36,0.15)] hover:shadow-[0_0_40px_rgba(251,191,36,0.3)] hover:border-divine-gold/40 transition-all duration-500">
                <Link href="/" className="mr-2 sm:mr-8 flex items-center gap-2 sm:gap-3 group min-h-[44px]">
                    <div className="relative w-12 h-12 sm:w-18 sm:h-18 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                        <div className="absolute inset-0 bg-divine-gold/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Image src="/logo.png" alt="Verbum Daily Logo" fill className="object-contain drop-shadow-lg" />
                    </div>
                    <div className="hidden md:flex flex-col leading-tight">
                        <span className="font-sans font-bold text-divine-gold-light text-lg sm:text-xl group-hover:text-divine-gold group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] transition-all duration-300">
                            Verbum
                        </span>
                        <span className="font-sans font-bold text-divine-gold-light text-lg sm:text-xl -mt-1 group-hover:text-divine-gold group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] transition-all duration-300">
                            Daily
                        </span>
                    </div>
                </Link>

                <div className="flex items-center gap-0.5 sm:gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative px-2.5 py-2 sm:px-4 sm:py-2 rounded-full group transition-colors duration-300 min-h-[44px] flex items-center"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-active"
                                        className="absolute inset-0 bg-divine-gold/10 rounded-full border border-divine-gold/30 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <div className={`relative flex items-center gap-1.5 sm:gap-2 z-10 ${isActive ? "text-divine-gold" : "text-sacred-cream/80 group-hover:text-divine-gold-light"}`}>
                                    <Icon size={18} className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110 group-active:scale-95"}`} />
                                    <span className={`text-xs sm:text-sm font-medium hidden sm:block transition-all duration-300 ${isActive ? "font-bold" : ""}`}>
                                        {item.name}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
