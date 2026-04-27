export function GeomPattern({
  dark = false,
  flip = false,
  opacity,
  id,
}: {
  dark?: boolean;
  flip?: boolean;
  opacity?: number;
  id?: string;
}) {
  return (
    <div
      aria-hidden
      id={id}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: "url('/brand_assets/background.webp')",
        backgroundRepeat: 'repeat',
        backgroundSize: '320px auto',
        opacity: opacity ?? (dark ? 0.2 : 0.22),
        filter: dark
          ? 'invert(1) sepia(1) saturate(5) hue-rotate(5deg) brightness(0.8)'
          : undefined,
        mixBlendMode: dark ? 'screen' : 'multiply',
        pointerEvents: 'none',
        transform: flip ? 'scaleY(-1)' : undefined,
      }}
    />
  );
}
