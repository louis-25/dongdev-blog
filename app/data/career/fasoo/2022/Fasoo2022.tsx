import { CaseStudy } from "@/app/components/CaseStudy";
import IconTooltip from "@/app/components/IconTooltip";
import { TimelineItemProps } from "@/app/components/Timeline";
import { Separator } from "@/ui/separator";
import Image from "next/image";

// 확인된 사실만 적는다. 실제 수치가 생기면 성과 칸에 전→후로 추가할 것
const Fasoo2022 = (): TimelineItemProps[] => [
  {
    date: "2022.07 ~ 2022.12",
    title: "Wrapsody UI Angular → React 전환",
    description:
      "기능 호환을 유지하며 Wrapsody UI를 React로 전환하고, 실시간 통계 차트와 Storybook 기반 공통 컴포넌트를 구축",
    icon: "milestone",
    skills: ["react", "redux", "storybook", "scss"],
    details: (
      <div className="flex flex-col gap-4">
        <Image
          src="/about/career/WrpasodyLogo.png"
          alt="Wrapsody"
          className="mb-4"
          priority
          width={150}
          height={150}
        />
        <CaseStudy
          role="10명(프론트엔드 5·백엔드 3·디자인 1·기획 1) 중 프론트엔드 — 홈 화면·즐겨찾기·애널리틱스·스마트 클리너 등 주요 메뉴 담당"
          problem="Angular 기반 UI를 기능 호환성과 성능을 유지하면서 React로 옮겨야 했고, 화면마다 비슷한 UI가 따로 구현돼 있었습니다."
          actions={[
            "Angular 화면을 React로 전환하며 기존 기능 동작·성능 유지",
            "Highcharts로 실시간 통계 시각화 차트 개발",
            "react-slick 기반 슬라이더 컴포넌트 구현",
            "Figma 디자인 기준 재사용 공통 컴포넌트를 만들어 Storybook에 등록",
          ]}
          result="Wrapsody UI React 전환, 공통 컴포넌트를 Storybook으로 표준화"
        />
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
    title: "TTJA 투표 라운드 실시간 채팅",
    description:
      "투표 라운드별 WebSocket(Socket.io) 실시간 채팅을 서버부터 클라이언트까지 풀스택으로 구축",
    icon: "milestone",
    skills: ["express", "socket"],
    details: (
      <div className="flex flex-col gap-4">
        <Image
          src="/about/career/ttjaLogo.png"
          alt="TTJA"
          className="mb-4"
          priority
          width={100}
          height={100}
        />
        <CaseStudy
          role="풀스택 단독 — 채팅 서버·클라이언트·서버 연동 구성"
          problem="투표 라운드 중 사용자끼리 소통할 실시간 채팅이 필요했고, 기존 서비스는 Apache(PHP) 웹 서버로 운영되고 있었습니다."
          decision="기존 PHP 서버와 별도로 Node 채팅 서버를 두고, Apache Reverse Proxy로 두 서버를 연동했습니다."
          actions={[
            "Express + Socket.io 채팅 서버 구축",
            "채팅 신고·삭제 기능 구현",
            "Apache Reverse Proxy로 PHP 웹 서버와 채팅 서버 연동",
            "부하 분산과 채팅 안정성을 위한 이벤트 흐름 정리",
          ]}
          result="앱 투표 라운드에 실시간 채팅 기능 출시"
        />
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
    title: "TTJA 백오피스 기획·개발",
    description:
      "기존 PHP 시스템을 다시 만들지 않고, React로 만든 관리자 페이지를 특정 경로에 통합",
    icon: "milestone",
    skills: ["react", "typescript", "vite", "antd"],
    details: (
      <div className="flex flex-col gap-4">
        <Image
          src="/about/career/ttjaLogo.png"
          alt="TTJA"
          className="mb-4"
          priority
          width={100}
          height={100}
        />
        <CaseStudy
          role="2명(프론트엔드·백엔드) 중 프론트엔드 — 화면 기획부터 개발·통합까지"
          problem="TTJA 앱을 운영할 관리 기능이 필요했지만, 기존 서비스는 PHP 기반 시스템이었습니다."
          decision="기존 PHP 시스템을 갈아엎지 않고, 특정 경로에서만 React 빌드 결과를 PHP 템플릿에 붙이는 방식으로 통합했습니다."
          actions={[
            "백오피스 UI/UX 기획, 화면 구성·폼 설계",
            "특정 경로 접근 시 React 빌드 HTML·JS를 PHP 템플릿과 연동해 통합",
            "관리자 인증, 데이터 테이블 관리, 알림 설정 기능 개발",
          ]}
          result="기존 PHP 서비스 안에서 동작하는 React 관리자 페이지 출시"
        />
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
