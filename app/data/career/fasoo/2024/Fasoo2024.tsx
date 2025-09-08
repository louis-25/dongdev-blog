import LumosLogo from "@/app/components/Icons/LumosLgoo";
import IconTooltip from "@/app/components/IconTooltip";
import { TimelineItemProps } from "@/app/components/Timeline";
import { Separator } from "@/ui/separator";
import Image from "next/image";
const Fasoo2024 = (): TimelineItemProps[] => [
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
            2. 리소스 버전 관리를 위해 Google Sheets를 소스 데이터 저장소로 활용
          </p>
          <p>3. 관리자가 쉽게 번역을 수정·추가할 수 있도록 운영 효율성 개선</p>
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
          <p>2. Outlook, Gmail, Naver 환경에서의 호환성 검토하며 템플릿 개발</p>
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
          <p>1. 특정 제품 접근 시 사용할 수 있는 1회용 로그인 링크 기능 구현</p>
          <p>
            2. 사용자 권한(Role)에 따라 레이아웃과 접근 가능 메뉴가 동적으로
            변경되는 구조 설계 및 적용
          </p>
          <p>3. 사용자 경험을 고려한 Role-based 접근 제어 UX 최적화</p>
        </div>
      </div>
    ),
  },
];

export default Fasoo2024;
