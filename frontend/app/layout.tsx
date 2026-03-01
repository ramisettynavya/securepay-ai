import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/fsd/widgets/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "SecurePay AI - UPI & SMS Scam Detection",
  description:
    "AI-powered UPI and SMS scam detection system. Analyze suspicious messages and protect yourself from financial fraud in real-time.",
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-border px-6 py-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              SecurePay AI. AI-powered fraud detection.
            </p>
            <p className="text-xs text-muted-foreground">
              Built for a safer digital payments ecosystem.
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
