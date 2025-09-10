import CommonDialog from "@/app/components/CommonDialog";
import LumosLogo from "@/app/components/Icons/LumosLgoo";
import IconTooltip from "@/app/components/IconTooltip";
import { TimelineItemProps } from "@/app/components/Timeline";
import { Separator } from "@/ui/separator";
import Image from "next/image";
const Fasoo2025 = (): TimelineItemProps[] => [
  {
    date: "2025.06 ~ 2025.08",
    title: "루틴잡 기능 개발",
    description:
      "Fasoo 클라우드 제품 패치 작업을 Lumos 일정에 등록·관리하는 기능 개발",
    icon: "milestone",
    skills: ["nextjs"],
    details: (
      <div className="flex flex-col gap-4">
        <LumosLogo />
        <div>
          <p>1. 각 제품별 패치 일정 관리 캘린더 개발</p>
          <p className="ml-4">
            1-1. 이메일 관리 뷰어 및 에디터 개발 (
            <a
              href="https://tiptap.dev/"
              target="_blank"
              className="text-blue-500"
            >
              tiptab
            </a>
            )
          </p>
          <p className="ml-4">1-2. 문자 관리 뷰어 및 에디터 개발</p>
          <p>2. 각 제품별 설치셋 관리 개발</p>
        </div>
        {/* <Separator />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <CommonDialog
            title="Lumos"
            description="Lumos"
            trigger={<div>자세히 보기</div>}
          >
            <div>자세한 내용</div>
          </CommonDialog>
        </div> */}
      </div>
    ),
  },
  {
    date: "2025.08 ~ 2025.09",
    title: "클라우드포탈 UI 리디자인",
    description: "디자이너·기획자와 협업해 클라우드포탈 UI 전면 개편",
    icon: "milestone",
    skills: ["react", "typescript", "vite", "scss"],
    details: (
      <div className="flex flex-col gap-4">
        <Image
          src="/about/career/CloudPortalLogo.svg"
          alt="CloudPortalLogo"
          // className="mb-4"
          priority
          width={250}
          height={0}
        />
        <div>
          <p>
            1. 디자이너, 기획자와 긴밀히 협업해 UI를 전면 개편하고, 피드백을
            통해 개선안을 신속히 반영
          </p>
          <p>2. Cursor IDE툴과 Context7 MCP, Figma MCP 사용하여 개발</p>
        </div>
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
];

export default Fasoo2025;
