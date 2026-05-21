'use client';

import { useState } from 'react';
import { GeomPattern } from '@/components/ui/GeomPattern';

const faqs = [
  {
    question: 'Hoe lang duurt het voordat mijn bestelling wordt verzonden?',
    answer:
      'Bestellingen worden binnen 1 tot 2 werkdagen verwerkt en verzonden. Zodra je bestelling onderweg is, ontvang je een e-mail met een track-en-tracecode zodat je je pakket kunt volgen.',
  },
  {
    question: 'Wat zijn de verzendkosten?',
    answer:
      'Gratis verzending voor bestellingen vanaf €75. Voor bestellingen onder €75 rekenen wij een vast tarief van €4,95. Wij verzenden met PostNL en DHL naar Nederland en België.',
  },
  {
    question: 'Kan ik mijn bestelling retourneren?',
    answer:
      'Ja, je hebt 30 dagen bedenktijd vanaf de dag dat je de bestelling ontvangt. Zorg dat het product ongebruikt en in originele verpakking retour komt. Retourkosten zijn voor eigen rekening, tenzij het product defect of beschadigd is.',
  },
  {
    question: 'Welke betaalmethoden accepteren jullie?',
    answer:
      'Je kunt betalen met iDEAL, Bancontact, Creditcard (Visa, Mastercard, American Express), Klarna (achteraf betalen) en Apple Pay. Alle betalingen verlopen via een beveiligde SSL-verbinding.',
  },
  {
    question: 'Zijn de gebedskleden en Korans authentiek?',
    answer:
      'Absoluut. Al onze producten worden met zorg geselecteerd en rechtstreeks ingekocht bij vertrouwde leveranciers en ambachtslieden. Wij werken uitsluitend met authentieke, hoogwaardige materialen.',
  },
  {
    question: 'Kan ik een bestelling plaatsen als cadeau?',
    answer:
      'Jazeker. Bij elke bestelling kun je tijdens het afrekenen aangeven dat het om een cadeau gaat. Wij verpakken je bestelling dan in een luxe geschenkverpakking en voegen desgewenst een persoonlijke boodschap toe.',
  },
];

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      className="py-16 lg:py-24"
      style={{
        background: '#FAF7F2',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GeomPattern flip />

      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 700,
          height: 500,
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <style>{`
        .faq-question-row {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 18px 24px;
          cursor: pointer;
          border-left: 2px solid transparent;
          transition: background 0.25s, border-left-color 0.25s;
          background: transparent;
        }
        .faq-question-row:hover {
          background: rgba(201,168,76,0.04);
        }
        .faq-question-row.is-active {
          background: rgba(201,168,76,0.06);
          border-left-color: #c9a84c;
        }
        .faq-num {
          font-family: var(--font-playfair), serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(201,168,76,0.45);
          letter-spacing: 0.08em;
          padding-top: 1px;
          flex-shrink: 0;
          transition: color 0.25s;
          min-width: 24px;
        }
        .faq-question-row.is-active .faq-num,
        .faq-question-row:hover .faq-num {
          color: #c9a84c;
        }
        .faq-q-text {
          font-size: var(--text-sm);
          font-weight: 500;
          color: #444;
          line-height: 1.55;
          transition: color 0.25s;
        }
        .faq-question-row.is-active .faq-q-text,
        .faq-question-row:hover .faq-q-text {
          color: #0a0a0a;
        }
        .faq-answer-panel {
          position: relative;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(201,168,76,0.18);
          padding: 40px 36px;
          min-height: 100%;
          display: flex;
          flex-direction: column;
        }
        @keyframes faqAnswerIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .faq-answer-content {
          animation: faqAnswerIn 0.35s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .faq-divider-v {
          width: 1px;
          background: linear-gradient(180deg, rgba(201,168,76,0.3) 0%, rgba(201,168,76,0.08) 50%, rgba(201,168,76,0.3) 100%);
          margin: 0 32px;
        }
      `}</style>

      <div
        className="max-w-[1280px] mx-auto px-4 md:px-10"
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p
            style={{
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#c9a84c',
              fontWeight: 600,
              marginBottom: 14,
            }}
          >
            Veelgestelde Vragen
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'var(--text-h2)',
              fontWeight: 600,
              color: '#0a0a0a',
              letterSpacing: '-0.02em',
              marginBottom: 18,
            }}
          >
            Hulp nodig?
          </h2>
          {/* Ornamental divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 32,
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5))',
              }}
            />
            <div
              style={{
                width: 5,
                height: 5,
                background: '#c9a84c',
                opacity: 0.6,
                transform: 'rotate(45deg)',
              }}
            />
            <div
              style={{
                width: 32,
                height: 1,
                background: 'linear-gradient(90deg, rgba(201,168,76,0.5), transparent)',
              }}
            />
          </div>
        </div>

        {/* Desktop split layout: questions left | answer right */}
        <div className="hidden md:flex" style={{ gap: 0, alignItems: 'stretch' }}>
          {/* Left: question list */}
          <div
            style={{
              flex: '0 0 44%',
              background: '#fff',
              border: '1px solid rgba(201,168,76,0.22)',
              position: 'relative',
              boxShadow: '0 4px 40px rgba(201,168,76,0.06)',
            }}
          >
            {/* Corner brackets left */}
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                width: 16,
                height: 16,
                borderTop: '1px solid rgba(201,168,76,0.5)',
                borderLeft: '1px solid rgba(201,168,76,0.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 16,
                height: 16,
                borderTop: '1px solid rgba(201,168,76,0.5)',
                borderRight: '1px solid rgba(201,168,76,0.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                width: 16,
                height: 16,
                borderBottom: '1px solid rgba(201,168,76,0.5)',
                borderLeft: '1px solid rgba(201,168,76,0.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                width: 16,
                height: 16,
                borderBottom: '1px solid rgba(201,168,76,0.5)',
                borderRight: '1px solid rgba(201,168,76,0.5)',
              }}
            />

            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`faq-question-row${activeIndex === i ? ' is-active' : ''}`}
                onClick={() => setActiveIndex(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveIndex(i);
                }}
                style={{
                  borderBottom: i < faqs.length - 1 ? '1px solid rgba(201,168,76,0.1)' : 'none',
                }}
              >
                <span className="faq-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq-q-text">{faq.question}</span>
              </div>
            ))}
          </div>

          {/* Vertical gold divider */}
          <div className="faq-divider-v" style={{ flexShrink: 0 }} />

          {/* Right: answer panel */}
          <div
            className="faq-answer-panel"
            style={{
              flex: '1 1 auto',
              boxShadow: '0 4px 40px rgba(201,168,76,0.06)',
            }}
          >
            {/* Corner brackets right */}
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                width: 16,
                height: 16,
                borderTop: '1px solid rgba(201,168,76,0.5)',
                borderLeft: '1px solid rgba(201,168,76,0.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 16,
                height: 16,
                borderTop: '1px solid rgba(201,168,76,0.5)',
                borderRight: '1px solid rgba(201,168,76,0.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                width: 16,
                height: 16,
                borderBottom: '1px solid rgba(201,168,76,0.5)',
                borderLeft: '1px solid rgba(201,168,76,0.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                width: 16,
                height: 16,
                borderBottom: '1px solid rgba(201,168,76,0.5)',
                borderRight: '1px solid rgba(201,168,76,0.5)',
              }}
            />

            {/* Decorative big quote mark */}
            <div
              className="font-display select-none"
              style={{
                position: 'absolute',
                top: 16,
                left: 26,
                fontSize: 72,
                color: 'rgba(201,168,76,0.1)',
                lineHeight: 1,
              }}
            >
              &ldquo;
            </div>

            {/* Active question label */}
            <div style={{ marginBottom: 28 }}>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,168,76,0.6)',
                  fontWeight: 500,
                  marginBottom: 8,
                }}
              >
                Vraag {String(activeIndex + 1).padStart(2, '0')}
              </p>
              <p
                className="font-display"
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 600,
                  color: '#0a0a0a',
                  lineHeight: 1.4,
                }}
              >
                {faqs[activeIndex].question}
              </p>
            </div>

            {/* Divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4))',
                }}
              />
              <div
                style={{
                  width: 4,
                  height: 4,
                  background: '#c9a84c',
                  opacity: 0.5,
                  transform: 'rotate(45deg)',
                }}
              />
              <div
                style={{
                  width: 18,
                  height: 1,
                  background: 'linear-gradient(90deg, rgba(201,168,76,0.4), transparent)',
                }}
              />
            </div>

            {/* Answer */}
            <div key={activeIndex} className="faq-answer-content">
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: '#666',
                  lineHeight: 1.85,
                }}
              >
                {faqs[activeIndex].answer}
              </p>
            </div>

            {/* Decorative element bottom */}
            <div style={{ marginTop: 'auto', paddingTop: 32 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {faqs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Vraag ${i + 1}`}
                    style={{
                      width: activeIndex === i ? 28 : 6,
                      height: 6,
                      borderRadius: 3,
                      border: 'none',
                      background: activeIndex === i ? '#c9a84c' : 'rgba(201,168,76,0.2)',
                      cursor: 'pointer',
                      transition: 'width 0.3s, background 0.3s',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden">
          <div
            style={{
              background: '#fff',
              border: '1px solid rgba(201,168,76,0.22)',
              position: 'relative',
              boxShadow: '0 4px 40px rgba(201,168,76,0.06)',
              padding: '12px 0',
            }}
          >
            {/* Corner brackets */}
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                width: 16,
                height: 16,
                borderTop: '1px solid rgba(201,168,76,0.5)',
                borderLeft: '1px solid rgba(201,168,76,0.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 16,
                height: 16,
                borderTop: '1px solid rgba(201,168,76,0.5)',
                borderRight: '1px solid rgba(201,168,76,0.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                width: 16,
                height: 16,
                borderBottom: '1px solid rgba(201,168,76,0.5)',
                borderLeft: '1px solid rgba(201,168,76,0.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                width: 16,
                height: 16,
                borderBottom: '1px solid rgba(201,168,76,0.5)',
                borderRight: '1px solid rgba(201,168,76,0.5)',
              }}
            />

            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderBottom: i < faqs.length - 1 ? '1px solid rgba(201,168,76,0.1)' : 'none',
                }}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px 24px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                  aria-expanded={activeIndex === i}
                >
                  <span
                    className="font-display"
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: activeIndex === i ? '#c9a84c' : 'rgba(201,168,76,0.4)',
                      letterSpacing: '0.08em',
                      flexShrink: 0,
                      minWidth: 22,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 500,
                      color: activeIndex === i ? '#0a0a0a' : '#555',
                      lineHeight: 1.5,
                      flex: 1,
                    }}
                  >
                    {faq.question}
                  </span>
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${activeIndex === i ? '#c9a84c' : 'rgba(201,168,76,0.25)'}`,
                      color: activeIndex === i ? '#c9a84c' : 'rgba(201,168,76,0.5)',
                      fontSize: 15,
                      transition: 'all 0.2s',
                      background: activeIndex === i ? 'rgba(201,168,76,0.06)' : 'transparent',
                    }}
                  >
                    {activeIndex === i ? '−' : '+'}
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: activeIndex === i ? 300 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.35s cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <p
                    style={{
                      padding: '0 24px 20px 60px',
                      fontSize: 'var(--text-sm)',
                      color: '#777',
                      lineHeight: 1.8,
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA text */}
        <p
          style={{
            textAlign: 'center',
            marginTop: 40,
            fontSize: 'var(--text-sm)',
            color: '#999',
          }}
        >
          Staat je vraag er niet tussen?{' '}
          <a
            href="/contact"
            style={{
              color: '#c9a84c',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Neem contact met ons op
          </a>
        </p>
      </div>
    </section>
  );
}
