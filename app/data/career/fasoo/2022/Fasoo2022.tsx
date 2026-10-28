import { CaseStudy } from "@/app/components/CaseStudy";
import IconTooltip from "@/app/components/IconTooltip";
import { TimelineItemProps } from "@/app/components/Timeline";
import { Separator } from "@/ui/separator";
import Image from "next/image";

// [N], [...] 표시는 실제 수치·사실로 채워야 하는 자리 (기밀이면 증감률·배수·기간 같은 상대값으로)
const Fasoo2022 = (): TimelineItemProps[] => [
  {
    date: "2022.07 ~ 2022.12",
    title: "Wrapsody UI Angular → React 전환",
    description:
      "기능 호환을 유지하며 Wrapsody UI를 React로 전환, 공통 컴포넌트 [N]개를 Storybook에 정리해 화면 개발 [N] → [N]",
    icon: "milestone",
    skills: ["react", "typescript", "redux", "storybook"],
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
          role="팀원 ([N]명 중) — [담당 화면·모듈], 공통 컴포넌트 담당"
          problem="[Angular 버전·유지보수 인력 등 전환이 필요했던 이유]. 화면마다 비슷한 UI를 따로 구현해 [N]이 들었습니다."
          decision="[한 번에 / 화면 단위 점진] 전환. 기능 회귀를 막기 위해 [기존 동작 비교 방법]으로 검증했습니다."
          actions={[
            "Angular 화면을 React로 전환하며 기존 기능 동작·성능 유지",
            "Highcharts로 실시간 통계 차트 개발 — [데이터 갱신 주기, 갱신 시 렌더링 비용을 줄이려 한 방법이 있다면 함께]",
            "react-slick 기반 슬라이더 컴포넌트 구현",
            "Figma 디자인 기준 공통 컴포넌트 [N]개를 만들어 Storybook에 등록",
          ]}
          result="화면 [N]개 전환, 공통 컴포넌트 [N]개, 신규 화면 개발 [N] → [N]"
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
      "투표 라운드별 WebSocket(Socket.io) 실시간 채팅을 서버부터 클라이언트까지 혼자 구축, 동시 접속 [N]명 처리",
    icon: "milestone",
    skills: ["react", "typescript", "express", "socket"],
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
          role="풀스택 [단독] — 채팅 서버·클라이언트·배포 구성"
          problem="투표 라운드 중 사용자끼리 소통할 창구가 없었고, 기존 서비스는 Apache(PHP) 서버라 실시간 통신을 그대로 붙이기 어려웠습니다."
          decision="PHP 서버는 건드리지 않고 Node 채팅 서버를 따로 띄운 뒤, Apache Reverse Proxy로 같은 도메인 아래에 묶었습니다."
          actions={[
            "Express + Socket.io 채팅 서버 구축",
            "채팅 신고·삭제 기능 구현",
            "Apache Reverse Proxy로 PHP 웹 서버와 채팅 서버 연동",
            "[이벤트 흐름 최적화 — 구체적으로 무엇을 바꿨는지]",
          ]}
          result="[라운드당 채팅 N건 / 동시 접속 N명 / 신고 처리 N건]"
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
      "PHP 서비스를 다시 만들지 않고 React 관리자 페이지를 붙여, 운영 작업 [N] → [N]",
    icon: "milestone",
    skills: ["react", "vite"],
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
          role="[단독] — 화면 기획부터 개발·통합까지"
          problem="앱 운영에 필요한 관리 화면이 없어 [기존 방식: 예) DB 직접 수정, 개발자 요청]으로 처리했습니다."
          decision="기존 PHP 시스템을 갈아엎는 대신, 특정 경로에서만 React 빌드 결과를 PHP 템플릿에 붙였습니다. 기존 서비스에 영향 없이 관리 기능만 새로 얹을 수 있어서입니다."
          actions={[
            "백오피스 화면 구성·폼 설계",
            "특정 경로 접근 시 React 빌드 HTML·JS를 PHP 템플릿과 연동해 통합",
            "관리자 인증, 데이터 테이블 관리, 알림 설정 기능 개발",
          ]}
          result="[운영 작업 1건 처리 N → N / 개발자 요청 월 N건 → N건]"
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
