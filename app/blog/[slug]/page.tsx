import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { Mdx } from "@/app/components/MDXComponents";
import { ScrollReveal } from "@/app/components/animations/ScrollReveal";

interface PostProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
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
    <article className="prose dark:prose-invert">
      <ScrollReveal>
        <h1 className="mb-2">{post.title}</h1>
        <div className="flex gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm text-blue-500 dark:text-blue-400"
            >
              #{tag}
            </span>
          ))}
        </div>
        <time className="text-gray-500">{post.formattedDate}</time>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Mdx code={post.body.code} />
      </ScrollReveal>
    </article>
  );
}
