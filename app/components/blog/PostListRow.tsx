// Design Ref: §5.3 — 글 행 카드 (서버). 홈 카드 스타일과 일관(--brand 호버)
import Link from "next/link";
import Image from "next/image";
import { TagList } from "../TagList";
import type { TechKey } from "@/app/utils/SkillPicker";

export interface BlogRowItem {
  _id: string;
  title: string;
  description: string;
  url: string;
  formattedDate: string;
  tags?: string[];
  thumbnail?: string;
}

export default function PostListRow({ post }: { post: BlogRowItem }) {
  return (
    <article className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand/50 hover:bg-muted/40">
      <Link
        href={post.url}
        className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6"
      >
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold transition-colors hover:text-brand">
            {post.title}
          </h2>
          {post.description ? (
            <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
              {post.description}
            </p>
          ) : null}
          {post.tags && post.tags.length > 0 ? (
            <div className="mt-3">
              {/* TagList는 /tags·/category로 이동(목록 필터와 별개의 탐색 동선) */}
              <TagList tags={post.tags as TechKey[]} />
            </div>
          ) : null}
          <time className="mt-3 block text-xs text-muted-foreground">
            {post.formattedDate}
          </time>
        </div>
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            width={200}
            height={120}
            sizes="(max-width: 768px) 100vw, 200px"
            className="h-auto w-full rounded-lg shadow-sm md:w-[200px] md:shrink-0"
          />
        ) : null}
      </Link>
    </article>
  );
}
