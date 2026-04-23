import { GeomPattern } from '@/components/ui/GeomPattern';

type AuthLayoutProps = {
  title: string;
  arabicTitle: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthLayout({ title, arabicTitle, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-[106px] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[480px]">
          <div className="bg-white border border-[#F0EBE3] px-12 py-[52px] relative overflow-hidden">
            <GeomPattern opacity={0.04} />
            <div className="relative z-10">
              <div className="text-center mb-9">
                <div className="font-display text-[26px] font-semibold text-[#0a0a0a] mb-1">
                  Sakienah
                </div>
                <div
                  className="font-arabic text-xl text-[#c9a84c]"
                  style={{ direction: 'rtl', opacity: 0.8 }}
                >
                  {arabicTitle}
                </div>
              </div>
              <div className="text-center mb-9">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#c9a84c] font-semibold mb-2.5">
                  {subtitle}
                </p>
                <h1
                  className="font-display text-[30px] font-semibold text-[#0a0a0a]"
                  style={{ letterSpacing: '-0.01em' }}
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
