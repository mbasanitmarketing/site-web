import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import titre from "@/components/Heading.module.css";
import styles from "./mentions-legales/page.module.css";

export const metadata: Metadata = {
  title: "Page introuvable | MBA Sanit",
  robots: { index: false, follow: true },
};

/* Page d'erreur 404 (le statut HTTP 404 est posé par Next). Elle garde le
   menu et le pied de page, et renvoie vers les trois pages utiles plutôt
   que de laisser le visiteur dans une impasse. */
export default function NotFound() {
  return (
    <>
      <main className={styles.page}>
        <h1 className={`${styles.title} ${titre.h2}`}>Page introuvable</h1>
        <section className={styles.block}>
          <p>
            Cette adresse n’existe pas ou n’existe plus. Voici où aller :
          </p>
          <p>
            <Link href="/services">Nos services sanitaire, chauffage et dépannage</Link>
            <br />
            <Link href="/realisations">Nos réalisations</Link>
            <br />
            <Link href="/devis">Demander un devis</Link>
            <br />
            <Link href="/">Retour à l’accueil</Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
