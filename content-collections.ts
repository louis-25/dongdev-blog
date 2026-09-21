import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";
import { format, parseISO } from "date-fns";
import { existsSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";
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

// package.json: dev -> "content-collections watch", build -> "content-collections build"
const IS_WATCH = process.argv.includes("watch");

// URL은 파일명만 쓰므로(/blog/<파일명>) 폴더가 달라도 같은 파일명이면 두 번째 글이 조용히 접근 불가가 된다.
// onSuccess는 skip된 초안을 못 보므로 파일을 직접 훑는다 — 초안끼리/초안·발행 글 충돌도 발행 전에 잡힌다.
// 대소문자만 다른 경우(Foo/foo)도 막는다: Windows에선 정적 출력 파일이 충돌한다.
// ponytail: 설정 로드 때 1회만 검사한다. watch 도중 추가된 중복은 다음 build(CI/Vercel)에서 잡힌다.
const seenSlugs = new Map<string, string>();
for (const file of readdirSync("posts", { recursive: true, encoding: "utf8" })) {
  if (!file.endsWith(".mdx")) continue;
  const key = basename(file, ".mdx").toLowerCase();
  const prev = seenSlugs.get(key);
  if (prev) throw new Error(`중복 슬러그: posts/${prev} ↔ posts/${file}`);
  seenSlugs.set(key, file);
}

const posts = defineCollection({
  name: "posts",
  directory: "posts",
  include: "**/*.mdx",
  schema: z.object({
    // content(본문 원문)는 명시 선언한다. 암묵 추가는 deprecated.
    content: z.string(),
    title: z.string().min(1),
    // YYYY-MM-DD. 형식이 틀리면 parseISO의 필드 정보 없는 RangeError 대신 여기서 필드명과 함께 실패한다.
    date: z.iso.date(),
    // 비면 meta description이 빠지고 OG 카드가 밋밋해진다
    description: z.string().min(1),
    thumbnail: z.string().optional(),
    category: z.enum(CATEGORY_LIST as [string, ...string[]]),
    tags: z.array(z.string()).optional(),
    published: z.boolean(),
  }),
  transform: async (doc, context) => {
    // 썸네일 검사는 skip보다 먼저 — 초안도 검사해야 published를 켜는 순간에야 빌드가 깨지는 일이 없다.
    if (
      doc.thumbnail &&
      !existsSync(join(process.cwd(), "public", doc.thumbnail))
    ) {
      throw new Error(
        `썸네일 파일 없음: public/${doc.thumbnail.replace(/^\//, "")} ` +
          `(thumbnail은 /posts/images/... 형태여야 한다)`
      );
    }

    // 초안은 컬렉션에서 아예 뺀다 — 라우트마다 published 필터를 기억할 필요가 없게.
    // 단, pnpm dev(= content-collections watch)에서는 포함해 초안을 로컬에서 미리 볼 수 있게 한다.
    // published를 true로 바꿔 확인하다가 그대로 커밋해 실수로 발행되는 걸 막는 장치다.
    // build(= CI/Vercel)에서는 argv에 watch가 없으므로 프로덕션 동작은 그대로다.
    if (!doc.published && !IS_WATCH) return context.skip("draft");

    const mdx = await compileMDX(context, doc, {
      remarkPlugins: [remarkGemoji],
      // @content-collections/mdx(mdx-bundler 10 → @mdx-js/esbuild 3)는 unified@11인데
      // rehype-pretty-code 0.10은 unified@10을 쓴다. Plugin 타입 트리가 둘이라 tsc가
      // 거부하지만 런타임은 동일하게 동작한다. (rehype-pretty-code를 올리면 이 캐스팅은 제거)
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
      // 한국어 기준 분당 약 500자(코드 포함 근사치)
      readingMinutes: Math.max(1, Math.round(doc.content.length / 500)),
    };
  },
  // 스키마 검증·transform·onSuccess 예외는 CLI가 exit 1로 끝나므로 Vercel 빌드도 여기서 멈춘다.
  // 주의: transform보다 뒤에 둘 것 — 앞에 두면 TS가 docs 타입을 transform 결과가 아닌 스키마로 고정한다.
  onSuccess: (docs) => {
    // 슬러그 중복은 파일 상단의 파일 스캔이 초안까지 포함해 검사한다.
    const tagCase = new Map<string, string>();
    for (const doc of docs) {
      // React/react가 섞이면 태그 페이지가 갈라진다(Windows에선 파일 충돌) — AGENTS §4
      for (const tag of doc.tags ?? []) {
        const prev = tagCase.get(tag.toLowerCase());
        if (prev && prev !== tag) {
          throw new Error(`태그 대소문자 불일치: "${prev}" / "${tag}"`);
        }
        tagCase.set(tag.toLowerCase(), tag);
      }
    }
  },
});

export default defineConfig({ content: [posts] });
