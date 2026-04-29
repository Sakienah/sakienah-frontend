import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { VerifyEmailContent } from '@/components/features/auth/VerifyEmailContent';

export const metadata: Metadata = {
  title: 'E-mailadres bevestigen — Sakienah',
};

export default function VerifyEmailPage() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense>
          <VerifyEmailContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
