"use client";

import { Alert, CodeBlock } from "./mdx";
import { useMDXComponent } from "@content-collections/mdx/react";

const components = {
  Alert,
  // 마크다운 이미지(![]())용. 크기를 모르는 원본이라 next/image 대신 지연 로딩만 건다.
  // (MDX 본문에 직접 쓴 <img> 태그는 이 매핑을 타지 않으므로 글에서 loading="lazy"를 직접 준다)
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img loading="lazy" decoding="async" {...props} alt={props.alt ?? ""} />
  ),
  pre: ({ children, ...props }: any) => {
    const child = children as any;
    const code = child?.props?.children;
    const language = child?.props?.className?.replace("language-", "");
    const filename = child?.props?.filename;
    if (typeof code !== "string") {
      // tabIndex: 가로로 긴 코드를 키보드(방향키)로도 스크롤할 수 있게
      return (
        <pre tabIndex={0} {...props}>
          {children}
        </pre>
      );
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
