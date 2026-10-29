import { CaseStudy } from "@/app/components/CaseStudy";
import LumosLogo from "@/app/components/Icons/LumosLgoo";
import { TimelineItemProps } from "@/app/components/Timeline";
import Image from "next/image";

// 확인된 사실만 적는다. 실제 수치가 생기면 성과 칸에 전→후로 추가할 것
const Fasoo2026 = (): TimelineItemProps[] => [
  {
    date: "2026.07 ~ 2026.10",
    title: "클라우드포탈 결제·콘솔 흐름 정비",
    description:
      "결제 직전 검증을 한 곳으로 모으고, 제품마다 흩어진 분기와 콘솔 화면 로직을 정리해 고객이 다음에 할 일을 헤매지 않도록 개선",
    icon: "milestone",
    skills: ["react", "typescript", "react-hook-form", "vite"],
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
          role="프론트엔드 개발"
          problem="고객 입장에서 결제는 '버튼을 눌렀을 때 화면의 금액 그대로 결제되는가'가 전부입니다. 그런데 폼 라이브러리를 바꾼 뒤 필수 정보나 약관이 빠진 채 결제창이 뜰 수 있는 틈이 생겼고, 결제 후 어느 화면으로 가야 하는지도 고객이 스스로 판단해야 했습니다."
          decision="입력할 때마다 검사하는 대신 '결제 버튼을 누르는 순간' 최신 값을 한 번 더 확인하고, 확인이 안 되면 결제창을 아예 열지 않기로 했습니다. 다만 이건 화면 쪽 1차 방어일 뿐이고, 최종 금액 검증은 서버 책임이라는 경계를 분명히 했습니다."
          actions={[
            "결제 클릭 시점에 폼 값을 다시 검증하고, 최신 결제 데이터가 없으면 버튼을 막도록 수정",
            "제품마다 따로 있던 판별 훅을 useProductFlags 하나로 합쳐, 새 제품이 생겨도 고칠 곳을 한 군데로",
            "콘솔 화면의 서비스·결제·모달 로직을 컨트롤러 훅으로 빼고 화면에는 묶음 단위로 전달",
            "남아 있던 Formik 사용처를 React Hook Form으로 전환해 폼 방식을 하나로 통일",
            "배포 대상별 환경 파일을 나누고, 배포 전에 환경·작업 트리·빌드 결과를 확인한 뒤에만 진행하는 스크립트 작성",
          ]}
          result="결제 직전 검증 경로가 한 곳으로 모였고, 제품 분기·폼 방식이 각각 하나로 정리됨"
        />
      </div>
    ),
  },
  {
    date: "2026.05 ~ 2026.06",
    title: "자연어로 만드는 E2E 테스트 자동화",
    description:
      "테스트 절차를 말로 적으면 AI가 Playwright 시나리오를 만들고 실행하는 서버(NestJS)와, 이를 운영자가 쓰는 Lumos 화면을 함께 개발",
    icon: "milestone",
    skills: ["nestjs", "playwright", "nextjs", "typescript"],
    featured: true,
    details: (
      <div className="flex flex-col gap-4">
        <LumosLogo />
        <CaseStudy
          role="테스트 서버(NestJS)와 운영 화면(Lumos) 양쪽 개발"
          problem="화면을 가장 잘 아는 사람은 기획·운영 담당자인데, 이분들이 회귀 테스트를 자동화하려면 Playwright 문법과 안정적인 선택자를 직접 써야 했습니다. 테스트가 실패해도 왜 실패했는지 읽기 어려워 결국 개발자에게 로그를 물어봐야 했습니다."
          decision="AI가 코드를 '추측'하지 않도록, 실제 페이지에서 읽은 접근성 트리·화면 이미지를 함께 넘겼습니다. 시나리오는 스텝 단위로 저장해 바뀐 스텝만 다시 만들고, 사람이 직접 고친 스텝은 덮어쓰지 않게 했습니다. 실패 시 자동 복구는 해당 스텝 1회 재생성으로 제한해 비용과 예측 가능성을 지켰습니다."
          actions={[
            "자연어 스텝 → Playwright 코드 생성, 실제 페이지의 ARIA 스냅샷·스크린샷을 근거로 제공",
            "스텝별 코드 보관과 부분 재생성, 수동 수정 스텝 보존",
            "생성·실행 진행 상황을 SSE로 실시간 전달",
            "브라우저 조작을 녹화해 시나리오 초안으로 바꾸는 record 모드",
            "Lumos에 시나리오 작성·실행 로그 화면 개발 — 실패 이유는 쉬운 말로, 기술 상세와 스크린샷은 펼쳐 보도록 분리",
          ]}
          result="비개발자도 자연어로 시나리오를 만들고, 실행 결과와 실패 원인을 한 화면에서 확인"
        />
      </div>
    ),
  },
  {
    date: "2026.06 ~ ",
    title: "인바운드 문의 자동 알림·분배",
    description:
      "웹폼·공용 메일로 들어온 문의를 담당 흐름으로 나눠 보내고, 담당자에게 요약과 함께 알려주는 백엔드(Spring Boot) 2종 개발",
    icon: "milestone",
    skills: ["springboot"],
    details: (
      <div className="flex flex-col gap-4">
        <CaseStudy
          role="백엔드 개발 — 분배 서버(Dispatcher)와 알림 봇 모두"
          problem="영업 담당자는 웹폼과 메일로 흩어져 들어오는 문의를 여러 곳을 오가며 직접 확인해야 했습니다. 내부 테스트 문의까지 실제 문의처럼 알림이 오면 정작 중요한 알림이 묻혔습니다."
          decision="담당자가 기다리지 않도록 '문의가 왔다'는 알림을 먼저 보내고, AI 요약은 뒤에서 덧붙였습니다. 메일은 웹훅 대신 주기적 폴링을 골랐는데, 몇 분 지연은 괜찮은 대신 공개 엔드포인트와 구독 갱신 같은 운영 부담을 없앨 수 있었기 때문입니다. AI 입력에서는 개인정보를 빼고, 정규식으로 확정되는 값은 AI에 맡기지 않았습니다."
          actions={[
            "Dispatcher: 제품·분류·형식을 보고 설정 파일의 규칙대로 후속 서비스에 전달 (위에서부터 첫 매칭)",
            "Dispatcher: 원문 바이트를 그대로 전달해 중계 중 데이터 변형을 방지, 매칭 규칙과 결과를 요청당 한 줄 로그로",
            "알림 봇: 접수 즉시 응답 후 AI 요약은 전용 비동기 실행기에서 처리",
            "알림 봇: 테스트·스테이징 유입 필터링 — 부분 문자열 오탐으로 실제 문의가 빠지지 않게 테스트로 고정",
            "알림 봇: 공용 메일함 폴링, 전송에 성공한 메일만 처리 완료로 옮겨 실패 건은 다음 주기에 재시도",
          ]}
          result="흩어진 문의가 한 경로로 모여 담당자에게 요약과 함께 전달"
        />
      </div>
    ),
  },
];

export default Fasoo2026;
