import { useState } from 'react';
import { contactInfo } from '../data/data';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <section id="contact" className="py-24 lg:py-36 bg-[var(--void)] relative overflow-hidden" aria-labelledby="contact-heading">
      <div
        className="absolute bottom-0 left-[-10%] w-[38%] h-[50%] rounded-full pointer-events-none"
        style={{ background: 'var(--crimson)', opacity: 0.022, filter: 'blur(120px)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-14">
          <p className="label reveal mb-4">Kontakt & Lage</p>
          <h2
            id="contact-heading"
            className="reveal reveal-d1"
            style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 500, fontSize: 'clamp(2rem,4.5vw,3.4rem)', color: 'var(--ink)', maxWidth: '30rem' }}
          >
            Finde uns in{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--crimson)' }}>Wien-Mariahilf</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: info */}
          <div className="space-y-4">
            {/* Address */}
            <div className="reveal reveal-left reveal-d1 bg-[var(--surface)] border border-[var(--border)] p-5 flex gap-4 group transition-colors duration-300 hover:border-[var(--crimson)]" style={{ '--tw-border-opacity': 1 } as React.CSSProperties}>
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 border transition-all duration-300 group-hover:bg-[var(--crimson)] group-hover:border-[var(--crimson)]" style={{ borderColor: 'var(--border-hi)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="text-[var(--crimson)] group-hover:text-[var(--void)] transition-colors duration-300">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              </div>
              <div>
                <p className="label mb-2 text-[0.6rem]">Adresse</p>
                <p className="text-[var(--frost)] text-sm" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>{contactInfo.address}</p>
                <p className="text-[var(--frost)] text-sm" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>{contactInfo.city}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="reveal reveal-left reveal-d2 bg-[var(--surface)] border border-[var(--border)] p-5 flex gap-4 group transition-colors duration-300 hover:border-[var(--crimson)]">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 border transition-all duration-300 group-hover:bg-[var(--crimson)] group-hover:border-[var(--crimson)]" style={{ borderColor: 'var(--border-hi)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="text-[var(--crimson)] group-hover:text-[var(--void)] transition-colors duration-300">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.27 2 2 0 012.1 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                </svg>
              </div>
              <div>
                <p className="label mb-2 text-[0.6rem]">Kontakt</p>
                <a href={`tel:${contactInfo.phone}`} className="text-[var(--frost)] text-sm hover:text-[var(--crimson)] transition-colors" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>
                  {contactInfo.phone}
                </a>
                <p className="text-[var(--muted)] text-xs mt-0.5" style={{ fontFamily: 'Outfit' }}>{contactInfo.email}</p>
              </div>
            </div>

            {/* Hours */}
            <div className="reveal reveal-left reveal-d3 bg-[var(--surface)] border border-[var(--border)] p-5 group transition-colors duration-300 hover:border-[var(--crimson)]">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 border transition-all duration-300 group-hover:bg-[var(--crimson)] group-hover:border-[var(--crimson)]" style={{ borderColor: 'var(--border-hi)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="text-[var(--crimson)] group-hover:text-[var(--void)] transition-colors duration-300">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="label mb-3 text-[0.6rem]">Öffnungszeiten</p>
                  <dl className="space-y-2">
                    {contactInfo.hours.map((h) => (
                      <div key={h.day} className="flex justify-between items-baseline gap-4">
                        <dt className="text-[var(--steel)] text-sm" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>{h.day}</dt>
                        <dd
                          className="text-sm font-medium"
                          style={{ fontFamily: 'Outfit', color: h.time === 'Geschlossen' ? 'var(--muted)' : 'var(--crimson)' }}
                        >
                          {h.time}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="reveal reveal-left reveal-d4 relative h-36 bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center overflow-hidden group transition-colors duration-300 hover:border-[var(--crimson)]">
              {/* Grid lines */}
              {[25, 50, 75].map((p) => (
                <div key={p} className="absolute top-0 bottom-0 w-[1px] bg-[var(--border)]" style={{ left: `${p}%` }} aria-hidden="true" />
              ))}
              {[33, 66].map((p) => (
                <div key={p} className="absolute left-0 right-0 h-[1px] bg-[var(--border)]" style={{ top: `${p}%` }} aria-hidden="true" />
              ))}
              <div className="text-center z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--crimson)" strokeWidth="1.5" className="mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                <p className="text-[var(--muted)] text-xs mb-1" style={{ fontFamily: 'Outfit' }}>Mariahilfer Str. 42, 1060 Wien</p>
                <a
                  href="https://maps.google.com/?q=Mariahilfer+Straße+42+Wien"
                  target="_blank" rel="noopener noreferrer"
                  className="label text-[0.58rem] hover:opacity-80 transition-opacity"
                >
                  In Google Maps öffnen →
                </a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal reveal-right reveal-d2">
            <div className="frame-corner bg-[var(--surface)] border border-[var(--border)] p-7 lg:p-9">
              <h3 style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 500, fontSize: '1.6rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
                Schreib uns
              </h3>
              <p className="text-[var(--steel)] text-sm mb-7" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>
                Fragen, Wünsche oder Feedback? Wir antworten innerhalb von 24h.
              </p>

              {sent ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 border flex items-center justify-center mx-auto mb-5 pulse-red" style={{ borderColor: 'var(--crimson)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--crimson)" strokeWidth="1.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <p style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 500, fontSize: '1.5rem', color: 'var(--ink)', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                    Nachricht gesendet!
                  </p>
                  <p className="text-[var(--steel)] text-sm" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>
                    Wir melden uns so schnell wie möglich.
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} noValidate>
                  <div className="space-y-4">
                    {[
                      { id: 'c-name',  label: 'Name',      type: 'text',  placeholder: 'Dein Name',       key: 'name'  as const, auto: 'name'  },
                      { id: 'c-email', label: 'E-Mail',    type: 'email', placeholder: 'deine@email.at',  key: 'email' as const, auto: 'email' },
                    ].map(({ id, label, type, placeholder, key, auto }, i) => (
                      <div
                        key={id}
                        style={{
                          opacity: 1,
                          transform: 'none',
                          transition: `opacity 0.5s ease ${0.1 + i * 0.1}s, transform 0.5s ease ${0.1 + i * 0.1}s`,
                        }}
                      >
                        <label htmlFor={id} className="block label mb-2 text-[0.6rem]">{label}</label>
                        <input id={id} type={type} className="input-void" placeholder={placeholder}
                          value={form[key]} onChange={set(key)} required autoComplete={auto}/>
                      </div>
                    ))}
                    <div>
                      <label htmlFor="c-msg" className="block label mb-2 text-[0.6rem]">Nachricht</label>
                      <textarea id="c-msg" rows={4} className="input-void resize-none" placeholder="Deine Nachricht..."
                        value={form.message} onChange={set('message')} required/>
                    </div>
                    <button type="submit" className="btn-crimson w-full justify-center mt-1">
                      Nachricht senden
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
