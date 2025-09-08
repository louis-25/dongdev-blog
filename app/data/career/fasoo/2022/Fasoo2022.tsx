import IconTooltip from "@/app/components/IconTooltip";
import { TimelineItemProps } from "@/app/components/Timeline";
import { Separator } from "@/ui/separator";
import Image from "next/image";
const Fasoo2022 = (): TimelineItemProps[] => [
  {
    date: "2022.07 ~ 2022.12",
    title: "Angular->React 마이그레이션",
    description:
      "Wrapsody 제품의 UI를 Angular에서 React로 전환하여, 유지보수성과 개발 생산성을 개선",
    icon: "milestone",
    skills: ["react", "typescript", "redux", "storybook"],
    details: (
      <div className="flex flex-col gap-4">
        <Image
          src="/about/career/WrpasodyLogo.png"
          alt="fireside"
          className="mb-4"
          priority
          width={150}
          height={150}
        />
        <div>
          <p>
            1. 기존 Angular 기반 UI를 React로 전환하며 기능 호환성 및 성능 유지
            고려
          </p>
          <p>2. react-slick을 사용하여 주요 UI 슬라이더 컴포넌트 구현</p>
          <p>3. Highcharts를 활용한 실시간 통계 시각화 차트 개발</p>
          <p>
            4. Figma 디자인을 기반으로 재사용 가능한 UI 컴포넌트를 구현하고
            Storybook에 등록
          </p>
          <p>
            5. 공통 컴포넌트 개발 및 UI 표준화 작업을 통해 팀 생산성 향상에 기여
          </p>
        </div>
        <Separator />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>참고</div>
          <Separator orientation="vertical" />
          <IconTooltip
            icon="website"
            width={24}
            height={24}
            href="https://www.wrapsody.com/kr/"
          >
            Wrapsody
          </IconTooltip>
        </div>
      </div>
    ),
  },
  {
    date: "2022.06 ~ 2022.07",
    title: "TTJA 실시간 채팅 기능 개발",
    description:
      "TTJA 앱 내 각 투표 라운드에서 사용할 실시간 채팅 기능 풀스택 개발",
    icon: "milestone",
    skills: ["react", "typescript", "express", "socket"],
    details: (
      <div className="flex flex-col gap-4">
        <Image
          src="/about/career/ttjaLogo.png"
          alt="fireside"
          className="mb-4"
          priority
          width={100}
          height={100}
        />
        <div>
          <p>1. Express.js와 Socket.io 기반 실시간 채팅 서버 구축</p>
          <p>2. 사용자 채팅 신고 및 삭제 기능 구현</p>
          <p>
            3. Apache 기반 웹 서버(PHP)와 채팅 서버 간 연동을 위해 Reverse Proxy
            구성 적용
          </p>
          <p>4. 부하 분산 및 채팅 안정성 확보를 위한 이벤트 흐름 최적화</p>
        </div>
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>참고</div>
          <Separator orientation="vertical" />
          <IconTooltip
            icon="googlePlay"
            width={24}
            height={24}
            href="https://play.google.com/store/apps/details?id=com.ttja&hl=ko&gl=US"
            isShowTooltip={false}
          ></IconTooltip>
        </div>
      </div>
    ),
  },
  {
    date: "2022.02 ~ 2022.06",
    title: "TTJA BackOffice 개발",
    description: "TTJA 앱의 관리 기능을 위한 BackOffice 시스템을 기획 및 개발",
    icon: "milestone",
    skills: ["react", "vite"],
    details: (
      <div className="flex flex-col gap-4">
        <Image
          src="/about/career/ttjaLogo.png"
          alt="fireside"
          className="mb-4"
          priority
          width={100}
          height={100}
        />
        <div>
          <p>1. BackOffice UI/UX 기획 및 전반적인 화면 구성, 폼 설계</p>
          <p>
            2. 기존 PHP 기반 시스템 내에 React로 구현한 관리자 페이지를 통합
          </p>
          <p>{`-> 특정 경로 접근 시, React 앱을 빌드한 HTML 및 JS 파일을 PHP 템플릿과 연동하여 통합 적용`}</p>
          <p>3. 관리자 인증, 데이터 테이블 관리, 알림 설정 등 핵심 기능 개발</p>
        </div>
        <Separator />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>참고</div>
          <Separator orientation="vertical" />
          <IconTooltip
            icon="googlePlay"
            width={24}
            height={24}
            href="https://play.google.com/store/apps/details?id=com.ttja&hl=ko&gl=US"
            isShowTooltip={false}
          ></IconTooltip>
        </div>
      </div>
    ),
  },
];

export default Fasoo2022;
