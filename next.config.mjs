// next.config.mjs
import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    windowsGeneratedFilesForWatch: true,
  },
};

export default withContentlayer(nextConfig);
