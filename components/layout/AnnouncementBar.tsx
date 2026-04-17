'use client';

const messages = [
  'Gratis verzending vanaf €50',
  '✦',
  'Handgemaakt met zorg',
  '✦',
  'Snel geleverd in Nederland & België',
  '✦',
  'Premium kwaliteit gebedssets',
  '✦',
];

export function AnnouncementBar() {
  const text = messages.join('   ');

  return (
    <div className="w-full h-8 bg-black overflow-hidden flex items-center">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-[11px] tracking-widest uppercase text-yellow-500/80 px-8">
          {text}&nbsp;&nbsp;&nbsp;&nbsp;{text}
        </span>
      </div>
    </div>
  );
}
