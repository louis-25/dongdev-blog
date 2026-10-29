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
                    5년차 React 프론트엔드 개발자입니다. &quot;이 화면을 쓰는
                    사람이 어디서 막히는가&quot;에서 출발해, 반복되는 불편을
                    구조와 도구로 없애는 일을 해왔습니다.
                  </p>
                  <ul className="list-disc space-y-1 pl-5 break-keep">
                    <li>
                      <b>운영자가 쓰는 도구</b> — 담당자마다 볼 수 있는 범위가
                      다른 백오피스 Lumos를 기획부터 맡았습니다. 권한을 메뉴와
                      API 양쪽에서 막고 통신·인증·표 동작을 공통 계층으로 빼
                      둔 덕에, 이후 메일·패치 일정·테스트 자동화 기능이 같은
                      구조 위에 계속 얹혔습니다.
                    </li>
                    <li>
                      <b>개발자 없이도 돌아가게</b> — 번역 문구 하나 고치려면
                      개발자를 불러야 했던 구조를 Google Sheets로 옮겨 관리자가
                      직접 고치게 했고, 테스트 자동화도 기획·운영 담당자가
                      자연어로 시나리오를 만들 수 있게 했습니다.
                    </li>
                    <li>
                      <b>고객이 헤매지 않게</b> — 클라우드포탈 결제에서 &quot;누른
                      순간의 값&quot;을 다시 확인하고, 확인이 안 되면 결제창을
                      열지 않도록 막았습니다.
                    </li>
                    <li>
                      <b>레거시를 멈추지 않고 바꾸기</b> — Angular → React,
                      클래스형 React → React 18 + TypeScript + Vite 전환을
                      기능을 유지한 채 진행했습니다.
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
                    problem="글을 쓰는 데 쓰던 도구(Contentlayer)는 관리가 끊겼고 Next도 두 버전 뒤처져 있었습니다. 더 큰 문제는 방문자가 글 하나를 열어도 검색용으로 모든 글의 본문을 같이 내려받고 있었고, 짧은 글조차 React 런타임 코드를 통째로 끌고 다녔다는 점입니다."
                    decision="처음엔 Next 업그레이드와 도구 교체를 나눠서 하려 했지만, 미리 시험해 보니 옛 도구가 React 19에서 페이지 생성을 깨뜨려 나눌 수 없다는 걸 알고 한 번에 옮기기로 바꿨습니다. 번들은 '브라우저에는 검색에 필요한 제목·태그 같은 필드만 보낸다'는 기준부터 정했습니다."
                    actions={[
                      "Next 14.1.3 → 16.3.5, React 18.2 → 19.3, Contentlayer → content-collections 이관",
                      "서버 전용 모듈에서 경량 검색 인덱스를 만들고 사이드바를 서버 컴포넌트로 전환해 글 본문을 클라이언트에서 제거",
                      "검색에 useDeferredValue + 소문자 인덱스 캐싱 적용, 파티클 배너는 dynamic import로 초기 번들에서 분리",
                      "framer-motion의 initial이 SSR HTML에 opacity:0으로 박혀 하이드레이션 전까지 본문이 안 보이던 문제를 CSS 애니메이션으로 교체",
                    ]}
                    result="방문자는 이제 읽는 글만 내려받고, 같은 글을 그리는 코드는 약 4분의 1로 줄었습니다."
                    impact="큰 이관이라 '방문자 눈에는 아무것도 바뀌지 않아야 한다'를 기준으로, 사이트맵·RSS·대표 글 화면 구조를 이관 전후로 대조해 확인했습니다. 이후 실수를 막도록 typecheck·lint CI를 붙였습니다."
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
