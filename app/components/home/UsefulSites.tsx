// Design Ref: §5.3, §7 — 외부 링크 카드 (서버). rel=noopener noreferrer로 탭내빙 방지
import { ArrowUpRight } from "lucide-react";
import type { UsefulSite } from "@/app/data/usefulSites";

export default function UsefulSites({ sites }: { sites: UsefulSite[] }) {
  if (sites.length === 0) return null;

  return (
    <section aria-labelledby="useful-sites-heading" className="mt-12">
      <h2 id="useful-sites-heading" className="text-xl font-semibold">
        유용한 사이트
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        웹 개발에 유용한 사이트를 모았습니다.
      </p>
      <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sites.map((site) => (
          <li key={site.url}>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand/50 hover:bg-muted/40"
            >
              <span className="flex items-center justify-between font-medium">
                {site.name}
                <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-brand" />
              </span>
              <span className="mt-1 text-sm text-muted-foreground">
                {site.desc}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
