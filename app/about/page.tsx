export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-16 lg:p-24">
      <article className="w-full max-w-2xl prose prose-sm sm:prose lg:prose-lg dark:prose-invert">
        <h1 className="text-2xl sm:text-3xl md:text-4xl">About Me</h1>
        <p className="text-base sm:text-lg">
          안녕하세요! 저는 웹 개발자입니다. Next.js, React, TypeScript를 주로
          사용하여 웹 애플리케이션을 개발하고 있습니다.
        </p>

        <h2 className="text-xl sm:text-2xl">기술 스택</h2>
        <ul className="space-y-2">
          <li>Frontend: React, Next.js, TypeScript</li>
          <li>Styling: Tailwind CSS, CSS-in-JS</li>
          <li>Backend: Node.js, Express</li>
          <li>Database: MongoDB, PostgreSQL</li>
          <li>Tools: Git, Docker</li>
        </ul>

        <h2 className="text-xl sm:text-2xl">관심사</h2>
        <p className="text-base sm:text-lg">
          웹 개발, 사용자 경험(UX), 성능 최적화, 클린 코드에 관심이 많습니다.
          새로운 기술을 배우고 적용하는 것을 좋아하며, 개발자 커뮤니티에
          기여하고자 합니다.
        </p>

        <h2 className="text-xl sm:text-2xl">연락처</h2>
        <p className="text-base sm:text-lg">
          블로그나 프로젝트에 대해 궁금한 점이 있으시다면 언제든 연락 주세요.
        </p>
      </article>
    </main>
  );
}
