"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import { CopyButton } from "./CopyButton";
import ThemeSelector from "./ThemeSelector";
import type { ComponentProps, ReactNode } from "react";

interface MdxProps {
  code: string;
}

type MDXComponents = {
  pre: (props: ComponentProps<"pre">) => JSX.Element;
};

export const MDXComponents: MDXComponents = {
  pre: ({ children, ...props }) => {
    return (
      <pre className="relative" {...props}>
        <CopyButton>{children}</CopyButton>
        {children}
      </pre>
    );
  },
};

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx prose prose-gray dark:prose-invert max-w-none">
      <Component components={MDXComponents} />
    </div>
  );
}
