import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

// Active l'aperçu (Draft Mode) : appelé depuis l'éditeur de l'espace client
// de l'agence (atelierwebromand.ch/espace-client/mba-sanit), jamais par un
// visiteur — voir CMS_PREVIEW_SECRET dans src/lib/cms.ts.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") ?? "/";

  const expected = process.env.CMS_PREVIEW_SECRET;
  if (!expected || secret !== expected) {
    return new Response("Jeton invalide.", { status: 401 });
  }
  // Chemin interne uniquement : une redirection vers un domaine tiers
  // ouvrirait un open redirect.
  if (!slug.startsWith("/") || slug.startsWith("//")) {
    return new Response("Chemin invalide.", { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();
  redirect(slug);
}
