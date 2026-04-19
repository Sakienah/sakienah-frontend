export function GoldOrnament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="w-12 h-px bg-gold opacity-50" />
      <span className="w-1.5 h-1.5 bg-gold opacity-70" style={{ transform: 'rotate(45deg)' }} />
      <span className="w-12 h-px bg-gold opacity-50" />
    </div>
  );
}
