// Design Ref: §5.3 — 글 행 카드 (서버). 홈 카드 스타일과 일관(--brand 호버)
import Link from "next/link";
import Image from "next/image";
import { TagList } from "../TagList";
import type { TechKey } from "@/app/utils/SkillPicker";

export interface BlogRowItem {
  title: string;
  description: string;
  url: string;
  date: string; // ISO
  formattedDate: string;
  tags?: string[];
  thumbnail?: string;
}

export default function PostListRow({ post }: { post: BlogRowItem }) {
  return (
    // stretched link: 제목 링크의 ::after가 카드 전체를 덮고, 태그 링크는 z-10으로 그 위에 둔다
    // (카드 전체를 <Link>로 감싸면 태그 <a>가 중첩된다)
    <article className="group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand/50 hover:bg-muted/40 md:flex-row md:items-start md:gap-6">
      <div className="min-w-0 flex-1">
        <h2 className="font-semibold transition-colors group-hover:text-brand">
          <Link href={post.url} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        {post.description ? (
          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
            {post.description}
          </p>
        ) : null}
        {post.tags && post.tags.length > 0 ? (
          <div className="relative z-10 mt-3">
            {/* TagList는 /tags·/category로 이동(목록 필터와 별개의 탐색 동선) */}
            <TagList tags={post.tags as TechKey[]} />
          </div>
        ) : null}
        <time
          dateTime={post.date}
          className="mt-3 block text-xs text-muted-foreground"
        >
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
    </article>
  );
}
