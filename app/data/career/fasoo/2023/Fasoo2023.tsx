import LumosLogo from "@/app/components/Icons/LumosLgoo";
import IconTooltip from "@/app/components/IconTooltip";
import { TimelineItemProps } from "@/app/components/Timeline";
import { Separator } from "@/ui/separator";
import Image from "next/image";

const Fasoo2023 = (): TimelineItemProps[] => [
  {
    date: "2023.07 ~ 2023.12",
    title: "CloudPortal 프론트엔드 리팩토링",
    description:
      "React 12버전으로 제작된 레거시 프로젝트를 18버전으로 리팩토링",
    icon: "milestone",
    skills: ["react", "typescript", "vite", "react-query", "scss"],
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
            {`1. React 12 -> 18 업그레이드 및 클래스형 함수형 컴포넌트 전환`}
          </p>
          <p>2. JavaScript 기반 코드에 TypeScript 도입으로 타입 안정성 확보</p>
          <p>3. Webpack Vite로 번들러 전환하여 빌드 속도 및 DX 개선</p>
          <p>
            4. Container / Presentational 패턴 도입으로 비즈니스 로직과 UI 분리
          </p>
          <p>5. React Hook Form + Yup 기반 폼 유효성 검사 체계 적용</p>
          <p>6. 중복 코드 정리 및 공통 컴포넌트화로 코드베이스 최적화</p>
        </div>
      </div>
    ),
  },
  {
    date: "2023.01 ~ 2023.06",
    title: "BackOffice(Lumos) 기획 및 개발",
    description:
      "클라우드 제품 관리를 위한 BackOffice 시스템인 Lumos를 기획하고 프론트엔드 전반을 개발",
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
    details: (
      <div className="flex flex-col gap-4">
        <LumosLogo />
        <div>
          <p>
            1. Lumos 초기 기획 단계부터 UI 구조 설계 및 프론트엔드 개발 주도
          </p>
          <p>
            2. 사용자 권한(Role)에 따른 API 호출 제한 및 메뉴 접근 제어 기능
            구현
          </p>
          <p>
            3. 컴포넌트 구조를 공통화하여 확장성과 유지보수성을 고려한 구조 설계
          </p>
        </div>
      </div>
    ),
  },
  {
    date: "2023.01 ~ ",
    title: "WordPress기반 마이크로사이트 개발 및 관리",
    description:
      "Fasoo의 클라우드 제품 마이크로사이트(Wrapsody, Wrapsody eCo, Mind-SAT 등) 개발 및 운영",
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
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <circle cx="16" cy="16" r="14" fill="#028CB0"></circle>
            <path
              d="M6.45538 16C6.45538 19.7823 8.65538 23.04 11.8369 24.5885L7.28462 12.1162C6.73798 13.338 6.45541 14.6615 6.45538 16ZM16 25.5446C17.1085 25.5446 18.1746 25.35 19.1731 25.0031L19.1054 24.8762L16.1692 16.8377L13.3092 25.1554C14.1554 25.4092 15.0608 25.5446 16 25.5446ZM17.3115 11.5238L20.7638 21.7877L21.72 18.6062C22.1262 17.2862 22.4392 16.3385 22.4392 15.5177C22.4392 14.3331 22.0162 13.5208 21.6608 12.8946C21.17 12.0992 20.7215 11.4308 20.7215 10.6523C20.7215 9.77231 21.3815 8.96 22.3292 8.96H22.4477C20.689 7.34546 18.3874 6.45141 16 6.45538C14.4192 6.45509 12.8632 6.84777 11.4718 7.59809C10.0805 8.34842 8.89746 9.43285 8.02923 10.7538L8.63846 10.7708C9.63692 10.7708 11.1769 10.6438 11.1769 10.6438C11.7015 10.6185 11.7608 11.3715 11.2446 11.4308C11.2446 11.4308 10.7285 11.4985 10.1446 11.5238L13.6308 21.8638L15.7208 15.6023L14.2315 11.5238C13.898 11.5054 13.565 11.4772 13.2331 11.4392C12.7169 11.4054 12.7762 10.6185 13.2923 10.6438C13.2923 10.6438 14.8662 10.7708 15.8054 10.7708C16.8038 10.7708 18.3438 10.6438 18.3438 10.6438C18.86 10.6185 18.9277 11.3715 18.4115 11.4308C18.4115 11.4308 17.8954 11.49 17.3115 11.5238ZM20.7977 24.25C22.2416 23.4104 23.4399 22.2066 24.2729 20.7589C25.1059 19.3112 25.5444 17.6703 25.5446 16C25.5446 14.3415 25.1215 12.7846 24.3769 11.4223C24.5281 12.9211 24.3012 14.4339 23.7169 15.8223L20.7977 24.25ZM16 27C13.0826 27 10.2847 25.8411 8.22183 23.7782C6.15893 21.7153 5 18.9174 5 16C5 13.0826 6.15893 10.2847 8.22183 8.22183C10.2847 6.15893 13.0826 5 16 5C18.9174 5 21.7153 6.15893 23.7782 8.22183C25.8411 10.2847 27 13.0826 27 16C27 18.9174 25.8411 21.7153 23.7782 23.7782C21.7153 25.8411 18.9174 27 16 27Z"
              fill="white"
            ></path>
          </g>
        </svg>
        {/* <Image
          src="/about/career/FiresideLogo.png"
          alt="fireside"
          className="mb-4"
          priority
          width={150}
          height={150}
        /> */}
        <div>
          <p>
            1. Mind-SAT 마이크로사이트 내 ‘모의훈련 테스트 문의하기’ 기능 신규
            개발
          </p>
          <p>
            2. 제품별 콘텐츠를 효율적으로 관리할 수 있도록 WordPress의
            템플릿/Loop/Custom Post Type 구조 설계
          </p>
          <p>3. SEO 최적화를 위한 메타태그 구성 및 성능 개선 적용</p>
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
