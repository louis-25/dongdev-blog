import { SITE } from "@/config/site";
import { ogSize, renderOgImage } from "@/app/lib/og-image";

// 사이트 기본 OG 이미지 (글 상세는 app/blog/[slug]/opengraph-image.tsx가 덮어쓴다)
export const alt = SITE.name;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(SITE.name, SITE.description);
}
