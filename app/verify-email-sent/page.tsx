import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { VerifyEmailSentContent } from '@/components/features/auth/VerifyEmailSentContent';

export const metadata: Metadata = {
  title: 'Bevestig je e-mailadres — Sakienah',
};

export default function VerifyEmailSentPage() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense>
          <VerifyEmailSentContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
