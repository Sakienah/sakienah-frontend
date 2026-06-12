'use client';

import Link from 'next/link';
import type { Category } from '@/types';

type Props = {
  categories: Category[];
  onClose: () => void;
};

export function NavbarMegaMenu({ categories, onClose }: Props) {
  const parents = categories.filter((c) => !c.parentId);

  if (parents.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes megaFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mega-parent-link { transition: color 0.2s; }
        .mega-parent-link:hover { color: #c9a84c !important; }
        .mega-child-link { transition: color 0.2s, padding-left 0.2s; }
        .mega-child-link:hover { color: #c9a84c !important; padding-left: 6px; }
      `}</style>

      <div
        onMouseLeave={onClose}
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#fff',
          borderTop: '1px solid rgba(201,168,76,0.15)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.03)',
          padding: '44px 0 48px',
          animation: 'megaFadeIn 0.2s ease-out',
          zIndex: 49,
        }}
      >
        <div
          className="max-w-[1280px] mx-auto px-6 md:px-10"
          style={{ display: 'flex', gap: 72, alignItems: 'flex-start' }}
        >
          {/* Category columns */}
          <div style={{ display: 'flex', gap: 56, flex: 1 }}>
            {parents.map((parent) => (
              <div key={parent.id} style={{ minWidth: 150 }}>
                <Link
                  href={`/shop?category=${parent.slug}`}
                  onClick={onClose}
                  className="mega-parent-link"
                  style={{
                    fontSize: 12,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    color: '#0a0a0a',
                    textDecoration: 'none',
                    marginBottom: 14,
                    display: 'block',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {parent.name}
                </Link>

                {parent.children && parent.children.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {parent.children.map((child) => (
                      <Link
                        key={child.id}
                        href={`/shop?category=${child.slug}`}
                        onClick={onClose}
                        className="mega-child-link"
                        style={{
                          fontSize: 14,
                          color: '#555',
                          textDecoration: 'none',
                          padding: '5px 0',
                          display: 'block',
                          fontFamily: 'var(--font-sans)',
                        }}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Arabic ornament + CTA */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingLeft: 48,
              borderLeft: '1px solid rgba(201,168,76,0.1)',
              minWidth: 140,
              flexShrink: 0,
            }}
          >
            <span
              className="font-arabic select-none"
              style={{
                fontSize: 36,
                color: '#c9a84c',
                opacity: 0.12,
                direction: 'rtl',
                marginBottom: 12,
                lineHeight: 1.2,
              }}
            >
              سكينة
            </span>
            <Link
              href="/shop"
              onClick={onClose}
              style={{
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                textDecoration: 'none',
                fontWeight: 500,
                fontFamily: 'var(--font-sans)',
                transition: 'letter-spacing 0.3s',
              }}
            >
              Alle producten →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
