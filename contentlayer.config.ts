import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { format, parseISO } from "date-fns";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeToc from "rehype-toc";
import type { Options } from "rehype-pretty-code";

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
      resolve: (post) => `/blog/${post._raw.flattenedPath}`,
    },
    formattedDate: {
      type: "string",
      resolve: (post) => format(parseISO(post.date), "MMMM dd, yyyy"),
    },
    slugAsParams: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath,
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      [rehypePrettyCode, options],
      rehypeSlug,
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
