import * as React from "react";
import Link from "next/link";
import { Badge } from "@/ui/badge"; // shadcn/ui
import { cn } from "@/app/lib/utils"; // shadcn 기본 utils(경로 다르면 맞춰 수정)
import { Code2, Database, Box, Cloud, Server, Wrench } from "lucide-react";
import Image from "next/image";

/**
 * 약간의 브랜드 컬러와 라운드 Pill 스타일을 사용합니다.
 * 동적 클래스가 아니라 "정적 클래스 문자열"을 매핑해 Tailwind 정리 과정에서도 안전합니다.
 */

/* ----------------------------- Brand Icons ----------------------------- */
/* (필수는 아니지만 자주 쓰는 몇 개는 간단한 인라인 SVG 제공) */

const ReactLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 228" width="1em" height="1em" {...props}>
    <g fill="none">
      <ellipse
        cx="128"
        cy="113.5"
        rx="110"
        ry="44"
        stroke="#087EA4"
        strokeWidth="16"
      />
      <ellipse
        cx="128"
        cy="113.5"
        rx="110"
        ry="44"
        transform="rotate(60 128 113.5)"
        stroke="#087EA4"
        strokeWidth="16"
      />
      <ellipse
        cx="128"
        cy="113.5"
        rx="110"
        ry="44"
        transform="rotate(120 128 113.5)"
        stroke="#087EA4"
        strokeWidth="16"
      />
      <circle cx="128" cy="113.5" r="14" fill="#087EA4" />
    </g>
  </svg>
);

const NextLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <g clip-path="url(#clip0)">
        <path
          d="M11.2141 0.00645944C11.1625 0.0111515 10.9982 0.0275738 10.8504 0.039304C7.44164 0.346635 4.24868 2.18593 2.22639 5.01291C1.10029 6.58476 0.380059 8.36775 0.107918 10.2563C0.0117302 10.9156 0 11.1103 0 12.0041C0 12.898 0.0117302 13.0927 0.107918 13.7519C0.760117 18.2587 3.96716 22.0452 8.31672 23.4481C9.0956 23.6991 9.91672 23.8704 10.8504 23.9736C11.2141 24.0135 12.7859 24.0135 13.1496 23.9736C14.7613 23.7953 16.1267 23.3965 17.4733 22.7091C17.6798 22.6035 17.7196 22.5754 17.6915 22.5519C17.6727 22.5378 16.793 21.3578 15.7372 19.9314L13.8182 17.339L11.4135 13.7801C10.0903 11.8235 9.00176 10.2235 8.99238 10.2235C8.98299 10.2211 8.97361 11.8024 8.96891 13.7331C8.96188 17.1138 8.95953 17.2499 8.9173 17.3296C8.85631 17.4446 8.80938 17.4915 8.71085 17.5431C8.63578 17.5807 8.57009 17.5877 8.21584 17.5877H7.80997L7.70205 17.5197C7.63167 17.4751 7.58006 17.4164 7.54487 17.3484L7.4956 17.2428L7.50029 12.539L7.50733 7.83285L7.58006 7.74136C7.6176 7.69209 7.69736 7.62875 7.75367 7.59825C7.84985 7.55133 7.88739 7.54664 8.29325 7.54664C8.77185 7.54664 8.85161 7.5654 8.97595 7.70147C9.01114 7.73901 10.3132 9.7003 11.871 12.0628C13.4287 14.4252 15.5589 17.651 16.6053 19.2346L18.5056 22.1132L18.6018 22.0499C19.4534 21.4962 20.3543 20.7079 21.0674 19.8868C22.5853 18.1437 23.5636 16.0182 23.8921 13.7519C23.9883 13.0927 24 12.898 24 12.0041C24 11.1103 23.9883 10.9156 23.8921 10.2563C23.2399 5.74957 20.0328 1.96306 15.6833 0.560125C14.9161 0.311445 14.0997 0.140184 13.1848 0.036958C12.9595 0.0134976 11.4088 -0.0123089 11.2141 0.00645944ZM16.1267 7.26511C16.2393 7.32142 16.3308 7.42933 16.3636 7.54194C16.3824 7.60294 16.3871 8.90734 16.3824 11.8469L16.3754 16.0651L15.6317 14.9249L14.8856 13.7848V10.7185C14.8856 8.73608 14.895 7.62171 14.9091 7.56775C14.9466 7.43637 15.0287 7.33315 15.1413 7.27215C15.2375 7.22288 15.2727 7.21819 15.6411 7.21819C15.9883 7.21819 16.0493 7.22288 16.1267 7.26511Z"
          fill="#000000"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="24" height="24" fill="white"></rect>
        </clipPath>
      </defs>
    </g>
  </svg>
);

const TSLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 256 256"
    version="1.1"
    width="1em"
    height="1em"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    fill="#000000"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <polygon
          fill="#007ACC"
          transform="translate(128.000000, 128.000000) scale(1, -1) translate(-128.000000, -128.000000) "
          points="0 128 0 0 128 0 256 0 256 128 256 256 128 256 0 256"
        ></polygon>
        <path
          d="M146.658132,223.436863 L146.739401,212.953054 L130.079084,212.953054 L113.418767,212.953054 L113.418767,165.613371 L113.418767,118.273689 L101.63464,118.273689 L89.8505126,118.273689 L89.8505126,165.613371 L89.8505126,212.953054 L73.1901951,212.953054 L56.5298776,212.953054 L56.5298776,223.233689 C56.5298776,228.922577 56.6517824,233.676863 56.8143221,233.798768 C56.9362269,233.961308 77.2130522,234.042577 101.797179,234.001943 L146.536227,233.880038 L146.658132,223.436863 Z"
          fill="#FFFFFF"
          transform="translate(101.634640, 176.142993) rotate(-180.000000) translate(-101.634640, -176.142993) "
        ></path>
        <path
          d="M206.566631,234.272145 C213.068219,232.646748 218.025679,229.761668 222.57679,225.048018 C224.933616,222.528653 228.428219,217.936907 228.712663,216.839764 C228.793933,216.514684 217.659965,209.037859 210.914568,204.852462 C210.670758,204.689922 209.69552,205.74643 208.598377,207.371827 C205.306949,212.166748 201.852981,214.239129 196.570441,214.604843 C188.809171,215.133097 183.811076,211.069605 183.851711,204.283573 C183.851711,202.292462 184.136155,201.114049 184.948854,199.488653 C186.65552,195.953414 189.825044,193.840399 199.7806,189.533097 C218.106949,181.649922 225.949489,176.448653 230.825679,169.053097 C236.270758,160.804208 237.489806,147.638494 233.792028,137.845478 C229.728536,127.199129 219.651076,119.966113 205.469489,117.568653 C201.080917,116.796589 190.678377,116.918494 185.964727,117.771827 C175.684092,119.600399 165.931711,124.679764 159.917743,131.343891 C157.560917,133.944526 152.969171,140.730557 153.253616,141.218176 C153.37552,141.380716 154.432028,142.030875 155.610441,142.721668 C156.748219,143.371827 161.05552,145.850557 165.119012,148.207383 L172.473933,152.474049 L174.01806,150.198494 C176.171711,146.907065 180.885362,142.396589 183.729806,140.893097 C191.897425,136.585795 203.112663,137.195319 208.639012,142.15278 C210.995838,144.30643 211.971076,146.541351 211.971076,149.83278 C211.971076,152.799129 211.605362,154.099446 210.061235,156.334367 C208.070123,159.178811 204.006631,161.576272 192.466314,166.574367 C179.259965,172.263256 173.571076,175.798494 168.369806,181.406113 C165.362822,184.656907 162.518377,189.858176 161.339965,194.206113 C160.364727,197.822621 160.120917,206.884208 160.892981,210.541351 C163.61552,223.300716 173.245996,232.199764 187.143139,234.841034 C191.653616,235.694367 202.137425,235.369287 206.566631,234.272145 Z"
          fill="#FFFFFF"
          transform="translate(194.578507, 176.190240) scale(1, -1) translate(-194.578507, -176.190240) "
        ></path>
      </g>
    </g>
  </svg>
);

const JSLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>JavaScript</title>
    <path
      fill="#F7DF1E"
      d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"
    />
  </svg>
);

const NodeLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 272" width="1em" height="1em" {...props}>
    <path d="M127 6 13 72v128l114 66 114-66V72L127 6Z" fill="#3C873A" />
    <path
      d="M127 31 36 84v104l91 53 91-53V84l-91-53z"
      fill="#fff"
      opacity=".2"
    />
  </svg>
);

const RecoilLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Recoil</title>
    <path
      fill="#3578E5"
      d="M17.09 8.862a3.017 3.018 0 00-2.615-2.43l-.245-.03a1.662 1.662 0 01-1.453-1.645v-.856a2.028 2.028 0 10-1.602-.02v.874a3.263 3.264 0 002.855 3.236l.245.032c.764.096 1.144.66 1.246 1.155.1.495-.03 1.163-.698 1.55a2.569 2.569 0 01-1.055.337l-3.68.346a4.212 4.212 0 00-1.71.546 3.02 3.02 0 00-1.468 3.257 3.017 3.018 0 002.615 2.43l.245.032a1.662 1.662 0 011.453 1.644v.777a2.03 2.03 0 101.602.016v-.793a3.263 3.264 0 00-2.856-3.236l-.244-.032c-.764-.096-1.145-.66-1.246-1.155-.1-.495.03-1.163.697-1.55a2.569 2.569 0 011.057-.337l3.68-.345a4.212 4.212 0 001.71-.546 3.023 3.024 0 001.467-3.258zm-2.653  4.708a5.71 5.71 0 01-.436.06l-1.543.147 1.93 2.119a3.47 3.47 0 01.906 2.34H16.9a5.07 5.07 0 00-1.325-3.42zm-5.003-3.11a4.65 4.65 0 01.546-.08l1.427-.136L9.469 8.12a3.47 3.47 0 01-.905-2.34H6.963c0 1.267.47 2.483 1.324 3.42z"
    />
  </svg>
);
const CSSLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>CSS</title>
    <path
      fill="#663399"
      d="M0 0v20.16A3.84 3.84 0 0 0 3.84 24h16.32A3.84 3.84 0 0 0 24 20.16V3.84A3.84 3.84 0 0 0 20.16 0Zm14.256 13.08c1.56 0 2.28 1.08 2.304 2.64h-1.608c.024-.288-.048-.6-.144-.84-.096-.192-.288-.264-.552-.264-.456 0-.696.264-.696.84-.024.576.288.888.768 1.08.72.288 1.608.744 1.92 1.296q.432.648.432 1.656c0 1.608-.912 2.592-2.496 2.592-1.656 0-2.4-1.032-2.424-2.688h1.68c0 .792.264 1.176.792 1.176.264 0 .456-.072.552-.24.192-.312.24-1.176-.048-1.512-.312-.408-.912-.6-1.32-.816q-.828-.396-1.224-.936c-.24-.36-.36-.888-.36-1.536 0-1.44.936-2.472 2.424-2.448m5.4 0c1.584 0 2.304 1.08 2.328 2.64h-1.608c0-.288-.048-.6-.168-.84-.096-.192-.264-.264-.528-.264-.48 0-.72.264-.72.84s.288.888.792 1.08c.696.288 1.608.744 1.92 1.296.264.432.408.984.408 1.656.024 1.608-.888 2.592-2.472 2.592-1.68 0-2.424-1.056-2.448-2.688h1.68c0 .744.264 1.176.792 1.176.264 0 .456-.072.552-.24.216-.312.264-1.176-.048-1.512-.288-.408-.888-.6-1.32-.816-.552-.264-.96-.576-1.2-.936s-.36-.888-.36-1.536c-.024-1.44.912-2.472 2.4-2.448m-11.031.018c.711-.006 1.419.198 1.839.63.432.432.672 1.128.648 1.992H9.336c.024-.456-.096-.792-.432-.96-.312-.144-.768-.048-.888.24-.12.264-.192.576-.168.864v3.504c0 .744.264 1.128.768 1.128a.65.65 0 0 0 .552-.264c.168-.24.192-.552.168-.84h1.776c.096 1.632-.984 2.712-2.568 2.688-1.536 0-2.496-.864-2.472-2.472v-4.032c0-.816.24-1.44.696-1.848.432-.408 1.146-.624 1.857-.63"
    />
  </svg>
);

const ShadcnLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>shadcn/ui</title>
    <path
      fill="#FFF"
      d="M22.219 11.784 11.784 22.219c-.407.407-.407 1.068 0 1.476.407.407 1.068.407 1.476 0L23.695 13.26c.407-.408.407-1.069 0-1.476-.408-.407-1.069-.407-1.476 0ZM20.132.305.305 20.132c-.407.407-.407 1.068 0 1.476.408.407 1.069.407 1.476 0L21.608 1.781c.407-.407.407-1.068 0-1.476-.408-.407-1.069-.407-1.476 0Z"
    />
  </svg>
);

const ReduxLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    width="1em"
    height="1em"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M21.7868 21.556C22.8939 21.4433 23.7338 20.505 23.6956 19.3789C23.6575 18.253 22.703 17.3522 21.5577 17.3522H21.4814C20.2978 17.3897 19.3817 18.3656 19.4199 19.5291C19.4581 20.0921 19.6871 20.58 20.0307 20.9178C18.7327 23.4326 16.7475 25.2717 13.7698 26.8106C11.7464 27.8615 9.6468 28.2369 7.54715 27.9742C5.82918 27.749 4.49301 26.9984 3.65301 25.7596C2.43144 23.9205 2.31695 21.9312 3.34773 19.942C4.07312 18.5157 5.21828 17.4647 5.94367 16.9392C5.79098 16.4513 5.56187 15.6256 5.44738 15.0251C-0.0882044 18.9661 0.484491 24.2959 2.16426 26.8106C3.42402 28.6873 5.98187 29.8509 8.80691 29.8509C9.57039 29.8509 10.3339 29.7757 11.0975 29.5882C15.9841 28.6498 19.6872 25.7972 21.7868 21.556ZM28.5059 16.9018C25.6045 13.5613 21.3287 11.7222 16.4421 11.7222H15.8314C15.4878 11.0466 14.7624 10.5961 13.9607 10.5961H13.8843C12.7009 10.6337 11.7848 11.6095 11.8229 12.7731C11.8611 13.8991 12.8154 14.7999 13.9607 14.7999H14.037C14.8769 14.7624 15.6023 14.2369 15.9077 13.5237H16.5948C19.4963 13.5237 22.2449 14.3494 24.7265 15.9634C26.6352 17.202 28.0096 18.816 28.7731 20.7677C29.4221 22.3441 29.3839 23.883 28.6967 25.1967C27.6278 27.1859 25.8336 28.2744 23.4666 28.2744C21.9395 28.2744 20.4889 27.824 19.7253 27.4862C19.3054 27.8615 18.5418 28.462 18.0073 28.8375C19.649 29.5881 21.3287 30.001 22.9321 30.001C26.597 30.001 29.3076 28.0116 30.3384 26.0224C31.4454 23.8454 31.369 20.0921 28.5059 16.9018ZM9.1123 22.1939C9.15051 23.3199 10.1049 24.2206 11.2502 24.2206H11.3266C12.51 24.1832 13.4262 23.2073 13.388 22.0438C13.3499 20.9177 12.3954 20.017 11.2502 20.017H11.1739C11.0975 20.017 10.9829 20.017 10.9067 20.0544C9.3414 17.5022 8.69242 14.7248 8.92152 11.7221C9.0741 9.47006 9.83769 7.51828 11.1739 5.9043C12.2809 4.51555 14.4188 3.83996 15.8696 3.80252C19.9162 3.7274 21.634 8.68179 21.7486 10.6711C22.2449 10.7837 23.0848 11.0465 23.6575 11.2342C23.1993 5.15382 19.3817 2.00098 15.7169 2.00098C12.2809 2.00098 9.1123 4.44067 7.85242 8.04387C6.09637 12.8481 7.24164 17.4647 9.37949 21.1055C9.18871 21.3682 9.0741 21.7811 9.1123 22.194V22.1939Z"
        fill="#764ABC"
      ></path>
    </g>
  </svg>
);

const TailwindLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Tailwind CSS</title>
    <path
      fill="#06B6D4"
      d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
    />
  </svg>
);

const DockerLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 198" width="1em" height="1em" {...props}>
    <rect x="20" y="90" width="40" height="40" rx="6" fill="#086DD7" />
    <rect x="64" y="90" width="40" height="40" rx="6" fill="#086DD7" />
    <rect x="108" y="90" width="40" height="40" rx="6" fill="#086DD7" />
    <rect x="64" y="46" width="40" height="40" rx="6" fill="#086DD7" />
    <rect x="108" y="46" width="40" height="40" rx="6" fill="#086DD7" />
    <rect x="152" y="90" width="40" height="40" rx="6" fill="#086DD7" />
    <path
      d="M20 140h200c0 26-20 48-60 48H64C40 188 20 166 20 140z"
      fill="#21A1F1"
    />
  </svg>
);
const HTMLLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>HTML5</title>
    <path
      fill="#E34F26"
      d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"
    />
  </svg>
);
const ViteLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    width="1em"
    height="1em"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <title>file_type_vite</title>
      <path
        d="M29.8836 6.146L16.7418 29.6457c-.2714.4851-.9684.488-1.2439.0052L2.0956 6.1482c-.3-.5262.1498-1.1635.746-1.057l13.156 2.3516a.7144.7144 0 00.2537-.0004l12.8808-2.3478c.5942-.1083 1.0463.5241.7515 1.0513z"
        fill="url(#paint0_linear)"
      ></path>
      <path
        d="M22.2644 2.0069l-9.7253 1.9056a.3571.3571 0 00-.2879.3294l-.5982 10.1038c-.014.238.2045.4227.4367.3691l2.7077-.6248c.2534-.0585.4823.1647.4302.4194l-.8044 3.9393c-.0542.265.1947.4918.4536.4132l1.6724-.5082c.2593-.0787.5084.1487.4536.414l-1.2784 6.1877c-.08.387.4348.598.6495.2662L16.5173 25 24.442 9.1848c.1327-.2648-.096-.5667-.387-.5106l-2.787.5379c-.262.0505-.4848-.1934-.4109-.4497l1.8191-6.306c.074-.2568-.1496-.5009-.4118-.4495z"
        fill="url(#paint1_linear)"
      ></path>
      <defs id="defs50">
        <linearGradient
          id="paint0_linear"
          x1="6.0002"
          y1="32.9999"
          x2="235"
          y2="344"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(.07142 0 0 .07142 1.3398 1.8944)"
        >
          <stop stop-color="#41D1FF" id="stop38"></stop>
          <stop offset="1" stop-color="#BD34FE" id="stop40"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="194.651"
          y1="8.8182"
          x2="236.076"
          y2="292.989"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(.07142 0 0 .07142 1.3398 1.8944)"
        >
          <stop stop-color="#FFEA83" id="stop43"></stop>
          <stop offset=".0833" stop-color="#FFDD35" id="stop45"></stop>
          <stop offset="1" stop-color="#FFA800" id="stop47"></stop>
        </linearGradient>
      </defs>
    </g>
  </svg>
);

const WordPressLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    width="1em"
    height="1em"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <circle cx="16" cy="16" r="14" fill="#028CB0"></circle>
      <path
        d="M6.45538 16C6.45538 19.7823 8.65538 23.04 11.8369 24.5885L7.28462 12.1162C6.73798 13.338 6.45541 14.6615 6.45538 16ZM16 25.5446C17.1085 25.5446 18.1746 25.35 19.1731 25.0031L19.1054 24.8762L16.1692 16.8377L13.3092 25.1554C14.1554 25.4092 15.0608 25.5446 16 25.5446ZM17.3115 11.5238L20.7638 21.7877L21.72 18.6062C22.1262 17.2862 22.4392 16.3385 22.4392 15.5177C22.4392 14.3331 22.0162 13.5208 21.6608 12.8946C21.17 12.0992 20.7215 11.4308 20.7215 10.6523C20.7215 9.77231 21.3815 8.96 22.3292 8.96H22.4477C20.689 7.34546 18.3874 6.45141 16 6.45538C14.4192 6.45509 12.8632 6.84777 11.4718 7.59809C10.0805 8.34842 8.89746 9.43285 8.02923 10.7538L8.63846 10.7708C9.63692 10.7708 11.1769 10.6438 11.1769 10.6438C11.7015 10.6185 11.7608 11.3715 11.2446 11.4308C11.2446 11.4308 10.7285 11.4985 10.1446 11.5238L13.6308 21.8638L15.7208 15.6023L14.2315 11.5238C13.898 11.5054 13.565 11.4772 13.2331 11.4392C12.7169 11.4054 12.7762 10.6185 13.2923 10.6438C13.2923 10.6438 14.8662 10.7708 15.8054 10.7708C16.8038 10.7708 18.3438 10.6438 18.3438 10.6438C18.86 10.6185 18.9277 11.3715 18.4115 11.4308C18.4115 11.4308 17.8954 11.49 17.3115 11.5238ZM20.7977 24.25C22.2416 23.4104 23.4399 22.2066 24.2729 20.7589C25.1059 19.3112 25.5444 17.6703 25.5446 16C25.5446 14.3415 25.1215 12.7846 24.3769 11.4223C24.5281 12.9211 24.3012 14.4339 23.7169 15.8223L20.7977 24.25ZM16 27C13.0826 27 10.2847 25.8411 8.22183 23.7782C6.15893 21.7153 5 18.9174 5 16C5 13.0826 6.15893 10.2847 8.22183 8.22183C10.2847 6.15893 13.0826 5 16 5C18.9174 5 21.7153 6.15893 23.7782 8.22183C25.8411 10.2847 27 13.0826 27 16C27 18.9174 25.8411 21.7153 23.7782 23.7782C21.7153 25.8411 18.9174 27 16 27Z"
        fill="white"
      ></path>
    </g>
  </svg>
);
const SocketLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 256 256"
    version="1.1"
    width="1em"
    height="1em"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    preserveAspectRatio="xMidYMid"
    fill="#000000"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <path
          d="M96.4465116,7.38232558 C128.714419,-0.893023256 164.375814,3.92930233 192.833488,21.492093 C228.673488,42.9246512 252.070698,83.467907 252.666047,125.20186 C253.975814,167.352558 232.007442,209.146047 196.703256,232.066977 C157.410233,258.500465 103.054884,259.512558 62.9283721,234.388837 C22.027907,209.979535 -1.8455814,160.744186 4.28651163,113.473488 C9.22790698,63.5237209 47.8065116,19.467907 96.4465116,7.38232558 L96.4465116,7.38232558 L96.4465116,7.38232558 Z"
          fill="#010101"
        ></path>
        <path
          d="M91.5051163,27.8027907 C152.468837,3.39348837 227.244651,48.4613953 233.555349,113.830698 C243.378605,172.651163 194.56,232.424186 134.965581,234.150698 C78.2883721,239.806512 23.5162791,191.76186 21.9088372,134.846512 C17.6818605,88.7665116 48.0446512,43.0437209 91.5051163,27.8027907 L91.5051163,27.8027907 L91.5051163,27.8027907 Z"
          fill="#FFFFFF"
        ></path>
        <path
          d="M97.6372093,121.689302 C124.963721,99.3637209 151.694884,76.264186 179.616744,54.5934884 C164.971163,77.0976744 149.908837,99.304186 135.263256,121.808372 C122.701395,121.867907 110.139535,121.867907 97.6372093,121.689302 L97.6372093,121.689302 L97.6372093,121.689302 Z"
          fill="#010101"
        ></path>
        <path
          d="M120.736744,134.132093 C133.35814,134.132093 145.92,134.132093 158.48186,134.310698 C130.976744,156.517209 104.364651,179.795349 76.3832558,201.406512 C91.0288372,178.902326 106.091163,156.636279 120.736744,134.132093 L120.736744,134.132093 L120.736744,134.132093 Z"
          fill="#010101"
        ></path>
      </g>
    </g>
  </svg>
);
const StorybookLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="-31.5 0 319 319"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
    preserveAspectRatio="xMidYMid"
    fill="#000000"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <defs>
        <path
          d="M9.87245893,293.324145 L0.0114611411,30.5732167 C-0.314208957,21.8955842 6.33948896,14.5413918 15.0063196,13.9997149 L238.494389,0.0317105427 C247.316188,-0.519651867 254.914637,6.18486163 255.466,15.0066607 C255.486773,15.339032 255.497167,15.6719708 255.497167,16.0049907 L255.497167,302.318596 C255.497167,311.157608 248.331732,318.323043 239.492719,318.323043 C239.253266,318.323043 239.013844,318.317669 238.774632,318.306926 L25.1475605,308.712253 C16.8276309,308.338578 10.1847994,301.646603 9.87245893,293.324145 L9.87245893,293.324145 Z"
          id="path-1"
        ></path>
      </defs>
      <g>
        <mask id="mask-2" fill="white">
          <use xlinkHref="#path-1"> </use>
        </mask>
        <use fill="#FF4785" fill-rule="nonzero" xlinkHref="#path-1"></use>
        <path
          d="M188.665358,39.126973 L190.191903,2.41148534 L220.883535,0 L222.205755,37.8634126 C222.251771,39.1811466 221.22084,40.2866846 219.903106,40.3327009 C219.338869,40.3524045 218.785907,40.1715096 218.342409,39.8221376 L206.506729,30.4984116 L192.493574,41.1282444 C191.443077,41.9251106 189.945493,41.7195021 189.148627,40.6690048 C188.813185,40.2267976 188.6423,39.6815326 188.665358,39.126973 Z M149.413703,119.980309 C149.413703,126.206975 191.355678,123.222696 196.986019,118.848893 C196.986019,76.4467826 174.234041,54.1651411 132.57133,54.1651411 C90.9086182,54.1651411 67.5656805,76.7934542 67.5656805,110.735941 C67.5656805,169.85244 147.345341,170.983856 147.345341,203.229219 C147.345341,212.280549 142.913138,217.654777 133.162291,217.654777 C120.456641,217.654777 115.433477,211.165914 116.024438,189.103298 C116.024438,184.317101 67.5656805,182.824962 66.0882793,189.103298 C62.3262146,242.56887 95.6363019,257.990394 133.753251,257.990394 C170.688279,257.990394 199.645341,238.303123 199.645341,202.663511 C199.645341,139.304202 118.683759,141.001326 118.683759,109.604526 C118.683759,96.8760922 128.139127,95.178968 133.753251,95.178968 C139.662855,95.178968 150.300143,96.2205679 149.413703,119.980309 Z"
          fill="#FFFFFF"
          fill-rule="nonzero"
          mask="url(#mask-2)"
        ></path>
      </g>
    </g>
  </svg>
);
/* ----------------------------- Tech Meta ----------------------------- */

export const TECHS = {
  react: {
    label: "React",
    className: "bg-[#E8F7FF] text-[#087EA4] border border-[#B3ECFF]",
    Icon: ReactLogo,
    href: "https://react.dev",
  },
  nextjs: {
    label: "Next.js",
    className: "bg-black text-white border border-zinc-800",
    Icon: NextLogo,
    href: "https://nextjs.org",
  },
  html: {
    label: "HTML",
    className: "bg-[#F0F7FF] text-[#3178C6] border border-[#CFE2FF]",
    Icon: HTMLLogo,
    href: "https://www.html.com",
  },
  css: {
    label: "CSS",
    className: "bg-[#F0F7FF] text-[#3178C6] border border-[#CFE2FF]",
    Icon: CSSLogo,
    href: "https://www.css.com",
  },
  typescript: {
    label: "TypeScript",
    className: "bg-[#F0F7FF] text-[#3178C6] border border-[#CFE2FF]",
    Icon: TSLogo,
    href: "https://www.typescriptlang.org",
  },
  javascript: {
    label: "JavaScript",
    className: "bg-[#F7DF1E] text-[#000] border border-[#F7DF1E]",
    Icon: JSLogo,
    href: "https://www.javascript.com",
  },
  storybook: {
    label: "Storybook",
    className: "bg-[#FF4785] text-[#FFF] border border-[#FF4785]",
    Icon: StorybookLogo,
    href: "https://storybook.js.org",
  },
  wordpress: {
    label: "WordPress",
    className: "bg-[#0073AA] text-[#FFF] border border-[#0073AA]",
    Icon: WordPressLogo,
    href: "https://wordpress.org",
  },
  express: {
    label: "Express",
    className: "bg-[#F7F7F7] text-[#3578E5] border border-[#D7E4FF]",
    Icon: Code2,
    href: "https://expressjs.com",
  },
  nodemailer: {
    label: "Nodemailer",
    className: "bg-[#F7F7F7] text-[#3578E5] border border-[#D7E4FF]",
    Icon: Code2,
    href: "https://nodemailer.com",
  },
  yup: {
    label: "Yup",
    className: "bg-[#F7F7F7] text-[#3578E5] border border-[#D7E4FF]",
    Icon: Code2,
    href: "https://yup.dev",
  },
  "react-hook-form": {
    label: "React Hook Form",
    className: "bg-[#F7F7F7] text-[#3578E5] border border-[#D7E4FF]",
    Icon: Code2,
    href: "https://react-hook-form.com",
  },
  socket: {
    label: "Socket.io",
    className: "bg-[#F7F7F7] text-[#3578E5] border border-[#D7E4FF]",
    Icon: SocketLogo,
    href: "https://socket.io",
  },
  node: {
    label: "Node.js",
    className: "bg-[#EDF7EF] text-[#3C873A] border border-[#D7F0DB]",
    Icon: NodeLogo,
    href: "https://nodejs.org",
  },
  redux: {
    label: "Redux",
    className: "bg-[#F7F7F7] text-[#3578E5] border border-[#D7E4FF]",
    Icon: ReduxLogo,
    href: "https://redux.js.org",
  },
  recoil: {
    label: "Recoil",
    className: "bg-[#F7F7F7] text-[#3578E5] border border-[#D7E4FF]",
    Icon: RecoilLogo,
    href: "https://recoil.dev",
  },
  tailwind: {
    label: "Tailwind CSS",
    className: "bg-[#ECFDFF] text-[#06B6D4] border border-[#CFF6FD]",
    Icon: TailwindLogo,
    href: "https://tailwindcss.com",
  },
  shadcn: {
    label: "shadcn/ui",
    className:
      "bg-zinc-50 text-zinc-900 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-800",
    Icon: ShadcnLogo,
    href: "https://ui.shadcn.com",
  },
  prisma: {
    label: "Prisma",
    className: "bg-[#F2FBF9] text-[#0C344B] border border-[#D4F3EC]",
    Icon: Wrench,
    href: "https://www.prisma.io",
  },
  postgres: {
    label: "PostgreSQL",
    className: "bg-[#F3F6FB] text-[#336791] border border-[#DCE6F3]",
    Icon: Database,
    href: "https://www.postgresql.org",
  },
  mysql: {
    label: "MySQL",
    className: "bg-[#F5FAFF] text-[#00758F] border border-[#DCEFFF]",
    Icon: Database,
    href: "https://www.mysql.com",
  },
  mongodb: {
    label: "MongoDB",
    className: "bg-[#F1FBF4] text-[#116149] border border-[#D8F4E1]",
    Icon: Database,
    href: "https://www.mongodb.com",
  },
  redis: {
    label: "Redis",
    className: "bg-[#FFF5F5] text-[#D92C20] border border-[#FFD6D6]",
    Icon: Database,
    href: "https://redis.io",
  },
  aws: {
    label: "AWS",
    className: "bg-[#FFF8ED] text-[#FF9900] border border-[#FFE8C2]",
    Icon: Cloud,
    href: "https://aws.amazon.com",
  },
  gcp: {
    label: "GCP",
    className: "bg-[#F3F7FF] text-[#4285F4] border border-[#DDE8FF]",
    Icon: Cloud,
    href: "https://cloud.google.com",
  },
  azure: {
    label: "Azure",
    className: "bg-[#F2F8FF] text-[#0078D4] border border-[#D7ECFF]",
    Icon: Cloud,
    href: "https://azure.microsoft.com",
  },
  docker: {
    label: "Docker",
    className: "bg-[#F1F7FF] text-[#086DD7] border border-[#D6E8FF]",
    Icon: DockerLogo,
    href: "https://www.docker.com",
  },
  kubernetes: {
    label: "Kubernetes",
    className: "bg-[#F1F6FF] text-[#326CE5] border border-[#D7E4FF]",
    Icon: Server,
    href: "https://kubernetes.io",
  },
  vite: {
    label: "Vite",
    className: "bg-[#FBF5FF] text-[#646CFF] border border-[#E8E2FF]",
    Icon: ViteLogo,
    href: "https://vitejs.dev",
  },
  jest: {
    label: "Jest",
    className: "bg-[#FFF5F7] text-[#944058] border border-[#FFD9E1]",
    Icon: Code2,
    href: "https://jestjs.io",
  },
  vitest: {
    label: "Vitest",
    className: "bg-[#F7FFF5] text-[#5BBD3A] border border-[#E2F7DA]",
    Icon: Code2,
    href: "https://vitest.dev",
  },
  cypress: {
    label: "Cypress",
    className: "bg-[#F5F7FA] text-[#24292E] border border-[#E5E9F0]",
    Icon: Code2,
    href: "https://www.cypress.io",
  },
  playwright: {
    label: "Playwright",
    className: "bg-[#F3FFF6] text-[#1FAD66] border border-[#D7F6E4]",
    Icon: Code2,
    href: "https://playwright.dev",
  },
} as const;

export type TechKey = keyof typeof TECHS;

/* ----------------------------- Aliases ----------------------------- */

const ALIASES: Record<string, TechKey> = {
  react: "react",
  "react.js": "react",
  reactjs: "react",
  next: "nextjs",
  "next.js": "nextjs",
  nextjs: "nextjs",
  ts: "typescript",
  "type-script": "typescript",
  typescript: "typescript",
  node: "node",
  "node.js": "node",
  nodejs: "node",
  tailwind: "tailwind",
  tailwindcss: "tailwind",
  "tailwind-css": "tailwind",
  shadcn: "shadcn",
  "shadcn/ui": "shadcn",
  prisma: "prisma",
  postgres: "postgres",
  postgresql: "postgres",
  mysql: "mysql",
  mongo: "mongodb",
  mongodb: "mongodb",
  redis: "redis",
  aws: "aws",
  "amazon web services": "aws",
  gcp: "gcp",
  "google cloud": "gcp",
  azure: "azure",
  docker: "docker",
  k8s: "kubernetes",
  kubernetes: "kubernetes",
  vite: "vite",
  jest: "jest",
  vitest: "vitest",
  cypress: "cypress",
  playwright: "playwright",
};

/* ----------------------------- Types ----------------------------- */

/* ----------------------------- Helper: 지원 키 노출 ----------------------------- */

export const SUPPORTED_TECHS = Object.keys(TECHS) as TechKey[];
