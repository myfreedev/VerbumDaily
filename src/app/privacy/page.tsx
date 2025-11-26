"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
    return (
        <div className="flex-1 flex flex-col items-center max-w-4xl mx-auto w-full p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-10 rounded-3xl w-full"
            >
                <h1 className="font-serif text-3xl text-divine-blue mb-8 font-bold border-b border-divine-blue/10 pb-4">
                    Privacy Policy & Terms of Service
                </h1>

                <div className="space-y-8 text-gray-700 leading-relaxed">
                    <section>
                        <h2 className="font-serif text-xl text-divine-blue mb-3 font-bold">1. AI Disclaimer</h2>
                        <p>
                            Verbum Daily utilizes artificial intelligence (Google Gemini) to power "The Shepherd" chat and the Verse Prompt Generator.
                            Please be aware of the following:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li><strong>AI Can Make Mistakes:</strong> While we strive for accuracy, AI models can hallucinate or provide incorrect information. Always verify biblical references with a physical Bible.</li>
                            <li><strong>Not a Divine Being:</strong> The "Shepherd" persona is a simulation designed for spiritual reflection. It is not God, Jesus, or a human counselor.</li>
                            <li><strong>No Professional Advice:</strong> This application does not provide medical, legal, or financial advice.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-serif text-xl text-divine-blue mb-3 font-bold">2. Data Privacy</h2>
                        <p>
                            We respect your privacy. Chat history is processed by Google's Gemini API but is not permanently stored on our servers.
                            We do not sell your personal data.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-xl text-divine-blue mb-3 font-bold">3. Terms of Use</h2>
                        <p>
                            By using Verbum Daily, you agree to use the application respectfully and for its intended purpose of spiritual growth.
                            Misuse, including generating inappropriate content or attempting to bypass safety filters, is prohibited.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-divine-blue/10 text-sm text-gray-500">
                        <p>Last Updated: November 2025</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
