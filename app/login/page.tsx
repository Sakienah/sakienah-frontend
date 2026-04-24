import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LoginForm } from '@/components/features/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Inloggen — Sakienah',
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main>
        <LoginForm />
      </main>
      <Footer />
    </>
  );
}
