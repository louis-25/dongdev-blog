// ESLint flat config.
// Next 16에서 `next lint`가 제거되고 @next/eslint-plugin-next가 flat config를 기본으로
// 하면서 .eslintrc.json(next/core-web-vitals)은 더 이상 동작하지 않는다.
// eslint-config-next 16은 flat config 배열을 그대로 내보내므로 @eslint/eslintrc 호환
// 레이어 없이 스프레드하면 된다.
import coreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [
      ".next/**",
      ".content-collections/**",
      "out/**",
      "node_modules/**",
      "public/**",
      "graphify-out/**",
    ],
  },
  ...coreWebVitals,
  {
    // React Compiler 시대의 신규 규칙들. 기존 코드 3곳이 걸리는데 전부
    // 의도된 패턴이고(하이드레이션 가드, MDX 동적 컴포넌트, URL↔입력 동기화),
    // 고치려면 동작이 바뀐다. Next 16 업그레이드(동작 변화 0이 목표)에 섞지 않고
    // warn으로 낮춰 가시성만 유지한다.
    //
    // 후속 과제:
    //   - app/components/ThemeSwitch.tsx      setState in effect (하이드레이션 가드)
    //   - app/components/blog/BlogToolbar.tsx setState in effect (URL q 동기화)
    //   - app/components/MDXComponents.tsx    static-components (Phase 2 렌더러 교체 시 재검토)
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
    },
  },
  {
    // eslint-config-next가 이 규칙을 off로 둔다. 외부에서 붙여 넣은 SVG의
    // HTML 표기 속성(stroke-linecap 등)이 JSX에 남으면 런타임 경고만 뜨고
    // lint는 통과해버리므로 켜둔다. (JSX에서는 strokeLinecap처럼 camelCase)
    rules: {
      "react/no-unknown-property": "error",
    },
  },
];

export default config;
