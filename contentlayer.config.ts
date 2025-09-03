import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { format, parseISO } from "date-fns";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import type { Options } from "rehype-pretty-code";
import rehypeHighlight from "rehype-highlight";
import rehypeToc from "rehype-toc";
import rehypeAccessibleEmojis from "rehype-accessible-emojis";
import remarkGfm from "remark-gfm";
import { highlight as remarkSugarHigh } from "remark-sugar-high"; // ← 핵심

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
      // [
      //   rehypeToc,
      //   {
      //     headings: ["h2", "h3"],
      //     position: "afterbegin",
      //     cssClasses: {
      //       toc: "toc-content",
      //       link: "toc-link",
      //     },
      //   },
      // ],
    ],
  },
  disableImportAliasWarning: true,
});
