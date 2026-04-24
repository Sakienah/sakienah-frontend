import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustBar } from '@/components/home/TrustBar';
import { BestsellersSection } from '@/components/home/BestsellersSection';
import { BestsellersSkeleton } from '@/components/home/BestsellersSkeleton';
import { CTABanner } from '@/components/home/CTABanner';
import { ValueProposition } from '@/components/home/ValueProposition';
import { SocialProof } from '@/components/home/SocialProof';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <Suspense fallback={<BestsellersSkeleton />}>
          <BestsellersSection />
        </Suspense>
        <CTABanner />
        <ValueProposition />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
