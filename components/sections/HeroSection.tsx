'use client';

import { useEffect, useRef } from 'react';
import { Button } from '../ui/Button';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;

    const reversePlay = () => {
      if (video.currentTime <= 0) {
        video.play();
        return;
      }
      video.currentTime = Math.max(0, video.currentTime - 1 / 30);
      rafId = requestAnimationFrame(reversePlay);
    };

    const handleEnded = () => {
      rafId = requestAnimationFrame(reversePlay);
    };

    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      <video
        ref={videoRef}
        src="/brand_assets/video%20(1).mp4"
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20 md:py-32">
        <p className="text-[10px] tracking-[0.24em] uppercase text-gold font-semibold mb-4">
          Islamitische Lifestyle Winkel
        </p>

        <div className="flex items-center gap-2 mb-5">
          <span className="w-8 h-px bg-gold opacity-60" />
          <span
            className="w-[6px] h-[6px] bg-gold opacity-80"
            style={{ transform: 'rotate(45deg)' }}
          />
        </div>

        <h1 className="font-display text-5xl md:text-6xl font-semibold leading-[1.1] text-white mb-6">
          Alles voor jouw
          <br />
          <span className="text-gold">islamitische lifestyle</span>
        </h1>

        <p className="text-white/70 text-base leading-relaxed max-w-lg mb-8 font-light">
          Van gebedskleding tot Koran accessoires — premium producten geselecteerd met zorg en
          intentie.
        </p>

        <div className="flex gap-3 flex-wrap mb-10">
          <Button variant="secondary" href="/shop">
            Shop collectie
          </Button>
          <Button variant="outline" href="/producten">
            Bekijk producten
          </Button>
        </div>

        <div className="flex flex-wrap gap-6">
          {['Gratis verzending v.a. €50', '30 dagen retour', 'Veilig betalen'].map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 text-[11px] text-white/50 tracking-wide"
            >
              <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
