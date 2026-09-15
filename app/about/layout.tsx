import { pageMetadata } from "@/app/lib/metadata";

export const metadata = pageMetadata({
  title: "소개",
  description: "DongDev의 경력과 사용 기술을 소개합니다.",
  path: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
