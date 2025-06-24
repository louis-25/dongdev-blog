import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { MDXComponents } from "@/app/components/MDXComponents";
import { ScrollReveal } from "@/app/components/animations/ScrollReveal";
import { TagList } from "@/app/components/TagList";

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

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="prose dark:prose-invert">
      <ScrollReveal>
        <h1 className="mb-2">{post.title}</h1>
        <div className="flex flex-col gap-4 mb-8">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(post.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          {post.tags && post.tags.length > 0 && <TagList tags={post.tags} />}
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <MDXContent components={MDXComponents} />
      </ScrollReveal>
    </article>
  );
}
