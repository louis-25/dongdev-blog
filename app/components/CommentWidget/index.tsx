"use client";
import React, { FunctionComponent, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const src = "https://utteranc.es/client.js";
const repo = "louis-25/louis-25.github.io"; // 자신 계정의 레포지토리로 설정

type UtterancesAttributesType = {
  src: string;
  repo: string;
  "issue-term": string;
  label: string;
  theme: string;
  crossorigin: string;
  async: string;
};

const CommentWidget: FunctionComponent = function () {
  const element = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "github-dark" : "github-light";

  useEffect(() => {
    // resolvedTheme은 마운트 전엔 undefined — 테마가 정해진 뒤 한 번만 주입한다
    if (element.current === null || resolvedTheme === undefined) return;

    // 이미 주입된 경우: 다시 주입하지 않고 iframe에 테마 변경만 알린다
    const frame =
      element.current.querySelector<HTMLIFrameElement>(".utterances-frame");
    if (frame) {
      frame.contentWindow?.postMessage(
        { type: "set-theme", theme },
        "https://utteranc.es"
      );
      return;
    }
    if (element.current.childNodes.length > 0) return;

    const utterances: HTMLScriptElement = document.createElement("script");

    const attributes: UtterancesAttributesType = {
      src,
      repo,
      "issue-term": "pathname",
      label: "Comment",
      theme,
      crossorigin: "anonymous",
      async: "true",
    };

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    element.current.appendChild(utterances);
  }, [resolvedTheme, theme]);

  return <div ref={element} />;
};

export default CommentWidget;
