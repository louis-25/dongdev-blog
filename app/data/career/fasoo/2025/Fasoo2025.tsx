import { CaseStudy } from "@/app/components/CaseStudy";
import LumosLogo from "@/app/components/Icons/LumosLgoo";
import IconTooltip from "@/app/components/IconTooltip";
import { TimelineItemProps } from "@/app/components/Timeline";
import { Separator } from "@/ui/separator";
import Image from "next/image";

// [N], [...] 표시는 실제 수치·사실로 채워야 하는 자리 (기밀이면 증감률·배수·기간 같은 상대값으로)
const Fasoo2025 = (): TimelineItemProps[] => [
  {
    date: "2025.08 ~ 2025.09",
    title: "클라우드포탈 UI 리디자인",
    description:
      "AI 도구(Cursor + Figma MCP)로 디자인→코드 전환을 줄여 화면 [N]개 개편을 [N]주에 완료",
    icon: "milestone",
    skills: ["react", "typescript", "vite", "scss"],
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
          role="프론트엔드 [단독 / N명 중 담당 범위] — 디자이너·기획자와 협업"
          problem="전면 개편 대상 화면이 [N]개인데, Figma 시안을 손으로 옮기는 방식으로는 [N]주 이상 걸릴 것으로 예상됐습니다."
          decision="시안을 코드로 옮기는 반복 작업을 AI 도구에 맡기고, 사람은 피드백 반영과 검수에 시간을 쓰기로 했습니다."
          actions={[
            "Figma MCP로 시안의 레이아웃·토큰을 읽어 컴포넌트 초안 생성",
            "Context7 MCP로 라이브러리 최신 문서를 참조해 API 오용 줄이기",
            "디자이너·기획자 피드백을 [주기]마다 받아 바로 반영",
          ]}
          result="화면 [N]개 개편 소요 [예상 N주] → [실제 N주]"
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
      "흩어져 있던 제품별 패치 일정·고객 안내(메일·문자)를 Lumos 한 곳으로 모아 공지 준비 시간 [N] → [N]",
    icon: "milestone",
    skills: ["nextjs"],
    details: (
      <div className="flex flex-col gap-4">
        <LumosLogo />
        <CaseStudy
          role="프론트엔드 [단독 / 담당 범위]"
          problem="제품별 패치 일정과 고객 안내 메일·문자를 [기존 방식: 예) 엑셀·개별 메일]로 따로 관리해, 패치 한 건마다 공지 준비에 [N]이 걸렸습니다."
          decision="이미 운영자가 매일 쓰는 Lumos 안에 일정·안내문·설치셋을 묶어 두면 도구를 오갈 일이 없어진다고 봤습니다."
          actions={[
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
          result="패치 1건당 공지 준비 [N] → [N], 관리 대상 제품 [N]개"
        />
      </div>
    ),
  },
];

export default Fasoo2025;
