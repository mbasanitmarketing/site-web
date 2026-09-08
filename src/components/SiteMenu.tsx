"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { REALISATIONS } from "@/lib/pages";
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
    children: [
      { label: "Lorem ipsum dolor", href: "/services" },
      { label: "Sit amet consectetur", href: "/services" },
      { label: "Adipiscing elit sed", href: "/services" },
    ],
  },
  {
    label: "Réalisations",
    href: "/realisations",
    children: REALISATIONS.map((r) => ({ label: r.title, href: r.href })),
  },
  { label: "L’équipe", href: "/equipe" },
  { label: "Demander un devis", href: "/devis" },
];

const PHONE = { label: "+41 78 217 29 28", href: "tel:+41782172928" };

/**
 * Menu burger du site — fixe en haut à droite, présent sur toutes les
 * sections. Le bouton s'inverse sur le fond via `mix-blend-mode`
 * (Voir le module CSS). Le panneau glisse depuis la droite ; Services et
 * Réalisations se déplient en accordéon. Lenis est coupé pendant
 * l'ouverture pour verrouiller le scroll.
 */
export function SiteMenu() {
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
    panelRef.current
      ?.querySelector<HTMLElement>("a, button")
      ?.focus({ preventScroll: true });
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
                          {entry.children.map((child) => (
                            <li key={child.label}>
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
              <a href={PHONE.href} className={styles.row}>
                <span className={styles.label}>{PHONE.label}</span>
              </a>
            </li>
          </ul>
        </nav>

        <GoogleReviews className={styles.reviews} />
      </aside>
    </>
  );
}
