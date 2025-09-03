import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";
import { GestureCard } from "../components/animations";
import { TagList } from "../components/TagList";

export default function BlogPage() {
  const posts = allPosts
    ?.filter((post) => post?.published)
    ?.sort((a, b) => compareDesc(new Date(a?.date), new Date(b?.date)));

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="space-y-6">
        {posts?.map((post) => (
          <GestureCard
            key={post?._id}
            className="bg-card hover:bg-card/80 rounded-lg p-6 transition-colors"
          >
            <Link href={post?.url}>
              <article>
                <h2 className="text-2xl font-semibold mb-2">{post?.title}</h2>
                <div className="text-muted-foreground mb-4">
                  {post?.description}
                </div>
                <TagList tags={post?.tags || []} />
              </article>
            </Link>
          </GestureCard>
        ))}
      </div>
    </div>
  );
}
