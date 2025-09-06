import { allPosts } from "contentlayer/generated";
import { TagList } from "../TagList";
import { TechKey } from "@/app/utils/SkillPicker";

function getTagsWithCounts() {
  const tagCounts: Record<string, number> = {};
  for (const post of allPosts) {
    const tags = (post.tags as TechKey[] | undefined) ?? [];
    for (const tag of tags) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
    }
  }
  const tags = Object.keys(tagCounts).sort((a, b) =>
    a.localeCompare(b)
  ) as TechKey[];
  return { tags, tagCounts };
}

const Profile = () => {
  const { tags, tagCounts } = getTagsWithCounts();

  return (
    <aside className="w-full">
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur p-4 md:p-5">
        {/* 프로필 섹션 */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-semibold">
            D
          </div>
          <div>
            <div className="text-base font-semibold">DongDev</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              Next.js & React 블로그
            </div>
          </div>
        </div>

        {/* 메뉴 섹션 */}
        {/* <nav className="mb-5">
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                href="/"
                className="block rounded-md px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                홈
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="block rounded-md px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                블로그
              </Link>
            </li>
            <li>
              <Link
                href="/tags"
                className="block rounded-md px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                태그
              </Link>
            </li>
          </ul>
        </nav> */}

        {/* 태그 섹션 */}
        <div>
          <div className="mb-2 text-sm font-medium">Tags</div>
          <TagList tags={tags} showCount tagCounts={tagCounts} />
        </div>
      </div>
    </aside>
  );
};

export default Profile;
