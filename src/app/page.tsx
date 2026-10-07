import { Hero } from "@/components/Hero";
import { EscalierSection } from "@/components/EscalierSection";
import { PaysageScroll } from "@/components/PaysageScroll";
import { PartnersGrid } from "@/components/PartnersGrid";
import { HomeReviews } from "@/components/HomeReviews";
import { HomeFaq } from "@/components/HomeSections";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getFaqItems, getHeroContent } from "@/lib/cms";
import { businessLd, faqLd, graph, websiteLd } from "@/lib/seo";

export default async function Home() {
  const [hero, faq] = await Promise.all([getHeroContent(), getFaqItems()]);

  return (
    <>
      <JsonLd data={graph(businessLd(), websiteLd(), faqLd(faq))} />
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
