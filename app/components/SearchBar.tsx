"use client";

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TagList } from "./TagList";
import { TechKey } from "../utils/SkillPicker";
import type { PostSearchItem } from "../lib/posts";

interface SearchResult {
  title: string;
  description: string;
  url: string;
  tags?: string[];
  score: number;
}

interface SearchBarProps {
  posts: PostSearchItem[];
}

export function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // 입력 응답성을 위해 비긴급 업데이트로 처리
  const deferredQuery = useDeferredValue(query);

  // 경량 인덱스를 한 번만 소문자로 전처리해 키 입력마다 재계산하지 않는다.
  const index = useMemo(
    () =>
      posts.map((post) => ({
        post,
        title: post.title.toLowerCase(),
        description: post.description.toLowerCase(),
        tags: (post.tags ?? []).map((t) => t.toLowerCase()),
      })),
    [posts]
  );

  // 결과는 effect+setState 대신 렌더 중에 파생한다.
  const results = useMemo<SearchResult[]>(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (!q) return [];
    const terms = q.split(" ").filter(Boolean);

    return index
      .map(({ post, title, description, tags }) => {
        const titleMatch = terms.every((term) => title.includes(term));
        const descriptionMatch = terms.every((term) =>
          description.includes(term)
        );
        const tagMatch = tags.some((tag) =>
          terms.some((term) => tag.includes(term))
        );

        let score = 0;
        if (titleMatch) score += 3;
        if (descriptionMatch) score += 2;
        if (tagMatch) score += 1;

        return {
          title: post.title,
          description: post.description,
          url: post.url,
          tags: post.tags,
          score,
        };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [deferredQuery, index]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      return;
    }
    if (e.key === "Enter" && results.length > 0) {
      router.push(results[0].url);
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl items-center">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          aria-label="글 검색"
          placeholder="Search posts..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border focus:outline-hidden focus:ring-2 focus:ring-primary"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg shadow-lg z-[9999] border"
          >
            <div className="max-h-96 overflow-y-auto z-[9999]">
              {results.length === 0 ? (
                <div className="p-4 text-sm text-muted-foreground">
                  검색 결과가 없습니다
                </div>
              ) : (
                results.map((result) => (
                  <Link
                    key={result.url}
                    href={result.url}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                    className="block p-4 hover:bg-muted transition-colors"
                  >
                    <h3 className="text-lg font-semibold mb-1">
                      {result.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      {result.description}
                    </p>
                    {result.tags && (
                      // 결과 행 전체가 <Link>라 태그는 링크가 아닌 표시용으로 둔다(<a> 중첩 방지)
                      <TagList
                        tags={result?.tags as TechKey[]}
                        isClickable={false}
                      />
                    )}
                  </Link>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
