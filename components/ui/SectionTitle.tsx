type SectionTitleProps = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

export function SectionTitle({ title, subtitle, align = 'center' }: SectionTitleProps) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col gap-3 ${alignment} mb-12`}>
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-black tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="text-zinc-500 text-base max-w-xl">{subtitle}</p>}
    </div>
  );
}
