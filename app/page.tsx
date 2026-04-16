import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { BrandStory } from '@/components/sections/BrandStory';
import { CTABanner } from '@/components/sections/CTABanner';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeatureGrid />
        <HowItWorks />
        <BrandStory />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
