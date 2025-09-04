import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";
import { GestureCard } from "../components/animations";
import { TagList } from "../components/TagList";
import Image from "next/image";

export default function BlogPage() {
  const posts = allPosts
    ?.filter((post) => post?.published)
    ?.sort((a, b) => compareDesc(new Date(a?.date), new Date(b?.date)));

  return (
    <div className="dark:prose-invert">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

      <div className="space-y-4">
        {posts?.map((post, idx) => (
          <GestureCard
            key={post._id}
            className="bg-card hover:bg-card/80 rounded-lg p-6 transition-colors "
          >
            <article>
              <Link
                href={post.url}
                className="flex justify-between flex-row items-center w-full"
              >
                <div>
                  <h2 className="font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {post.description}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <TagList tags={post?.tags || []} />
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
                    width={200} // 고정
                    height={0} // height를 0으로 주면 자동 비율 유지됨
                    sizes="100vw" // 반응형일 경우
                    // style={{ height: "auto" }}
                  />
                )}
              </Link>
            </article>
          </GestureCard>
        ))}
      </div>
    </div>
  );
}
