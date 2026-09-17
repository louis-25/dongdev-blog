import { allPosts } from "content-collections";
import { SITE } from "@/config/site";
import { ogSize, renderOgImage } from "@/app/lib/og-image";

// 글별 OG 이미지. 이미지 라우트는 page.tsx의 generateStaticParams를 물려받지 않으므로
// 같은 경로 목록을 여기서도 내보내야 빌드 때 정적 생성된다(없으면 요청마다 렌더).
export const alt = SITE.name;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slugAsParams }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = decodeURIComponent((await params).slug);
  const post = allPosts.find((p) => p.slugAsParams === slug);
  return renderOgImage(post?.title ?? SITE.name, post?.description);
}
