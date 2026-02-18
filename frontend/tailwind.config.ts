import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "arcium": {
                    DEFAULT: "#6D45FF",
                    50: "#EFECFF",
                    100: "#DED6FF",
                    200: "#BCA6FF",
                    300: "#9A75FF",
                    400: "#6D45FF", // Primary Brand
                    500: "#5A33EE",
                    600: "#4822DD",
                    700: "#3611CC",
                    800: "#2400BB",
                    900: "#1200AA",
                }
            },
            boxShadow: {
                "glow": "0 0 20px rgba(109,69,255,0.3)",
                "glow-lg": "0 0 40px rgba(109,69,255,0.5)",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
