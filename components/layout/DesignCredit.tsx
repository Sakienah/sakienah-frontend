import Image from 'next/image';

export function DesignCredit() {
  return (
    <div
      style={{
        background: '#0a0a0a',
        paddingTop: 4,
        paddingBottom: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <a
        href="https://snippt.nl/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 11,
          textDecoration: 'none',
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.22)',
            letterSpacing: '0.12em',
          }}
        >
          Design by
        </span>
        <Image
          src="/logo-credit-gold.png"
          alt="Snippt"
          width={72}
          height={22}
          style={{ height: 'auto', opacity: 0.6 }}
          unoptimized
        />
      </a>
    </div>
  );
}
