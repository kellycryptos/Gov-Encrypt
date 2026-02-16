import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@solana/wallet-adapter-base",
    "@solana/wallet-adapter-react",
    "@solana/wallet-adapter-react-ui",
    "@solana/wallet-adapter-wallets",
    "@solana/web3.js"
  ],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, os: false };
    return config;
  }
};

export default nextConfig;
