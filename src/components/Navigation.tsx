import { useState, useEffect, useRef } from 'react';

interface Props { onBookingOpen: () => void; }

const LINKS = [
  { label: 'Uber uns', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Kontakt', href: '#contact' },
];

export default function Navigation({ onBookingOpen }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      if (!progressRef.current) return;

      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0;
      const scale = pct / 100;
      progressRef.current.style.transform = `translateZ(0) scaleX(${scale})`;
      progressRef.current.style.webkitTransform = `translateZ(0) scaleX(${scale})`;
    };

    const onScroll = () => {
      const nextScrolled = window.scrollY > 48;
      if (scrolledRef.current !== nextScrolled) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }

      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        updateProgress();
        frame = 0;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };

    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 320);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#030305]/93 backdrop-blur-xl border-b border-[var(--border)]'
            : 'bg-transparent'
        }`}
        style={{ paddingTop: 'var(--safe-top)' }}
      >
        <nav
          className="max-w-7xl mx-auto px-5 lg:px-12 h-[68px] flex items-center justify-between"
          aria-label="Hauptnavigation"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col leading-none group"
            aria-label="NOIR Barbershop - zur Startseite"
            style={{ minHeight: '44px', justifyContent: 'center' }}
          >
            <span
              className="text-[var(--ink)] tracking-[0.15em] group-hover:text-[var(--crimson)] transition-colors duration-300 glitch leading-none"
              data-text="NOIR"
              style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 600, fontSize: '1.75rem' }}
            >
              NOIR
            </span>
            <span className="label" style={{ fontSize: '0.52rem', letterSpacing: '0.38em', marginTop: '-1px' }}>
              Barbershop · Wien
            </span>
          </button>

          <ul className="hidden lg:flex items-center gap-9" role="list">
            {LINKS.map((l) => (
              <li key={l.href}>
                <button onClick={() => scrollTo(l.href)} className="nav-item">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-5">
            <a href="tel:+4312345678" className="nav-item" style={{ color: 'rgba(200,212,240,0.65)' }}>
              +43 1 234 5678
            </a>
            <button onClick={onBookingOpen} className="btn-crimson" style={{ padding: '11px 24px' }}>
              Termin buchen
            </button>
          </div>

          <button
            className="lg:hidden flex flex-col gap-[5px] z-10 items-center justify-center"
            style={{ width: '44px', height: '44px' }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Menu schliessen' : 'Menu offnen'}
            aria-expanded={mobileOpen}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block h-[1px] bg-[var(--frost)] transition-all duration-300 ${
                  i === 0 && mobileOpen ? 'w-6 rotate-45 translate-y-[6px]'
                : i === 1 && mobileOpen ? 'opacity-0 w-3'
                : i === 2 && mobileOpen ? 'w-6 -rotate-45 -translate-y-[6px]'
                : i === 1 ? 'w-4 ml-auto'
                : 'w-6'
                }`}
              />
            ))}
          </button>
        </nav>

        <div
          ref={progressRef}
          aria-hidden="true"
          className="h-[3px] pointer-events-none"
          style={{
            width: '100%',
            background: 'var(--crimson)',
            boxShadow: '0 0 10px rgba(232,32,53,0.5)',
            willChange: 'transform',
            transformOrigin: 'left center',
            transform: 'translateZ(0) scaleX(0)',
            WebkitTransform: 'translateZ(0) scaleX(0)',
          }}
        />

      </header>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-[var(--void)]/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        <nav
          className={`absolute right-0 top-0 h-full w-72 bg-[var(--surface)] border-l border-[var(--border)] flex flex-col pb-10 transition-transform duration-400 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          } ${mobileOpen ? 'mobile-nav-open' : ''}`}
          aria-label="Mobile Navigation"
          style={{
            paddingTop: 'max(88px, calc(68px + var(--safe-top, 0px)))',
            paddingLeft: '32px',
            paddingRight: '32px',
          }}
        >
          <div className="absolute top-0 left-0 h-full w-[2px] bg-[var(--crimson)] opacity-60" aria-hidden="true" />

          <ul className="flex flex-col mb-10" role="list">
            {LINKS.map((l) => (
              <li key={l.href} className="mobile-nav-item">
                <button
                  onClick={() => scrollTo(l.href)}
                  className="w-full text-left border-b border-[var(--border)] text-[var(--frost)] hover:text-[var(--crimson)] transition-colors duration-200 text-[0.68rem] tracking-widest uppercase font-semibold bg-transparent"
                  style={{
                    fontFamily: 'Outfit',
                    minHeight: '56px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => { onBookingOpen(); setMobileOpen(false); }}
            className="btn-crimson justify-center"
          >
            Termin buchen
          </button>

          <div
            className="mt-auto pt-8 border-t border-[var(--border)]"
            style={{ paddingBottom: 'max(16px, var(--safe-bottom, 16px))' }}
          >
            <a
              href="tel:+4312345678"
              className="text-[var(--muted)] text-xs block"
              style={{ fontFamily: 'Outfit', minHeight: '44px', display: 'flex', alignItems: 'center' }}
            >
              +43 1 234 5678
            </a>
            <p className="text-[var(--muted)] text-xs mt-1" style={{ fontFamily: 'Outfit' }}>
              Mariahilfer Str. 42, Wien
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
