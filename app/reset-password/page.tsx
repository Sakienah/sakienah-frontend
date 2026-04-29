import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ResetPasswordForm } from '@/components/features/auth/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Wachtwoord instellen — Sakienah',
};

export default function ResetPasswordPage() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
