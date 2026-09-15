import { ImageResponse } from "next/og";
import { ogSize } from "@/app/lib/metadata";

// opengraph-image 파일 컨벤션(app/opengraph-image.tsx, app/blog/[slug]/opengraph-image.tsx)이 공유하는 템플릿.
// 빌드 때 정적으로 생성된다. 한글 글리프는 next/og가 생성 시점에 Google Fonts에서 받아온다.
export { ogSize };

export function renderOgImage(title: string, description?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#030711",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontStyle: "normal",
            color: "white",
            marginBottom: 30,
            lineHeight: 1.1,
            whiteSpace: "pre-wrap",
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: 30,
              fontStyle: "normal",
              color: "rgb(156, 163, 175)",
              whiteSpace: "pre-wrap",
            }}
          >
            {description}
          </div>
        )}
      </div>
    ),
    ogSize
  );
}
