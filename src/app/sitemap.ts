import type { MetadataRoute } from "next";
import { CATEGORIES, PAGES, REALISATIONS, SERVICES } from "@/lib/pages";
import { SITE_URL } from "@/lib/seo";

/* Pas de date de modification : une date inexacte (celle du déploiement)
   apprend à Google à ignorer ce champ. À ajouter quand on pourra donner
   la vraie date de dernière mise à jour de chaque page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority,
  });
  return [
    entry("/", 1),
    ...SERVICES.map((p) => entry(p.href, 0.9)),
    ...PAGES.map((p) => entry(p.href, p.href === "/devis" ? 0.9 : 0.8)),
    ...CATEGORIES.map((p) => entry(p.href, 0.7)),
    ...REALISATIONS.map((p) => entry(p.href, 0.6)),
    entry("/mentions-legales", 0.2),
    entry("/confidentialite", 0.2),
  ];
}
