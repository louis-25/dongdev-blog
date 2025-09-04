import { TimelineItemProps } from "../components/Timeline";
import careerData from "./career";
import { projects } from "./projects";
type Project = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  detail: React.ReactNode;
};
interface About {
  me: {
    name: string;
    email: string;
    phone: string;
  };
  skills: {
    list: string[];
  };
  career: {
    details: TimelineItemProps[];
  };
  projects: Project[];
}
const useAbout = () => {
  const career = careerData();
  const about = {
    me: {},
    skills: {
      list: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Express",
        "MongoDB",
        "PostgreSQL",
        "Docker",
      ],
    },
    career,
    projects,
  };
  return about;
};
export default useAbout;
