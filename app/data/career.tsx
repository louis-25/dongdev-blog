import Image from "next/image";
import { TimelineItemProps } from "../components/Timeline";
import IconTooltip from "../components/IconTooltip";
import { Separator } from "@/ui/separator";
import LumosLogo from "../components/Icons/LumosLgoo";

interface Career {
  details: TimelineItemProps[];
}

const careerData = () => {
  const career: Career = {
    details: [
      {
        date: "2024.08 ~ 2024.09",
        title: "다국어 관리",
        description: "GoogleSheet API를 연동한 다국어 관리 개발",
        icon: "milestone",
        details: (
          <div className="flex flex-col gap-4">
            <Image
              src="/about/career/GoogleSheetsLogo.png"
              alt="GoogleSheets"
              className="mb-4"
              priority
              width={60}
              height={0}
            />
            <div>
              <p>
                1. Google Sheets API를 연동하여, 서버사이드 렌더링 기반의
                다국어(i18n) 관리 시스템 구현
              </p>
              <p>
                2. 리소스 버전 관리를 위해 Google Sheets를 소스 데이터 저장소로
                활용
              </p>
              <p>
                3. 관리자가 쉽게 번역을 수정·추가할 수 있도록 운영 효율성 개선
              </p>
            </div>
          </div>
        ),
      },
      {
        date: "2024.02 ~ 2024.03",
        title: "메일템플릿 개선",
        description: "Lumos, CloudPortal에서 발송되는 이메일 템플릿 전면 개편",
        icon: "milestone",
        skills: ["nodemailer"],
        details: (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <LumosLogo />
              <Image
                src="/about/career/CloudPortalLogo.svg"
                alt="CloudPortalLogo"
                // className="mb-4"
                priority
                width={250}
                height={0}
              />
            </div>

            <div>
              <p>1. Nodemailer와 Google API를 활용하여 이메일 전송 서버 구축</p>
              <p>
                2. Outlook, Gmail, Naver 환경에서의 호환성 검토하며 템플릿 개발
              </p>
              <p>3. 기존 정적 이메일 디자인을 개선해 일관된 브랜드 경험 제공</p>
            </div>
          </div>
        ),
      },
      {
        date: "2024.01 ~ 2024.02",
        title: "1회용 로그인 & 권한별 레이아웃",
        description:
          "CloudPortal 내 1회용 로그인 및 권한 기반 레이아웃 노출 기능 개발",
        icon: "milestone",
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
                1. 특정 제품 접근 시 사용할 수 있는 1회용 로그인 링크 기능 구현
              </p>
              <p>
                2. 사용자 권한(Role)에 따라 레이아웃과 접근 가능 메뉴가 동적으로
                변경되는 구조 설계 및 적용
              </p>
              <p>3. 사용자 경험을 고려한 Role-based 접근 제어 UX 최적화</p>
            </div>
          </div>
        ),
      },
      {
        date: "2023.07 ~ 2023.12",
        title: "CloudPortal 프론트엔드 리팩토링",
        description:
          "React 12버전으로 제작된 레거시 프로젝트를 18버전으로 리팩토링",
        icon: "milestone",
        skills: ["react", "typescript", "vite"],
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
              <p>
                2. JavaScript 기반 코드에 TypeScript 도입으로 타입 안정성 확보
              </p>
              <p>3. Webpack Vite로 번들러 전환하여 빌드 속도 및 DX 개선</p>
              <p>
                4. Container / Presentational 패턴 도입으로 비즈니스 로직과 UI
                분리
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
        skills: ["nextjs", "yup", "react-hook-form"],
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
                3. 컴포넌트 구조를 공통화하여 확장성과 유지보수성을 고려한 구조
                설계
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
        skills: ["wordpress"],
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
                1. Mind-SAT 마이크로사이트 내 ‘모의훈련 테스트 문의하기’ 기능
                신규 개발
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
                1. 기존 Angular 기반 UI를 React로 전환하며 기능 호환성 및 성능
                유지 고려
              </p>
              <p>2. react-slick을 사용하여 주요 UI 슬라이더 컴포넌트 구현</p>
              <p>3. Highcharts를 활용한 실시간 통계 시각화 차트 개발</p>
              <p>
                4. Figma 디자인을 기반으로 재사용 가능한 UI 컴포넌트를 구현하고
                Storybook에 등록
              </p>
              <p>
                5. 공통 컴포넌트 개발 및 UI 표준화 작업을 통해 팀 생산성 향상에
                기여
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
                3. Apache 기반 웹 서버(PHP)와 채팅 서버 간 연동을 위해 Reverse
                Proxy 구성 적용
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
        description:
          "TTJA 앱의 관리 기능을 위한 BackOffice 시스템을 기획 및 개발",
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
              <p>
                3. 관리자 인증, 데이터 테이블 관리, 알림 설정 등 핵심 기능 개발
              </p>
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
      {
        date: "2021.11 ~ 2021.12",
        title: "Fireside 랜딩페이지 개발",
        description: "",
        icon: "milestone",
        skills: ["react"],
        details: (
          <div className="flex flex-col gap-4">
            <Image
              src="/about/career/FiresideLogo.png"
              alt="fireside"
              className="mb-4"
              priority
              width={150}
              height={150}
            />
            <div>
              <p>1. 백엔드 개발자가 개발해준 API와 연동하여 협업</p>
              <p>2. 디자이너와 Figma툴 사용하여 협업</p>
              <p>3. PC, Tablet, Mobile 사이즈에 맞게 반응형 디자인 적용</p>
            </div>
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
        title: "실시간채팅 Chrome Extension 개발",
        description: "",
        // description: "Fireside 채팅연동 Chrome Extension 개발",
        icon: "milestone",
        skills: ["javascript", "html", "css"],
        details: (
          <div className="flex flex-col gap-4">
            <Image
              src="/about/career/FiresideExtension.png"
              alt="FiresideExtension"
              className="mb-4"
              priority
              width={50}
              height={20}
            />
            <p className="break-keep">
              기존 사내에서 개발한 채팅 프로그램(Fireside)을 보다 간편하게
              이용하기 위해 직원정보 API와 연동하여 직원의 이름을 더블클릭하면
              해당 직원의 정보를 알 수 있고 1대1 채팅을 간편하게 할 수 있는
              Chrome Extension을 개발하였습니다. 현재는 Chrome Web Store에
              배포하여 직원들이 다운받아 사용함으로 기존의 회사 업무 효율을
              개선하는데 기여했습니다
            </p>
          </div>
        ),
      },
    ],
  };
  return career;
};

export default careerData;
