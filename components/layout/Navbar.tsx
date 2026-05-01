'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnnouncementBar } from './AnnouncementBar';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

function WishlistIcon() {
  return (
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
  );
}

function CartIcon() {
  return (
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
  );
}

function AccountIcon() {
  return (
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
  );
}

function HamburgerIcon() {
  return (
    <svg
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function Badge({ count }: { count: string | number }) {
  return (
    <span
      className="absolute -top-1.5 -right-1.5 flex items-center justify-center text-white font-bold"
      style={{ width: 15, height: 15, background: '#c9a84c', fontSize: 8, borderRadius: '50%' }}
    >
      {count}
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, wishlist } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'Over ons' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
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
          className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between"
          style={{ height: 68 }}
        >
          <Link
            href="/"
            className="font-display text-[22px] font-semibold text-[#0a0a0a] flex items-center gap-1.5"
            style={{ letterSpacing: '-0.01em' }}
          >
            Sakienah
            <span
              style={{
                width: 6,
                height: 6,
                background: '#c9a84c',
                transform: 'rotate(45deg)',
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
          </Link>

          {/* Desktop nav */}
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

          {/* Desktop icons */}
          <div className="hidden md:flex items-center" style={{ gap: 22 }}>
            <Link href="/wishlist" className="text-[#0a0a0a] relative flex">
              <WishlistIcon />
              {wishlist.size > 0 && <Badge count={wishlist.size} />}
            </Link>
            <Link href="/cart" className="text-[#0a0a0a] relative flex">
              <CartIcon />
              {totalItems > 0 && <Badge count={totalItems > 9 ? '9+' : totalItems} />}
            </Link>
            <Link
              href="/account"
              className="text-[#0a0a0a] flex items-center gap-1.5"
              title={user ? user.naam : 'Inloggen'}
            >
              <AccountIcon />
              {user && (
                <span className="text-[10px] tracking-[0.1em] uppercase font-medium text-[#c9a84c]">
                  {user.naam.split(' ')[0]}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile: wishlist + cart + account + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <Link href="/wishlist" className="text-[#0a0a0a] relative flex">
              <WishlistIcon />
              {wishlist.size > 0 && <Badge count={wishlist.size} />}
            </Link>
            <Link href="/cart" className="text-[#0a0a0a] relative flex">
              <CartIcon />
              {totalItems > 0 && <Badge count={totalItems > 9 ? '9+' : totalItems} />}
            </Link>
            <Link
              href="/account"
              className="text-[#0a0a0a] flex items-center"
              title={user ? user.naam : 'Inloggen'}
            >
              <AccountIcon />
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center justify-center text-[#0a0a0a]"
              aria-label="Menu openen"
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-in panel van rechts */}
      <aside
        className={`fixed top-0 right-0 z-[70] bg-white flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: 280, height: '100dvh' }}
        aria-label="Navigatiemenu"
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between px-6 border-b border-[#F0EBE3] shrink-0"
          style={{ height: 68 }}
        >
          <Link
            href="/"
            className="font-display text-[18px] font-semibold text-[#0a0a0a] flex items-center gap-1.5"
            style={{ letterSpacing: '-0.01em' }}
          >
            Sakienah
            <span
              style={{
                width: 5,
                height: 5,
                background: '#c9a84c',
                transform: 'rotate(45deg)',
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-[#0a0a0a] flex items-center justify-center"
            aria-label="Menu sluiten"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-6 py-4 flex-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="py-4 text-[11px] tracking-[0.15em] uppercase font-medium border-b border-[#F0EBE3] transition-colors"
                style={{ color: active ? '#c9a84c' : '#0a0a0a' }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: account sectie */}
        <div className="px-6 py-6 border-t border-[#F0EBE3] shrink-0">
          {user ? (
            <p className="text-[11px] tracking-[0.1em] uppercase text-[#c9a84c] font-medium">
              {user.naam.split(' ')[0]}
            </p>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-[11px] tracking-[0.15em] uppercase font-medium text-[#0a0a0a]"
            >
              Inloggen
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
