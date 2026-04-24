import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ForgotPasswordForm } from '@/components/features/auth/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Wachtwoord vergeten — Sakienah',
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <main>
        <ForgotPasswordForm />
      </main>
      <Footer />
    </>
  );
}
