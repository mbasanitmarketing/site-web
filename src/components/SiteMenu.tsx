"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { CATEGORIES, SERVICES } from "@/lib/pages";
import { useHeaderAutoHide } from "@/lib/useHeaderAutoHide";
import { GoogleReviews } from "./GoogleReviews";
import styles from "./SiteMenu.module.css";

type Entry = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

/** Ordre voulu : Services, Réalisations, L'équipe, Demander un devis, puis
 *  le numéro. Les hrefs pointent sur de vraies routes : la transition de
 *  page y lit l'image et le titre d'arrivée (cf. src/lib/pages.ts). */
const ENTRIES: Entry[] = [
  {
    label: "Services",
    href: "/services",
    children: SERVICES.map((s) => ({ label: s.title, href: s.href })),
  },
  {
    // Les catégories, pas les réalisations : celles-ci sont listées en
    // vignettes sur la page de chaque catégorie.
    label: "Réalisations",
    href: "/realisations",
    children: CATEGORIES.map((c) => ({ label: c.title, href: c.href })),
  },
  { label: "L’équipe", href: "/equipe" },
  { label: "Demander un devis", href: "/devis" },
];

/**
 * Menu burger du site — fixe en haut à droite, présent sur toutes les
 * sections. Le bouton s'inverse sur le fond via `mix-blend-mode`
 * (Voir le module CSS). Le panneau glisse depuis la droite ; Services et
 * Réalisations se déplient en accordéon. Lenis est coupé pendant
 * l'ouverture pour verrouiller le scroll.
 *
 * `phoneLabel`/`phoneHref` viennent du composant serveur parent (layout.tsx,
 * cf. src/lib/cms.ts) : ce composant est "use client", il ne peut pas aller
 * chercher lui-même le contenu modifiable depuis l'espace client.
 */
export function SiteMenu({ phoneLabel, phoneHref }: { phoneLabel: string; phoneHref: string }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  // Header qui se retire au scroll vers le bas. Figé visible quand le menu
  // est ouvert : le burger sert alors de bouton de fermeture.
  useHeaderAutoHide(open);

  // Verrou de scroll : on coupe Lenis tant que le menu est ouvert.
  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [open, lenis]);

  // Échap ferme ; focus dans le panneau à l'ouverture, retour au bouton
  // à la fermeture.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // Le focus va sur le PANNEAU (tabIndex -1), pas sur son premier lien :
    // Safari mobile dessinait son anneau bleu par défaut autour de
    // « Services » à chaque ouverture (capture client). Les lecteurs
    // d'écran et le clavier entrent dans le dialogue exactement pareil ;
    // la touche Tab atteint ensuite le premier lien, avec un vrai style
    // de focus (cf. .row:focus-visible dans le module CSS).
    panelRef.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      burgerRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={burgerRef}
        type="button"
        className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.bars} aria-hidden="true">
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </span>
      </button>

      <div
        className={`${styles.scrim} ${open ? styles.scrimOpen : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        ref={panelRef}
        id="site-menu"
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        tabIndex={-1}
        inert={!open}
      >
        <nav className={styles.nav}>
          <ul className={styles.list}>
            {ENTRIES.map((entry, i) => {
              const isExpanded = expanded === i;
              return (
                <li
                  key={entry.label}
                  className={styles.item}
                  style={{ "--idx": i } as React.CSSProperties}
                >
                  {entry.children ? (
                    <>
                      <button
                        type="button"
                        className={styles.row}
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpanded((cur) => (cur === i ? null : i))
                        }
                      >
                        <span className={styles.label}>{entry.label}</span>
                        <span
                          className={`${styles.arrow} ${
                            isExpanded ? styles.arrowUp : ""
                          }`}
                          aria-hidden="true"
                        >
                          <svg viewBox="0 0 24 24" fill="none">
                            <path
                              d="M4 12h14M12 6l6 6-6 6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>
                      <div
                        className={`${styles.sub} ${
                          isExpanded ? styles.subOpen : ""
                        }`}
                      >
                        <ul className={styles.subList}>
                          {/* Clé : ni le libellé ni le href ne suffisent
                              seuls. Deux réalisations peuvent porter le
                              même titre, et les sous-liens de
                              Services pointent tous sur /services. */}
                          {entry.children.map((child) => (
                            <li key={`${child.href}|${child.label}`}>
                              <a
                                href={child.href}
                                className={styles.subLink}
                                onClick={close}
                                data-page-transition
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <a
                      href={entry.href}
                      className={styles.row}
                      onClick={close}
                      data-page-transition
                    >
                      <span className={styles.label}>{entry.label}</span>
                    </a>
                  )}
                </li>
              );
            })}

            <li
              className={styles.item}
              style={{ "--idx": ENTRIES.length } as React.CSSProperties}
            >
              <a href={phoneHref} className={styles.row}>
                <span className={styles.label} data-cms="contact.phone">
                  {phoneLabel}
                </span>
              </a>
            </li>
          </ul>
        </nav>

        <GoogleReviews className={styles.reviews} />
      </aside>
    </>
  );
}
