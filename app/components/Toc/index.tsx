"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type TocHeading = {
  id: string;
  text: string;
  level: number; // 2 | 3
};
// TODO - 스크롤 위치에 맞게 메뉴 매핑하기!
function useHeadings() {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const scan = () => {
      const container = document.querySelector(".mdx") as HTMLElement | null;
      const scope: Document | HTMLElement = container ?? document;
      const nodes = Array.from(
        scope.querySelectorAll("h1, h2, h3")
      ) as HTMLHeadingElement[];
      const mapped = nodes
        .filter((el) => !!el.id)
        .map((el) => ({
          id: el.id,
          text: el.textContent ?? "",
          level: Number(el.tagName.replace("H", "")),
        }));
      setHeadings(mapped);
    };

    const rafId = requestAnimationFrame(scan);
    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return headings;
}

function useActiveId(headings: TocHeading[]) {
  const [activeId, setActiveId] = useState<string>("");

  const ids = useMemo(() => headings.map((h) => h.id), [headings]);
  // 활성 항목이 변경될 때, TOC 내에서 보이도록 스크롤
  useEffect(() => {
    if (!activeId) return;
    const link = document.querySelector(
      `nav[aria-label="Table of contents"] a[href="#${activeId}"]`
    ) as HTMLAnchorElement | null;
    link?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  }, [activeId]);
  useEffect(() => {
    if (ids.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) =>
            a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1
          );
        if (visible[0]?.target) {
          setActiveId((visible[0].target as HTMLElement).id);
        }
      },
      {
        root: null,
        rootMargin: "-120px 0px -60% 0px",
        threshold: [0, 1.0],
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

const Toc = () => {
  const headings = useHeadings();
  const activeId = useActiveId(headings);

  if (headings.length === 0) return null;

  return (
    <aside className="w-full">
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur p-4 md:p-5">
        <div className="mb-2 text-sm font-medium">목차</div>
        <nav aria-label="Table of contents">
          <ul className="space-y-1 text-sm">
            {headings.map((h) => (
              <li key={h.id} className={h.level === 3 ? "pl-3" : "pl-0"}>
                <Link
                  href={`#${h.id}`}
                  className={`block rounded-md px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                    activeId === h.id ? "text-brand" : "text-inherit"
                  }`}
                >
                  {h.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Toc;
