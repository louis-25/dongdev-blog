import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { format, parseISO } from "date-fns";
import rehypePrettyCode from "rehype-pretty-code";

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

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
  },
  disableImportAliasWarning: true,
});
