// Design Ref: §5.3 — 최신 글 섹션 (서버 컴포넌트). 본문 제외 경량 뷰 모델만 수신 (AGENTS §6 경계)
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface LatestPostItem {
  title: string;
  url: string;
  date: string; // ISO
  description: string;
}

function formatDate(iso: string): string {
  // Plan SC: FR-09 — (post as any) 캐스팅 제거. 방어적 파싱
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function LatestPosts({ posts }: { posts: LatestPostItem[] }) {
  return (
    <section aria-labelledby="latest-posts-heading" className="mt-12">
      <div className="flex items-center justify-between">
        <h2 id="latest-posts-heading" className="text-xl font-semibold">
          최신 글
        </h2>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-brand hover:underline"
        >
          전체 보기
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-4 rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          아직 발행된 글이 없습니다.
        </p>
      ) : (
        <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.url}>
              <Link
                href={post.url}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand/50 hover:bg-muted/40"
              >
                <h3 className="line-clamp-1 font-medium transition-colors group-hover:text-brand">
                  {post.title}
                </h3>
                {post.description ? (
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                    {post.description}
                  </p>
                ) : null}
                {post.date ? (
                  <time
                    dateTime={post.date}
                    className="mt-3 text-xs text-muted-foreground"
                  >
                    {formatDate(post.date)}
                  </time>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
