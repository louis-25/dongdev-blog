import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navigation from "./components/Navigation";

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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
