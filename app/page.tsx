import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { BestsellersSection } from '@/components/sections/BestsellersSection';
import { CTABanner } from '@/components/sections/CTABanner';
import { ValueProposition } from '@/components/sections/ValueProposition';
import { SocialProof } from '@/components/sections/SocialProof';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <BestsellersSection />
        <CTABanner />
        <ValueProposition />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
