import { CaseStudy } from "@/app/components/CaseStudy";
import IconTooltip from "@/app/components/IconTooltip";
import { TimelineItemProps } from "@/app/components/Timeline";
import { Separator } from "@/ui/separator";
import Image from "next/image";

// [N], [...] 표시는 실제 수치·사실로 채워야 하는 자리 (기밀이면 증감률·배수·기간 같은 상대값으로)
const Fasoo2021 = (): TimelineItemProps[] => [
  {
    date: "2021.11 ~ 2021.12",
    title: "Fireside 랜딩페이지 개발",
    description: "PC·태블릿·모바일 반응형 랜딩페이지를 [N]주 만에 출시",
    icon: "milestone",
    skills: ["react", "javascript"],
    details: (
      <div className="flex flex-col gap-4">
        <Image
          src="/about/career/FiresideLogo.png"
          alt="Fireside"
          className="mb-4"
          priority
          width={150}
          height={150}
        />
        <ul className="list-disc space-y-1 pl-4 text-sm sm:text-base">
          <li>프론트엔드 담당, 백엔드 API 연동</li>
          <li>Figma로 디자이너와 협업, PC·Tablet·Mobile 반응형 적용</li>
        </ul>
        <Separator />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>참고</div>
          <Separator orientation="vertical" />
          <IconTooltip
            icon="website"
            width={24}
            height={24}
            href="https://fireside.fasoo.com/ko"
            isShowTooltip={false}
          ></IconTooltip>
        </div>
      </div>
    ),
  },
  {
    date: "2021.07 ~ 2021.08",
    title: "사내 메신저 연동 Chrome Extension",
    description:
      "직원 정보 확인·1:1 채팅 시작을 이름 더블클릭 한 번으로 줄여, 사내 [N]명이 설치",
    icon: "milestone",
    skills: ["javascript", "html", "css"],
    details: (
      <div className="flex flex-col gap-4">
        <Image
          src="/about/career/FiresideExtension.png"
          alt="Fireside Extension"
          className="mb-4"
          priority
          width={50}
          height={20}
        />
        <CaseStudy
          role="[단독] — 입사 첫 프로젝트"
          problem="사내 메신저(Fireside)로 동료에게 말을 걸려면 [메신저 열기 → 검색 → 프로필 확인 → 채팅 시작] [N]단계를 거쳐야 했습니다."
          actions={[
            "직원정보 API를 연동해 웹 페이지의 직원 이름을 더블클릭하면 정보 표시",
            "같은 자리에서 1:1 채팅 바로 시작",
            "Chrome Web Store에 배포해 직원이 직접 설치하도록 함",
          ]}
          result="채팅 시작 [N]단계 → 1단계, 사내 설치 [N]명"
        />
      </div>
    ),
  },
];

export default Fasoo2021;
