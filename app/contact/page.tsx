'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GeomPattern } from '@/components/ui/GeomPattern';

const contactItems = [
  { label: 'E-mail', value: 'info@sakienah.nl' },
  { label: 'Telefoon', value: '+31 6 00 000 000' },
  { label: 'Openingstijden', value: 'Ma–Vr\n09:00–17:00' },
  { label: 'Reactietijd', value: 'Binnen 24 uur' },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      naam: (form.elements.namedItem('naam') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      onderwerp: (form.elements.namedItem('onderwerp') as HTMLInputElement).value,
      bericht: (form.elements.namedItem('bericht') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError('Er ging iets mis. Probeer het opnieuw of mail ons direct.');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div style={{ background: '#FAF7F2', padding: 40, textAlign: 'center' }}>
        <div className="font-arabic" style={{ fontSize: 36, color: '#c9a84c', marginBottom: 16 }}>
          شكرًا
        </div>
        <h3
          className="font-display"
          style={{ fontSize: 20, fontWeight: 600, color: '#0a0a0a', marginBottom: 12 }}
        >
          Bericht verzonden!
        </h3>
        <p style={{ fontSize: 14, color: '#777', lineHeight: 1.7 }}>
          Bedankt voor je bericht. We nemen zo snel mogelijk contact op.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <label
            style={{
              display: 'block',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#777',
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Naam
          </label>
          <input
            type="text"
            name="naam"
            required
            style={{
              width: '100%',
              background: '#FAF7F2',
              border: '1px solid #E8E0D5',
              padding: '14px 18px',
              fontSize: 14,
              color: '#0a0a0a',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: 'block',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#777',
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            E-mail
          </label>
          <input
            type="email"
            name="email"
            required
            style={{
              width: '100%',
              background: '#FAF7F2',
              border: '1px solid #E8E0D5',
              padding: '14px 18px',
              fontSize: 14,
              color: '#0a0a0a',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>
      <div>
        <label
          style={{
            display: 'block',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#777',
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          Onderwerp
        </label>
        <input
          type="text"
          name="onderwerp"
          required
          style={{
            width: '100%',
            background: '#FAF7F2',
            border: '1px solid #E8E0D5',
            padding: '14px 18px',
            fontSize: 14,
            color: '#0a0a0a',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div>
        <label
          style={{
            display: 'block',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#777',
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          Bericht
        </label>
        <textarea
          name="bericht"
          required
          rows={5}
          style={{
            width: '100%',
            background: '#FAF7F2',
            border: '1px solid #E8E0D5',
            padding: '14px 18px',
            fontSize: 14,
            color: '#0a0a0a',
            outline: 'none',
            resize: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>
      {error && <p style={{ fontSize: 13, color: '#dc2626' }}>{error}</p>}
      <div>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: '#0a0a0a',
            color: '#c9a84c',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 700,
            padding: '18px 36px',
            opacity: loading ? 0.6 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {loading ? 'Verzenden...' : 'Verstuur bericht →'}
        </button>
      </div>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <div
          style={{
            background: '#0a0a0a',
            paddingTop: 146,
            paddingBottom: 48,
            paddingLeft: 40,
            paddingRight: 40,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern dark />
          <div style={{ position: 'relative', zIndex: 10 }}>
            <p
              style={{
                fontSize: 10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Neem contact op
            </p>
            <h1
              className="font-display text-white"
              style={{ fontSize: 52, fontWeight: 600, letterSpacing: '-0.02em' }}
            >
              Contact
            </h1>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            background: '#fff',
            padding: '80px 40px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern flip />
          <div className="max-w-[1100px] mx-auto relative z-10">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
              {/* Left */}
              <div>
                <h2
                  className="font-display"
                  style={{ fontSize: 36, fontWeight: 600, color: '#0a0a0a', marginBottom: 32 }}
                >
                  Wij helpen je graag
                </h2>
                <div>
                  {contactItems.map(({ label, value }) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        gap: 20,
                        padding: '20px 0',
                        borderBottom: '1px solid #F0EBE3',
                        alignItems: 'flex-start',
                      }}
                    >
                      <span
                        style={{
                          width: 120,
                          flexShrink: 0,
                          fontSize: 11,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#c9a84c',
                          fontWeight: 600,
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          color: '#555',
                          lineHeight: 1.7,
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Arabic box */}
                <div
                  style={{
                    marginTop: 40,
                    border: '1px solid rgba(201,168,76,0.18)',
                    padding: '28px 32px',
                    textAlign: 'center',
                    background: '#FAF7F2',
                  }}
                >
                  <div
                    className="font-arabic"
                    style={{ fontSize: 28, color: '#c9a84c', marginBottom: 8 }}
                  >
                    جزاكم الله خيرًا
                  </div>
                  <p style={{ fontSize: 12, color: '#999', letterSpacing: '0.08em' }}>
                    Moge Allah jullie belonen met het goede
                  </p>
                </div>
              </div>

              {/* Right */}
              <div>
                <h2
                  className="font-display"
                  style={{ fontSize: 36, fontWeight: 600, color: '#0a0a0a', marginBottom: 32 }}
                >
                  Formulier
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
