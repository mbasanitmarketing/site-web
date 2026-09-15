import type { Metadata } from "next";
import { Geist, Geist_Mono, Italianno } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteMenu } from "@/components/SiteMenu";
import { SiteLogo } from "@/components/SiteLogo";
import { CallButton } from "@/components/CallButton";
import { PageTransition } from "@/components/PageTransition";
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
  title: "MBA Sanit — Installations sanitaires & salles de bain en Suisse romande",
  description:
    "MBA Sanit — installations sanitaires et salles de bain sur mesure en Suisse romande.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} ${script.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          <SiteMenu />
          <SiteLogo />
          {/* Enveloppe ciblée par la transition de page (globals.css) */}
          <div id="page-root">{children}</div>
          <CallButton />
          <PageTransition />
        </SmoothScroll>
      </body>
    </html>
  );
}
