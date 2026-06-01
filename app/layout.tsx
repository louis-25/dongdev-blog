import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navigation } from "./components/Navigation";
import classNames from "classnames";
import Profile from "./components/Profile";
import Toc from "./components/Toc";
import ScrollToTop from "./utils/scrollToTop";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getSearchIndex } from "./lib/posts";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DongDev Blog",
  description: "웹개발에 관한 글을 기록하는 공간입니다.",
  openGraph: {
    title: "DongDev Blog",
    description: "웹개발에 관한 전문적인 블로그가 되기 위해 노력하겠습니다.",
    url: "https://dongdev-blog.vercel.app",
    siteName: "DongDev Blog",
    images: [
      {
        url: "https://dongdev-blog.vercel.app/rakun.png",
        width: 1200,
        height: 630,
        alt: "블로그 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchIndex = getSearchIndex();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={classNames(inter.className, "antialiased")}>
        <div className="max-w-5xl mt-8 mb-8 mx-auto">
          <Suspense fallback={null}>
            <ScrollToTop />
          </Suspense>
          <Analytics />
          <SpeedInsights />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="w-full m-auto px-4">
              {/* <main style={{ maxWidth: "576px", margin: "auto" }}> */}
              <Navigation posts={searchIndex} />
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                <div className="lg:col-span-3 order-2 lg:order-1 hidden lg:block">
                  <div className="flex flex-col gap-4 caret-none">
                    <Profile />
                    {/* <div className="lg:sticky lg:top-0">
                    <Toc />
                  </div> */}
                  </div>
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 caret-none">
                  {children}
                </div>
              </div>
            </main>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
