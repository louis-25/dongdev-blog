"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import CopyButton from "./CopyButton";
import ThemeSelector from "./ThemeSelector";

interface MdxProps {
  code: string;
}

const components = {
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    const codeString = children?.toString() || "";
    return (
      <div className="group relative">
        <ThemeSelector />
        <pre {...props}>{children}</pre>
        <CopyButton code={codeString} />
      </div>
    );
  },
};

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx prose prose-gray dark:prose-invert max-w-none">
      <Component components={components} />
    </div>
  );
}
