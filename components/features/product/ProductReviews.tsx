'use client';

import { useState } from 'react';

/**
 * Voorbeeld-review data. In productie wordt dit vervangen door een echte
 * API call naar /reviews/:productId met gesorteerde, geverifieerde reviews.
 */
const PLACEHOLDER_REVIEWS = [
  {
    id: '1',
    name: 'Fatima A.',
    rating: 5,
    date: '15 maart 2026',
    comment:
      "Masha'Allah, prachtige kwaliteit! Het gebedskleed is zacht en de rugsteun maakt het veel comfortabeler tijdens lange gebeden. Echt een aanrader voor iedereen.",
  },
  {
    id: '2',
    name: 'Yusuf M.',
    rating: 5,
    date: '2 maart 2026',
    comment:
      'Snelle levering en het product is precies zoals beschreven. De kleuren zijn nog mooier in het echt. Mijn vrouw is er heel blij mee.',
  },
  {
    id: '3',
    name: 'Aisha K.',
    rating: 4,
    date: '28 februari 2026',
    comment:
      'Heel tevreden met de aankoop. Het materiaal voelt premium aan en het design is elegant. Enige puntje: de verpakking had iets steviger gekund.',
  },
  {
    id: '4',
    name: 'Hassan R.',
    rating: 5,
    date: '20 februari 2026',
    comment:
      'SubhanAllah, wat een mooie producten. Je merkt echt dat er aandacht aan is besteed. De klantenservice was ook erg vriendelijk en behulpzaam.',
  },
  {
    id: '5',
    name: 'Meryem S.',
    rating: 5,
    date: '10 februari 2026',
    comment:
      'Perfect cadeau voor mijn moeder. Ze gebruikt het gebedskleed nu elke dag en zegt dat het de beste is die ze ooit heeft gehad. Heel blij mee!',
  },
];

/**
 * Rating-sterren component — herbruikbaar in de reviews sectie.
 * Toont 5 sterren waarvan `count` gevuld (goud) en de rest leeg (lichtgrijs).
 */
function ReviewStars({ count }: { count: number }) {
  return (
    <span className="flex" style={{ gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 20 20"
          style={{ fill: i < count ? '#c9a84c' : '#E8E0D5' }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Customer Reviews sectie voor op de productdetailpagina.
 * Toont een samenvatting met gemiddelde score en verdeelsleutel,
 * plus individuele review-kaarten met naam, datum, sterren en commentaar.
 *
 * Bouwt vertrouwen op via sociaal bewijs — essentieel voor conversie.
 */
export function ProductReviews() {
  const [showAll, setShowAll] = useState(false);
  const visibleReviews = showAll ? PLACEHOLDER_REVIEWS : PLACEHOLDER_REVIEWS.slice(0, 3);

  // Bereken rating-verdeling
  const avgRating =
    PLACEHOLDER_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / PLACEHOLDER_REVIEWS.length;
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = PLACEHOLDER_REVIEWS.filter((r) => r.rating === star).length;
    return {
      star,
      count,
      pct: (count / PLACEHOLDER_REVIEWS.length) * 100,
    };
  });

  return (
    <div style={{ marginTop: 64 }}>
      <h3
        className="font-display"
        style={{ fontSize: 24, fontWeight: 600, color: '#0a0a0a', marginBottom: 32 }}
      >
        Klantreviews
      </h3>

      {/* Reviews samenvatting */}
      <div
        className="flex flex-col sm:flex-row"
        style={{ gap: 'clamp(24px, 5vw, 48px)', marginBottom: 40 }}
      >
        {/* Gemiddelde score */}
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <p
            className="font-display"
            style={{ fontSize: 48, fontWeight: 700, color: '#c9a84c', lineHeight: 1 }}
          >
            {avgRating.toFixed(1)}
          </p>
          <ReviewStars count={Math.round(avgRating)} />
          <p style={{ fontSize: 12, color: '#aaa', marginTop: 8 }}>
            {PLACEHOLDER_REVIEWS.length} reviews
          </p>
        </div>

        {/* Score verdeling */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {distribution.map(({ star, count, pct }) => (
            <div key={star} className="flex items-center" style={{ gap: 10 }}>
              <span style={{ fontSize: 12, color: '#888', width: 20, textAlign: 'right' }}>
                {star}
              </span>
              <span style={{ fontSize: 12, color: '#c9a84c' }}>★</span>
              <div
                style={{
                  flex: 1,
                  height: 6,
                  background: '#F0EBE3',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    background: '#c9a84c',
                    borderRadius: 3,
                    width: `${pct}%`,
                    transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </div>
              <span style={{ fontSize: 11, color: '#aaa', width: 24 }}>{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Individuele reviews */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {visibleReviews.map((review) => (
          <div
            key={review.id}
            style={{
              padding: '20px 24px',
              background: '#FAF7F2',
              border: '1px solid #F0EBE3',
            }}
          >
            <div
              className="flex justify-between items-start flex-wrap"
              style={{ gap: 8, marginBottom: 10 }}
            >
              <div>
                {/* Avatar initiaal + naam */}
                <div className="flex items-center" style={{ gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: '#c9a84c',
                      color: '#0a0a0a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0a0a0a' }}>{review.name}</p>
                    <div className="flex items-center" style={{ gap: 8 }}>
                      <ReviewStars count={review.rating} />
                      <span style={{ fontSize: 11, color: '#bbb' }}>{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Geverifieerde aankoop badge */}
              <span
                style={{
                  fontSize: 10,
                  color: '#4CAF78',
                  background: '#F0FBF4',
                  border: '1px solid #D4EDDA',
                  padding: '3px 8px',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                }}
              >
                ✓ Geverifieerde aankoop
              </span>
            </div>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8 }}>{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Toon meer / minder reviews */}
      {PLACEHOLDER_REVIEWS.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            marginTop: 24,
            background: 'none',
            border: '1px solid #E8E0D5',
            cursor: 'pointer',
            fontSize: 12,
            color: '#666',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 500,
            padding: '10px 24px',
          }}
        >
          {showAll ? 'Toon minder' : `Toon alle ${PLACEHOLDER_REVIEWS.length} reviews`}
        </button>
      )}
    </div>
  );
}
