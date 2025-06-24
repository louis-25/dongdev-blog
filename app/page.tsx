import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";
import {
  FadeIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
} from "./components/animations";

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="prose dark:prose-invert">
      <FadeIn>
        <h1>DongDev Blog</h1>
        <p>
          안녕하세요! 프론트엔드 개발자 DongDev의 블로그입니다. 개발 경험과
          지식을 공유합니다.
        </p>
      </FadeIn>

      <SlideIn delay={0.2}>
        <h2>최근 포스트</h2>
        <StaggerContainer>
          <ul>
            {posts.map((post) => (
              <StaggerItem key={post._id}>
                <li>
                  <Link href={post.url}>{post.title}</Link>
                </li>
              </StaggerItem>
            ))}
          </ul>
        </StaggerContainer>
      </SlideIn>
    </div>
  );
}
