export function BestsellersSkeleton() {
  return (
    <section
      style={{ background: '#FAF7F2', padding: '96px 0', position: 'relative', overflow: 'hidden' }}
    >
      <div className="max-w-[1280px] mx-auto relative z-10" style={{ padding: '0 40px' }}>
        <div className="flex items-end justify-between" style={{ marginBottom: 56 }}>
          <div>
            <div
              className="animate-pulse"
              style={{
                width: 80,
                height: 10,
                background: '#E8E0D5',
                marginBottom: 12,
                borderRadius: 2,
              }}
            />
            <div
              className="animate-pulse"
              style={{ width: 200, height: 40, background: '#E8E0D5', borderRadius: 2 }}
            />
          </div>
          <div
            className="animate-pulse"
            style={{ width: 80, height: 12, background: '#E8E0D5', borderRadius: 2 }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {[0, 1].map((i) => (
            <div key={i} style={{ background: '#fff', overflow: 'hidden' }}>
              <div
                className="animate-pulse"
                style={{ aspectRatio: '3/4', background: '#EDE8DF' }}
              />
              <div style={{ padding: '22px 24px 26px' }}>
                <div
                  className="animate-pulse"
                  style={{
                    width: 80,
                    height: 12,
                    background: '#EDE8DF',
                    marginBottom: 8,
                    borderRadius: 2,
                  }}
                />
                <div
                  className="animate-pulse"
                  style={{
                    width: '60%',
                    height: 18,
                    background: '#EDE8DF',
                    marginBottom: 14,
                    borderRadius: 2,
                  }}
                />
                <div
                  className="animate-pulse"
                  style={{ width: 60, height: 12, background: '#EDE8DF', borderRadius: 2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
