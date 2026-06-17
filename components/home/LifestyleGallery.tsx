import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

export function LifestyleGallery() {
  return (
    <section className="relative">
      <Reveal>
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '28 / 9' }}>
          <Image
            src="/bnanana.webp"
            alt="Sakienah sfeerbeeld"
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
          {/* Fade the top and bottom edges into the sections above/below instead of a hard cut */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(10,8,4,0.45) 0%, transparent 12%, transparent 88%, rgba(10,8,4,0.45) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </Reveal>
    </section>
  );
}
