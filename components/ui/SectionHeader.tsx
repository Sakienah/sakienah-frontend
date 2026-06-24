export function SectionHeader({
  heading,
  align = 'center',
  dark = false,
}: {
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
      <h2
        className="font-display"
        style={{
          fontSize: 'var(--text-h2)',
          color: dark ? '#fff' : '#0a0a0a',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          textWrap: 'balance',
        }}
      >
        {heading}
      </h2>
    </div>
  );
}
