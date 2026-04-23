import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RegisterPageContent } from '@/components/sections/RegisterPageContent';

export const metadata: Metadata = {
  title: 'Account aanmaken — Sakienah',
};

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main>
        <RegisterPageContent />
      </main>
      <Footer />
    </>
  );
}
