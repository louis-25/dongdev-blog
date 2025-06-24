// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { format, parseISO } from "date-fns";
import rehypePrettyCode from "rehype-pretty-code";
var options = {
  theme: "github-dark",
  keepBackground: true
};
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    date: {
      type: "date",
      required: true
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true
    },
    published: {
      type: "boolean",
      required: true
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/blog/${post._raw.flattenedPath}`
    },
    formattedDate: {
      type: "string",
      resolve: (post) => format(parseISO(post.date), "yyyy\uB144 MM\uC6D4 dd\uC77C")
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [[rehypePrettyCode, options]]
  },
  disableImportAliasWarning: true
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-5WMMRPZ7.mjs.map
