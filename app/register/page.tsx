import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RegisterForm } from '@/components/features/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Account aanmaken — Sakienah',
};

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main>
        <RegisterForm />
      </main>
      <Footer />
    </>
  );
}
