import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SolanaProvider } from "../components/SolanaProvider";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" className="dark">
      <body className={inter.className}>
        <SolanaProvider>
          {children}
        </SolanaProvider>
      </body>
    </html>
  );
}
