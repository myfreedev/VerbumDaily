import { Sparkles, Heart, BookOpen, Users } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto space-y-16">
                {/* Hero Section */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-divine-gold/10 border border-divine-gold/30 mb-4">
                        <Sparkles className="text-divine-gold" size={24} />
                    </div>
                    <h1 className="font-serif text-5xl md:text-6xl font-bold text-holy-white drop-shadow-[0_0_25px_rgba(251,191,36,0.4)]">
                        About Verbum Daily
                    </h1>
                    <p className="text-xl text-sacred-cream/80 max-w-2xl mx-auto leading-relaxed">
                        Bridging the gap between ancient wisdom and modern technology, creating a sanctuary for daily spiritual growth.
                    </p>
                </div>

                {/* Mission Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: BookOpen,
                            title: "Daily Wisdom",
                            description: "Curated scripture and reflections to start your day with purpose and spiritual clarity."
                        },
                        {
                            icon: Users,
                            title: "Saintly Guidance",
                            description: "Interactive AI companions modeled after great saints to offer personalized spiritual counsel."
                        },
                        {
                            icon: Heart,
                            title: "Faith & Tech",
                            description: "Harmoniously blending faith traditions with cutting-edge technology for the modern believer."
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="glass-panel p-8 rounded-3xl border border-divine-gold/20 hover:border-divine-gold/50 transition-all duration-500 group hover:-translate-y-2">
                            <div className="w-12 h-12 rounded-2xl bg-divine-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <item.icon className="text-divine-gold" size={24} />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-holy-white mb-3">{item.title}</h3>
                            <p className="text-sacred-cream/70 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Story Section */}
                <div className="glass-panel p-10 md:p-14 rounded-[3rem] border border-divine-gold/10 bg-divine-blue-deep/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-divine-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                    <div className="relative z-10 space-y-6 text-center max-w-2xl mx-auto">
                        <h2 className="font-serif text-3xl font-bold text-divine-gold-light">Our Mission</h2>
                        <p className="text-lg text-sacred-cream/80 leading-relaxed">
                            Verbum Daily was born from a desire to make spiritual formation accessible in the digital age. We believe that technology, when used with intention, can be a powerful tool for deepening one's faith.
                        </p>
                        <p className="text-lg text-sacred-cream/80 leading-relaxed">
                            By bringing the voices of the saints to life through AI, we hope to provide a unique way to engage with the rich heritage of the Church, making their timeless wisdom relevant for today's challenges.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
