"use client";

import { Alert, CodeBlock } from "./mdx";
import { useMDXComponent } from "next-contentlayer/hooks";
import { highlight } from "sugar-high";

const components = {
  Alert,
  pre: ({ children, ...props }: any) => {
    const child = children as any;
    const code = child?.props?.children;
    const language = child?.props?.className?.replace("language-", "");
    const filename = child?.props?.filename;
    if (typeof code !== "string") {
      return <pre {...props}>{children}</pre>;
    }

    return (
      <CodeBlock language={language} filename={filename}>
        {code}
      </CodeBlock>
    );
  },
};

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return (
    <div className="mdx mdx-gray dark:mdx-invert max-w-none">
      <Component components={components} />
    </div>
  );
}
