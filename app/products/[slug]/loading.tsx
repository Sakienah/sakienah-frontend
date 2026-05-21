import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GeomPattern } from '@/components/ui/GeomPattern';

export default function ProductLoading() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#FAF7F2]" style={{ paddingTop: 'clamp(110px, 15vw, 106px)' }}>
        {/* Breadcrumb skeleton */}
        <div
          className="max-w-[1280px] mx-auto"
          style={{
            paddingLeft: 'clamp(1rem, 5vw, 2.5rem)',
            paddingRight: 'clamp(1rem, 5vw, 2.5rem)',
          }}
        >
          <div className="flex items-center" style={{ gap: 8, marginBottom: 8 }}>
            <div className="skeleton-shimmer" style={{ height: 10, width: 40 }} />
            <span style={{ color: '#ccc', fontSize: 10 }}>/</span>
            <div className="skeleton-shimmer" style={{ height: 10, width: 60 }} />
            <span style={{ color: '#ccc', fontSize: 10 }}>/</span>
            <div className="skeleton-shimmer" style={{ height: 10, width: 80 }} />
          </div>
        </div>

        <div
          className="py-10 md:py-20"
          style={{
            background: '#FAF7F2',
            paddingLeft: 'clamp(1rem, 5vw, 2.5rem)',
            paddingRight: 'clamp(1rem, 5vw, 2.5rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern />
          <div className="max-w-[1280px] mx-auto relative z-10">
            <div
              className="p-6 md:p-12"
              style={{ background: '#fff', border: '1px solid #F0EBE3' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[44fr_56fr] gap-8 lg:gap-16">
                {/* Image skeleton */}
                <div>
                  <div
                    className="skeleton-shimmer"
                    style={{ width: '100%', aspectRatio: '3/4', maxWidth: 500 }}
                  />
                  <div className="flex mt-4" style={{ gap: 8 }}>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="skeleton-shimmer" style={{ width: 72, height: 72 }} />
                    ))}
                  </div>
                </div>

                {/* Detail skeleton */}
                <div>
                  <div
                    className="skeleton-shimmer"
                    style={{ height: 12, width: 80, marginBottom: 12 }}
                  />
                  <div
                    className="skeleton-shimmer"
                    style={{ height: 36, width: '70%', marginBottom: 8 }}
                  />
                  <div
                    className="skeleton-shimmer"
                    style={{ height: 14, width: '90%', marginBottom: 6 }}
                  />
                  <div
                    className="skeleton-shimmer"
                    style={{ height: 14, width: '85%', marginBottom: 6 }}
                  />
                  <div
                    className="skeleton-shimmer"
                    style={{ height: 14, width: '60%', marginBottom: 24 }}
                  />
                  <div
                    className="skeleton-shimmer"
                    style={{ height: 32, width: 100, marginBottom: 24 }}
                  />
                  <div
                    className="skeleton-shimmer"
                    style={{ height: 16, width: 140, marginBottom: 32 }}
                  />
                  <div
                    className="skeleton-shimmer"
                    style={{ height: 52, width: '100%', marginBottom: 16 }}
                  />
                  <div className="skeleton-shimmer" style={{ height: 44, width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
