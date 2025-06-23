import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">페이지를 찾을 수 없습니다</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
