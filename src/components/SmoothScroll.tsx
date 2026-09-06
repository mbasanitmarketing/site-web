"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import "lenis/dist/lenis.css";

/**
 * Scroll virtuel.
 *
 * Lenis lisse le scroll natif au lieu de le remplacer : `scrollY` et les
 * événements `scroll` restent véridiques. Les sections épinglées (`sticky`)
 * et `useScrollProgress` continuent donc de fonctionner sans adaptation —
 * contrairement aux scrollers qui translatent le contenu, où tout casse.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.085, wheelMultiplier: 0.9 }}>
      {children}
    </ReactLenis>
  );
}
