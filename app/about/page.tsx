import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import useAbout from "../data/useAbout";
import Image from "next/image";
import { TagList } from "../components/TagList";
import { TechKey } from "../utils/SkillPicker";
import { Separator } from "../components/ui/separator";
import IconTooltip from "../components/IconTooltip";

export default function AboutPage() {
  const about = useAbout();
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="flex h-24 w-24 items-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-semibold overflow-hidden">
              <Image src="/rakun.png" alt="rakun" width={96} height={96} />
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
            안녕하세요, React로 화면을 만드는 프론트엔드 개발자 동현입니다.
          </p>
          <p className="break-keep">
            누군가 같은 일을 세 번 반복하고 있으면 그걸 도구로 만드는 게
            제 일이라고 생각해요. 운영 백오피스를 처음부터 만들어 지금까지
            키워 왔고, 요즘은 AI가 그럴듯한 답 대신 검증 가능한 결과를 내게
            하는 데 관심이 많습니다.
          </p>
          <p className="break-keep">
            만들다가 배운 것들을 이 블로그에 정리하고 있어요.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>주요 기술 스택</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <TagList isClickable={false} tags={about.skills.list as TechKey[]} />
        </CardContent>
      </Card>
    </div>
  );
}
