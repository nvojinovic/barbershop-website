import { useEffect, useState } from 'react';

interface Props { onBookingOpen: () => void; }

const WORDS = [
  { text: 'Precision', italic: false },
  { text: 'Cuts.',     italic: true  },
  { text: 'Timeless',  italic: false },
  { text: 'Style.',    italic: true  },
];

export default function Hero({ onBookingOpen }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t2 = setTimeout(() => setReady(true), 500);
    return () => { clearTimeout(t2); };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Background image ──────────────────────────── */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=1920&q=85"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{
            /* On portrait mobile, anchor the barber's face area */
            objectPosition: 'center top',
          }}
          fetchPriority="high"
        />
        {/*
          Stronger overlay on mobile so text is always legible
          over a portrait-cropped image
        */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(3,3,5,0.97) 0%, rgba(3,3,5,0.88) 45%, rgba(3,3,5,0.55) 75%, rgba(3,3,5,0.25) 100%)',
          }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: 'linear-gradient(to top, rgba(3,3,5,0.9), transparent)' }}
        />
      </div>

      {/* ── Main content ──────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div
          className="max-w-7xl mx-auto w-full"
          style={{
            paddingLeft:  'max(24px, var(--safe-left, 24px))',
            paddingRight: 'max(24px, var(--safe-right, 24px))',
            paddingTop:   'max(96px, calc(80px + var(--safe-top, 0px)))',
            paddingBottom: '40px',
          }}
        >
          <div className="max-w-2xl">

            {/* Pre-label */}
            <div
              className="flex items-center gap-4 mb-8"
              style={{
                opacity:    ready ? 1 : 0,
                transform:  ready ? 'translateX(0)' : 'translateX(-16px)',
                transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
              }}
            >
              <div className="h-[1px] w-10 bg-[var(--crimson)]" aria-hidden="true" />
              <span className="label">Wien · Seit 2015 · Premium Barbershop</span>
            </div>

            {/* Heading with word reveal */}
            <h1
              style={{
                fontFamily: '"Cormorant Garamond"',
                fontWeight: 500,
                lineHeight: 0.9,
                marginBottom: '1.5rem',
              }}
              aria-label="Precision Cuts. Timeless Style."
            >
              {WORDS.map(({ text, italic }, i) => (
                <span
                  key={text}
                  className="word-reveal"
                  style={{ fontSize: 'clamp(2.8rem, 8.5vw, 7rem)' }}
                >
                  <span
                    className="word-inner"
                    style={{
                      fontStyle:   italic ? 'italic' : 'normal',
                      color:       italic ? 'var(--crimson)' : 'var(--ink)',
                      transform:   ready ? 'translateY(0)' : 'translateY(110%)',
                      transition:  `transform 0.8s cubic-bezier(0.22,1,0.36,1) ${0.38 + i * 0.10}s`,
                      display:     'block',
                      willChange:  'transform',
                    }}
                  >
                    {text}
                  </span>
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p
              className="text-[var(--steel-light)] leading-relaxed max-w-md mb-10"
              style={{
                fontFamily: 'Outfit',
                fontWeight: 300,
                fontSize:   'clamp(0.95rem, 2.5vw, 1.125rem)',
                opacity:    ready ? 1 : 0,
                transform:  ready ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.7s ease 0.58s, transform 0.7s ease 0.58s',
              }}
            >
              Meisterhafte Schnitte. Traditionelle Nassrasur. Exklusive Grooming-Treatments —
              für den Mann, der keine Kompromisse macht.
            </p>

            {/* CTAs — stacked on mobile, side-by-side on sm+ */}
            <div
              className="flex flex-col xs:flex-row gap-3 sm:gap-4"
              style={{
                opacity:    ready ? 1 : 0,
                transform:  ready ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.7s ease 0.70s, transform 0.7s ease 0.70s',
              }}
            >
              <button
                onClick={onBookingOpen}
                className="btn-crimson justify-center sm:justify-start"
                style={{ width: '100%', maxWidth: '280px' }}
              >
                Jetzt Termin buchen
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <button
                onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-ghost justify-center sm:justify-start"
                style={{ width: '100%', maxWidth: '280px' }}
              >
                Unsere Services
              </button>
            </div>

            {/* Stats */}
            <div
              className="mt-14 pt-8 border-t border-[var(--border)] grid grid-cols-2 sm:grid-cols-4 gap-6"
              style={{
                opacity:    ready ? 1 : 0,
                transition: 'opacity 0.8s ease 0.85s',
              }}
            >
              {[
                { val: '9+',    label: 'Jahre Erfahrung' },
                { val: '4.800+',label: 'Kunden'          },
                { val: '4',     label: 'Experten'        },
                { val: '98%',   label: 'Weiterempfehlung'},
              ].map(({ val, label }) => (
                <div key={label} className="flex flex-col">
                  <span
                    className="text-[var(--crimson)] leading-none mb-1"
                    style={{
                      fontFamily:  '"Cormorant Garamond"',
                      fontWeight:  600,
                      fontSize:    'clamp(1.4rem, 3.5vw, 2rem)',
                    }}
                  >
                    {val}
                  </span>
                  <span
                    className="text-[var(--muted)] tracking-[0.22em] uppercase"
                    style={{ fontFamily: 'Outfit', fontSize: 'clamp(0.55rem, 1.5vw, 0.62rem)' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Large ghost text — desktop only */}
      <div
        className="absolute right-[-1%] top-1/2 -translate-y-1/2 pointer-events-none select-none hidden xl:block"
        style={{
          fontFamily:    '"Cormorant Garamond"',
          fontWeight:    700,
          fontSize:      '21vw',
          lineHeight:    1,
          color:         'var(--crimson)',
          opacity:       0.024,
          letterSpacing: '-0.04em',
        }}
        aria-hidden="true"
      >
        NOIR
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 pb-7 sm:pb-10 flex justify-center">
        <button
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-[var(--muted)] hover:text-[var(--crimson)] transition-colors duration-300 group"
          aria-label="Nach unten scrollen"
          style={{ minHeight: '44px' }}
        >
          <span
            className="text-[0.57rem] tracking-[0.3em] uppercase"
            style={{ fontFamily: 'Outfit' }}
          >
            Scroll
          </span>
          <div
            className="w-[1px] h-8 group-hover:bg-[var(--crimson)] transition-colors duration-300"
            style={{ background: 'linear-gradient(to bottom, var(--muted), transparent)' }}
          />
        </button>
      </div>
    </section>
  );
}
