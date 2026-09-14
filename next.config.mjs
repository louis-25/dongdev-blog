// next.config.mjs
//
// Next 16은 Turbopack이 기본이고 Turbopack은 webpack 플러그인을 지원하지 않는다.
// 콘텐츠 생성은 번들러 플러그인이 아니라 빌드 전 선행 CLI 스텝으로 분리한다
// (package.json의 build/dev 스크립트 → content-collections build/watch).

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
