// Design Ref: §5.4, §Decision Record — 축약 페이지네이션. q/tag/category/sort 쿼리 보존
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/ui/pagination";
import { buildBlogHref, type BlogSort } from "./query";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  q?: string;
  tag?: string;
  category?: string;
  sort?: BlogSort;
}

// 1 … (current-1) current (current+1) … N 형태로 축약
function getPageItems(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: (number | "ellipsis")[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) items.push("ellipsis");
  for (let p = left; p <= right; p++) items.push(p);
  if (right < total - 1) items.push("ellipsis");
  items.push(total);
  return items;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  q,
  tag,
  category,
  sort,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const hrefFor = (page: number) =>
    buildBlogHref({ q, tag, category, sort, page });
  const items = getPageItems(currentPage, totalPages);

  return (
    <div className="mt-8">
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={hrefFor(currentPage - 1)} />
            </PaginationItem>
          )}

          {items.map((item, idx) =>
            item === "ellipsis" ? (
              <PaginationItem key={`e-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink
                  href={hrefFor(item)}
                  aria-label={`${item}페이지로 이동`}
                  isActive={item === currentPage}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext href={hrefFor(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
