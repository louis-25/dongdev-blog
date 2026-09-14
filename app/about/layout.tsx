import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
  description: "DongDev의 경력과 사용 기술을 소개합니다.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
