import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { format, parseISO } from "date-fns";
import rehypePrettyCode from "rehype-pretty-code";
import { type Options } from "rehype-pretty-code";
import { type Node } from "unist";

interface NodeWithChildren extends Node {
  children: Array<{ type: string; value: string }>;
  properties?: {
    className: string[];
  };
}

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
      required: true,
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
      resolve: (post) => format(parseISO(post.date), "yyyy년 MM월 dd일"),
    },
  },
}));

/** @type {import('rehype-pretty-code').Options} */
const options: Options = {
  theme: "github-dark",
  keepBackground: true,
  onVisitLine(node: NodeWithChildren) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node: NodeWithChildren) {
    if (node.properties) {
      node.properties.className = ["highlighted"];
    }
  },
  onVisitHighlightedWord(node: NodeWithChildren) {
    if (node.properties) {
      node.properties.className = ["word"];
    }
  },
};

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
        },
      ],
    ],
  },
  disableImportAliasWarning: true,
});
