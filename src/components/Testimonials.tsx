import { useState } from 'react';
import { testimonials } from '../data/data';

interface Props { onBookingOpen: () => void; }

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} von 5 Sternen`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 12 12"
          fill={i < n ? 'var(--crimson)' : 'none'}
          stroke={i < n ? 'var(--crimson)' : 'var(--muted)'}
          strokeWidth="1" aria-hidden="true"
        >
          <polygon points="6,1 7.8,4.5 11.5,4.9 8.75,7.5 9.6,11.2 6,9.2 2.4,11.2 3.25,7.5 0.5,4.9 4.2,4.5" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ onBookingOpen }: Props) {
  const [visible, setVisible] = useState(3);

  return (
    <section id="testimonials" className="py-24 lg:py-36 bg-[var(--base)] relative overflow-hidden" aria-labelledby="testimonials-heading">
      {/* Giant quote decoration */}
      <div
        className="absolute top-0 right-4 pointer-events-none select-none opacity-[0.025] leading-none"
        style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 700, fontSize: '18rem', color: 'var(--crimson)' }}
        aria-hidden="true"
      >
        "
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="label reveal mb-4">Was Kunden sagen</p>
          <h2
            id="testimonials-heading"
            className="reveal reveal-d1"
            style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 500, fontSize: 'clamp(2rem,4.5vw,3.4rem)', color: 'var(--ink)', marginBottom: '1.25rem' }}
          >
            Echte <span style={{ fontStyle: 'italic', color: 'var(--crimson)' }}>Stimmen</span>
          </h2>

          {/* Aggregate rating */}
          <div className="reveal reveal-d2 flex items-center justify-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 12 12" fill="var(--crimson)" aria-hidden="true">
                  <polygon points="6,1 7.8,4.5 11.5,4.9 8.75,7.5 9.6,11.2 6,9.2 2.4,11.2 3.25,7.5 0.5,4.9 4.2,4.5" />
                </svg>
              ))}
            </div>
            <span className="text-[var(--steel)] text-sm" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>
              <strong className="text-[var(--crimson)] font-normal" style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.1rem' }}>5.0</strong>
              {' '}· Über 480 Bewertungen auf Google
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.slice(0, visible).map((t, i) => (
            <blockquote
              key={t.id}
              className={`reveal reveal-d${Math.min(i + 1, 6) as 1} bg-[var(--surface)] border border-[var(--border)] p-6 relative group overflow-hidden`}
            >
              {/* Top crimson line */}
              <div
                className="absolute top-0 left-0 h-[2px] bg-[var(--crimson)] w-0 group-hover:w-full transition-all duration-500"
                aria-hidden="true"
              />

              {/* Pulsing crimson dot */}
              <div className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full bg-[var(--crimson)] opacity-40 group-hover:opacity-100 transition-opacity" aria-hidden="true" />

              <Stars n={t.rating} />

              <p
                className="text-[var(--steel-light)] mt-4 mb-5 leading-relaxed"
                style={{ fontFamily: 'Outfit', fontWeight: 300, fontSize: '0.88rem' }}
              >
                "{t.text}"
              </p>

              <footer className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 flex items-center justify-center text-[var(--crimson)] text-[0.6rem] font-bold flex-shrink-0"
                    style={{ fontFamily: 'Outfit', background: 'var(--raised)', border: '1px solid rgba(232,32,53,0.3)' }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <cite className="not-italic text-[var(--ink)] text-sm font-medium block" style={{ fontFamily: 'Outfit' }}>
                      {t.name}
                    </cite>
                    <span className="text-[var(--muted)] text-[0.6rem]" style={{ fontFamily: 'Outfit' }}>{t.date}</span>
                  </div>
                </div>
                <span
                  className="text-[var(--crimson)] text-[0.58rem] tracking-wider uppercase px-2 py-0.5"
                  style={{ fontFamily: 'Outfit', border: '1px solid rgba(232,32,53,0.2)' }}
                >
                  {t.service}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>

        {visible < testimonials.length && (
          <div className="text-center mt-8">
            <button onClick={() => setVisible(testimonials.length)} className="btn-ghost">
              Alle Bewertungen anzeigen
            </button>
          </div>
        )}

        {/* CTA Banner */}
        <div className="reveal mt-20 relative overflow-hidden border border-[var(--crimson)] border-opacity-20 bg-[var(--surface)] px-6 py-10 sm:p-10 lg:p-14 text-center">
          <div className="absolute inset-0 bg-[var(--crimson)] opacity-[0.04] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-[var(--crimson)]" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--crimson)]" aria-hidden="true" />

          <div className="relative z-10">
            <p className="label mb-3">Überzeuge dich selbst</p>
            <h3
              style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 500, fontSize: 'clamp(1.6rem,3.5vw,2.8rem)', color: 'var(--ink)', marginBottom: '1rem' }}
            >
              Dein bester Haarschnitt erwartet dich.
            </h3>
            <p className="text-[var(--steel)] mb-8 max-w-md mx-auto" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>
              Erster Termin — und du kommst nie mehr woanders hin.
            </p>
            <button
              onClick={onBookingOpen}
              className="btn-crimson w-full sm:w-auto justify-center"
            >
              Jetzt buchen
              <span className="hidden sm:inline">&nbsp;— kostenlos &amp; unverbindlich</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
