import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { BestsellersSection } from '@/components/sections/BestsellersSection';
import { ValueProposition } from '@/components/sections/ValueProposition';
import { CategoryPreview } from '@/components/sections/CategoryPreview';
import { SocialProof } from '@/components/sections/SocialProof';
import { TrustBar } from '@/components/sections/TrustBar';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <BestsellersSection />
        <ValueProposition />
        <CategoryPreview />
        <SocialProof />
        <TrustBar />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
