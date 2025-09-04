import { TimelineItemProps } from "../components/Timeline";

interface Career {
  details: TimelineItemProps[];
}

const careerData = () => {
  const career: Career = {
    details: [
      {
        date: "2021.11 ~ 2021.12",
        title: "Fireside 랜딩페이지 개발",
        description: "Fireside제품 랜딩페이지 React로 개발",
        icon: "milestone",
        details: (
          <>
            <p>1. 백엔드 개발자가 개발해준 API와 연동하여 협업</p>
            <p>2. 디자이너와 Figma툴 사용하여 협업</p>
            <p>3. PC, Tablet, Mobile 사이즈에 맞게 반응형 디자인 적용</p>
          </>
        ),
      },
      {
        date: "2021.07 ~ 2021.08",
        title: "Fireside Chrome Extension 개발",
        description: "Fireside 채팅연동 Chrome Extension 개발",
        icon: "milestone",
        details: (
          <>
            <p>
              기존 사내에서 개발한 채팅 프로그램(Fireside)을 보다 간편하게
              이용하기 위해 직원정보 API와 연동하여 직원의 이름을 더블클릭하면
              해당 직원의 정보를 알 수 있고 1대1 채팅을 간편하게 할 수 있는
              Chrome Extension을 개발하였습니다. 현재는 Chrome Web Store에
              배포하여 직원들이 다운받아 사용함으로 기존의 회사 업무 효율을
              개선하는데 기여했습니다
            </p>
          </>
        ),
      },
    ],
  };
  return career;
};

export default careerData;
