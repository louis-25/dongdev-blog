import { CaseStudy } from "@/app/components/CaseStudy";
import LumosLogo from "@/app/components/Icons/LumosLgoo";
import IconTooltip from "@/app/components/IconTooltip";
import { TimelineItemProps } from "@/app/components/Timeline";
import { Separator } from "@/ui/separator";
import Image from "next/image";

// 확인된 사실만 적는다. 실제 수치가 생기면 성과 칸에 전→후로 추가할 것
const Fasoo2025 = (): TimelineItemProps[] => [
  {
    date: "2025.08 ~ 2025.09",
    title: "클라우드포탈 UI 리디자인",
    description:
      "Figma 시안을 코드로 옮기는 반복 작업을 AI 도구(Cursor + Figma MCP)에 맡기고, 디자이너·기획자 피드백 반영에 집중해 UI 전면 개편",
    icon: "milestone",
    skills: ["nextjs", "react-query", "emotion"],
    details: (
      <div className="flex flex-col gap-4">
        <Image
          src="/about/career/CloudPortalLogo.svg"
          alt="CloudPortal"
          priority
          width={250}
          height={0}
        />
        <CaseStudy
          role="프론트엔드 개발 — 3명(프론트엔드·기획·디자인) 중 프론트엔드 담당"
          problem="클라우드포탈 UI 전면 개편으로 많은 화면의 Figma 시안을 코드로 옮겨야 했습니다."
          decision="시안을 코드로 옮기는 반복 작업은 AI 도구에 맡기고, 사람은 피드백 반영과 검수에 시간을 쓰기로 했습니다."
          actions={[
            "Figma MCP로 시안의 레이아웃·스타일을 읽어 컴포넌트 초안 생성",
            "Context7 MCP로 라이브러리 최신 문서를 참조하며 개발",
            "디자이너·기획자 피드백을 받아 개선안을 바로 반영",
          ]}
          result="클라우드포탈 UI 전면 개편 출시"
        />
        <Separator />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>참고</div>
          <Separator orientation="vertical" />
          <IconTooltip
            icon="website"
            width={24}
            height={24}
            href="https://cloudportal.fasoo.com/ko"
          >
            CloudPortal
          </IconTooltip>
        </div>
      </div>
    ),
  },
  {
    date: "2025.06 ~ 2025.08",
    title: "루틴잡: 제품 패치 일정 관리 기능",
    description:
      "패치 때마다 반복되던 일정·안내 메일·문자 작업을 사전 정의된 패치 프로세스로 묶어, 한 번 등록하면 캘린더·메일·문자가 자동 등록되도록 Lumos에 구현",
    icon: "milestone",
    skills: ["nextjs"],
    details: (
      <div className="flex flex-col gap-4">
        <LumosLogo />
        <CaseStudy
          role="프론트엔드 개발 — 3명(프론트엔드·백엔드·기획) 중 프론트엔드 담당"
          problem="클라우드 제품에 패치가 생길 때마다 일정 등록, 고객 안내 메일, 문자 발송을 매번 따로 챙겨야 했고, Lumos에서 이 작업들을 함께 관리·추적할 수 없었습니다."
          decision="패치마다 거치는 작업 순서가 정해져 있다는 점에 주목해, 그 순서를 사전 정의된 패치 프로세스로 만들고 등록 한 번으로 캘린더·메일·문자가 따라 생기도록 했습니다."
          actions={[
            "사전 정의된 패치 프로세스 기반 캘린더·이메일·문자 자동 등록 구현",
            "제품별 패치 일정 캘린더 개발",
            <>
              안내 메일 뷰어·에디터 개발 (
              <a
                href="https://tiptap.dev/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                Tiptap
              </a>
              ), 문자 뷰어·에디터 개발
            </>,
            "제품별 설치셋 관리 기능 개발",
          ]}
          result="패치 등록 한 번으로 일정·안내 메일·문자가 함께 생성되고, Lumos 한 곳에서 추적"
        />
      </div>
    ),
  },
];

export default Fasoo2025;
