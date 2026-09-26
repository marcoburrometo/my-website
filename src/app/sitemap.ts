import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "yearly",
      priority: 1,
      images: [`${siteUrl}/media/marco_full.jpg`],
    },
  ];
}