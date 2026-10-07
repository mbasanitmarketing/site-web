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
import { CookieConsent } from "@/components/CookieConsent";
import { getContactContent } from "@/lib/cms";
import { OG_IMAGE, SEO, SITE_NAME, SITE_URL } from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: SEO["/"].title,
  description: SEO["/"].description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_CH",
    siteName: SITE_NAME,
    url: "/",
    title: SEO["/"].title,
    description: SEO["/"].description,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "MBA Sanit, installateur sanitaire et chauffagiste à Genève" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO["/"].title,
    description: SEO["/"].description,
    images: [OG_IMAGE],
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [{ phoneLabel, phoneHref }, { isEnabled: preview }] = await Promise.all([getContactContent(), draftMode()]);

  return (
    <html lang="fr-CH" className={`${geistSans.variable} ${geistMono.variable} ${script.variable}`}>
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
          <CookieConsent />
        </SmoothScroll>
      </body>
    </html>
  );
}
