import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import GiftFloater from '@/components/ui/GiftFloater';
import { CartProvider } from '@/contexts/CartContext';

const cormorant = Cormorant_Garamond({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sakienah — Islamitische Lifestyle Winkel',
  description:
    'Premium islamitische producten — gebedskleding, Koran accessoires, decor en cadeaus. Zorgvuldig geselecteerd bij Sakienah.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <CartProvider>
          {children}
          <GiftFloater />
        </CartProvider>
      </body>
    </html>
  );
}
