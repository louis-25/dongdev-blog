import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /admin은 Sveltia CMS 관리 화면(public/admin) — 색인 대상이 아니다
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
