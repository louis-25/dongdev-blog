"use client";
import { useEffect, useMemo, useState } from "react";
import { type Container } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";
import type { ISourceOptions } from "@tsparticles/engine";
const ParticlesBanner = () => {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false }, // 전체화면 끄기
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
          // resize: true,
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: theme === "dark" ? "#ffffff" : "#000000" },
        links: {
          color: theme === "dark" ? "#ffffff" : "#000000",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        collisions: { enable: true },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: { enable: true, area: 800 },
          value: 150,
        },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } },
      },
      detectRetina: true,
    }),
    [theme]
  );

  if (!init) return null;

  return (
    <div className="relative border-2 rounded-lg border-border w-full h-[300px] flex items-center justify-center overflow-hidden">
      {/* 파티클 배경 */}
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options as any}
        className="absolute inset-0"
      />

      {/* 텍스트 컨텐츠 */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-3xl font-bold tracking-tight drop-shadow">
          DongDev Blog 방문을 환영합니다.
        </h1>
        <p className="mt-2 text-sm sm:text-base tracking-tight drop-shadow">
          Web 개발에 있어 전문적인 블로그가 되기 위해 노력하겠습니다.
        </p>
      </div>
    </div>
  );
};

export default ParticlesBanner;
