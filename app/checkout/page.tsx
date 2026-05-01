import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CheckoutFlow } from '@/components/features/checkout/CheckoutFlow';

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <CheckoutFlow />
      </main>
      <Footer />
    </>
  );
}
