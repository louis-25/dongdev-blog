import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

// Edge Runtime은 Next 16에서 폐기 예고됐다. next/og는 nodejs 런타임(기본값)에서도
// 동일하게 동작하므로 runtime 지정을 두지 않는다.

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "DongDev Blog";
    const description =
      searchParams.get("description") ||
      "A blog about web development and technology";

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
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
