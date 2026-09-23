import type { MetadataRoute } from "next";
import { TERMINALE_CHAPTERS } from "../data/terminale";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://capses.vercel.app";
  const staticRoutes = [
    "",
    "/bts-cejm",
    "/premiere",
    "/seconde",
    "/seconde/creation-richesses",
    "/seconde/formation-prix",
    "/methodes",
    "/espace-eleves",
    "/confidentialite",
    "/cgu",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: base + route,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...TERMINALE_CHAPTERS.map((chapter) => ({
      url: `${base}/terminale/${chapter.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
