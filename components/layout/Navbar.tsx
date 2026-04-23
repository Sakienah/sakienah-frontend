'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnnouncementBar } from './AnnouncementBar';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItems, wishlist } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'Over ons' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.07)' : 'none',
      }}
    >
      <AnnouncementBar />
      <div
        className="max-w-[1280px] mx-auto px-10 flex items-center justify-between"
        style={{ height: 68 }}
      >
        <Link
          href="/"
          className="font-display text-[22px] font-semibold text-[#0a0a0a]"
          style={{ letterSpacing: '-0.01em' }}
        >
          Sakienah
        </Link>

        <nav className="hidden md:flex" style={{ gap: 44 }}>
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className="text-[11px] tracking-[0.15em] uppercase font-medium transition-colors"
                style={{
                  color: active ? '#c9a84c' : '#0a0a0a',
                  borderBottom: active ? '1px solid #c9a84c' : '1px solid transparent',
                  paddingBottom: 2,
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center" style={{ gap: 22 }}>
          <Link href="/wishlist" className="text-[#0a0a0a] relative flex">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlist.size > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 flex items-center justify-center text-white font-bold"
                style={{
                  width: 15,
                  height: 15,
                  background: '#c9a84c',
                  fontSize: 8,
                  borderRadius: '50%',
                }}
              >
                {wishlist.size}
              </span>
            )}
          </Link>
          <Link href="/cart" className="text-[#0a0a0a] relative flex">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 flex items-center justify-center text-white font-bold"
                style={{
                  width: 15,
                  height: 15,
                  background: '#c9a84c',
                  fontSize: 8,
                  borderRadius: '50%',
                }}
              >
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>
          <Link
            href="/account"
            className="text-[#0a0a0a] flex items-center gap-1.5"
            title={user ? user.naam : 'Inloggen'}
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            {user && (
              <span className="hidden md:block text-[10px] tracking-[0.1em] uppercase font-medium text-[#c9a84c]">
                {user.naam.split(' ')[0]}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
