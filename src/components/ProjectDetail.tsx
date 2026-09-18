"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Realisation } from "@/lib/pages";
import titre from "./Heading.module.css";
import styles from "./ProjectDetail.module.css";
import { BackdropLines } from "./BackdropLines";

/**
 * Corps d'une page de réalisation, d'après « realisations projets.mov » :
 * description, filet à pastille, fiche technique en colonnes, filet, puis
 * la galerie « un aperçu du projet ».
 *
 * La galerie est un défilement horizontal natif avec accroche : le geste
 * tactile marche tout seul sur mobile, la flèche ne sert qu'au pointeur.
 * Cliquer une image l'agrandit dans un <dialog> natif.
 */
export function ProjectDetail({ project }: { project: Realisation }) {
  const railRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  /* L'agrandissement retient un RANG, pas une image : c'est ce qui permet
     de passer à la suivante sans refermer. */
  const [rang, setRang] = useState<number | null>(null);
  const depart = useRef(0);
  const zoom = rang === null ? null : project.gallery[rang];
  const seule = project.gallery.length < 2;

  /* Boucle : après la dernière on revient à la première, comme dans une
     galerie de téléphone. */
  const bouge = useCallback(
    (pas: number) =>
      setRang((r) =>
        r === null
          ? r
          : (r + pas + project.gallery.length) % project.gallery.length,
      ),
    [project.gallery.length],
  );

  /* Flèches du clavier. Échap est géré par <dialog> lui-même. */
  useEffect(() => {
    if (rang === null) return;
    const touche = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") bouge(1);
      else if (e.key === "ArrowLeft") bouge(-1);
    };
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, [rang, bouge]);

  function scrollNext() {
    const rail = railRef.current;
    if (!rail) return;
    // une « page » = la largeur visible, moins un chevauchement pour
    // qu'on comprenne qu'on continue la même série
    const step = rail.clientWidth * 0.85;
    const fin = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
    rail.scrollBy({ left: fin ? -rail.scrollLeft : step, behavior: "smooth" });
  }

  function open(i: number) {
    setRang(i);
    dialogRef.current?.showModal();
  }

  return (
    /* Un seul conteneur porte le fond clair. Avant, chaque bloc avait le
       sien et le noir du body transparaissait dans les marges entre eux. */
    <div className={styles.wrap}>
      <BackdropLines arc />
      <section className={styles.body}>
        {project.body.map((p, i) => (
          <p key={i} className={styles.paragraph}>
            {p}
          </p>
        ))}
      </section>

      {/* Filet à pastille, comme sur la référence */}
      <div className={styles.ruleDot} aria-hidden="true">
        <span className={styles.dot} />
      </div>

      <dl className={styles.meta}>
        {project.meta.map((m) => (
          <div key={m.label} className={styles.metaItem}>
            <dt className={styles.metaLabel}>{m.label}</dt>
            <dd className={styles.metaValue}>{m.value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.rule} aria-hidden="true" />

      <section className={styles.gallery}>
        <div className={styles.galleryHead}>
          <h2 className={`${styles.galleryTitle} ${titre.h2}`}>Un aperçu du projet</h2>
          {project.gallery.length > 1 && (
            <button
              type="button"
              className={styles.next}
              onClick={scrollNext}
              aria-label="Image suivante"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 12h14M12 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        <ul className={styles.rail} ref={railRef}>
          {project.gallery.map((img, i) => (
            <li key={img.src} className={styles.shot}>
              <button
                type="button"
                className={styles.shotButton}
                onClick={() => open(i)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 720px) 86vw, 46vw"
                />
                <span className={styles.zoomBadge} aria-hidden="true">
                  Agrandir
                </span>
                <span className={styles.srOnly}>Agrandir : {img.alt}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        onClick={(e) => {
          // clic en dehors de l'image : on ferme
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        onClose={() => setRang(null)}
      >
        {zoom && (
          /* Le glissement du doigt fait défiler, comme la pellicule d'un
             téléphone : au-delà de 40 px, on change d'image. */
          <div
            className={styles.lightboxInner}
            onPointerDown={(e) => {
              depart.current = e.clientX;
            }}
            onPointerUp={(e) => {
              const d = e.clientX - depart.current;
              if (Math.abs(d) > 40) bouge(d < 0 ? 1 : -1);
            }}
          >
            <Image
              className={styles.lightboxImage}
              src={zoom.src}
              alt={zoom.alt}
              width={1536}
              height={1024}
              sizes="92vw"
              priority
            />

            {!seule && (
              <>
                <button
                  type="button"
                  className={`${styles.nav} ${styles.navPrev}`}
                  onClick={() => bouge(-1)}
                  aria-label="Image précédente"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M15 5l-7 7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`${styles.nav} ${styles.navNext}`}
                  onClick={() => bouge(1)}
                  aria-label="Image suivante"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M9 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <p className={styles.compteur}>
                  {(rang ?? 0) + 1} / {project.gallery.length}
                </p>
              </>
            )}

            {/* Hors du conteneur qui glisse : la fermeture reste calée au
                coin de l'écran, quelle que soit la taille de la photo. */}
            <button
              type="button"
              className={styles.close}
              onClick={() => dialogRef.current?.close()}
              aria-label="Fermer"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
}
