import * as React from "react";

/**
 * 경력 항목 상세를 "역할 → 문제 → 판단 → 행동 → 성과 → 이후" 순서로 보여준다.
 * 성과에는 전→후 기준선을, 역할에는 내가 직접 한 범위를 적는다.
 */
export interface CaseStudyProps {
  /** 역할 범위 (예: "프론트엔드 단독", "모듈 PL", "팀원 — 공통 컴포넌트 담당") */
  role: React.ReactNode;
  /** 무엇이 왜 문제였나 (가능하면 지표로) */
  problem: React.ReactNode;
  /** 무엇을 바꾸면 풀린다고 봤나, 다른 대안 대신 이 방법을 고른 이유 */
  decision?: React.ReactNode;
  /** 내가 직접 한 일 */
  actions: React.ReactNode[];
  /** 무엇이 얼마나 바뀌었나 (전→후) */
  result: React.ReactNode;
  /** 그 뒤에 남은 것 (프로세스·제품·팀에 정착한 것) */
  impact?: React.ReactNode;
  /** 이 경험에서 얻은 러닝 포인트 (다시 한다면 무엇을 다르게 할지) */
  learning?: React.ReactNode;
}

const Row = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="grid grid-cols-[4rem_1fr] gap-3">
    <dt className="pt-0.5 text-xs font-semibold text-violet-600 dark:text-violet-400">
      {label}
    </dt>
    <dd className="break-keep">{children}</dd>
  </div>
);

export const CaseStudy = ({
  role,
  problem,
  decision,
  actions,
  result,
  impact,
  learning,
}: CaseStudyProps) => (
  <dl className="flex flex-col gap-3 text-sm sm:text-base">
    <Row label="역할">{role}</Row>
    <Row label="문제">{problem}</Row>
    {decision && <Row label="판단">{decision}</Row>}
    <Row label="행동">
      <ul className="list-disc space-y-1 pl-4">
        {actions.map((action, idx) => (
          <li key={idx}>{action}</li>
        ))}
      </ul>
    </Row>
    <Row label="성과">{result}</Row>
    {impact && <Row label="이후">{impact}</Row>}
    {learning && <Row label="배운 점">{learning}</Row>}
  </dl>
);
