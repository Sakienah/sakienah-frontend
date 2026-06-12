import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GeomPattern } from '@/components/ui/GeomPattern';

const sections = [
  {
    title: 'Artikel 1 — Definities',
    content: [
      'In deze algemene voorwaarden wordt verstaan onder:',
      '• Ondernemer: Sakienah, gevestigd in Nederland, aanbieder van producten via de webshop sakienah.nl.',
      '• Klant: de natuurlijke of rechtspersoon die producten bestelt via de webshop.',
      '• Overeenkomst: de koopovereenkomst tussen ondernemer en klant, tot stand gekomen via de webshop.',
      '• Producten: alle door Sakienah aangeboden goederen, waaronder gebedskleden, gebedskleding, Koran accessoires en overige islamitische lifestyle producten.',
      "• Webshop: de website www.sakienah.nl en alle bijbehorende subpagina's.",
    ],
  },
  {
    title: 'Artikel 2 — Identiteit van de ondernemer',
    content: [
      'Sakienah',
      'E-mail: info@sakienah.nl',
      'Telefoon: +31 6 00 000 000',
      'KVK-nummer: op aanvraag',
      'BTW-nummer: op aanvraag',
      'Vestigingsadres: op aanvraag beschikbaar',
    ],
  },
  {
    title: 'Artikel 3 — Toepasselijkheid',
    content: [
      'Deze algemene voorwaarden zijn van toepassing op elk aanbod van Sakienah en elke tot stand gekomen overeenkomst tussen Sakienah en de klant.',
      'Voordat de overeenkomst wordt gesloten, wordt de tekst van deze algemene voorwaarden aan de klant beschikbaar gesteld. Indien dit redelijkerwijs niet mogelijk is, wordt aangegeven dat de algemene voorwaarden bij Sakienah zijn in te zien en op verzoek kosteloos worden toegezonden.',
      'Afwijkingen van deze algemene voorwaarden zijn alleen geldig indien deze uitdrukkelijk en schriftelijk zijn overeengekomen.',
    ],
  },
  {
    title: 'Artikel 4 — Het aanbod',
    content: [
      'Alle aanbiedingen op de webshop zijn vrijblijvend, tenzij uitdrukkelijk anders vermeld. Sakienah behoudt zich het recht voor om prijzen en productinformatie te wijzigen.',
      'Afbeeldingen en beschrijvingen van producten zijn zo nauwkeurig mogelijk weergegeven. Sakienah kan echter niet garanderen dat kleuren op het beeldscherm exact overeenkomen met de werkelijke kleuren van het product.',
      'Kennelijke fouten of vergissingen in het aanbod binden Sakienah niet.',
    ],
  },
  {
    title: 'Artikel 5 — De overeenkomst',
    content: [
      'De overeenkomst komt tot stand op het moment dat de klant de bestelling plaatst en Sakienah een orderbevestiging per e-mail verstuurt.',
      'Sakienah behoudt zich het recht voor om bestellingen te weigeren of extra voorwaarden te stellen, bijvoorbeeld bij een afwijkend bestelvolume of bij twijfel over de juistheid van de gegevens.',
      'Indien een bestelling niet kan worden uitgevoerd, wordt de klant hiervan binnen 48 uur op de hoogte gesteld en worden eventuele betalingen teruggestort.',
    ],
  },
  {
    title: 'Artikel 6 — Herroepingsrecht',
    content: [
      'De klant heeft het recht om de overeenkomst binnen 30 dagen na ontvangst van het product zonder opgave van reden te ontbinden (herroepingsrecht).',
      'Om gebruik te maken van het herroepingsrecht dient de klant Sakienah hiervan op de hoogte te stellen via info@sakienah.nl. De klant dient het product vervolgens binnen 14 dagen na deze melding terug te sturen.',
      'De klant draagt de kosten voor het retourneren, tenzij anders overeengekomen.',
      'Zie ons Retourbeleid op sakienah.nl/retourbeleid voor de volledige retourprocedure.',
    ],
  },
  {
    title: 'Artikel 7 — De prijs',
    content: [
      "Alle prijzen op de webshop zijn weergegeven in euro's (€) en zijn inclusief BTW, tenzij anders aangegeven.",
      'Verzendkosten worden apart vermeld en zijn afhankelijk van de bestelgrootte en bestemming. Voor bestellingen vanaf €50 binnen Nederland is de verzending gratis.',
      'Sakienah behoudt zich het recht voor om prijzen te wijzigen. Prijswijzigingen hebben geen invloed op reeds geplaatste en bevestigde bestellingen.',
    ],
  },
  {
    title: 'Artikel 8 — Betaling',
    content: [
      'Betaling kan worden voldaan via de beschikbare betaalmethoden in het afrekenproces: iDEAL, Bancontact, creditcard en andere door Mollie ondersteunde methoden.',
      'De betaling dient direct bij het plaatsen van de bestelling te worden voldaan.',
      'Bij niet-tijdige betaling is Sakienah gerechtigd de overeenkomst te ontbinden en de bestelling te annuleren.',
    ],
  },
  {
    title: 'Artikel 9 — Levering',
    content: [
      'Sakienah streeft ernaar bestellingen binnen 1-3 werkdagen te verzenden. De levertijd is een indicatie en geen fatale termijn.',
      'De klant is verantwoordelijk voor het opgeven van een correct afleveradres. Sakienah is niet aansprakelijk voor vertraging of verlies als gevolg van onjuiste adresgegevens.',
      'Het risico van verlies of beschadiging van de producten gaat over op de klant op het moment van aflevering.',
      'Voor internationale leveringen kunnen aanvullende invoerrechten en belastingen van toepassing zijn, welke voor rekening van de klant komen.',
    ],
  },
  {
    title: 'Artikel 10 — Klachtenregeling',
    content: [
      'Klachten over producten of dienstverlening kunnen worden ingediend via info@sakienah.nl. Vermeld hierbij het ordernummer en een duidelijke omschrijving van de klacht.',
      'Sakienah streeft ernaar klachten binnen 2 werkdagen te beantwoorden en binnen 14 dagen naar tevredenheid op te lossen.',
      'Indien een klacht niet naar tevredenheid wordt opgelost, kan de klant het geschil voorleggen aan de bevoegde rechter of gebruikmaken van de ODR-platform van de Europese Commissie (ec.europa.eu/consumers/odr).',
    ],
  },
];

export default function AlgemeneVoorwaardenPage() {
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
              Algemene Voorwaarden
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
              Welkom bij Sakienah. Door gebruik te maken van onze webshop gaat u akkoord met de
              onderstaande algemene voorwaarden. Wij raden u aan deze voorwaarden zorgvuldig te
              lezen voordat u een bestelling plaatst.
            </p>

            {sections.map(({ title, content }) => (
              <div key={title} style={{ marginBottom: 36 }}>
                <h2
                  className="font-display"
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#0a0a0a',
                    marginBottom: 14,
                    letterSpacing: '-0.01em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      width: 3,
                      height: 18,
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
