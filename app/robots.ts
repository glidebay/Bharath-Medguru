import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://bharathmedguru.com/sitemap.xml",
    host: "https://bharathmedguru.com",
  };
}
