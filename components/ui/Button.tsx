import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  href?: string;
  style?: CSSProperties;
};

const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';

const base =
  'group relative inline-flex items-center justify-center gap-3 px-9 py-[18px] text-xs font-bold uppercase tracking-[0.12em] cursor-pointer select-none active:scale-[0.97]';

const variants = {
  primary: 'bg-gold text-[#0a0a0a] shadow-[0_4px_24px_rgba(201,168,76,0.25)]',
  secondary: 'bg-[#0a0a0a] text-white',
  outline: 'border border-gold/40 text-gold hover:bg-gold/10',
};

export function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  href,
  style: styleOverride,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const style = { transition: `transform 160ms ${EASE}`, ...styleOverride };

  if (href) {
    return (
      <Link href={href} className={classes} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} style={style}>
      {children}
    </button>
  );
}
