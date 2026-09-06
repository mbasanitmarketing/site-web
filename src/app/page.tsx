import { Hero } from "@/components/Hero";
import { EscalierSection } from "@/components/EscalierSection";

export default function Home() {
  return (
    <>
      <Hero />
      <EscalierSection />
      {/* Section 3 — vide pour l'instant, on la traitera plus tard. */}
      <section className="relative z-10 bg-[#52525b] px-6 py-40 md:px-16">
        <p className="mx-auto max-w-2xl text-center text-lg text-white/60">
          La suite du site viendra ici.
        </p>
      </section>
    </>
  );
}
