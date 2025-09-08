import { TimelineItemProps } from "../../components/Timeline";
import FasooCareer from "./fasoo/FasooCareer";

interface Career {
  details: TimelineItemProps[];
}

const careerData = () => {
  const career: Career = {
    details: [...FasooCareer()],
  };
  return career;
};

export default careerData;
