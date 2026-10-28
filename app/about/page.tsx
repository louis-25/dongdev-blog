"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Timeline } from "../components/Timeline";
import useAbout from "../data/useAbout";
import Image from "next/image";
import { TagList } from "../components/TagList";
import { TechKey } from "../utils/SkillPicker";
import { Separator } from "../components/ui/separator";
import IconTooltip from "../components/IconTooltip";
import { CaseStudy } from "../components/CaseStudy";

export default function AboutPage() {
  const about = useAbout();
  return (
    // Design Ref: layout의 단일 <main> 사용 — 페이지는 <div>로 (랜드마크 중복 제거)
    <div className="flex min-h-screen flex-col items-center">
      <article className="w-full max-w-4xl">
        {/* 탭 UI라 눈에 보이는 제목은 없지만 페이지 주제를 스크린리더·검색엔진에 알린다 */}
        <h1 className="sr-only">소개</h1>
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="about">About Me</TabsTrigger>
            <TabsTrigger value="career">Career</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-center items-center gap-4 mb-4">
                    <div className="flex h-24 w-24 items-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-semibold overflow-hidden">
                      <Image
                        src="/rakun.png"
                        alt="rakun"
                        width={96}
                        height={96}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-base font-semibold">Contact</div>
                      <Separator />
                      <div className="flex h-5 items-center space-x-4 text-sm">
                        <IconTooltip
                          icon="email"
                          width={24}
                          height={24}
                          href="mailto:2848048ehgu@gmail.com"
                          isShowTooltip={false}
                        />
                        <Separator orientation="vertical" />
                        <IconTooltip
                          icon="github"
                          width={24}
                          height={24}
                          href="https://github.com/louis-25"
                          isShowTooltip={false}
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-base">
                  <p className="break-keep">
                    5년차 React 프론트엔드 개발자입니다. 복잡한 요구사항을
                    단순한 구조로 바꾸고, 반복되는 문제를 도구로 없애는 일을
                    해왔습니다.
                  </p>
                  <ul className="list-disc space-y-1 pl-5 break-keep">
                    <li>
                      <b>추상화</b> — 운영자별 접근 범위가 다른 백오피스 Lumos를
                      기획부터 맡아, 권한을 메뉴·API 양쪽에서 거르는 구조로
                      설계했습니다. 이후 2년간 메일·패치 일정 기능이 그 위에
                      얹혔습니다.
                    </li>
                    <li>
                      <b>문제 정의</b> — 번역 한 줄에도 개발자 배포가 필요하던
                      구조를 직접 문제로 잡고, Google Sheets를 원본으로 바꿔
                      개발자를 반영 경로에서 뺐습니다.
                    </li>
                    <li>
                      <b>렌더링 성능</b> — 이 블로그에서 클라이언트 번들 경계를
                      다시 그어 글 본문을 번들에서 빼고, 글당 컴파일 코드를
                      32KB → 8.9KB로 줄였습니다.
                    </li>
                    <li>
                      <b>레거시 전환</b> — Angular → React, 클래스형 React →
                      React 18 + TypeScript + Vite 전환을 진행했습니다.
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Side Project · dongdev-blog</CardTitle>
                  <CardDescription>
                    이 블로그의 Next 16 이관과 번들·렌더링 최적화
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CaseStudy
                    role="개인 프로젝트 — 설계·구현·운영 단독 (Claude Code와 페어 프로그래밍)"
                    problem="콘텐츠 툴 Contentlayer는 2023-06 이후 유지보수가 끊겼고, Next는 14.1.3으로 두 메이저 뒤처져 있었습니다. Contentlayer는 글마다 React JSX 런타임을 통째로 인라인해, 본문 1,147B 글이 32,053B 코드(28배)가 됐습니다. 검색·사이드바를 위해 전체 글 본문이 클라이언트 번들에 실리고 있었습니다."
                    decision="처음 계획은 Next 업그레이드와 콘텐츠 툴 교체를 두 단계로 나누는 것이었습니다. 그런데 스파이크에서 인라인 런타임이 React 19와 충돌해 프리렌더가 깨지는 것을 확인하고, 분리가 불가능하다고 판단해 통합 이관으로 바꿨습니다. 번들 쪽은 '클라이언트에는 검색에 필요한 필드만 보낸다'는 경계를 먼저 정했습니다."
                    actions={[
                      "Next 14.1.3 → 16.3.5, React 18.2 → 19.3, Contentlayer → content-collections 이관",
                      "서버 전용 모듈에서 경량 검색 인덱스를 만들고 사이드바를 서버 컴포넌트로 전환해 글 본문을 클라이언트에서 제거",
                      "검색에 useDeferredValue + 소문자 인덱스 캐싱 적용, 파티클 배너는 dynamic import로 초기 번들에서 분리",
                      "framer-motion의 initial이 SSR HTML에 opacity:0으로 박혀 하이드레이션 전까지 본문이 안 보이던 문제를 CSS 애니메이션으로 교체",
                    ]}
                    result="같은 글 기준 컴파일 코드 32,053B → 8,884B (약 3.6배 감소), 클라이언트 번들에서 글 본문 제거, 홈 First Load JS 100kB"
                    impact="sitemap 35개 URL, RSS 17건, 대표 글 3편의 DOM 구조를 이관 전후로 대조해 사용자가 볼 수 있는 변화 0을 확인했습니다. typecheck·lint CI 게이트를 붙였습니다."
                    learning="[예) 단계를 나누는 계획이 스파이크 한 번으로 뒤집혔던 경험에서 배운 것]"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>주요 기술 스택</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <TagList
                    isClickable={false}
                    tags={about.skills.list as TechKey[]}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="career">
            <Image
              src="/about/career/FasooLogo.svg"
              width={150}
              height={200}
              alt="career"
            />
            <div className="text-sm text-muted-foreground mt-2">
              2021.07 ~ 재직중
            </div>
            <Timeline
              items={about.career.details.map((c) => ({
                date: c.date,
                title: c.title,
                description: c.description,
                icon: "milestone",
                details: c.details,
                skills: c.skills,
                featured: c.featured,
              }))}
              className="mt-8"
            />
          </TabsContent>
        </Tabs>
      </article>
    </div>
  );
}
