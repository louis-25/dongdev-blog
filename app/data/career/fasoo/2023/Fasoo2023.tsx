import { CaseStudy } from "@/app/components/CaseStudy";
import LumosLogo from "@/app/components/Icons/LumosLgoo";
import IconTooltip from "@/app/components/IconTooltip";
import { TimelineItemProps } from "@/app/components/Timeline";
import { Separator } from "@/ui/separator";
import Image from "next/image";

// 확인된 사실만 적는다. 실제 수치가 생기면 성과 칸에 전→후로 추가할 것
const Fasoo2023 = (): TimelineItemProps[] => [
  {
    date: "2023.07 ~ 2023.12",
    title: "CloudPortal 프론트엔드 현대화",
    description:
      "클래스형 React + JavaScript + Webpack 레거시를 React 18 + TypeScript + Vite로 전환하고, 로직과 UI를 분리한 구조로 재정리",
    icon: "milestone",
    skills: ["react", "typescript", "vite", "react-query", "scss"],
    featured: true,
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
          role="프론트엔드 리팩토링"
          problem="구버전 React 클래스형 컴포넌트와 JavaScript로 작성된 레거시라 타입 안정성이 없었고, 비즈니스 로직과 UI가 섞여 있었으며 중복 코드가 많았습니다."
          decision="로직과 UI가 섞인 구조를 수정 비용의 원인으로 보고, 전환하면서 Container / Presentational로 나눴습니다. 화면마다 제각각이던 폼 검증은 React Hook Form + Yup 스키마 한 가지 방식으로 통일했습니다."
          actions={[
            "React 18 업그레이드, 클래스형 → 함수형 컴포넌트 전환",
            "TypeScript 도입",
            "Webpack → Vite 번들러 전환으로 빌드 속도·개발 경험 개선",
            "Container / Presentational 패턴으로 로직과 UI 분리",
            "React Hook Form + Yup으로 폼 검증 방식 통일",
            "중복 코드를 공통 컴포넌트로 정리",
          ]}
          result="React 18 + TypeScript + Vite 기반으로 전환 완료"
          impact="2025년 클라우드포탈 UI 전면 개편이 이 구조 위에서 진행됐습니다."
        />
      </div>
    ),
  },
  {
    date: "2023.01 ~ 2023.06",
    title: "클라우드 제품 운영 백오피스 Lumos (0→1)",
    description:
      "클라우드 제품 관리용 백오피스를 초기 기획부터 맡아 권한 기반 구조로 설계·개발. 이후 메일·패치 일정·테스트 자동화 기능이 그 위에 확장",
    icon: "milestone",
    skills: [
      "nextjs",
      "typescript",
      "antd",
      "react-query",
      "yup",
      "react-hook-form",
      "emotion",
    ],
    featured: true,
    details: (
      <div className="flex flex-col gap-4">
        <LumosLogo />
        <CaseStudy
          role="프론트엔드 개발 주도 — 초기 기획 참여, UI 구조 설계"
          problem="운영 담당자는 사용자·사이트·결제·상품 데이터를 표로 조회하고 필터·상세 확인을 반복하는데, 담당자 권한(Role)마다 볼 수 있는 메뉴와 데이터가 달라야 했습니다."
          decision="권한은 메뉴를 숨기는 것만으로는 부족하다고 보고 API 호출 단계에서도 함께 막았습니다. 화면이 계속 늘어날 것이라 '화면은 업무 흐름만, 통신·인증·표 동작은 공통 계층이' 맡도록 나눴습니다."
          actions={[
            "초기 기획 단계부터 UI 구조·흐름 설계",
            "Role 기반 메뉴 접근 제어 + API 호출 제한 구현",
            "API 호출을 도메인별 service 계층으로 분리하고, 토큰 만료 시 재발급 후 원래 요청을 다시 보내는 Axios 인터셉터로 인증 처리를 한 곳에",
            "페이지네이션·필터·행 선택을 맡는 공통 테이블을 만들고, 화면은 컬럼과 도메인 규칙만 넘기도록 구성",
            "서버 데이터는 React Query, 화면 상태는 Jotai로 나눠 관리",
            "결제 금액 수정 이력 화면 추가 — 현재 값만 보고는 알 수 없던 '왜 바뀌었나'를 같은 흐름에서 확인",
          ]}
          result="클라우드 제품 관리 백오피스 Lumos 출시"
          impact="이후 메일 템플릿(2024), 패치 일정 관리 루틴잡(2025), E2E 테스트 시나리오 화면(2026)이 같은 구조 위에 추가되며 사내 운영 도구로 자리 잡았습니다."
        />
      </div>
    ),
  },
  {
    date: "2023.01 ~ ",
    title: "WordPress 제품 마이크로사이트 4종 개발·운영",
    description:
      "Wrapsody·Wrapsody eCo·Mind-SAT·DSPM 사이트 개발·운영, Mind-SAT 모의훈련 문의 창구 신설",
    icon: "milestone",
    skills: ["wordpress", "html", "css", "javascript"],
    details: (
      <div className="flex flex-col gap-4">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="w-15 h-15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <circle cx="16" cy="16" r="14" fill="#028CB0"></circle>
            <path
              d="M6.45538 16C6.45538 19.7823 8.65538 23.04 11.8369 24.5885L7.28462 12.1162C6.73798 13.338 6.45541 14.6615 6.45538 16ZM16 25.5446C17.1085 25.5446 18.1746 25.35 19.1731 25.0031L19.1054 24.8762L16.1692 16.8377L13.3092 25.1554C14.1554 25.4092 15.0608 25.5446 16 25.5446ZM17.3115 11.5238L20.7638 21.7877L21.72 18.6062C22.1262 17.2862 22.4392 16.3385 22.4392 15.5177C22.4392 14.3331 22.0162 13.5208 21.6608 12.8946C21.17 12.0992 20.7215 11.4308 20.7215 10.6523C20.7215 9.77231 21.3815 8.96 22.3292 8.96H22.4477C20.689 7.34546 18.3874 6.45141 16 6.45538C14.4192 6.45509 12.8632 6.84777 11.4718 7.59809C10.0805 8.34842 8.89746 9.43285 8.02923 10.7538L8.63846 10.7708C9.63692 10.7708 11.1769 10.6438 11.1769 10.6438C11.7015 10.6185 11.7608 11.3715 11.2446 11.4308C11.2446 11.4308 10.7285 11.4985 10.1446 11.5238L13.6308 21.8638L15.7208 15.6023L14.2315 11.5238C13.898 11.5054 13.565 11.4772 13.2331 11.4392C12.7169 11.4054 12.7762 10.6185 13.2923 10.6438C13.2923 10.6438 14.8662 10.7708 15.8054 10.7708C16.8038 10.7708 18.3438 10.6438 18.3438 10.6438C18.86 10.6185 18.9277 11.3715 18.4115 11.4308C18.4115 11.4308 17.8954 11.49 17.3115 11.5238ZM20.7977 24.25C22.2416 23.4104 23.4399 22.2066 24.2729 20.7589C25.1059 19.3112 25.5444 17.6703 25.5446 16C25.5446 14.3415 25.1215 12.7846 24.3769 11.4223C24.5281 12.9211 24.3012 14.4339 23.7169 15.8223L20.7977 24.25ZM16 27C13.0826 27 10.2847 25.8411 8.22183 23.7782C6.15893 21.7153 5 18.9174 5 16C5 13.0826 6.15893 10.2847 8.22183 8.22183C10.2847 6.15893 13.0826 5 16 5C18.9174 5 21.7153 6.15893 23.7782 8.22183C25.8411 10.2847 27 13.0826 27 16C27 18.9174 25.8411 21.7153 23.7782 23.7782C21.7153 25.8411 18.9174 27 16 27Z"
              fill="white"
            ></path>
          </g>
        </svg>
        <CaseStudy
          role="개발과 운영"
          problem="제품별 마이크로사이트 4종의 콘텐츠를 효율적으로 관리할 구조가 필요했고, Mind-SAT은 모의훈련 도입 문의를 받을 창구가 없었습니다."
          actions={[
            "Mind-SAT ‘모의훈련 테스트 문의하기’ 기능 신규 개발",
            "Custom Post Type·템플릿·Loop 구조를 설계해 제품별 콘텐츠를 같은 방식으로 관리",
            "SEO 메타태그 구성과 성능 개선",
          ]}
          result="사이트 4종을 같은 콘텐츠 구조로 운영, Mind-SAT 모의훈련 문의 창구 신설"
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
          <Separator orientation="vertical" />
          <IconTooltip
            icon="website"
            width={24}
            height={24}
            href="https://www.wrapsodyeco.com/kr/"
          >
            Wrapsody eCo
          </IconTooltip>
          <Separator orientation="vertical" />
          <IconTooltip
            icon="website"
            width={24}
            height={24}
            href="https://mind-sat.com/kr/"
          >
            Mind-SAT
          </IconTooltip>
          <Separator orientation="vertical" />
          <IconTooltip
            icon="website"
            width={24}
            height={24}
            href="https://dspm.fasoo.com/"
          >
            DSPM
          </IconTooltip>
        </div>
      </div>
    ),
  },
];
export default Fasoo2023;
