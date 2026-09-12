import { Hero } from "@/components/Hero";
import { EscalierSection } from "@/components/EscalierSection";
import { PaysageScroll } from "@/components/PaysageScroll";
import { HomeReviews, HomeFaq } from "@/components/HomeSections";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <EscalierSection />
      <PaysageScroll />
      <HomeReviews />
      <HomeFaq />
      <Footer overlap />
    </>
  );
}
