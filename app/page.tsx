import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustBar } from '@/components/home/TrustBar';
import { PromoBar } from '@/components/home/PromoBar';
import { BestsellersSection } from '@/components/home/BestsellersSection';
import { BestsellersSkeleton } from '@/components/home/BestsellersSkeleton';
import { CTABanner } from '@/components/home/CTABanner';
import { ValueProposition } from '@/components/home/ValueProposition';
import { SocialProof } from '@/components/home/SocialProof';
import { FaqSection } from '@/components/home/FaqSection';
import { FinalCTA } from '@/components/home/FinalCTA';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { LifestyleGallery } from '@/components/home/LifestyleGallery';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <PromoBar />
        <CategoryShowcase />
        <CTABanner />
        <Suspense fallback={<BestsellersSkeleton />}>
          <BestsellersSection />
        </Suspense>
        <LifestyleGallery />
        <ValueProposition />
        <SocialProof />
        <FaqSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
