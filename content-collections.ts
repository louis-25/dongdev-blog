import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";
import { format, parseISO } from "date-fns";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import type { Options } from "rehype-pretty-code";
import rehypeToc from "rehype-toc";
import remarkGemoji from "remark-gemoji";
// 카테고리 단일 진실원: config/post.ts의 CATEGORY_LIST를 그대로 재사용
import { CATEGORY_LIST } from "./config/post";

// rehype-toc로 생성된 TOC를 <details><summary>로 감싸 토글 가능하게 만드는 플러그인
// (contentlayer.config.ts에서 무수정 이식 — 출력 구조가 동일해야 한다)
function rehypeWrapTocWithDetails() {
  return function transformer(tree: any) {
    const visitNode = (node: any, parent: any) => {
      if (!node || typeof node !== "object") return;
      if (node.type === "element") {
        const classProp = node.properties?.className;
        const classList = Array.isArray(classProp)
          ? classProp
          : typeof classProp === "string"
          ? classProp.split(/\s+/)
          : [];

        if (classList.includes("toc-content")) {
          const summaryNode = {
            type: "element",
            tagName: "summary",
            properties: { className: ["toc-summary"] },
            children: [
              {
                type: "element",
                tagName: "span",
                properties: { className: ["toc-summary-open-label"] },
                children: [{ type: "text", value: "목록 보기" }],
              },
              {
                type: "element",
                tagName: "span",
                properties: { className: ["toc-summary-close-label"] },
                children: [{ type: "text", value: "숨기기" }],
              },
            ],
          } as const;

          const mergedClassName = Array.from(
            new Set(["toc-collapsible", ...classList])
          );

          const wrappedNode = {
            type: "element",
            tagName: "details",
            properties: {
              ...(node.properties || {}),
              className: mergedClassName,
            },
            children: [
              summaryNode as any,
              {
                type: "element",
                tagName: "div",
                properties: { className: ["toc-container"] },
                children: node.children || [],
              },
            ],
          };

          if (parent && Array.isArray(parent.children)) {
            const index = parent.children.indexOf(node);
            if (index !== -1) parent.children.splice(index, 1, wrappedNode);
          } else {
            node.tagName = wrappedNode.tagName;
            node.properties = wrappedNode.properties;
            node.children = wrappedNode.children;
          }
          return;
        }
      }

      if (Array.isArray(node.children)) {
        [...node.children].forEach((child) => visitNode(child, node));
      }
    };

    visitNode(tree, null);
  };
}

const prettyCodeOptions: Partial<Options> = {
  theme: "dark-plus",
  keepBackground: true,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    if (node.properties) {
      node.properties.className = ["highlighted"];
    }
  },
  onVisitHighlightedChars(node) {
    if (node.properties) {
      node.properties.className = ["word"];
    }
  },
};

const posts = defineCollection({
  name: "posts",
  directory: "posts",
  include: "**/*.mdx",
  schema: z.object({
    // content(본문 원문)는 명시 선언한다. 암묵 추가는 deprecated.
    content: z.string(),
    title: z.string(),
    date: z.string(),
    description: z.string(),
    thumbnail: z.string().optional(),
    category: z.enum(CATEGORY_LIST as [string, ...string[]]),
    tags: z.array(z.string()).optional(),
    published: z.boolean(),
  }),
  transform: async (doc, context) => {
    const mdx = await compileMDX(context, doc, {
      remarkPlugins: [remarkGemoji],
      // @content-collections/mdx는 mdx-bundler(unified@10) 위에 올라가 있고
      // rehype-pretty-code 등 최신 플러그인은 unified@11(vfile@6)을 쓴다.
      // Plugin 타입 트리가 둘이라 tsc가 거부하지만 런타임은 동일하게 동작한다.
      // (mdx-bundler가 unified@11로 올라가면 이 캐스팅은 제거)
      rehypePlugins: [
        [rehypePrettyCode, prettyCodeOptions] as never,
        rehypeSlug,
        [rehypeAutolinkHeadings, { properties: { className: ["anchor"] } }],
        [
          rehypeToc,
          {
            headings: ["h1", "h2", "h3"],
            position: "afterbegin",
            cssClasses: {
              toc: "toc-content",
              list: "toc-list",
              listItem: "toc-item",
              link: "toc-link",
            },
          },
        ],
        rehypeWrapTocWithDetails,
      ],
    });

    // contentlayer의 `_raw.flattenedPath.split("/").pop()` 규칙을 그대로 재현.
    // URL 불변이 이 마이그레이션의 머지 게이트이므로 이 한 줄이 가장 중요하다.
    // 주의: _meta.path는 Windows에서 역슬래시를 쓴다("2022-04\PeerJS란").
    // "/"로만 split하면 폴더명이 URL에 섞이고, Linux(Vercel)에서는 통과해
    // 플랫폼마다 URL이 달라진다. 반드시 두 구분자를 모두 처리할 것.
    const slug = doc._meta.path.split(/[\\/]/).pop() as string;

    return {
      ...doc,
      mdx,
      url: `/blog/${slug}`,
      slugAsParams: slug,
      // 한국어 UI 전역 날짜 표기 (예: 2022년 4월 5일)
      formattedDate: format(parseISO(doc.date), "yyyy년 M월 d일"),
    };
  },
});

export default defineConfig({ content: [posts] });
