import { allPosts } from "content-collections";
import { compareDesc } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { CATEGORY_LIST } from "@/config/post";
import { notFound } from "next/navigation";
import { TagList } from "@/app/components/TagList";
import { TechKey } from "@/app/utils/SkillPicker";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/ui/pagination";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  return {
    title: category,
    description: `${category} 카테고리의 글 모음입니다.`,
    alternates: { canonical: `/category/${category}` },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await params;
  const sp = await searchParams;

  if (!CATEGORY_LIST.includes(category)) {
    notFound();
  }

  const selectedTagRaw = Array.isArray(sp?.tag) ? sp?.tag?.[0] : sp?.tag;
  const selectedTag = (selectedTagRaw as TechKey | undefined) ?? undefined;

  const posts = allPosts
    ?.filter((post) => post?.published)
    ?.filter((post) => (post?.category as string) === category)
    ?.filter((post) =>
      selectedTag
        ? (post?.tags as TechKey[] | undefined)?.includes(selectedTag)
        : true
    )
    ?.sort((a, b) => compareDesc(new Date(a?.date), new Date(b?.date)));

  const postsPerPage = 5;
  const totalPosts = posts?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));
  const rawPage = Array.isArray(sp?.page) ? sp?.page?.[0] : sp?.page;
  const parsed = Number(rawPage ?? "1");
  const currentPage = Number.isFinite(parsed)
    ? Math.min(Math.max(parsed, 1), totalPages)
    : 1;
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const paginatedPosts = posts?.slice(start, end) ?? [];

  const buildHref = (pageNum: number) => {
    const base = `/category/${category}?page=${pageNum}`;
    return selectedTag
      ? `${base}&tag=${encodeURIComponent(selectedTag)}`
      : base;
  };

  return (
    <div className="dark:prose-invert">
      <h1 className="text-3xl font-bold mb-2 capitalize">{category}</h1>
      {selectedTag && (
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          태그 필터: <span className="font-medium">#{selectedTag}</span>
        </p>
      )}

      <div className="space-y-4 transition-colors ">
        {paginatedPosts?.map((post) => (
          <div
            key={post.url}
            className="bg-card hover:bg-card/80 rounded-lg p-6 transition-colors "
          >
            <article>
              <Link
                href={post.url}
                className="flex flex-col md:flex-row items-start md:items-center w-full gap-4 md:gap-10"
              >
                <div>
                  <h2 className="font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {post.description}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <TagList
                      tags={post?.tags as TechKey[]}
                      category={category}
                    />
                  </div>
                  <time className="text-sm text-gray-500">
                    {post.formattedDate}
                  </time>
                </div>
                {post?.thumbnail && (
                  <Image
                    src={post?.thumbnail}
                    alt={post?.title}
                    width={200}
                    height={200}
                    sizes="(max-width: 768px) 100vw, 200px"
                    className="rounded-xl shadow-lg w-full h-auto md:w-[200px] md:h-auto md:ml-auto"
                  />
                )}
              </Link>
            </article>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={buildHref(currentPage - 1)} />
                </PaginationItem>
              )}

              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href={buildHref(pageNum)}
                      aria-label={`Go to page ${pageNum}`}
                      isActive={pageNum === currentPage}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext href={buildHref(currentPage + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
