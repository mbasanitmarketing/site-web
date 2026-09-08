"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteLogo.module.css";

/**
 * Logo MBA en haut à droite, sur toutes les pages sauf l'accueil, avec
 * retour à la homepage au clic.
 *
 * L'accueil est exclu parce que la hero rend déjà son propre logo, animé
 * au scroll (il rétrécit, cf. Hero.module.css). Deux logos s'y
 * superposeraient. Si on veut un logo réellement permanent partout, il
 * suffit de retirer ce garde-fou ET le logo de la hero.
 */
export function SiteLogo() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <Link className={styles.logo} href="/" aria-label="MBA Sanit — accueil">
      <Image src="/logo-mba.png" alt="MBA Sanit" width={600} height={221} priority />
    </Link>
  );
}
