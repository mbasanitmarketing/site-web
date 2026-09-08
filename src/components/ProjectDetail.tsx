"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Realisation } from "@/lib/pages";
import styles from "./ProjectDetail.module.css";

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
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  function scrollNext() {
    const rail = railRef.current;
    if (!rail) return;
    // une « page » = la largeur visible, moins un chevauchement pour
    // qu'on comprenne qu'on continue la même série
    const step = rail.clientWidth * 0.85;
    const fin = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
    rail.scrollBy({ left: fin ? -rail.scrollLeft : step, behavior: "smooth" });
  }

  function open(image: { src: string; alt: string }) {
    setZoom(image);
    dialogRef.current?.showModal();
  }

  return (
    <>
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
          <h2 className={styles.galleryTitle}>Un aperçu du projet</h2>
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
          {project.gallery.map((img) => (
            <li key={img.src} className={styles.shot}>
              <button
                type="button"
                className={styles.shotButton}
                onClick={() => open(img)}
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
        onClose={() => setZoom(null)}
      >
        {zoom && (
          <>
            <Image
              className={styles.lightboxImage}
              src={zoom.src}
              alt={zoom.alt}
              width={1536}
              height={1024}
              sizes="92vw"
            />
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
          </>
        )}
      </dialog>
    </>
  );
}
