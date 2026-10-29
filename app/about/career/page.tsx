import Image from "next/image";
import { Timeline } from "@/app/components/Timeline";
import useAbout from "@/app/data/useAbout";
import { pageMetadata } from "@/app/lib/metadata";

export const metadata = pageMetadata({
  title: "경력",
  description: "DongDev의 프로젝트별 경력과 성과를 소개합니다.",
  path: "/about/career",
});

export default function CareerPage() {
  const about = useAbout();
  return (
    <>
      <Image
        src="/about/career/FasooLogo.svg"
        width={150}
        height={200}
        alt="career"
      />
      <div className="text-sm text-muted-foreground mt-2">2021.07 ~ 재직중</div>
      <Timeline
        items={about.career.details.map((c) => ({
          date: c.date,
          title: c.title,
          description: c.description,
          icon: "milestone",
          details: c.details,
          skills: c.skills,
          featured: c.featured,
        }))}
        className="mt-8"
      />
    </>
  );
}
