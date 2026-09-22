import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Geist, Geist_Mono, Italianno } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteMenu } from "@/components/SiteMenu";
import { SiteLogo } from "@/components/SiteLogo";
import { CallButton } from "@/components/CallButton";
import { GoogleBadge } from "@/components/GoogleBadge";
import { PageTransition } from "@/components/PageTransition";
import { CmsPreviewBridge } from "@/components/CmsPreviewBridge";
import { getContactContent } from "@/lib/cms";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Anglaise, uniquement pour la citation du bandeau navy des avis (cf.
   « avis mba.png »). Un seul graisse, un seul usage : elle n'a rien à
   faire ailleurs sur le site, la charte est en Geist. */
const script = Italianno({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MBA Sanit — Sanitaire, chauffage et salles de bain à Genève",
  description:
    "Installateur sanitaire et chauffagiste à Genève et en Suisse romande depuis plus de 20 ans : salles de bain sur mesure, chauffage et pompes à chaleur, douches extérieures, entretien et dépannage.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [{ phoneLabel, phoneHref }, { isEnabled: preview }] = await Promise.all([getContactContent(), draftMode()]);

  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} ${script.variable}`}>
      <body className="antialiased">
        {/* Uniquement visible dans l'aperçu de l'espace client (Draft Mode) :
            jamais chargé pour un visiteur normal. */}
        {preview && <CmsPreviewBridge />}
        <SmoothScroll>
          <SiteMenu phoneLabel={phoneLabel} phoneHref={phoneHref} />
          <SiteLogo />
          {/* Enveloppe ciblée par la transition de page (globals.css) */}
          <div id="page-root">{children}</div>
          <CallButton />
          <GoogleBadge />
          <PageTransition />
        </SmoothScroll>
      </body>
    </html>
  );
}
