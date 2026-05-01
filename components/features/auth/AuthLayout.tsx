import { GeomPattern } from '@/components/ui/GeomPattern';

type AuthLayoutProps = {
  title: string;
  arabicTitle: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthLayout({ title, arabicTitle, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-[106px] flex flex-col relative overflow-hidden">
      <GeomPattern flip />
      <div
        className="flex-1 flex items-center justify-center"
        style={{ padding: 'clamp(2rem, 5vw, 3rem) clamp(1rem, 5vw, 3rem)' }}
      >
        <div className="w-full max-w-[480px]">
          <div
            className="bg-white border border-[#F0EBE3]"
            style={{
              padding: 'clamp(2.5rem, 6vw, 3.25rem) clamp(2rem, 5vw, 4.5rem)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <GeomPattern opacity={0.06} />
            <div className="relative z-10">
              <div className="text-center mb-9">
                <div
                  className="font-display font-semibold text-[#0a0a0a] mb-1"
                  style={{ fontSize: 'clamp(1.5rem, 4vw, 1.625rem)' }}
                >
                  Sakienah
                </div>
                <div
                  className="font-arabic text-[#c9a84c]"
                  style={{
                    direction: 'rtl',
                    opacity: 0.8,
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  }}
                >
                  {arabicTitle}
                </div>
              </div>
              <div className="text-center mb-9">
                <p
                  className="font-sans tracking-[0.2em] uppercase text-[#c9a84c] font-semibold mb-2.5"
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  {subtitle}
                </p>
                <h1
                  className="font-display font-semibold text-[#0a0a0a]"
                  style={{
                    letterSpacing: '-0.01em',
                    fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
                  }}
                >
                  {title}
                </h1>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
