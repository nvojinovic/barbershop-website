import { useState, useRef, MouseEvent } from 'react';
import { services } from '../data/data';
import type { Service } from '../data/types';

interface Props { onBookingOpen: () => void; }
type Cat = 'all' | 'haircut' | 'beard' | 'combo' | 'treatment';

const CAT_LABELS: Record<Cat, string> = {
  all: 'Alle', haircut: 'Haarschnitte', beard: 'Bart & Rasur', combo: 'Kombipakete', treatment: 'Treatments',
};

function TiltCard({ service, onBookingOpen }: { service: Service; onBookingOpen: () => void }) {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateZ(6px)`;
    card.style.boxShadow = `${-x * 12}px ${-y * 12}px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(232,32,53,0.15)`;
  };

  const onMouseLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateZ(0)';
    card.style.boxShadow = 'none';
  };

  return (
    <article
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="tilt-card relative flex flex-col h-full p-6 bg-[var(--surface)] border border-[var(--border)] overflow-hidden group"
      aria-label={service.name}
    >
      {/* Animated left border */}
      <div
        className="absolute left-0 top-0 w-[2px] bg-[var(--crimson)] transition-all duration-500 group-hover:h-full"
        style={{ height: '0%' }}
        aria-hidden="true"
      />
      {/* Hover crimson tint */}
      <div className="absolute inset-0 bg-[var(--crimson)] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none" aria-hidden="true" />

      {service.popular && (
        <span
          className="absolute top-4 right-4 bg-[var(--crimson)] text-[var(--void)] text-[0.55rem] font-bold tracking-widest uppercase px-2.5 py-1"
          style={{ fontFamily: 'Outfit' }}
        >
          Beliebt
        </span>
      )}

      <p className="label mb-3 text-[0.58rem]">{CAT_LABELS[service.category as Cat]}</p>

      <h3
        className="text-[var(--ink)] mb-2 group-hover:text-[var(--crimson)] transition-colors duration-300"
        style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 500, fontSize: '1.55rem' }}
      >
        {service.name}
      </h3>

      <p className="text-[var(--steel)] text-sm leading-relaxed flex-1 mb-6" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>
        {service.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <div className="flex items-baseline gap-2">
          <span className="text-[var(--crimson)]" style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 600, fontSize: '1.65rem' }}>
            €{service.price}
          </span>
          <span className="text-[var(--muted)] text-xs" style={{ fontFamily: 'Outfit' }}>{service.duration} min</span>
        </div>
        <button
          onClick={onBookingOpen}
          className="text-[0.62rem] tracking-widest uppercase font-semibold border px-4 py-2 transition-all duration-300"
          style={{
            fontFamily: 'Outfit',
            color: 'var(--crimson)',
            borderColor: 'rgba(232,32,53,0.3)',
            background: 'transparent',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--crimson)';
            (e.currentTarget as HTMLButtonElement).style.color      = 'var(--void)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color      = 'var(--crimson)';
          }}
          aria-label={`${service.name} buchen`}
        >
          Buchen
        </button>
      </div>
    </article>
  );
}

export default function Services({ onBookingOpen }: Props) {
  const [filter, setFilter] = useState<Cat>('all');
  const filtered = filter === 'all' ? services : services.filter((s) => s.category === filter);

  return (
    <section id="services" className="py-24 lg:py-36 bg-[var(--void)] relative" aria-labelledby="services-heading">
      <div
        className="absolute top-0 right-[-5%] w-[35%] h-[40%] rounded-full pointer-events-none"
        style={{ background: 'var(--crimson)', opacity: 0.025, filter: 'blur(100px)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="label reveal mb-4">Was wir bieten</p>
          <h2
            id="services-heading"
            className="reveal reveal-d1"
            style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 500, fontSize: 'clamp(2rem,4.5vw,3.4rem)', color: 'var(--ink)', marginBottom: '1rem' }}
          >
            Unsere <span style={{ fontStyle: 'italic', color: 'var(--crimson)' }}>Services</span>
          </h2>
          <p className="reveal reveal-d2 text-[var(--steel)] max-w-md mx-auto" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>
            Von der klassischen Rasur bis zum modernen Fade — ausgeführt mit Präzision und Leidenschaft.
          </p>
        </div>

        {/* Filter buttons — horizontally scrollable on mobile */}
        <div
          className="reveal mb-12 -mx-6 lg:mx-0"
          role="group"
          aria-label="Services filtern"
        >
          <div
            className="flex gap-2 px-6 lg:px-0 lg:justify-center overflow-x-auto"
            style={{ scrollbarWidth: 'none' }}
          >
            {(Object.keys(CAT_LABELS) as Cat[]).map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className="flex-shrink-0 text-[0.62rem] tracking-widest uppercase font-semibold border transition-all duration-300"
                style={{
                  fontFamily:   'Outfit',
                  background:   filter === c ? 'var(--crimson)' : 'transparent',
                  color:        filter === c ? 'var(--void)'    : 'var(--steel)',
                  borderColor:  filter === c ? 'var(--crimson)' : 'var(--border-hi)',
                  padding:      '10px 18px',
                  minHeight:    '44px',
                  display:      'flex',
                  alignItems:   'center',
                }}
              >
                {CAT_LABELS[c]}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((s, i) => (
            <div key={s.id} className="h-full">
              <TiltCard service={s} onBookingOpen={onBookingOpen} />
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="reveal mt-14 bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 500, fontSize: '1.4rem', color: 'var(--ink)', fontStyle: 'italic' }}>
              Nicht sicher, was für dich passt?
            </p>
            <p className="text-[var(--steel)] text-sm mt-1" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>
              Wir beraten dich persönlich und finden den perfekten Service.
            </p>
          </div>
          <button onClick={onBookingOpen} className="btn-crimson w-full sm:w-auto justify-center flex-shrink-0">
            Termin vereinbaren
          </button>
        </div>
      </div>
    </section>
  );
}
