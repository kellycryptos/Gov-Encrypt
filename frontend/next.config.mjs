/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        "@solana/wallet-adapter-base",
        "@solana/wallet-adapter-react",
        "@solana/wallet-adapter-react-ui",
        "@solana/wallet-adapter-wallets",
        "@solana/web3.js"
    ],
    webpack: (config) => {
        config.resolve.fallback = { fs: false, path: false, os: false, crypto: false, stream: false };
        return config;
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    },
    experimental: {}
};

export default nextConfig;
