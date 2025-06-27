import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TagList } from "./TagList";

interface SearchResult {
  title: string;
  description: string;
  url: string;
  tags?: string[];
  score: number;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const search = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const searchTerms = searchQuery.toLowerCase().split(" ");

    const searchResults = allPosts
      .map((post) => {
        const titleMatch = searchTerms.every((term) =>
          post.title.toLowerCase().includes(term)
        );
        const descriptionMatch = searchTerms.every((term) =>
          post.description.toLowerCase().includes(term)
        );
        const tagMatch = post.tags?.some((tag) =>
          searchTerms.some((term) => tag.toLowerCase().includes(term))
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

    setResults(searchResults);
  }, []);

  useEffect(() => {
    search(query);
  }, [query, search]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && results.length > 0) {
      router.push(results[0].url);
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search posts..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <Link
                  key={result.url}
                  href={result.url}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="block p-4 hover:bg-muted transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-1">{result.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    {result.description}
                  </p>
                  {result.tags && <TagList tags={result.tags} />}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
