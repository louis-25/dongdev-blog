import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navigation } from "./components/Navigation";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DongDev Blog",
  description: "Next.js와 React로 만드는 개발 블로그",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={classNames(
          inter.className,
          "antialiased max-w-4xl mx-4 mt-8 mx-auto"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="w-fullm-auto px-4">
            {/* <main style={{ maxWidth: "576px", margin: "auto" }}> */}
            <Navigation />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
