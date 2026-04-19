import { trustItems } from '@/lib/data';

export function TrustBar() {
  return (
    <div className="bg-white border-b border-[#F0EBE3] py-5">
      <div className="max-w-[1280px] mx-auto px-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {trustItems.map(({ icon, label, sub }) => (
          <div key={label} className="flex items-center gap-3.5 justify-center">
            <span className="text-[20px]">{icon}</span>
            <div>
              <div className="text-[12px] font-semibold text-[#0a0a0a]">{label}</div>
              <div className="text-[11px] text-zinc-400">{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
