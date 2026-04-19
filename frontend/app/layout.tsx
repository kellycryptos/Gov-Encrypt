import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { SolanaProvider } from "../components/SolanaProvider";
import { Footer } from "../components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Gov Encrypt | Confidential Governance Layer",
  description: "The Confidential Governance Layer for Serious DAOs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <body className={`${inter.className} font-sans bg-background text-foreground`}>
        <SolanaProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </SolanaProvider>
      </body>
    </html>
  );
}
