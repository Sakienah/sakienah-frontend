type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  href?: string;
};

export function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  href,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-widest uppercase transition-all duration-200 cursor-pointer';
  const variants = {
    primary: 'bg-gold text-black hover:bg-gold/90 hover:scale-[1.02]',
    secondary: 'bg-black text-white hover:bg-black/80 hover:scale-[1.02]',
    outline: 'border border-black text-black hover:bg-black hover:text-white hover:scale-[1.02]',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
