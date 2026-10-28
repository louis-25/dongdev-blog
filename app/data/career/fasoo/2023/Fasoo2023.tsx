import { CaseStudy } from "@/app/components/CaseStudy";
import LumosLogo from "@/app/components/Icons/LumosLgoo";
import IconTooltip from "@/app/components/IconTooltip";
import { TimelineItemProps } from "@/app/components/Timeline";
import { Separator } from "@/ui/separator";
import Image from "next/image";

// [N], [...] 표시는 실제 수치·사실로 채워야 하는 자리 (기밀이면 증감률·배수·기간 같은 상대값으로)
const Fasoo2023 = (): TimelineItemProps[] => [
  {
    date: "2023.07 ~ 2023.12",
    title: "CloudPortal 프론트엔드 현대화",
    description:
      "클래스형 React + JavaScript + Webpack 레거시를 React 18 + TypeScript + Vite로 전환, 빌드 [N초] → [N초]",
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
          role="[PL / 팀원 — 담당 범위]"
          problem="React [기존 버전] 클래스형 컴포넌트와 JavaScript로 된 코드라, 기능 하나를 고칠 때마다 [N]이 걸리고 타입 오류가 운영에서야 드러났습니다(배포 후 버그 [N건/월]). Webpack 빌드는 [N초]."
          decision="[한 번에 / 화면 단위로 점진] 전환했습니다. 이유: [...]. 수정 비용의 원인을 비즈니스 로직과 UI가 섞인 구조로 보고, 전환하면서 Container / Presentational로 나눴습니다. 화면마다 제각각이던 폼 검증은 React Hook Form + Yup 스키마 한 가지 방식으로 추상화해, 새 폼은 스키마만 정의하면 되게 했습니다."
          actions={[
            "React [기존 버전] → 18 업그레이드, 클래스형 → 함수형 컴포넌트 전환",
            "TypeScript 도입",
            "Webpack → Vite 번들러 전환",
            "Container / Presentational 패턴으로 로직과 UI 분리",
            "React Hook Form + Yup으로 폼 검증 방식 통일",
            "중복 코드를 공통 컴포넌트 [N]개로 정리",
          ]}
          result="빌드 [N초] → [N초], 개발 서버 기동 [N초] → [N초], 코드량 [N]% 감소, 배포 후 버그 [N] → [N]"
          impact="[이후 신규 기능 개발 속도 / 2025 UI 리디자인이 이 구조 위에서 가능했던 점 등]"
          learning="[예) 전환 범위를 정할 때 무엇을 기준으로 삼았는지, 다시 한다면 무엇을 먼저 할지]"
        />
      </div>
    ),
  },
  {
    date: "2023.01 ~ 2023.06",
    title: "클라우드 제품 운영 백오피스 Lumos (0→1)",
    description:
      "클라우드 제품 운영을 [기존 방식]에 의존하던 상황에서 백오피스를 기획부터 출시까지 맡아 운영자 [N]명이 사용",
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
          role="프론트엔드 리드 — 초기 기획 참여, UI 구조 설계, 프론트엔드 개발 [단독 / N명 중 리드]"
          problem="Wrapsody·Mind-SAT 등 클라우드 제품의 고객·라이선스 관리를 [기존 방식: 예) DB 직접 조회, 개발자 요청]으로 처리해 [요청 1건당 N / 월 N건]이 들었습니다."
          decision="운영자마다 볼 수 있는 데이터가 달라야 하는 요구사항을, 화면마다 권한 분기를 넣는 대신 [Role → 메뉴·API 접근 규칙을 한 곳에서 정의하는 구조]로 추상화했습니다. 메뉴 노출뿐 아니라 API 호출 단계에서도 막아 화면을 우회한 접근도 차단했습니다. 기능이 계속 늘어날 것으로 보고 화면을 공통 컴포넌트 조합으로 설계했습니다."
          actions={[
            "초기 기획 단계부터 화면 구조·흐름 설계",
            "Role 기반 메뉴 접근 제어 + API 호출 제한 구현",
            "확장을 전제로 한 공통 컴포넌트 구조 설계",
          ]}
          result="[출시 후 운영자 N명 사용, 운영 요청 처리 N → N]"
          impact="이후 메일 템플릿(2024), 패치 일정 관리 루틴잡(2025)이 Lumos 위에 추가되며 사내 운영 도구로 자리 잡았습니다. [새 메뉴 추가 시 권한 설정에 드는 작업량: 예) 설정 1줄]"
          learning="[예) 초기에 권한 구조를 추상화해 둔 덕에 확장이 쉬웠던 점 / 반대로 과하게 일반화해 손봐야 했던 부분]"
        />
      </div>
    ),
  },
  {
    date: "2023.01 ~ ",
    title: "WordPress 제품 마이크로사이트 4종 개발·운영",
    description:
      "Wrapsody·Wrapsody eCo·Mind-SAT·DSPM 사이트 운영, Mind-SAT 문의 기능 신설로 월 문의 [N]건",
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
          role="[단독 / 담당 범위] — 개발과 운영"
          problem="제품 사이트마다 콘텐츠 구조가 달라 페이지 하나 추가에 [N]이 걸렸고, Mind-SAT은 모의훈련 도입 문의를 받을 창구가 없었습니다."
          actions={[
            "Mind-SAT ‘모의훈련 테스트 문의하기’ 기능 신규 개발",
            "Custom Post Type·템플릿·Loop 구조를 설계해 제품별 콘텐츠를 같은 방식으로 관리",
            "SEO 메타태그 구성과 성능 개선",
          ]}
          result="문의 [0 → 월 N건], 페이지 추가 [N] → [N], Lighthouse 성능 [N] → [N]"
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
