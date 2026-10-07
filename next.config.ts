import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF d'abord : à qualité égale, nettement plus léger que le WebP.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    /* Anciennes adresses probables de l'ancien site (créateur IONOS),
       redirigées en permanence vers leur équivalent. Liste PROVISOIRE :
       l'ancien site n'était presque pas indexé, aucune adresse réelle n'a
       pu être relevée. À compléter avec les « Pages » de la Search Console
       dès qu'elle remonte des 404. */
    const anciennes: [string, string][] = [
      ["/accueil", "/"],
      ["/index.html", "/"],
      ["/index.php", "/"],
      ["/home", "/"],
      ["/nos-services", "/services"],
      ["/nos-realisations", "/realisations"],
      ["/realisation", "/realisations"],
      ["/a-propos", "/equipe"],
      ["/qui-sommes-nous", "/equipe"],
      ["/contact", "/devis"],
      ["/contactez-nous", "/devis"],
      ["/devis-gratuit", "/devis"],
      ["/mentions", "/mentions-legales"],
      ["/impressum", "/mentions-legales"],
    ];
    return anciennes.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
