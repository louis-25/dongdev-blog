import ParticlesBanner from "./components/ParticlesBanner";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import dayjs from "dayjs";
import { Separator } from "./components/ui/separator";
export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-3xl">
        {/* <Hero /> */}

        <ParticlesBanner />

        <p className="mt-4 text-muted-foreground text-center">
          웹개발에 관한 글을 기록하는 공간입니다.
          <br />
          실무에서 얻은 인사이트와 시행착오를 바탕으로
          <br />
          만들어가는 메모장 겸 블로그
        </p>
        {/* <Separator className="mt-4" /> */}
        <section className="rounded-lg border border-border grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr] mt-4 px-4">
          {/* 최신 글 */}
          <article className="py-4 flex justify-between flex-col">
            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">최신 글</h2>
                <Link
                  href="/blog"
                  className="inline-flex items-center text-primary text-sm hover:underline"
                >
                  블로그 보러가기
                </Link>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                최근에 발행된 글을 간단히 둘러보세요.
              </p>
              <ul className="mt-4 space-y-3">
                {[...allPosts]
                  .sort((a, b) => {
                    const ad = new Date((a as any).date ?? 0).getTime();
                    const bd = new Date((b as any).date ?? 0).getTime();
                    return bd - ad;
                  })
                  .slice(0, 4)
                  .map((post) => (
                    <li key={post.url}>
                      <Link
                        href={post.url}
                        className="block rounded-md border hover:bg-muted/40 transition-colors p-3"
                      >
                        <div className="font-medium">{post.title}</div>
                        {post.description && (
                          <div>
                            <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {post.description}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {dayjs(post.date).format("YYYY-MM-DD")}
                            </div>
                          </div>
                        )}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </article>
          <Separator orientation="vertical" className="hidden sm:block" />
          {/* 웹개발에 유용한 사이트 */}
          <article className="py-4 flex justify-between flex-col">
            <div>
              <h2 className="text-lg font-semibold">유용한 사이트</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                웹 개발에 유용한 사이트를 모았습니다.
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  {
                    name: "MDN Web Docs",
                    url: "https://developer.mozilla.org/",
                    desc: "웹 표준/브라우저 API 참고서",
                  },
                  {
                    name: "Next.js Docs",
                    url: "https://nextjs.org/docs",
                    desc: "Next.js 공식 문서",
                  },
                  {
                    name: "Tailwind CSS",
                    url: "https://tailwindcss.com/docs",
                    desc: "유틸리티-우선 CSS 프레임워크",
                  },
                  {
                    name: "Framer Motion Examples",
                    url: "https://framermotionexamples.com/",
                    desc: "React 애니메이션 라이브러리",
                  },
                  {
                    name: "Can I use",
                    url: "https://caniuse.com/",
                    desc: "브라우저 지원 현황",
                  },
                ].map((site) => (
                  <li key={site.url}>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-md border hover:bg-muted/40 transition-colors p-3"
                    >
                      <div className="font-medium">{site.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {site.desc}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
