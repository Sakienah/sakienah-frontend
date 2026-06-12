import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GeomPattern } from '@/components/ui/GeomPattern';

const sections = [
  {
    title: 'Welke gegevens verzamelen wij?',
    content: [
      'Bij het plaatsen van een bestelling verzamelen wij de volgende persoonsgegevens:',
      '• Naam en achternaam',
      '• E-mailadres',
      '• Telefoonnummer (optioneel)',
      '• Factuur- en verzendadres',
      '• Bestelgeschiedenis',
      '• Betaalgegevens worden verwerkt door onze betaalprovider (Mollie) — wij slaan zelf geen creditcard- of bankgegevens op.',
      'Wanneer u een account aanmaakt, bewaren wij uw naam, e-mailadres en adresgegevens zodat u bij een volgende bestelling sneller kunt afrekenen.',
    ],
  },
  {
    title: 'Hoe gebruiken wij uw gegevens?',
    content: [
      'Wij gebruiken uw persoonsgegevens uitsluitend voor de volgende doeleinden:',
      '• Het verwerken en verzenden van uw bestelling',
      '• Communicatie over uw bestelling (orderbevestiging, verzendupdate)',
      '• Klantenservice en het beantwoorden van vragen',
      '• Verbetering van onze webshop en dienstverlening',
      '• Wettelijke verplichtingen (zoals fiscale bewaarplicht)',
      'Wij gebruiken uw gegevens nooit voor ongevraagde marketing zonder uw uitdrukkelijke toestemming.',
    ],
  },
  {
    title: 'Nieuwsbrief',
    content: [
      'U kunt zich aanmelden voor onze nieuwsbrief. Hiervoor gebruiken wij uw e-mailadres en voornaam. U ontvangt dan maximaal één nieuwsbrief per week met aanbiedingen, nieuwe producten en inspiratie.',
      'U kunt zich op elk moment uitschrijven via de afmeldlink onderaan elke nieuwsbrief.',
    ],
  },
  {
    title: 'Bewaartermijn',
    content: [
      'Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk is voor de hierboven genoemde doeleinden. Bestelgegevens worden minimaal 7 jaar bewaard in verband met de fiscale bewaarplicht.',
      'Accountgegevens worden bewaard zolang uw account actief is. Na opheffing van uw account worden uw gegevens binnen 30 dagen verwijderd.',
    ],
  },
  {
    title: 'Delen met derden',
    content: [
      'Wij delen uw gegevens alleen met derden wanneer dit noodzakelijk is voor de uitvoering van onze dienstverlening:',
      '• Vervoerders (PostNL, DHL) — voor het bezorgen van uw bestelling',
      '• Betaalproviders (Mollie) — voor het verwerken van betalingen',
      '• Boekhoudsoftware — voor wettelijk verplichte administratie',
      'Wij sluiten met elke derde partij een verwerkersovereenkomst af waarin zij zich verplichten tot dezelfde zorgvuldige omgang met uw gegevens. Wij verkopen uw gegevens nooit aan derden.',
    ],
  },
  {
    title: 'Uw rechten',
    content: [
      'Op grond van de AVG (Algemene Verordening Gegevensbescherming) heeft u de volgende rechten:',
      '• Recht op inzage — u kunt opvragen welke gegevens wij van u hebben',
      '• Recht op rectificatie — u kunt onjuiste gegevens laten corrigeren',
      '• Recht op verwijdering — u kunt verzoeken uw gegevens te laten verwijderen',
      '• Recht op beperking van verwerking — u kunt de verwerking tijdelijk laten beperken',
      '• Recht op dataportabiliteit — u kunt uw gegevens in een gangbaar formaat opvragen',
      '• Recht van bezwaar — u kunt bezwaar maken tegen de verwerking van uw gegevens',
      'Stuur uw verzoek naar info@sakienah.nl. Wij reageren binnen 30 dagen. Wij kunnen u vragen om legitimatie om misbruik te voorkomen.',
    ],
  },
  {
    title: 'Cookies',
    content: [
      'Onze webshop gebruikt functionele cookies die noodzakelijk zijn voor het functioneren van de website, zoals het onthouden van de inhoud van uw winkelwagen en het ingelogd blijven tijdens uw sessie.',
      'Daarnaast gebruiken wij analytische cookies om te begrijpen hoe bezoekers onze website gebruiken, zodat wij de gebruikservaring kunnen verbeteren. Deze gegevens zijn volledig geanonimiseerd.',
      'U kunt cookies uitschakelen in uw browserinstellingen, maar dit kan invloed hebben op de werking van de webshop.',
    ],
  },
  {
    title: 'Beveiliging',
    content: [
      'Wij nemen de beveiliging van uw gegevens zeer serieus. Onze website maakt gebruik van een SSL/TLS-certificaat (HTTPS) zodat alle gegevens versleuteld worden verzonden. Onze servers zijn beveiligd volgens de geldende industriestandaarden.',
    ],
  },
  {
    title: 'Contact',
    content: [
      'Voor vragen over ons privacybeleid of om uw rechten uit te oefenen, kunt u contact opnemen via:',
      '• E-mail: info@sakienah.nl',
      '• Telefoon: +31 6 00 000 000',
      '• Adres: op aanvraag beschikbaar',
    ],
  },
];

export default function PrivacyPage() {
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
              Juridisch
            </p>
            <h1
              className="font-display text-white"
              style={{
                fontSize: 'clamp(2rem, 6vw, 3.25rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
              }}
            >
              Privacybeleid
            </h1>
          </div>
        </div>

        {/* Content */}
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
          <div className="max-w-[800px] mx-auto relative z-10">
            <p style={{ fontSize: 14, color: '#666', lineHeight: 1.9, marginBottom: 40 }}>
              Sakienah hecht waarde aan uw privacy. In dit privacybeleid leggen wij uit welke
              persoonsgegevens wij verzamelen, hoe wij deze gebruiken en welke rechten u heeft. Dit
              beleid is van toepassing op alle diensten van Sakienah en is opgesteld conform de AVG
              (Algemene Verordening Gegevensbescherming).
            </p>

            {sections.map(({ title, content }) => (
              <div key={title} style={{ marginBottom: 40 }}>
                <h2
                  className="font-display"
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: '#0a0a0a',
                    marginBottom: 16,
                    letterSpacing: '-0.01em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
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
                  {title}
                </h2>
                {content.map((line, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: 14,
                      color: '#555',
                      lineHeight: 1.9,
                      marginBottom: line.startsWith('•') ? 6 : 12,
                      paddingLeft: line.startsWith('•') ? 16 : 0,
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            ))}

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
