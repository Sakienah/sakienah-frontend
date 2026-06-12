'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnnouncementBar } from './AnnouncementBar';
import { NavbarSearch } from './NavbarSearch';
import { NavbarMegaMenu } from './NavbarMegaMenu';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { getCategories } from '@/lib/api';
import type { Category } from '@/types';

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

function ChevronDown() {
  return (
    <svg
      width="10"
      height="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function Badge({ count }: { count: string | number }) {
  return (
    <span
      className="absolute -top-1.5 -right-1.5 flex items-center justify-center text-white font-bold"
      style={{ width: 15, height: 15, background: '#c9a84c', fontSize: 9, borderRadius: '50%' }}
    >
      {count}
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileExpandedShop, setMobileExpandedShop] = useState(false);
  const pathname = usePathname();
  const { totalItems, wishlist } = useCart();
  const { user } = useAuth();
  const megaMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMegaMenu = useCallback(() => {
    if (megaMenuTimerRef.current) {
      clearTimeout(megaMenuTimerRef.current);
      megaMenuTimerRef.current = null;
    }
    setMegaMenuOpen(true);
  }, []);

  const scheduleCloseMegaMenu = useCallback(() => {
    megaMenuTimerRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  }, []);

  const closeMegaMenuNow = useCallback(() => {
    if (megaMenuTimerRef.current) {
      clearTimeout(megaMenuTimerRef.current);
      megaMenuTimerRef.current = null;
    }
    setMegaMenuOpen(false);
  }, []);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

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

  const isShopActive = pathname.startsWith('/shop') || pathname.startsWith('/product');

  return (
    <>
      <style>{`
        .nav-link-underline::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #c9a84c;
          transition: width 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .nav-link-underline:hover::after,
        .nav-link-underline.active::after {
          width: 100%;
        }
        .icon-btn {
          transition: color 0.15s, opacity 0.15s;
        }
        .icon-btn:hover {
          color: #c9a84c;
        }

        @keyframes mobileSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes mobileCategoryExpand {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 500px; }
        }
      `}</style>

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)' : 'none',
        }}
      >
        <AnnouncementBar />
        <div
          className="max-w-[1280px] mx-auto px-5 md:px-10 flex items-center justify-between"
          style={{ height: 72 }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-[24px] font-semibold text-[#0a0a0a] flex items-center gap-2 shrink-0"
            style={{ letterSpacing: '-0.01em' }}
          >
            Sakienah
            <span
              style={{
                width: 7,
                height: 7,
                background: '#c9a84c',
                transform: 'rotate(45deg)',
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center" style={{ gap: 40, marginLeft: 48 }}>
            <div
              onMouseEnter={openMegaMenu}
              onMouseLeave={scheduleCloseMegaMenu}
              style={{ position: 'relative' }}
            >
              <Link
                href="/shop"
                className={`nav-link-underline text-[13px] tracking-[0.12em] uppercase font-medium flex items-center gap-1.5 ${isShopActive ? 'active' : ''}`}
                style={{
                  color: isShopActive ? '#c9a84c' : '#0a0a0a',
                  paddingBottom: 4,
                  position: 'relative',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Shop
                <span
                  style={{
                    display: 'inline-flex',
                    transition: 'transform 0.25s',
                    transform: megaMenuOpen ? 'rotate(180deg)' : 'rotate(0)',
                    color: isShopActive ? '#c9a84c' : '#888',
                  }}
                >
                  <ChevronDown />
                </span>
              </Link>
            </div>

            {[
              { href: '/about', label: 'Over ons' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link-underline text-[13px] tracking-[0.12em] uppercase font-medium ${active ? 'active' : ''}`}
                  style={{
                    color: active ? '#c9a84c' : '#0a0a0a',
                    paddingBottom: 4,
                    position: 'relative',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Spacer */}
          <div className="hidden md:block flex-1" />

          {/* Desktop search + icons */}
          <div className="hidden md:flex items-center" style={{ gap: 22 }}>
            <NavbarSearch />
            <Link
              href="/wishlist"
              className="icon-btn text-[#0a0a0a] relative flex"
              title="Favorieten"
            >
              <WishlistIcon />
              {wishlist.size > 0 && <Badge count={wishlist.size} />}
            </Link>
            <Link
              href="/cart"
              className="icon-btn text-[#0a0a0a] relative flex"
              title="Winkelwagen"
            >
              <CartIcon />
              {totalItems > 0 && <Badge count={totalItems > 9 ? '9+' : totalItems} />}
            </Link>
            <Link
              href="/account"
              className="icon-btn text-[#0a0a0a] flex items-center gap-1.5"
              title={user ? user.naam : 'Inloggen'}
            >
              <AccountIcon />
              {user && (
                <span
                  className="text-[11px] tracking-[0.1em] uppercase font-medium"
                  style={{ color: '#c9a84c' }}
                >
                  {user.naam.split(' ')[0]}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile: icons + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/cart" className="icon-btn text-[#0a0a0a] relative flex p-1">
              <CartIcon />
              {totalItems > 0 && <Badge count={totalItems > 9 ? '9+' : totalItems} />}
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center justify-center text-[#0a0a0a] p-1"
              aria-label="Menu openen"
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        {megaMenuOpen && (
          <div onMouseEnter={openMegaMenu} onMouseLeave={closeMegaMenuNow}>
            <NavbarMegaMenu categories={categories} onClose={closeMegaMenuNow} />
          </div>
        )}
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile slide-in panel */}
      <aside
        className={`fixed top-0 right-0 z-[70] bg-white flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: 300, height: '100dvh' }}
        aria-label="Navigatiemenu"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 border-b border-[#F0EBE3] shrink-0"
          style={{ height: 72 }}
        >
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="font-display text-[20px] font-semibold text-[#0a0a0a] flex items-center gap-1.5"
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
          <button
            onClick={() => setMobileOpen(false)}
            className="text-[#0a0a0a] flex items-center justify-center p-1"
            aria-label="Menu sluiten"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-[#F0EBE3] shrink-0">
          <NavbarSearch variant="mobile" onClose={() => setMobileOpen(false)} />
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-6 py-2">
          {/* Shop met expandable categorieen */}
          <div style={{ borderBottom: '1px solid #F0EBE3' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '17px 0',
                cursor: 'pointer',
              }}
              onClick={() => setMobileExpandedShop(!mobileExpandedShop)}
            >
              <span
                className="text-[14px] tracking-[0.12em] uppercase font-medium"
                style={{
                  color: isShopActive ? '#c9a84c' : '#0a0a0a',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Shop
              </span>
              <span
                style={{
                  display: 'flex',
                  transition: 'transform 0.25s',
                  transform: mobileExpandedShop ? 'rotate(180deg)' : 'rotate(0)',
                  color: '#c9a84c',
                }}
              >
                <ChevronDown />
              </span>
            </div>

            {mobileExpandedShop && (
              <div
                style={{
                  padding: '0 0 14px 12px',
                  animation: 'mobileCategoryExpand 0.25s ease-out',
                  overflow: 'hidden',
                }}
              >
                <Link
                  href="/shop"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 text-[14px]"
                  style={{ color: '#c9a84c', fontWeight: 500, fontFamily: 'var(--font-sans)' }}
                >
                  Alle producten
                </Link>
                {categories
                  .filter((c) => !c.parentId)
                  .map((parent) => (
                    <div key={parent.id}>
                      <Link
                        href={`/shop?category=${parent.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2.5 text-[13px] tracking-[0.08em] uppercase text-[#0a0a0a] font-medium"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {parent.name}
                      </Link>
                      {parent.children?.map((child) => (
                        <Link
                          key={child.id}
                          href={`/shop?category=${child.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 pl-4 text-[14px]"
                          style={{ color: '#666', fontFamily: 'var(--font-sans)' }}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Over ons */}
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block py-[17px] text-[14px] tracking-[0.12em] uppercase font-medium border-b border-[#F0EBE3]"
            style={{
              color:
                pathname === '/about' || pathname.startsWith('/about/') ? '#c9a84c' : '#0a0a0a',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Over ons
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block py-[17px] text-[14px] tracking-[0.12em] uppercase font-medium border-b border-[#F0EBE3]"
            style={{
              color:
                pathname === '/contact' || pathname.startsWith('/contact/') ? '#c9a84c' : '#0a0a0a',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Contact
          </Link>
        </nav>

        {/* Bottom actions */}
        <div className="px-6 py-6 border-t border-[#F0EBE3] shrink-0 flex flex-col gap-5">
          <Link
            href="/wishlist"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 text-[14px] text-[#0a0a0a]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <WishlistIcon />
            Favorieten
            {wishlist.size > 0 && (
              <span style={{ color: '#c9a84c', fontSize: 13, fontWeight: 500 }}>
                ({wishlist.size})
              </span>
            )}
          </Link>
          {user ? (
            <Link
              href="/account"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-[14px] font-medium"
              style={{ color: '#c9a84c', fontFamily: 'var(--font-sans)' }}
            >
              <AccountIcon />
              {user.naam}
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-[14px] text-[#0a0a0a]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              <AccountIcon />
              Inloggen
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
