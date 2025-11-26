import Link from "next/link";
import { Heart, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full relative z-10 mt-20">
            {/* Decorative Top Border with Glow */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-divine-gold/50 to-transparent shadow-[0_0_15px_rgba(251,191,36,0.5)]" />

            <div className="glass-panel bg-divine-blue-deep/60 backdrop-blur-xl pt-16 pb-8 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        {/* Brand Section */}
                        <div className="col-span-1 md:col-span-2 space-y-4">
                            <h3 className="font-serif text-2xl text-holy-white font-bold tracking-wide" style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.3)' }}>
                                Verbum Daily
                            </h3>
                            <p className="text-sacred-cream/80 leading-relaxed max-w-md">
                                Your daily companion for spiritual growth, connecting ancient wisdom with modern technology. Let the saints guide your journey.
                            </p>
                            <div className="flex gap-4 pt-2">
                                <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-divine-gold/20 text-sacred-cream hover:text-divine-gold transition-all duration-300 hover:scale-110">
                                    <Twitter size={18} />
                                </a>
                                <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-divine-gold/20 text-sacred-cream hover:text-divine-gold transition-all duration-300 hover:scale-110">
                                    <Github size={18} />
                                </a>
                                <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-divine-gold/20 text-sacred-cream hover:text-divine-gold transition-all duration-300 hover:scale-110">
                                    <Mail size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h4 className="font-serif text-lg text-divine-gold-light font-semibold">Explore</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/" className="text-sacred-cream/70 hover:text-divine-gold hover:pl-2 transition-all duration-300 block">
                                        Daily Verse
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/saints" className="text-sacred-cream/70 hover:text-divine-gold hover:pl-2 transition-all duration-300 block">
                                        Meet the Saints
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/chat" className="text-sacred-cream/70 hover:text-divine-gold hover:pl-2 transition-all duration-300 block">
                                        Spiritual Chat
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div className="space-y-4">
                            <h4 className="font-serif text-lg text-divine-gold-light font-semibold">Legal</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/privacy" className="text-sacred-cream/70 hover:text-divine-gold hover:pl-2 transition-all duration-300 block">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="text-sacred-cream/70 hover:text-divine-gold hover:pl-2 transition-all duration-300 block">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="text-sacred-cream/70 hover:text-divine-gold hover:pl-2 transition-all duration-300 block">
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                    {/* Bottom Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sacred-cream/50">
                        <p>© {new Date().getFullYear()} Verbum Daily. All rights reserved.</p>

                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:border-divine-gold/30 transition-colors duration-300">
                            <span>Made with</span>
                            <Heart size={14} className="text-red-400 fill-red-400 animate-pulse" />
                            <span>and Faith</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
