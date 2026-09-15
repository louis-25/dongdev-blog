import type { Metadata } from "next";
import { SITE } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };

// openGraph/twitter는 하위 세그먼트가 정의하면 루트 값을 통째로 덮어쓴다(얕은 병합).
// 그래서 페이지마다 siteName·locale을 다시 채우고 og:url을 자기 경로로 맞춘다.
// images도 명시해야 한다: 페이지가 openGraph를 쓰면 app/opengraph-image.tsx의 파일 이미지가 사라지고,
// 반대로 명시한 images는 같은 폴더의 opengraph-image.tsx보다 우선한다(Next 16.3.5 빌드로 확인).
// 그래서 이미지 경로를 직접 넘긴다 — 기본은 app/opengraph-image.tsx, 글 상세는 자기 opengraph-image.
export function pageMetadata({
  title,
  description = SITE.description,
  path,
  image = "/opengraph-image",
}: {
  title?: string;
  description?: string;
  path: string;
  image?: string;
}): Metadata {
  const ogTitle = title ?? SITE.name;
  const images = [{ url: image, ...ogSize, alt: ogTitle }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images,
    },
  };
}
