"use client";

import { useRef } from "react";
import { Alert } from "./mdx";
import { CopyButton } from "./CopyButton";
import { useMDXComponent } from "@content-collections/mdx/react";

// rehype-pretty-code가 하이라이트한 <pre>를 그대로 두고 복사 버튼만 겹친다.
// (<code> 자식이 줄별 span 트리라 문자열로 다시 그리면 하이라이트가 사라진다)
function Pre(props: React.HTMLAttributes<HTMLPreElement>) {
  const ref = useRef<HTMLPreElement>(null);
  return (
    // pre는 overflow-x-auto라 버튼을 안에 두면 가로 스크롤과 함께 밀려난다 → 바깥 래퍼에 고정
    <div className="relative">
      {/* tabIndex: 가로로 긴 코드를 키보드(방향키)로도 스크롤할 수 있게 */}
      <pre ref={ref} tabIndex={0} {...props} />
      <CopyButton
        // 빈 줄은 onVisitLine이 공백 1칸으로 채우므로 되돌린다
        getValue={() => (ref.current?.textContent ?? "").replace(/^ $/gm, "")}
      />
    </div>
  );
}

const components = {
  Alert,
  // 마크다운 이미지(![]())용. 크기를 모르는 원본이라 next/image 대신 지연 로딩만 건다.
  // (MDX 본문에 직접 쓴 <img> 태그는 이 매핑을 타지 않으므로 글에서 loading="lazy"를 직접 준다)
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img loading="lazy" decoding="async" {...props} alt={props.alt ?? ""} />
  ),
  pre: Pre,
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
