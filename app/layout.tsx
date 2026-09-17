import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navigation } from "./components/Navigation";
import { cn } from "./lib/utils";
import Profile from "./components/Profile";
import Toc from "./components/Toc";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getSearchIndex } from "./lib/posts";
import { SITE } from "@/config/site";
import { PageTransition } from "./components/animations/PageTransition";
// Design Ref: §Design Anchor — Inter를 CSS 변수(--font-inter)로 노출해 globals.css의 --font-sans 토큰과 연결
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  // 상대 URL(OG 이미지·canonical)을 절대 URL로 풀어주는 기준점
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  // 페이지별 openGraph/twitter는 app/lib/metadata.ts의 pageMetadata로 채운다.
  // og:image는 app/opengraph-image.tsx(기본)와 app/blog/[slug]/opengraph-image.tsx(글별)가 담당.
  openGraph: {
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchIndex = getSearchIndex();
  return (
    <html lang="ko" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* favicon·apple-icon은 app/favicon.ico·app/apple-icon.png 파일 컨벤션이 넣는다 */}
        {/* alternates는 페이지 metadata가 통째로 덮어쓰므로 head에 직접 둔다 */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={SITE.name}
          href="/rss.xml"
        />
      </head>
      <body className={cn(inter.className, "antialiased")}>
        <div className="max-w-5xl mt-8 mb-8 mx-auto">
          <Analytics />
          <SpeedInsights />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="w-full m-auto px-4">
              {/* <main style={{ maxWidth: "576px", margin: "auto" }}> */}
              <Navigation posts={searchIndex} />
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                <div className="lg:col-span-3 order-2 lg:order-1 hidden lg:block">
                  {/* h-full: sticky는 부모 높이 안에서만 붙어 있으므로 사이드바를 본문 높이까지 늘린다 */}
                  <div className="flex h-full flex-col gap-4 caret-none">
                    <Profile />
                    {/* 글 상세에서만 렌더(.mdx가 없으면 null). 좁은 화면은 본문 인라인 목차를 쓴다 */}
                    <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
                      <Toc />
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 caret-none">
                  <PageTransition>{children}</PageTransition>
                </div>
              </div>
            </main>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
