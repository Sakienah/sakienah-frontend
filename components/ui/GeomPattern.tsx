export function GeomPattern({ opacity = 0.07, id = 'geom' }: { opacity?: number; id?: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <defs>
        <pattern id={id} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <g stroke="#c9a84c" strokeWidth="0.5" fill="none" opacity={opacity * 10}>
            <path d="M40 10 L70 40 L40 70 L10 40 Z" />
            <path d="M40 24 L56 40 L40 56 L24 40 Z" />
            <path d="M40 0 L40 10 M40 70 L40 80 M0 40 L10 40 M70 40 L80 40" strokeWidth="0.3" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
