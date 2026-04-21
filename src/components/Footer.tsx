interface Props { onBookingOpen: () => void; }

const COLS = {
  Services:     ['Classic Cut','Fade & Taper','Beard Trim','Hot Towel Shave','Cut & Beard','Grooming Ritual'],
  Unternehmen:  ['Über uns','Team','Galerie','Karriere'],
  Info:         ['FAQ','Stornierungsrichtlinie','Geschenkkarten','Datenschutz','Impressum'],
};

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg> },
  { label: 'Facebook',  href: 'https://facebook.com',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
  { label: 'TikTok',    href: 'https://tiktok.com',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/></svg> },
];

export default function Footer({ onBookingOpen }: Props) {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)]" role="contentinfo">
      <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, var(--crimson), transparent)', opacity: 0.6 }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="mb-5">
              <p style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 600, fontSize: '2.1rem', color: 'var(--ink)', letterSpacing: '0.15em', lineHeight: 1 }}>
                NOIR
              </p>
              <p className="label mt-0.5" style={{ fontSize: '0.52rem', letterSpacing: '0.38em' }}>
                Barbershop · Wien
              </p>
            </div>
            <p className="text-[var(--steel)] text-sm leading-relaxed max-w-xs mb-6" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>
              Precision Cuts. Timeless Style. Dein Premium-Barbershop im Herzen Wiens seit 2015.
            </p>
            <div className="flex gap-2.5 mb-8">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center border text-[var(--muted)] hover:text-[var(--crimson)] transition-all duration-300"
                  style={{ borderColor: 'var(--border-hi)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--crimson)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-hi)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <button onClick={onBookingOpen} className="btn-crimson">
              Termin buchen
            </button>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([cat, links]) => (
            <div key={cat}>
              <h3 className="label mb-5 text-[0.6rem]">{cat}</h3>
              <ul className="space-y-2.5" role="list">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" onClick={(e) => e.preventDefault()}
                      className="text-[var(--muted)] text-sm hover:text-[var(--crimson)] transition-colors duration-200"
                      style={{ fontFamily: 'Outfit', fontWeight: 300 }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, var(--border-hi), transparent)' }} aria-hidden="true" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[var(--muted)] text-xs" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>
          © {new Date().getFullYear()} NOIR Barbershop Wien. Alle Rechte vorbehalten.
        </p>
        <div className="text-[var(--muted)] text-xs flex items-center gap-1" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>
          Mariahilfer Str. 42, 1060 Wien ·
          <a href="tel:+4312345678" className="ml-1 hover:text-[var(--crimson)] transition-colors duration-200">
            +43 1 234 5678
          </a>
        </div>
      </div>
    </footer>
  );
}
