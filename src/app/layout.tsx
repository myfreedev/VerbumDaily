"use client";

import { Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isChatPage = pathname?.startsWith("/chat");
  const [crosses, setCrosses] = useState<Array<{ x: number; y: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const newCrosses = [...Array(8)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 30,
      delay: Math.random() * 15,
      duration: 25 + Math.random() * 20,
    }));
    setCrosses(newCrosses);
  }, []);

  return (
    <html lang="en">
      <body
        className={`${serif.variable} ${sans.variable} antialiased min-h-screen relative overflow-x-hidden`}
      >
        {/* Flowing Cross Background */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-[80vh] h-[80vh] text-divine-blue/5 animate-flow-cross"
            fill="currentColor"
          >
            <path d="M45 0v30H15v15h30v55h10V45h30V30H55V0H45z" />
          </svg>

          {/* Small Floating SVG Crosses with Yellow Glow - Optimized for Mobile */}
          {crosses.map((cross, i) => {
            // Hide some crosses on mobile for better performance
            const hiddenOnMobile = i >= 5 ? 'hidden sm:block' : '';

            return (
              <div
                key={i}
                className={`floating-cross absolute ${hiddenOnMobile}`}
                style={{
                  left: `${cross.x}%`,
                  top: `${cross.y}%`,
                  animationDelay: `${cross.delay}s`,
                  animationDuration: `${cross.duration}s`,
                  willChange: 'transform',
                }}
              >
                <svg
                  viewBox="0 0 100 100"
                  width="20"
                  height="20"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))' }}
                >
                  <path
                    d="M45 0v30H15v15h30v55h10V45h30V30H55V0H45z"
                    fill="#fbbf24"
                    opacity="0.5"
                  />
                </svg>
              </div>
            );
          })}
        </div>

        <Navbar />
        <main className="pt-24 px-4 min-h-screen flex flex-col relative z-10">
          {children}
          {!isChatPage && <Footer />}
        </main>
      </body>
    </html>
  );
}
