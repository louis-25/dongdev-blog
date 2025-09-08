import Image from "next/image";
import { TimelineItemProps } from "../../components/Timeline";
import IconTooltip from "../../components/IconTooltip";
import { Separator } from "@/ui/separator";
import LumosLogo from "../../components/Icons/LumosLgoo";
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
