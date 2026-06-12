import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GeomPattern } from '@/components/ui/GeomPattern';

const steps = [
  {
    step: '01',
    title: 'Meld je retour aan',
    description:
      'Stuur een e-mail naar info@sakienah.nl met je ordernummer en het product dat je wilt retourneren. We sturen je dan binnen 24 uur een retourformulier en instructies.',
  },
  {
    step: '02',
    title: 'Verpak het product',
    description:
      'Verpak het product in de originele verpakking, ongebruikt en in nieuwstaat. Gebruik bij voorkeur de originele doos en vulmaterialen om schade tijdens het transport te voorkomen.',
  },
  {
    step: '03',
    title: 'Verstuur je retour',
    description:
      'Breng het pakket naar een PostNL-punt met de verzendinstructies die je van ons ontvangt. Bewaar het verzendbewijs totdat je een terugbetaling hebt ontvangen.',
  },
  {
    step: '04',
    title: 'Ontvang je geld terug',
    description:
      'Zodra wij het product in goede staat hebben ontvangen, storten wij het aankoopbedrag binnen 5 werkdagen terug via de oorspronkelijke betaalmethode.',
  },
];

const conditions = [
  'Het product is ongebruikt en onbeschadigd',
  'Het product bevindt zich in de originele verpakking (indien redelijkerwijs mogelijk)',
  'Het product is geen gepersonaliseerd of op maat gemaakt artikel',
  'Het product valt niet onder hygiëneproducten waarvan de verzegeling is verbroken',
  'De retourzending wordt aangemeld binnen 30 dagen na ontvangst',
  'Het product wordt binnen 14 dagen na aanmelding teruggestuurd',
];

const faq = [
  {
    q: 'Hoe lang duurt het voordat ik mijn geld terug heb?',
    a: 'Zodra wij het geretourneerde product in goede staat hebben ontvangen en gecontroleerd, storten wij het bedrag binnen 5 werkdagen terug via de oorspronkelijke betaalmethode.',
  },
  {
    q: 'Wie betaalt de retourkosten?',
    a: 'De klant draagt de kosten voor het retourneren, tenzij het product defect of beschadigd is geleverd. In dat geval vergoeden wij uiteraard alle kosten.',
  },
  {
    q: 'Wat als mijn product beschadigd is geleverd?',
    a: "Neem binnen 48 uur na ontvangst contact met ons op via info@sakienah.nl met foto's van de beschadiging. Wij sturen u dan kosteloos een vervangend product of verwerken een volledige terugbetaling.",
  },
  {
    q: 'Kan ik een product ruilen?',
    a: 'Wij verwerken op dit moment geen directe ruilingen. U kunt het ongewenste product retourneren en een nieuwe bestelling plaatsen voor het gewenste product.',
  },
  {
    q: 'Welke producten kan ik niet retourneren?',
    a: 'Producten die om hygiënische redenen niet kunnen worden geretourneerd wanneer de verzegeling is verbroken, zoals geopende verzorgingsproducten. Ook gepersonaliseerde of op maat gemaakte artikelen zijn uitgesloten van het herroepingsrecht.',
  },
];

export default function RetourbeleidPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div
          style={{
            background: '#0a0a0a',
            paddingTop: 'clamp(120px, 20vw, 146px)',
            paddingBottom: 'clamp(2rem, 6vw, 3rem)',
            paddingLeft: 'clamp(1rem, 5vw, 2.5rem)',
            paddingRight: 'clamp(1rem, 5vw, 2.5rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern dark />
          <div style={{ position: 'relative', zIndex: 10 }}>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Informatie
            </p>
            <h1
              className="font-display text-white"
              style={{
                fontSize: 'clamp(2rem, 6vw, 3.25rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
              }}
            >
              Retourbeleid
            </h1>
          </div>
        </div>

        {/* Intro */}
        <div
          className="py-16 md:py-20"
          style={{
            paddingLeft: 'clamp(1rem, 5vw, 2.5rem)',
            paddingRight: 'clamp(1rem, 5vw, 2.5rem)',
            background: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern flip />
          <div className="max-w-[900px] mx-auto relative z-10">
            {/* Intro text */}
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 600,
                  color: '#0a0a0a',
                  marginBottom: 16,
                  letterSpacing: '-0.02em',
                }}
              >
                30 dagen bedenktijd
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: '#666',
                  lineHeight: 1.9,
                  maxWidth: 600,
                  margin: '0 auto',
                }}
              >
                Niet tevreden met je aankoop? Geen probleem. Je hebt het recht om je bestelling
                binnen 30 dagen na ontvangst te retourneren — zonder opgave van reden.
              </p>
            </div>

            {/* Steps — 4 kolom grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {steps.map(({ step, title, description }) => (
                <div
                  key={step}
                  style={{
                    background: '#FAF7F2',
                    padding: '36px 24px 32px',
                    border: '1px solid rgba(201,168,76,0.15)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <div
                    className="font-display"
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: '#c9a84c',
                      opacity: 0.2,
                      marginBottom: 12,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {step}
                  </div>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#0a0a0a',
                      marginBottom: 8,
                    }}
                  >
                    {title}
                  </h3>
                  <p style={{ fontSize: 13, color: '#777', lineHeight: 1.7 }}>{description}</p>
                </div>
              ))}
            </div>

            {/* Retourvoorwaarden */}
            <h2
              className="font-display"
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: '#0a0a0a',
                marginBottom: 20,
                letterSpacing: '-0.01em',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 3,
                  height: 20,
                  background: '#c9a84c',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              Retourvoorwaarden
            </h2>
            <div
              style={{
                background: '#FAF7F2',
                border: '1px solid rgba(201,168,76,0.12)',
                padding: '32px 36px',
                marginBottom: 56,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {conditions.map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#c9a84c"
                      strokeWidth="2"
                      style={{ marginTop: 3, flexShrink: 0 }}
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    <span style={{ fontSize: 14, color: '#555', lineHeight: 1.7 }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <h2
              className="font-display"
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: '#0a0a0a',
                marginBottom: 24,
                letterSpacing: '-0.01em',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 3,
                  height: 20,
                  background: '#c9a84c',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              Veelgestelde vragen
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {faq.map(({ q, a }) => (
                <div
                  key={q}
                  style={{
                    borderBottom: '1px solid #F0EBE3',
                    paddingBottom: 20,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#0a0a0a',
                      marginBottom: 8,
                    }}
                  >
                    {q}
                  </h3>
                  <p style={{ fontSize: 14, color: '#666', lineHeight: 1.8 }}>{a}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                textAlign: 'center',
                marginTop: 48,
                padding: '40px 24px',
                background: '#FAF7F2',
                border: '1px solid rgba(201,168,76,0.18)',
              }}
            >
              <div
                className="font-arabic"
                style={{
                  fontSize: 24,
                  color: '#c9a84c',
                  opacity: 0.5,
                  marginBottom: 8,
                }}
              >
                شكرًا
              </div>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8, marginBottom: 20 }}>
                Heb je vragen over retourneren? Wij helpen je graag.
              </p>
              <Link
                href="/contact"
                style={{
                  display: 'inline-block',
                  background: '#0a0a0a',
                  color: '#c9a84c',
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  padding: '14px 32px',
                  textDecoration: 'none',
                }}
              >
                Neem contact op
              </Link>
            </div>

            <p
              style={{
                fontSize: 12,
                color: '#999',
                marginTop: 40,
                padding: '24px 0 0',
                borderTop: '1px solid #F0EBE3',
              }}
            >
              Laatst bijgewerkt: 12 juni 2026
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
