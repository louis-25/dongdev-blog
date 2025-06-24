import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { Mdx } from "@/app/components/MDXComponents";

interface PostProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
}

export default function Post({ params }: PostProps) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold mb-8 text-[#333333]">{post.title}</h1>
        <div className="flex justify-between items-center text-gray-600">
          <time dateTime={post.date}>{post.formattedDate}</time>
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm bg-gray-200 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="prose prose-gray mt-8">
          <Mdx code={post.body.code} />
        </div>
      </article>
    </div>
  );
}
