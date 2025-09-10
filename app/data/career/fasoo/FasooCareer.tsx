import { TimelineItemProps } from "@/app/components/Timeline";
import Fasoo2021 from "./2021/Fasoo2021";
import Fasoo2022 from "./2022/Fasoo2022";
import Fasoo2023 from "./2023/Fasoo2023";
import Fasoo2024 from "./2024/Fasoo2024";
import Fasoo2025 from "./2025/Fasoo2025";

const FasooCareer = (): TimelineItemProps[] => [
  ...Fasoo2025(),
  ...Fasoo2024(),
  ...Fasoo2023(),
  ...Fasoo2022(),
  ...Fasoo2021(),
];

export default FasooCareer;
