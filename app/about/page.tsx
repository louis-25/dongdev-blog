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
import { Timeline } from "../components/ui/timeline";

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

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <article className="w-full max-w-4xl">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="about">About Me</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="career">Career</TabsTrigger>
            <TabsTrigger value="projects">Project</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
                <CardDescription>간단한 소개</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-base">
                <p>
                  안녕하세요! 저는 웹 개발자입니다. Next.js, React, TypeScript를
                  주로 사용하여 웹 애플리케이션을 개발하고 있습니다.
                </p>
                <p>
                  사용자 경험과 성능 최적화, 클린 코드에 관심이 많으며, 새로운
                  기술을 배우고 적용하는 것을 즐깁니다.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>주요 기술 스택</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "PostgreSQL",
                  "Docker",
                ].map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="career">
            <Card>
              <CardHeader>
                <CardTitle>Career</CardTitle>
                <CardDescription>연도별 이력 그래프</CardDescription>
              </CardHeader>
              <CardContent>
                <CareerBarGraph data={career} />
              </CardContent>
            </Card>
            <Timeline
              items={career.map((c) => ({
                date: c.year.toString(),
                title: c.title,
                description: c.value.toString(),
                icon: "milestone",
                details: c.value.toString(),
              }))}
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
