import { SectionTitle } from '../ui/SectionTitle';

const steps = [
  {
    number: '01',
    title: 'Rol de mat uit',
    description: 'Leg de Sakienah gebedsmat neer op jouw favoriete plek — thuis of onderweg.',
  },
  {
    number: '02',
    title: 'Stel de rugsteun in',
    description: 'Klik de ergonomische rugsteun vast en pas de hoek aan op jouw voorkeur.',
  },
  {
    number: '03',
    title: 'Bid in rust',
    description: 'Geniet van een comfortabele, geconcentreerde gebedservaring zonder afleiding.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          title="Hoe het werkt"
          subtitle="Drie eenvoudige stappen naar het ultieme gebedscomfort."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-4">
              <div className="w-full aspect-video bg-white rounded-xl border border-zinc-100 flex items-center justify-center">
                <span className="text-zinc-200 text-xs tracking-widest uppercase">Afbeelding</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-display text-4xl font-semibold text-gold leading-none">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-black text-lg">{step.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed mt-1">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
