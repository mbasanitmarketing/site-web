import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/* Tout est ouvert, sauf les routes techniques. Les robots des assistants
   IA sont nommés pour que ce soit explicite : MBA veut être cité. */
const IA = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: IA, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
