import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Dongdev 블로그</h1>
        <p className="mt-4 text-muted-foreground">
          프론트엔드, 웹 애니메이션, 성능 최적화, 개발 생산성에 관한 글을
          기록하는 공간입니다. 실무에서 얻은 인사이트와 시행착오를 바탕으로,
          다시 찾고 싶어지는 문서를 지향합니다.
        </p>

        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          <article className="rounded-lg border p-5 flex justify-between flex-col">
            <div>
              <h2 className="text-lg font-semibold">최신 글 모아보기</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                가장 최근에 발행된 글을 한눈에 확인해 보세요.
              </p>
            </div>
            <Link
              href="/blog"
              className="mt-3 inline-flex items-center text-primary hover:underline"
            >
              블로그 보러가기 →
            </Link>
          </article>

          <article className="rounded-lg border p-5 flex justify-between flex-col">
            <div>
              <h2 className="text-lg font-semibold">이 블로그는요</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                작성자 소개와 운영 철학을 담았습니다.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-3 inline-flex items-center text-primary hover:underline"
            >
              소개 페이지 →
            </Link>
          </article>
        </section>
      </main>
    </>
  );
}
