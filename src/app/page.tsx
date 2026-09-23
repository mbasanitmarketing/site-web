import { Hero } from "@/components/Hero";
import { EscalierSection } from "@/components/EscalierSection";
import { PaysageScroll } from "@/components/PaysageScroll";
import { PartnersGrid } from "@/components/PartnersGrid";
import { HomeReviews } from "@/components/HomeReviews";
import { HomeFaq } from "@/components/HomeSections";
import { Footer } from "@/components/Footer";
import { getHeroContent } from "@/lib/cms";

export default async function Home() {
  const hero = await getHeroContent();

  return (
    <>
      <Hero title={hero.title} subtitle={hero.subtitle} cta={hero.cta} />
      <EscalierSection />
      <PaysageScroll />
      <PartnersGrid />
      <HomeReviews />
      <HomeFaq />
      <Footer overlap />
    </>
  );
}
