import { CaseStudy } from "@/app/components/CaseStudy";
import LumosLogo from "@/app/components/Icons/LumosLgoo";
import { TimelineItemProps } from "@/app/components/Timeline";
import Image from "next/image";

// [N], [...] 표시는 실제 수치·사실로 채워야 하는 자리 (기밀이면 증감률·배수·기간 같은 상대값으로)
const Fasoo2024 = (): TimelineItemProps[] => [
  {
    date: "2024.08 ~ 2024.09",
    title: "Google Sheets 기반 다국어 관리",
    description:
      "번역 한 줄 수정에도 개발자 배포가 필요하던 구조를 바꿔, 반영 시간 [N일] → [N분]",
    icon: "milestone",
    skills: ["googlesheets"],
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
          role="[직접 제안 / 요청받음] — 설계·구현 단독"
          problem="번역 문구는 코드 저장소의 리소스 파일에 있어서, 운영·기획 쪽 수정 요청이 오면 개발자가 파일을 고치고 배포해야 했습니다. 요청 1건 반영에 [N일], 월 [N]건."
          decision="별도 번역 관리 툴은 [비용·도입 기간] 부담이 있었고, 번역을 수정하는 사람들은 이미 Google Sheets를 쓰고 있었습니다. 시트를 원본 저장소로 두고 서버에서 읽어오면 툴 도입 없이 개발자를 빼낼 수 있다고 판단했습니다."
          actions={[
            "Google Sheets API 연동, 서버사이드 렌더링 시점에 번역 리소스를 읽는 i18n 구조 구현",
            "시트 수정 이력을 리소스 버전 관리로 활용",
            "운영자가 직접 키를 추가·수정하는 규칙 정리",
          ]}
          result="번역 반영 [N일] → [N분], 개발자 개입 월 [N]건 → 0건"
          impact="[적용 제품·화면 수 / 이후 다른 프로젝트로의 확산 여부]"
          learning="[예) 시트를 원본으로 둘 때 생긴 문제(키 충돌·잘못된 입력)를 어떻게 막았는지, 다시 한다면 무엇을 바꿀지]"
        />
      </div>
    ),
  },
  {
    date: "2024.02 ~ 2024.03",
    title: "메일 템플릿 개편",
    description:
      "메일 클라이언트마다 깨지던 Lumos·CloudPortal 발송 메일을 Outlook·Gmail·Naver 3개 환경에서 동일하게 표시",
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
          role="[담당 범위] — 발송 서버와 템플릿 모두"
          problem="두 제품에서 발송되는 메일 [N]종이 클라이언트별로 레이아웃이 깨지고 디자인도 제각각이었습니다. [관련 문의·클레임 N건]"
          actions={[
            "Nodemailer + Google API로 Express 기반 메일 발송 서버 구축",
            "Outlook·Gmail·Naver에서 렌더링을 직접 확인하며 테이블 기반 템플릿 개발",
            "[N]종 템플릿을 공통 레이아웃으로 통일",
          ]}
          result="템플릿 [N]종 통일, 클라이언트별 깨짐 [N건] → 0건"
          impact="이후 루틴잡(2025)의 고객 안내 메일도 이 발송 서버 위에서 만들었습니다. [사실 확인 필요]"
        />
      </div>
    ),
  },
];

export default Fasoo2024;
