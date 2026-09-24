"use client";

import { useRef } from "react";
import type { Manifesto } from "@/lib/pages";
import { useScrollProgress } from "@/lib/useScrollProgress";
import chip from "./Chip.module.css";
import titre from "./Heading.module.css";
import styles from "./ServiceManifesto.module.css";
import { BackdropLines } from "./BackdropLines";
import { PrestationSteps } from "./PrestationSteps";

/** Le navigateur sait-il animer sur la position de défilement ? Même test
 *  que Hero.tsx : les deux doivent s'accorder, ils lisent la même chose. */
const SCROLL_CSS =
  typeof CSS !== "undefined" &&
  CSS.supports?.("animation-timeline: view()") === true;

/**
 * Section « La prestation » — un repère à gauche, à droite la grande
 * ligne, le chapô, puis la bande des quatre étapes.
 *
 * TOUTE la section s'épingle, titre et chapô compris : la piste part
 * au-dessus d'eux. Épingler seulement la bande les faisait sortir de
 * l'écran, et on perdait le contexte pendant le défilement des étapes.
 */
type Props = {
  manifesto: Manifesto;
  /** Préfixe des clés CMS de cette page de service (ex. "services.sanitaire-salles-de-bain"). */
  cmsKey: string;
};

export function ServiceManifesto({ manifesto, cmsKey }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // BUG CORRIGÉ : cette ligne tournait TOUJOURS, même quand le CSS
  // ci-dessous prenait le relais (cf. ServiceManifesto.module.css,
  // « Animation pilotée par le scroll du navigateur »). Les deux
  // écrivaient `--p` sur le même nœud à chaque image ; l'animation CSS
  // l'emporte dans la cascade sur une simple écriture JS, donc le JS
  // devenait inopérant SANS RIEN SIGNALER — si l'animation CSS restait
  // bloquée sur un appareil (détectée comme prise en charge, mais
  // défaillante à l'exécution), rien ne prenait le relais : la section
  // restait figée sur la première étape (retour client, Android). Même
  // garde que sur la hero : le JS ne tourne que si le CSS ne peut pas.
  useScrollProgress(trackRef, stageRef, 1, !SCROLL_CSS);

  return (
    <section className={styles.wrap}>
      <BackdropLines arc />

      <div
        ref={trackRef}
        className={styles.track}
        style={{ ["--count" as string]: manifesto.blocks.length }}
      >
        <div ref={stageRef} className={styles.stage}>
          <div className={styles.grid}>
            <p className={`${styles.label} ${chip.chip} ${chip.onBlue}`}>{manifesto.label}</p>

            <div>
              {/* h2 : le h1 de la page est le titre porté par le hero. */}
              <h2 className={`${styles.headline} ${titre.h2}`} data-cms={`${cmsKey}.headline`}>
                {manifesto.headline}
              </h2>
              <p className={styles.intro} data-cms={`${cmsKey}.intro`}>
                {manifesto.intro}
              </p>
              <PrestationSteps steps={manifesto.blocks} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
