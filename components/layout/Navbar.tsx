'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, ShoppingBag } from 'lucide-react';
import { AnnouncementBar } from './AnnouncementBar';
import { useCart } from '@/contexts/CartContext';

const NAV_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'Over ons' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItems, wishlist } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-sm backdrop-blur-md' : ''
      }`}
    >
      <AnnouncementBar />
      <div className="max-w-[1280px] mx-auto px-10 h-[68px] flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-[22px] font-semibold text-[#0a0a0a] tracking-[-0.01em]"
        >
          Sakienah
        </Link>

        <nav className="hidden md:flex gap-11">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className={`text-[11px] tracking-[0.15em] uppercase font-medium pb-0.5 transition-colors ${
                  active
                    ? 'text-gold border-b border-gold'
                    : 'text-[#0a0a0a] border-b border-transparent hover:text-gold'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href="/wishlist"
            className="relative text-[#0a0a0a] hover:text-gold transition-colors"
          >
            <Heart size={20} strokeWidth={1.5} />
            {wishlist.size > 0 && (
              <span className="absolute -top-1 -right-1 w-[15px] h-[15px] bg-gold text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                {wishlist.size}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative text-[#0a0a0a] hover:text-gold transition-colors">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-[15px] h-[15px] bg-gold text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
