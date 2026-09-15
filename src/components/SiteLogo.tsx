"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./SiteLogo.module.css";

/**
 * Logo MBA en haut à droite, avec retour à l'accueil au clic.
 *
 * Sur les pages intérieures il est là en permanence, comme le burger.
 *
 * SUR L'ACCUEIL, il ne l'était PAS du tout : ce composant rendait `null`,
 * parce que la hero dessine son propre logo (celui qui rétrécit au
 * scroll). Sauf que ce logo-là est `position: absolute` DANS la hero : il
 * s'en va avec elle. Une fois la hero passée, il ne restait donc que le
 * burger, sans logo — sur desktop comme sur mobile.
 *
 * Correction : sur l'accueil, ce logo prend le relais dès que la piste de
 * la hero est sortie du cadre. Les deux ne sont jamais visibles en même
 * temps, et le logo de la hero garde son animation.
 */
export function SiteLogo() {
  const pathname = usePathname();
  const accueil = pathname === "/";
  // Ailleurs qu'à l'accueil : visible tout de suite.
  const [passeHero, setPasseHero] = useState(false);

  useEffect(() => {
    if (!accueil) return;
    const hero = document.querySelector("[data-hero-track]");
    if (!hero) return;

    // L'IntersectionObserver appelle son rappel une première fois tout
    // seul : l'état initial part de là plutôt que du corps de l'effet
    // (règle react-hooks/set-state-in-effect).
    const io = new IntersectionObserver(
      ([e]) => setPasseHero(!e.isIntersecting),
      { threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [accueil, pathname]);

  if (accueil && !passeHero) return null;

  return (
    <Link className={styles.logo} href="/" aria-label="MBA Sanit — accueil">
      <Image
        src="/logo-mba.png"
        alt="MBA Sanit"
        width={600}
        height={221}
        priority
      />
    </Link>
  );
}
