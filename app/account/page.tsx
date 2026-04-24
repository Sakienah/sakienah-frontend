import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AccountDashboard } from '@/components/features/account/AccountDashboard';

export const metadata: Metadata = {
  title: 'Mijn account — Sakienah',
};

export default function AccountPage() {
  return (
    <>
      <Navbar />
      <main>
        <AccountDashboard />
      </main>
      <Footer />
    </>
  );
}
