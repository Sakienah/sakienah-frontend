export function SectionHeader({
  eyebrow,
  heading,
  align = 'center',
  dark = false,
}: {
  eyebrow?: string;
  heading: string;
  align?: 'center' | 'left';
  dark?: boolean;
}) {
  return (
    <div
      style={{
        textAlign: align,
        marginBottom: 56,
        maxWidth: align === 'left' ? 480 : undefined,
      }}
    >
      {eyebrow && (
        <p
          className="uppercase font-semibold text-gold"
          style={{
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.22em',
            marginBottom: 14,
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="font-display font-semibold"
        style={{
          fontSize: 'var(--text-h2)',
          color: dark ? '#fff' : '#0a0a0a',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}
      >
        {heading}
      </h2>
    </div>
  );
}
