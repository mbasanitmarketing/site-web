/**
 * Réception du formulaire de devis, envoi par e-mail.
 *
 * L'adresse de destination et la clé d'API restent côté serveur : elles
 * ne doivent jamais partir dans le HTML.
 *
 * Envoi via l'API HTTP de Resend (fetch direct plutôt qu'un paquet npm :
 * une dépendance de moins, et l'endpoint REST ne bouge pas).
 * Il faut définir dans Vercel (Settings -> Environment Variables) :
 *   RESEND_API_KEY  la clé du compte Resend
 *   DEVIS_FROM      l'expéditeur, sur un domaine vérifié chez Resend
 *                   (ex. "MBA Sanit <site@mbasanit.ch>")
 */

const TO = "contact@mbasanit.ch";
const FROM = process.env.DEVIS_FROM ?? "MBA Sanit <onboarding@resend.dev>";

/** Longueurs max, alignées sur les attributs du formulaire. */
const LIMITS: Record<string, number> = {
  nom: 120,
  email: 160,
  telephone: 40,
  projet: 120,
  message: 4000,
};

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c] as string,
  );
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Piège à robots : ce champ est invisible, un humain ne le remplit pas.
  // On répond 200 pour ne pas renseigner le robot sur son échec.
  if (clean(body.societe, 200)) return Response.json({ ok: true });

  const nom = clean(body.nom, LIMITS.nom);
  const email = clean(body.email, LIMITS.email);
  const telephone = clean(body.telephone, LIMITS.telephone);
  const projet = clean(body.projet, LIMITS.projet);
  const message = clean(body.message, LIMITS.message);

  if (!nom || !email || !message) {
    return Response.json(
      { error: "Nom, e-mail et message sont obligatoires." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return Response.json({ error: "E-mail invalide." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Échec explicite : mieux vaut une erreur visible qu'un formulaire
    // qui fait mine d'envoyer dans le vide.
    console.error("RESEND_API_KEY manquante : demande de devis non envoyée.");
    return Response.json(
      { error: "Envoi indisponible pour le moment." },
      { status: 503 },
    );
  }

  const lignes = [
    ["Nom", nom],
    ["E-mail", email],
    ["Téléphone", telephone || "—"],
    ["Type de projet", projet || "—"],
  ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Demande de devis — ${nom}`,
      text: [
        ...lignes.map(([k, v]) => `${k} : ${v}`),
        "",
        "Message :",
        message,
      ].join("\n"),
      html: [
        ...lignes.map(
          ([k, v]) => `<p><strong>${k}</strong> : ${escapeHtml(v)}</p>`,
        ),
        `<p><strong>Message</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
      ].join(""),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend a refusé l'envoi :", res.status, detail);
    return Response.json({ error: "L’envoi a échoué." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
