import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { format, parseISO } from "date-fns";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import type { Options } from "rehype-pretty-code";
import rehypeToc from "rehype-toc";

// rehype-toc로 생성된 TOC를 <details><summary>로 감싸 토글 가능하게 만드는 플러그인
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
            // 부모가 없으면 노드 자체를 변환
            node.tagName = wrappedNode.tagName;
            node.properties = wrappedNode.properties;
            node.children = wrappedNode.children;
          }
          return; // 현재 노드는 대체되었으므로 하위 방문 중단
        }
      }

      if (Array.isArray(node.children)) {
        // 복사본을 순회하여 안전하게 수정
        [...node.children].forEach((child) => visitNode(child, node));
      }
    };

    visitNode(tree, null);
  };
}

/** @type {import('rehype-pretty-code').Options} */
const options: Partial<Options> = {
  theme: "github-dark",
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

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    thumbnail: {
      type: "string",
      required: false,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: false,
    },
    published: {
      type: "boolean",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => {
        const url = post._raw.flattenedPath.split("/").pop();
        return `/blog/${url}`;
      },
      // resolve: (post) => `/blog/${post._raw.flattenedPath}`,
    },
    formattedDate: {
      type: "string",
      resolve: (post) => format(parseISO(post.date), "MMMM dd, yyyy"),
    },
    slugAsParams: {
      type: "string",
      // resolve: (post) => post.title,
      resolve: (post) => {
        const url = post._raw.flattenedPath.split("/").pop();
        return url; // 문서명
        // return post._raw.flattenedPath; // 폴더명 포함 슬러그
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    // remarkPlugins: [remarkGfm, remarkSugarHigh], // ← sugar-high 적용
    rehypePlugins: [
      [rehypePrettyCode, options],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
      // contentlayer에서 제공하는 rehypeToc
      [
        rehypeToc,
        {
          headings: ["h2", "h3"],
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
  },
  disableImportAliasWarning: true,
});
