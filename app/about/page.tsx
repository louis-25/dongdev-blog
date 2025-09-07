"use client";
import { useMemo, useState } from "react";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Timeline } from "../components/Timeline";
import useAbout from "../data/useAbout";
import Image from "next/image";
import { TagList } from "../components/TagList";
import { TechKey } from "../utils/SkillPicker";
import { Separator } from "../components/ui/separator";
import IconTooltip from "../components/IconTooltip";

type CareerPoint = { year: number; title: string; value: number };
type Project = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  detail: string;
};

const career: CareerPoint[] = [
  { year: 2019, title: "Intern", value: 1 },
  { year: 2020, title: "Frontend Jr.", value: 2 },
  { year: 2021, title: "Frontend", value: 3 },
  { year: 2022, title: "Senior", value: 4 },
  { year: 2023, title: "Lead", value: 5 },
  { year: 2024, title: "Staff", value: 6 },
];

const projects: Project[] = [
  {
    id: "p1",
    title: "블로그 플랫폼 고도화",
    summary: "콘텐츠 렌더링 최적화 및 검색 기능 강화",
    tags: ["Next.js", "Contentlayer", "SEO"],
    detail:
      "정적/동적 하이브리드 페이지 구성, MDX 렌더링 최적화, 색인 친화적 라우팅을 적용했습니다.",
  },
  {
    id: "p2",
    title: "디자인 시스템 구축",
    summary: "shadcn/ui 기반의 재사용 컴포넌트 라이브러리",
    tags: ["shadcn/ui", "Radix", "Tailwind"],
    detail:
      "버튼, 카드, 탭, 다이얼로그 등 핵심 컴포넌트를 표준화하고 접근성을 강화했습니다.",
  },
  {
    id: "p3",
    title: "대시보드 성능 개선",
    summary: "그래프, 테이블 렌더링 성능 최적화",
    tags: ["React", "Memoization", "DX"],
    detail:
      "메모화, 가상 스크롤, 지연 로딩을 통해 사용자 체감 성능을 크게 개선했습니다.",
  },
];

function CareerBarGraph({ data }: { data: CareerPoint[] }) {
  const max = useMemo(() => Math.max(...data.map((d) => d.value)), [data]);

  return (
    <div className="space-y-3">
      {data.map((d) => {
        const width = `${(d.value / max) * 100}%`;
        return (
          <div key={d.year} className="flex items-center gap-3">
            <div className="w-14 shrink-0 text-sm tabular-nums text-muted-foreground">
              {d.year}
            </div>
            <div className="flex-1">
              <div className="h-3 w-full rounded bg-muted">
                <div
                  className="h-3 rounded bg-primary"
                  style={{ width }}
                  aria-label={`${d.year} ${d.title}`}
                />
              </div>
            </div>
            <div className="w-24 shrink-0 text-right text-xs text-foreground">
              {d.title}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AboutPage() {
  const [active, setActive] = useState<string | null>(null);
  const selected = projects.find((p) => p.id === active) ?? null;
  const about = useAbout();
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <article className="w-full max-w-4xl">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="about">About Me</TabsTrigger>
            {/* <TabsTrigger value="skills">Skills</TabsTrigger> */}
            <TabsTrigger value="career">Career</TabsTrigger>
            {/* <TabsTrigger value="projects">Project</TabsTrigger> */}
          </TabsList>

          <TabsContent value="about">
            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader>
                  {/* <CardTitle>About Me</CardTitle> */}
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
                  <p>
                    안녕하세요! 저는 웹 개발자입니다. Next.js, React,
                    TypeScript를 주로 사용하여 웹 애플리케이션을 개발하고
                    있습니다.
                  </p>
                  <p>
                    사용자 경험과 AI기술에 관심이 많으며, 새로운 기술을 배우고
                    적용하는 것을 좋아합니다.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>주요 기술 스택</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {/* {about.skills.list.map((t) => ( */}
                  <TagList
                    isClickable={false}
                    tags={about.skills.list as TechKey[]}
                  />

                  {/* ))} */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* <TabsContent value="skills">
            
          </TabsContent> */}

          <TabsContent value="career">
            {/* <Card>
              <CardHeader>
                <CardTitle>Career</CardTitle>
                <CardDescription>연도별 이력 그래프</CardDescription>
              </CardHeader>
              <CardContent>
                <CareerBarGraph data={career} />
              </CardContent>
            </Card> */}
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
              }))}
              className="mt-8"
            />
          </TabsContent>

          <TabsContent value="projects">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {projects.map((p) => (
                <Card key={p.id}>
                  <CardHeader>
                    <CardTitle className="text-xl">{p.title}</CardTitle>
                    <CardDescription>{p.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setActive(p.id)}
                          size="sm"
                          variant="outline"
                        >
                          자세히 보기
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {selected?.title ?? p.title}
                          </DialogTitle>
                          <DialogDescription>
                            {(selected?.summary ?? p.summary) +
                              " • " +
                              (selected?.tags.join(", ") ?? p.tags.join(", "))}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="text-sm leading-6">
                          {selected?.detail ?? p.detail}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </article>
    </main>
  );
}
