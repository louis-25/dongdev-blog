import { notFound } from "next/navigation";
import { allPosts } from "content-collections";
import { MDXContent } from "../../components/MDXComponents";
import { TagList } from "../../components/TagList";
import { Metadata } from "next";
import { MdxImage } from "@/app/components/mdx/MdxImage";
import CommentWidget from "@/app/components/CommentWidget";
import { TechKey } from "@/app/utils/SkillPicker";
import { SITE } from "@/config/site";
import { pageMetadata } from "@/app/lib/metadata";
import { getPostNeighbors } from "@/app/lib/posts";
import { ShareButton } from "@/app/components/blog/ShareButton";
import { PostNeighbors } from "@/app/components/blog/PostNeighbors";

interface PostProps {
  // Next 16부터 params는 Promise다 (동기 접근 제거됨)
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    return {};
  }

  const base = pageMetadata({
    title: post.title,
    description: post.description,
    path: post.url,
    // 같은 폴더의 opengraph-image.tsx가 빌드 때 만든 글별 이미지
    image: `${post.url}/opengraph-image`,
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      authors: [`${SITE.url}/about`],
      tags: post.tags,
    },
  };
}

// 정적 경로 생성: 각 글의 url을 slug 파라미터로 사용
export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slugAsParams }));
}

export default async function PostPage({ params }: PostProps) {
  const { slug } = await params;
  const text = decodeURIComponent(slug);
  // 초안은 content-collections에서 빠져 있으므로 URL 직접 접근도 404가 된다.
  const post = allPosts.find((post) => post.slugAsParams === text);

  if (!post) {
    notFound();
  }
  const neighbors = getPostNeighbors(post.slugAsParams);

  // new URL로 한글 slug를 퍼센트 인코딩 (canonical과 같은 표기)
  const url = new URL(post.url, SITE.url).href;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: "ko-KR",
    author: { "@type": "Person", name: SITE.author, url: `${SITE.url}/about` },
    image: `${url}/opengraph-image`,
    mainEntityOfPage: url,
    keywords: post.tags,
  };

  return (
    // <article className="py-8 mx-auto max-w-4xl px-4">
    <article className="w-full m-auto">
      <script
        type="application/ld+json"
        // `<` 이스케이프: 제목·설명에 </script>가 들어가도 태그를 닫지 못하게 (Next JSON-LD 가이드)
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-muted-foreground mb-4">{post.description}</div>
        <div className="flex items-center justify-between">
          <TagList tags={(post.tags as TechKey[]) || []} />
          <div className="shrink-0 text-muted-foreground">
            <time dateTime={post.date}>{post.formattedDate}</time>
            <span aria-hidden> · </span>
            <span>약 {post.readingMinutes}분</span>
          </div>
        </div>
      </div>
      {post.thumbnail ? (
        <MdxImage
          src={post.thumbnail}
          alt={post.title}
          width={576}
          height={300}
          // 본문 첫 화면의 LCP 후보 (Next 16: priority 대신 fetchPriority 권장)
          fetchPriority="high"
        />
      ) : null}
      <MDXContent code={post.mdx} />
      <div className="mt-12 flex justify-end">
        <ShareButton title={post.title} />
      </div>
      <PostNeighbors {...neighbors} />
      <CommentWidget />
    </article>
  );
}
