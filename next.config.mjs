// next.config.mjs
import { withContentlayer } from "next-contentlayer";

const isProd = process.env.NODE_ENV === "production";
const repo = "your-repo-name"; // 프로젝트 저장소명

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // output: "export", // Next 14+에서 next export 대체
  // basePath: isProd ? `/${repo}` : "", // 프로젝트 페이지인 경우
  // assetPrefix: isProd ? `/${repo}/` : "", // 정적 자산 경로
  // images: { unoptimized: true }, // 정적 배포시 이미지 최적화 비활성화
  // 필요시: trailingSlash: true,
};

export default withContentlayer(nextConfig);
