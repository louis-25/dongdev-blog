import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";
import { TagList } from "../components/TagList";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/ui/pagination";
import { TechKey } from "@/app/utils/SkillPicker";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const posts = allPosts
    ?.filter((post) => post?.published)
    ?.sort((a, b) => compareDesc(new Date(a?.date), new Date(b?.date)));

  const sp = await searchParams;
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

  return (
    <div className="dark:prose-invert">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

      <div className="space-y-4 transition-colors ">
        {paginatedPosts?.map((post, idx) => (
          <div
            key={post._id}
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
                    <TagList tags={post?.tags as TechKey[]} />
                    {/* {post.tags?.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 no-underline"
                  >
                    #{tag}
                  </Link>
                ))} */}
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
                  <PaginationPrevious href={`/blog?page=${currentPage - 1}`} />
                </PaginationItem>
              )}

              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href={`/blog?page=${pageNum}`}
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
                  <PaginationNext href={`/blog?page=${currentPage + 1}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
