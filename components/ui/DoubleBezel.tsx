import type { CSSProperties, ReactNode } from 'react';

export function DoubleBezel({
  children,
  radius = 16,
  shellPadding = 6,
  shellBackground = 'rgba(201,168,76,0.06)',
  shellBorder = '1px solid rgba(201,168,76,0.25)',
  className,
  style,
}: {
  children: ReactNode;
  radius?: number;
  shellPadding?: number;
  shellBackground?: string;
  shellBorder?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        padding: shellPadding,
        borderRadius: radius,
        background: shellBackground,
        border: shellBorder,
        boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
        ...style,
      }}
    >
      <div
        style={{
          borderRadius: Math.max(radius - shellPadding, 0),
          overflow: 'hidden',
          position: 'relative',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.12)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
