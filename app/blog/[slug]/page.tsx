import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { MDXContent } from "../../components/MDXComponents";
import { TagList } from "../../components/TagList";
import { Metadata } from "next";

interface PostProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = allPosts.find((post) => post.slugAsParams === params.slug);

  if (!post) {
    return {};
  }

  const ogUrl = new URL("/api/og", "https://dongdev-blog.vercel.app");
  ogUrl.searchParams.set("title", post.title);
  ogUrl.searchParams.set("description", post.description);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://dongdev-blog.vercel.app/blog/${params.slug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slugAsParams,
  }));
}

export default function PostPage({ params }: PostProps) {
  const post = allPosts.find((post) => post.slugAsParams === params.slug);

  if (!post) {
    notFound();
  }

  return (
    // <article className="py-8 mx-auto max-w-4xl px-4">
    <article className="w-xl m-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-muted-foreground mb-4">{post.description}</div>
        <div className="flex items-center justify-between">
          <TagList tags={post.tags || []} />
          <time className="text-muted-foreground" dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </div>
      <MDXContent code={post.body.code} />
    </article>
  );
}
