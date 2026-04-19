import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CheckoutFlow } from '@/components/sections/CheckoutFlow';

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <CheckoutFlow />
      </main>
      <Footer />
    </>
  );
}
