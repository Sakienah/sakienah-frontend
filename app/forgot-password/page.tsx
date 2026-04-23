import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ForgotPasswordPageContent } from '@/components/sections/ForgotPasswordPageContent';

export const metadata: Metadata = {
  title: 'Wachtwoord vergeten — Sakienah',
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <main>
        <ForgotPasswordPageContent />
      </main>
      <Footer />
    </>
  );
}
