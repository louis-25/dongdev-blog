import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 클립보드 복사. 성공 여부를 돌려준다.
 * navigator.clipboard는 보안 컨텍스트(https·localhost)에서만 존재한다 —
 * 폰에서 http://192.168.x.x 로 로컬 서버에 붙는 경우처럼 없는 환경이 실제로 있고,
 * 권한 거부로 reject되기도 한다. 호출부가 실패를 표시할 수 있게 예외 대신 boolean을 쓴다.
 */
export async function copyText(text: string): Promise<boolean> {
  if (!navigator.clipboard) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
