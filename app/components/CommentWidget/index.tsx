"use client";
import React, { FunctionComponent, useEffect, useRef } from "react";
import styled from "@emotion/styled";

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

const UtterancesWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const CommentWidget: FunctionComponent = function () {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (element.current === null) return;
    // 이미 주입된 경우 중복 주입 방지
    if (element.current.childNodes.length > 0) return;

    const utterances: HTMLScriptElement = document.createElement("script");

    const attributes: UtterancesAttributesType = {
      src,
      repo,
      "issue-term": "pathname",
      label: "Comment",
      theme: `github-light`,
      crossorigin: "anonymous",
      async: "true",
    };

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    element.current.appendChild(utterances);
  }, []);

  return <div ref={element} />;
};

export default CommentWidget;
