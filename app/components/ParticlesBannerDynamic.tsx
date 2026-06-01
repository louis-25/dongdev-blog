"use client";

import dynamic from "next/dynamic";

// tsparticles(엔진 + 슬림 번들)는 무겁고 첫 페인트에 불필요하므로
// 클라이언트에서만 지연 로드해 초기 JS 번들에서 분리한다.
const ParticlesBanner = dynamic(() => import("./ParticlesBanner"), {
  ssr: false,
});

export default ParticlesBanner;
