import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@solana/wallet-adapter-base",
    "@solana/wallet-adapter-react",
    "@solana/wallet-adapter-react-ui",
    "@solana/wallet-adapter-wallets",
    "@solana/web3.js",
    "@coral-xyz/anchor"
  ],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, os: false, crypto: false, stream: false };
    return config;
  },
  // Explicitly set an empty turbopack config to avoid the "missing turbopack config" error 
  // when custom webpack is used in some Next.js environments.
  experimental: {
    turbopack: {}
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
