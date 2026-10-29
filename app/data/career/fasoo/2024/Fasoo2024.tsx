import { CaseStudy } from "@/app/components/CaseStudy";
import LumosLogo from "@/app/components/Icons/LumosLgoo";
import { TimelineItemProps } from "@/app/components/Timeline";
import Image from "next/image";

// 확인된 사실만 적는다. 실제 수치가 생기면 성과 칸에 전→후로 추가할 것
const Fasoo2024 = (): TimelineItemProps[] => [
  {
    date: "2024.08 ~ 2024.09",
    title: "Google Sheets 기반 다국어 관리",
    description:
      "코드 안에 있던 번역 리소스를 Google Sheets로 옮겨, 관리자가 시트에서 직접 번역을 수정·추가하도록 i18n 구조 개편",
    icon: "milestone",
    skills: ["googlesheets", "nextjs", "antd", "react-query", "recoil", "emotion"],
    featured: true,
    details: (
      <div className="flex flex-col gap-4">
        <Image
          src="/about/career/GoogleSheetsLogo.png"
          alt="Google Sheets"
          className="mb-4"
          priority
          width={60}
          height={0}
        />
        <CaseStudy
          role="프론트엔드 단독 — 설계부터 구현까지"
          problem="번역 문구를 수정·추가하려면 개발자가 리소스를 직접 고쳐야 했습니다."
          decision="Google Sheets를 번역의 원본 저장소로 두고 서버에서 읽어오도록 바꾸면, 번역 관리를 개발 작업에서 떼어낼 수 있다고 봤습니다."
          actions={[
            "Google Sheets API를 연동해 서버사이드 렌더링 시점에 번역 리소스를 읽는 i18n 구조 구현",
            "시트를 리소스 버전 관리 저장소로 활용",
          ]}
          result="관리자가 시트에서 직접 번역을 수정·추가하는 운영 방식으로 전환"
        />
      </div>
    ),
  },
  {
    date: "2024.02 ~ 2024.03",
    title: "메일 템플릿 개편",
    description:
      "Lumos·CloudPortal 발송 메일을 Outlook·Gmail·Naver 3개 환경에서 검증한 템플릿으로 전면 개편",
    icon: "milestone",
    skills: ["express", "nodemailer", "html", "css"],
    details: (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <LumosLogo />
          <Image
            src="/about/career/CloudPortalLogo.svg"
            alt="CloudPortal"
            priority
            width={250}
            height={0}
          />
        </div>
        <CaseStudy
          role="발송 서버와 템플릿 개발 — 2명(프론트엔드·기획) 중 개발 담당"
          problem="Lumos·CloudPortal에서 발송되는 메일이 정적 디자인이라 제품 간 일관성이 없었고, 메일 클라이언트마다 표시가 달라질 수 있었습니다."
          actions={[
            "Nodemailer + Google API로 Express 기반 메일 발송 서버 구축",
            "Outlook·Gmail·Naver에서 렌더링을 직접 확인하며 템플릿 개발",
            "두 제품의 메일을 일관된 브랜드 디자인으로 통일",
          ]}
          result="Outlook·Gmail·Naver 3개 환경에서 검증한 메일 템플릿으로 교체"
        />
      </div>
    ),
  },
  {
    date: "2024.01 ~ 2024.02",
    title: "1회용 로그인 & 권한별 레이아웃",
    description:
      "특정 제품 접근용 1회용 로그인 링크와, 사용자 권한(Role)에 따라 레이아웃·메뉴가 바뀌는 구조를 클라우드포탈에 적용",
    icon: "milestone",
    skills: ["react", "vite", "react-query", "recoil", "react-hook-form", "yup", "scss"],
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
          role="프론트엔드 개발 — 2명(프론트엔드·백엔드) 중 프론트엔드 담당"
          problem="특정 제품에만 접근하려는 사용자도 일반 로그인 절차를 거쳐야 했고, 사용자 권한(Role)마다 보여야 할 레이아웃과 메뉴가 달랐습니다."
          decision="화면마다 권한을 따로 분기하지 않고, Role에 따라 레이아웃과 접근 가능한 메뉴가 동적으로 바뀌는 구조로 설계했습니다."
          actions={[
            "특정 제품에 대한 1회용 로그인 링크 기능 구현",
            "Role에 따라 레이아웃과 접근 가능한 메뉴를 동적으로 바꾸는 구조 설계·적용",
            "권한 없는 메뉴로 들어가지 않도록 Role 기반 접근 제어 UX 정리",
          ]}
          result="1회용 링크로 특정 제품에 바로 접근, 권한별 레이아웃·메뉴를 한 구조에서 관리"
        />
      </div>
    ),
  },
];

export default Fasoo2024;
