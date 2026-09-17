// 글 하단 동선(서버): 이전/다음 글 + 관련 글. 경량 필드만 받는다(AGENTS §6).
import Link from "next/link";
import type { PostLink } from "@/app/lib/posts";

interface PostNeighborsProps {
  prev: PostLink | null;
  next: PostLink | null;
  related: PostLink[];
}

const card =
  "block rounded-xl border border-border p-4 transition-colors hover:border-brand/50 hover:bg-muted/40";

export function PostNeighbors({ prev, next, related }: PostNeighborsProps) {
  return (
    <nav aria-label="다른 글" className="my-12 space-y-8">
      {related.length > 0 ? (
        <section aria-labelledby="related-posts-heading">
          <h2 id="related-posts-heading" className="mb-3 text-lg font-semibold">
            관련 글
          </h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {related.map((post) => (
              <li key={post.url}>
                <Link href={post.url} className={`${card} h-full`}>
                  <span className="font-medium">{post.title}</span>
                  <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">
                    {post.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="grid gap-3 md:grid-cols-2">
        {prev ? (
          <Link href={prev.url} rel="prev" className={card}>
            <span className="block text-xs text-muted-foreground">← 이전 글</span>
            <span className="font-medium">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={next.url} rel="next" className={`${card} md:text-right`}>
            <span className="block text-xs text-muted-foreground">다음 글 →</span>
            <span className="font-medium">{next.title}</span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
