import { useCounter } from '../hooks/useCounter';

function StatCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(target);
  return (
    <div className="flex flex-col">
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className="text-[var(--crimson)] leading-none mb-1"
        style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 600, fontSize: '2.1rem' }}
      >
        {count}{suffix}
      </span>
      <span className="text-[var(--muted)] text-[0.62rem] tracking-[0.22em] uppercase" style={{ fontFamily: 'Outfit' }}>
        {label}
      </span>
    </div>
  );
}

const PILLARS = [
  { icon: '◈', title: 'Präzision',    desc: 'Jeder Schnitt mit chirurgischer Genauigkeit und handwerklichem Stolz.' },
  { icon: '◆', title: 'Tradition',    desc: 'Jahrhundertealte Barbier-Techniken, perfektioniert für die Moderne.' },
  { icon: '◇', title: 'Exklusivität', desc: 'Limitierte Termine. Volle Aufmerksamkeit. Niemals Kompromisse.' },
];

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-36 bg-[var(--base)] relative overflow-hidden" aria-labelledby="about-heading">
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-[-12%] w-[40%] h-[55%] rounded-full pointer-events-none"
        style={{ background: 'var(--crimson)', opacity: 0.022, filter: 'blur(120px)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image */}
          <div className="reveal-left relative order-2 lg:order-1">
            <div className="absolute -top-5 -left-5 right-10 bottom-10 border border-[var(--crimson)] opacity-15 pointer-events-none" aria-hidden="true" />
            <div className="absolute -top-2 -left-2 right-12 bottom-12 border border-[var(--border-hi)] pointer-events-none" aria-hidden="true" />

            <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <img
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80"
                alt="Marco Ferretti – Head Barber bei NOIR"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-all duration-700"
                style={{ filter: 'grayscale(1)', transform: 'scale(1.04)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(1)'; }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(3,3,5,0.72) 0%, transparent 55%)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                <p className="text-[var(--ink)] text-xl italic" style={{ fontFamily: '"Cormorant Garamond"' }}>Marco Ferretti</p>
                <p className="label text-[0.58rem] mt-0.5">Head Barber & Gründer</p>
              </div>
            </div>

            {/* Badge */}
            <div className="absolute bottom-8 right-0 translate-x-4 bg-[var(--surface)] border border-[var(--crimson)] border-opacity-30 px-5 py-4 hidden sm:flex flex-col items-center">
              <div className="w-[1px] h-5 bg-[var(--crimson)] mb-2" aria-hidden="true" />
              <p className="text-[var(--crimson)] text-3xl leading-none" style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 600 }}>9+</p>
              <p className="text-[var(--muted)] text-[0.58rem] tracking-widest uppercase mt-1" style={{ fontFamily: 'Outfit' }}>Jahre</p>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <div className="reveal">
              <p className="label mb-4">Über NOIR</p>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-10 bg-[var(--crimson)]" aria-hidden="true" />
                <span className="text-[var(--crimson)] text-sm" aria-hidden="true">✦</span>
              </div>
            </div>

            <h2
              id="about-heading"
              className="reveal reveal-d1"
              style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 500, fontSize: 'clamp(2.2rem,4.5vw,3.5rem)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '1.5rem' }}
            >
              Wo Handwerk auf{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--crimson)' }}>Kunst</span> trifft
            </h2>

            <div className="reveal reveal-d2 space-y-4 mb-8" style={{ fontFamily: 'Outfit', fontWeight: 300, color: 'var(--steel-light)', lineHeight: 1.75 }}>
              <p>
                NOIR wurde 2015 von Marco Ferretti mit einer klaren Vision gegründet: Ein Ort, an dem der moderne Mann nicht einfach einen Haarschnitt bekommt — sondern ein Erlebnis.
              </p>
              <p>
                Inspiriert von den klassischen Barbershops Norditaliens und dem zeitlosen Stil Wiens haben wir im Herzen des 6. Bezirks einen Raum geschaffen, der Tradition und zeitgemäßes Design vereint.
              </p>
            </div>

            <div className="reveal reveal-d3 space-y-4 mb-10">
              {PILLARS.map((p) => (
                <div key={p.title} className="flex items-start gap-4 group">
                  <span className="text-[var(--crimson)] text-lg mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-125" aria-hidden="true">
                    {p.icon}
                  </span>
                  <div>
                    <p className="text-[var(--ink)] font-semibold text-sm mb-0.5" style={{ fontFamily: 'Outfit' }}>{p.title}</p>
                    <p className="text-[var(--steel)] text-sm" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal reveal-d4 pt-8 border-t border-[var(--border)] grid grid-cols-2 sm:grid-cols-4 gap-6">
              <StatCounter target={9}    suffix="+" label="Jahre"     />
              <StatCounter target={4800} suffix="+" label="Kunden"    />
              <StatCounter target={4}    suffix=""  label="Experten"  />
              <StatCounter target={98}   suffix="%" label="Empfehlung"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
