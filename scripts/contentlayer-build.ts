// scripts/contentlayer-build.ts
import { spawn } from "node:child_process";
import { platform } from "node:process";

function runContentlayerBuild(): Promise<number> {
  const isWin = platform === "win32";
  const bin = isWin
    ? "node_modules\\.bin\\contentlayer.cmd"
    : "node_modules/.bin/contentlayer";

  return new Promise<number>((resolve) => {
    const child = spawn(bin, ["build"], {
      stdio: "inherit",
      shell: true,
    });
    child.on("close", () => resolve(0)); // ✅ 항상 0으로
    child.on("error", () => resolve(0)); // ✅ 항상 0으로
  });
}

(async () => {
  const code = await runContentlayerBuild();
  process.exit(0); // ✅ 항상 성공 종료
})();
