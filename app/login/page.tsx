import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LoginPageContent } from '@/components/sections/LoginPageContent';

export const metadata: Metadata = {
  title: 'Inloggen — Sakienah',
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main>
        <LoginPageContent />
      </main>
      <Footer />
    </>
  );
}
