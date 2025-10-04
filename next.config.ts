import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    webpack: (config) => {
        config.resolve.alias = {
            ...(config.resolve.alias ?? {}),
            "@": path.resolve(__dirname, "src"), // <- força @ -> src
        };
        config.resolve.extensions = [
            ".ts",
            ".tsx",
            ".js",
            ".jsx",
            ".mjs",
            ".cjs",
            ".json",
        ];
        return config;
    },
};

export default nextConfig;
