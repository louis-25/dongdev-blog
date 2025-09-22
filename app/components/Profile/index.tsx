"use client";

import { allPosts } from "contentlayer/generated";
import { TagList } from "../TagList";
import { TechKey } from "@/app/utils/SkillPicker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { Badge } from "@/ui/badge";
import { useState } from "react";
import { CATEGORY_LIST } from "@/config/post";
import Image from "next/image";

function getCategoryTagsWithCounts() {
  const countsByCategory: Record<string, Record<TechKey, number>> = {};
  const tagsByCategory: Record<string, TechKey[]> = {};

  for (const category of CATEGORY_LIST) {
    countsByCategory[category] = {} as Record<TechKey, number>;
    tagsByCategory[category] = [] as TechKey[];
  }

  for (const post of allPosts) {
    if (!post.published) continue;
    const category = post.category as string;
    if (!CATEGORY_LIST.includes(category)) continue;
    const tags = (post.tags as TechKey[] | undefined) ?? [];
    for (const tag of tags) {
      const current = countsByCategory[category][tag] ?? 0;
      countsByCategory[category][tag] = current + 1;
    }
  }

  for (const category of CATEGORY_LIST) {
    const tagCounts = countsByCategory[category];
    const tags = Object.keys(tagCounts).sort((a, b) =>
      a.localeCompare(b)
    ) as TechKey[];
    tagsByCategory[category] = tags;
  }

  const categoryData = CATEGORY_LIST.map((category) => ({
    category,
    tags: tagsByCategory[category],
    tagCounts: countsByCategory[category],
  }));

  return { categoryData };
}

const Profile = () => {
  const { categoryData } = getCategoryTagsWithCounts();
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const c of CATEGORY_LIST) initial[c] = false;
    if (CATEGORY_LIST.length > 0) initial[CATEGORY_LIST[0]] = true;
    return initial;
  });

  const toggle = (category: string) =>
    setOpen((prev) => ({ ...prev, [category]: !prev[category] }));

  return (
    <aside className="w-full">
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur p-4 md:p-5">
        {/* 프로필 섹션 */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-semibold overflow-hidden">
            <Image src="/rakun.png" alt="rakun" width={48} height={48} />
          </div>
          <div>
            <div className="text-base font-semibold">DongDev Blog</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              👋😎💻✨🎉
            </div>
          </div>
        </div>

        {/* 메뉴 섹션 */}
        {/* <nav className="mb-5">
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                href="/"
                className="block rounded-md px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                홈
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="block rounded-md px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                블로그
              </Link>
            </li>
            <li>
              <Link
                href="/tags"
                className="block rounded-md px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                태그
              </Link>
            </li>
          </ul>
        </nav> */}

        {/* 카테고리 아코디언 + 태그 섹션 */}
        <div>
          <div className="mb-2 text-sm font-medium">Menu</div>
          <Accordion
            type="multiple"
            className="rounded-none"
            defaultValue={CATEGORY_LIST.map((category) => `${category}-menu`)}
          >
            {categoryData
              .filter(({ tags }) => tags.length > 0)
              .map(({ category, tags, tagCounts }) => (
                <AccordionItem value={`${category}-menu`}>
                  <AccordionTrigger
                    type="button"
                    aria-expanded={true}
                    onClick={() => toggle(category)}
                    className="cursor-pointer w-full flex items-center hover:no-underline justify-between px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <span className="text-sm font-semibold capitalize">
                      {category}
                      <Badge className="h-5 min-w-5 ml-2 rounded-full px-1 font-mono tabular-nums">
                        {Object.values(tagCounts || {}).reduce(
                          (sum, n) => sum + n,
                          0
                        )}
                      </Badge>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 dark:text-gray-400 text-balance">
                    <div className="px-3 pt-3">
                      <TagList
                        tags={tags}
                        showCount
                        tagCounts={tagCounts as Record<TechKey, number>}
                        category={category}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </div>
    </aside>
  );
};

export default Profile;
