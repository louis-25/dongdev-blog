import IconTooltip from "@/app/components/IconTooltip";
import { TimelineItemProps } from "@/app/components/Timeline";
import { Separator } from "@/ui/separator";
import Image from "next/image";

const Fasoo2021 = (): TimelineItemProps[] => [
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
          기존 사내에서 개발한 채팅 프로그램(Fireside)을 보다 간편하게 이용하기
          위해 직원정보 API와 연동하여 직원의 이름을 더블클릭하면 해당 직원의
          정보를 알 수 있고 1대1 채팅을 간편하게 할 수 있는 Chrome Extension을
          개발하였습니다. 현재는 Chrome Web Store에 배포하여 직원들이 다운받아
          사용함으로 기존의 회사 업무 효율을 개선하는데 기여했습니다
        </p>
      </div>
    ),
  },
];

export default Fasoo2021;
