'use client';

import { useMemo } from 'react';

function seedRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

export function IslamicMandala() {
  const particles = useMemo(() => {
    const rand = seedRandom(42);
    return Array.from({ length: 12 }, (_, i) => ({
      top: 15 + rand() * 70,
      left: 10 + rand() * 80,
      delay: i * 0.7,
      duration: 4 + rand() * 4,
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      style={{ opacity: 0.85 }}
    >
      <style>{`
        @keyframes mandalaRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes mandalaRotateReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes mandalaPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.8; }
        }
        .mandala-layer-1 {
          animation: mandalaRotate 120s linear infinite;
        }
        .mandala-layer-2 {
          animation: mandalaRotateReverse 90s linear infinite;
        }
        .mandala-layer-3 {
          animation: mandalaRotate 60s linear infinite;
        }
        .mandala-pulse {
          animation: mandalaPulse 8s ease-in-out infinite;
        }
      `}</style>

      <svg
        className="absolute mandala-pulse"
        style={{
          width: 'min(140vw, 140vh)',
          height: 'min(140vw, 140vh)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        viewBox="0 0 1000 1000"
        fill="none"
      >
        {/* Outer ring — 8-pointed star */}
        <g className="mandala-layer-1" style={{ transformOrigin: '500px 500px' }}>
          {/* Large octagon */}
          <polygon
            points="500,50 850,150 950,500 850,850 500,950 150,850 50,500 150,150"
            stroke="rgba(201,168,76,0.2)"
            strokeWidth="1"
            fill="none"
          />
          {/* 8-pointed star */}
          <polygon
            points="500,20 575,150 800,200 650,325 950,500 650,675 800,800 575,850 500,980 425,850 200,800 350,675 50,500 350,325 200,200 425,150"
            stroke="rgba(201,168,76,0.3)"
            strokeWidth="1"
            fill="none"
          />
          {/* Connecting lines between star points */}
          <polygon
            points="500,150 650,200 750,350 650,500 750,650 650,800 500,850 350,800 250,650 350,500 250,350 350,200"
            stroke="rgba(201,168,76,0.18)"
            strokeWidth="1"
            fill="none"
          />
        </g>

        {/* Middle ring — geometric flower */}
        <g className="mandala-layer-2" style={{ transformOrigin: '500px 500px' }}>
          {/* 12-pointed star */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const outerR = 280;
            const innerR = 140;
            const outerX = 500 + outerR * Math.sin(rad);
            const outerY = 500 - outerR * Math.cos(rad);
            const innerAngle = ((angle + 15) * Math.PI) / 180;
            const innerX = 500 + innerR * Math.sin(innerAngle);
            const innerY = 500 - innerR * Math.cos(innerAngle);
            const nextAngle = ((angle + 30) * Math.PI) / 180;
            const nextInnerX = 500 + innerR * Math.sin(nextAngle);
            const nextInnerY = 500 - innerR * Math.cos(nextAngle);
            return (
              <g key={i}>
                <line
                  x1={outerX}
                  y1={outerY}
                  x2={innerX}
                  y2={innerY}
                  stroke="rgba(201,168,76,0.2)"
                  strokeWidth="1"
                />
                <line
                  x1={innerX}
                  y1={innerY}
                  x2={nextInnerX}
                  y2={nextInnerY}
                  stroke="rgba(201,168,76,0.15)"
                  strokeWidth="1"
                />
              </g>
            );
          })}
          {/* Inner circle */}
          <circle
            cx="500"
            cy="500"
            r="140"
            stroke="rgba(201,168,76,0.2)"
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="500"
            cy="500"
            r="200"
            stroke="rgba(201,168,76,0.12)"
            strokeWidth="1"
            fill="none"
          />
        </g>

        {/* Inner ring — small geometric details */}
        <g className="mandala-layer-3" style={{ transformOrigin: '500px 500px' }}>
          {/* 16-pointed inner star */}
          {[
            0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315,
            337.5,
          ].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const r = 100;
            const x = 500 + r * Math.sin(rad);
            const y = 500 - r * Math.cos(rad);
            const nextAngle = ((angle + 22.5) * Math.PI) / 180;
            const nextX = 500 + r * Math.sin(nextAngle);
            const nextY = 500 - r * Math.cos(nextAngle);
            return (
              <g key={i}>
                <line
                  x1={500}
                  y1={500}
                  x2={x}
                  y2={y}
                  stroke="rgba(201,168,76,0.35)"
                  strokeWidth="1"
                />
                <circle cx={x} cy={y} r="3" fill="rgba(201,168,76,0.5)" />
                <line
                  x1={x}
                  y1={y}
                  x2={nextX}
                  y2={nextY}
                  stroke="rgba(201,168,76,0.18)"
                  strokeWidth="1"
                />
              </g>
            );
          })}
          {/* Center */}
          <circle
            cx="500"
            cy="500"
            r="25"
            stroke="rgba(201,168,76,0.4)"
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="500"
            cy="500"
            r="12"
            stroke="rgba(201,168,76,0.55)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="500" cy="500" r="5" fill="rgba(201,168,76,0.6)" />
        </g>

        {/* Decorative corner ornaments */}
        <g opacity="0.4">
          {/* Top-left */}
          <polygon
            points="100,100 120,100 120,120 100,120"
            stroke="#c9a84c"
            strokeWidth="1"
            fill="none"
            transform="rotate(45 110 110)"
          />
          {/* Top-right */}
          <polygon
            points="900,100 880,100 880,120 900,120"
            stroke="#c9a84c"
            strokeWidth="1"
            fill="none"
            transform="rotate(45 890 110)"
          />
          {/* Bottom-left */}
          <polygon
            points="100,900 120,900 120,880 100,880"
            stroke="#c9a84c"
            strokeWidth="1"
            fill="none"
            transform="rotate(45 110 890)"
          />
          {/* Bottom-right */}
          <polygon
            points="900,900 880,900 880,880 900,880"
            stroke="#c9a84c"
            strokeWidth="1"
            fill="none"
            transform="rotate(45 890 890)"
          />
        </g>
      </svg>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute mandala-pulse"
          style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: 'rgba(201,168,76,0.8)',
            top: `${p.top}%`,
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
