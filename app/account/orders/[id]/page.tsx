import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { OrderDetailContent } from '@/components/sections/OrderDetailContent';

export const metadata: Metadata = {
  title: 'Bestelling — Sakienah',
};

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <main>
        <OrderDetailContent orderId={id} />
      </main>
      <Footer />
    </>
  );
}
