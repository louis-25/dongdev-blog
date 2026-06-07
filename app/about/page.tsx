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

export default function AboutPage() {
  const about = useAbout();
  return (
    // Design Ref: layout의 단일 <main> 사용 — 페이지는 <div>로 (랜드마크 중복 제거)
    <div className="flex min-h-screen flex-col items-center">
      <article className="w-full max-w-4xl">
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
              }))}
              className="mt-8"
            />
          </TabsContent>
        </Tabs>
      </article>
    </div>
  );
}
