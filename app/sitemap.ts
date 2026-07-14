import type { MetadataRoute } from "next";
import { seo } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: seo.siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${seo.siteUrl}/kvkk`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
