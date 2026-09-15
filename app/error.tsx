"use client"; // 에러 바운더리는 클라이언트 컴포넌트여야 한다

import { useEffect } from "react";
import Link from "next/link";

// Next 16.3: 복구 함수 prop 이름은 reset이 아니라 retry
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center py-24 text-center">
      <h1 className="text-2xl font-bold mb-4">문제가 발생했습니다</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        일시적인 오류일 수 있습니다. 다시 시도해 주세요.
      </p>
      <div className="flex gap-6">
        <button
          type="button"
          onClick={() => retry()}
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
