import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// Quitte l'aperçu : bouton du bandeau (CmsPreviewBanner).
export async function GET() {
  const draft = await draftMode();
  draft.disable();
  redirect("/");
}
