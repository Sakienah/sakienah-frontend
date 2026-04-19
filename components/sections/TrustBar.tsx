import { trustItems } from '@/lib/data';

export function TrustBar() {
  return (
    <div style={{ background: '#fff', borderBottom: '1px solid #F0EBE3', padding: '20px 0' }}>
      <div
        className="max-w-[1280px] mx-auto grid"
        style={{ padding: '0 40px', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}
      >
        {trustItems.map(({ icon, label, sub }) => (
          <div key={label} className="flex items-center justify-center" style={{ gap: 14 }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0a' }}>{label}</div>
              <div style={{ fontSize: 11, color: '#999' }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
