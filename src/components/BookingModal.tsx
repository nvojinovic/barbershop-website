import { useState, useEffect, useCallback, useRef } from 'react';
import { services, team, timeSlots } from '../data/data';
import type { BookingData, BookingStep } from '../data/types';

interface Props { isOpen: boolean; onClose: () => void; }

const STEPS: BookingStep[] = ['service','barber','date','time','contact','success'];
const STEP_LABELS: Record<BookingStep, string> = {
  service:'Service', barber:'Barber', date:'Datum', time:'Uhrzeit', contact:'Kontakt', success:'Bestätigung',
};
const EMPTY: BookingData = { serviceId:'', barberId:'', date:'', time:'', firstName:'', lastName:'', phone:'', email:'', notes:'' };

function buildDays() {
  const out = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() === 0) continue; // no Sundays
    out.push({
      iso:     d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('de-AT', { weekday: 'short' }),
      dayNum:  d.toLocaleDateString('de-AT', { day: 'numeric', month: 'numeric' }),
    });
  }
  return out;
}

// ── Small UI atoms ────────────────────────────────────────────
function PickBtn({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 border transition-all duration-200"
      style={{
        background:  selected ? 'var(--raised)'    : 'rgba(18,18,40,0.5)',
        borderColor: selected ? 'var(--crimson)'   : 'var(--border)',
        minHeight:   '56px',
      }}
      onMouseEnter={(e) => { if (!selected) (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(232,32,53,0.4)'; }}
      onMouseLeave={(e) => { if (!selected) (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; }}
    >
      {children}
    </button>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-red-400 text-[0.6rem] mt-1" style={{ fontFamily: 'Outfit' }}>{msg}</p>;
}

export default function BookingModal({ isOpen, onClose }: Props) {
  const [step,    setStep]    = useState<BookingStep>('service');
  const [booking, setBooking] = useState<BookingData>(EMPTY);
  const [errors,  setErrors]  = useState<Partial<Record<keyof BookingData, string>>>({});
  const panelRef  = useRef<HTMLDivElement>(null);
  const closeRef  = useRef<HTMLButtonElement>(null);
  const days      = buildDays();

  // ── Swipe-to-close (mobile sheet) ───────────────────
  const dragStartY  = useRef(0);
  const [dragY, setDragY] = useState(0);
  const dragging    = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
    dragging.current   = true;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return;
    const delta = e.touches[0].clientY - dragStartY.current;
    if (delta > 0) setDragY(delta);
  };
  const handleTouchEnd = () => {
    dragging.current = false;
    if (dragY > 90) {
      setDragY(0);
      handleClose();
    } else {
      setDragY(0);
    }
  };

  const reset = useCallback(() => { setStep('service'); setBooking(EMPTY); setErrors({}); }, []);

  // Lock body scroll + focus close button + Escape handler
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeRef.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); }
      // Focus trap
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input, textarea, a[href], select, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [isOpen, onClose]);

  const handleClose = () => { onClose(); setTimeout(reset, 380); };

  const idx  = STEPS.indexOf(step);
  const next = () => { if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]); };
  const back = () => { if (idx > 0) setStep(STEPS[idx - 1]); };

  const pick = (update: Partial<BookingData>) => {
    setBooking((p) => ({ ...p, ...update }));
    setTimeout(next, 170);
  };

  const validate = () => {
    const e: Partial<Record<keyof BookingData, string>> = {};
    if (!booking.firstName.trim()) e.firstName = 'Pflichtfeld';
    if (!booking.lastName.trim())  e.lastName  = 'Pflichtfeld';
    if (!booking.phone.trim())     e.phone     = 'Pflichtfeld';
    if (!booking.email.trim() || !/\S+@\S+\.\S+/.test(booking.email)) e.email = 'Gültige E-Mail erforderlich';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const selSvc    = services.find((s) => s.id === booking.serviceId);
  const selBarber = team.find((b) => b.id === booking.barberId);
  const stepNums  = STEPS.filter((s) => s !== 'success');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      role="dialog" aria-modal="true" aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#030305]/88 backdrop-blur-md"
        onClick={handleClose} aria-hidden="true"
      />

      {/* Panel — full-screen sheet on mobile, centered card on desktop */}
      <div
        ref={panelRef}
        className="modal-panel relative w-full sm:max-w-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col sm:mx-4 overflow-hidden"
        style={{
          /* Mobile: sheet slides from bottom, max 96vh with safe-area */
          maxHeight:     'calc(96dvh - var(--safe-top, 0px))',
          /* Desktop overrides via sm: */
          borderRadius:  undefined,
          /* Swipe drag transform */
          transform:     dragY > 0 ? `translateY(${dragY}px)` : undefined,
          transition:    dragY > 0 ? 'none' : undefined,
        }}
      >
        {/* Rounded top corners on mobile (sheet feel) */}
        <style>{`
          @media (max-width: 639px) {
            .modal-panel { border-radius: 20px 20px 0 0 !important; border-bottom: none; }
          }
          @media (min-width: 640px) {
            .modal-panel { max-height: 88vh !important; }
          }
        `}</style>

        {/* Crimson top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--crimson)] hidden sm:block" aria-hidden="true" />

        {/* ── Drag handle (mobile only) ──────────────── */}
        <div
          className="sm:hidden flex justify-center pt-3.5 pb-1 flex-shrink-0 touch-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-hidden="true"
        >
          <div
            className="w-10 h-1 rounded-full"
            style={{ background: 'var(--border-hi)' }}
          />
        </div>

        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] flex-shrink-0"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div>
            <p className="label text-[0.6rem]">Terminbuchung</p>
            {step !== 'success' && (
              <p id="modal-title" style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 500, fontSize: '1.25rem', color: 'var(--ink)', fontStyle: 'italic', marginTop: '2px' }}>
                {STEP_LABELS[step]}
              </p>
            )}
            {step === 'success' && <p id="modal-title" className="sr-only">Buchungsbestätigung</p>}
          </div>
          <button
            ref={closeRef}
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center text-[var(--muted)] hover:text-[var(--crimson)] border transition-all duration-200"
            style={{ borderColor: 'var(--border)' }}
            aria-label="Modal schließen"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Step progress */}
        {step !== 'success' && (
          <div className="px-6 pt-4 pb-1 flex-shrink-0" aria-hidden="true">
            <div className="flex gap-1">
              {stepNums.map((s, i) => {
                const done   = STEPS.indexOf(s) < idx;
                const active = s === step;
                return (
                  <div key={s} className="flex-1 h-[2px] transition-all duration-500"
                    style={{ background: done ? 'var(--crimson)' : active ? 'rgba(232,32,53,0.45)' : 'var(--border-hi)' }}
                  />
                );
              })}
            </div>
            <p className="text-[var(--muted)] text-[0.6rem] tracking-wider mt-2" style={{ fontFamily: 'Outfit' }}>
              Schritt {idx + 1} von {stepNums.length}
            </p>
          </div>
        )}

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5" role="region" aria-live="polite">

          {/* ── SERVICE ─────────────────────────────────── */}
          {step === 'service' && (
            <div>
              <p className="text-[var(--steel)] text-sm mb-5" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>
                Wähle den Service, den du buchen möchtest.
              </p>
              <div className="space-y-2">
                {services.map((s) => (
                  <PickBtn key={s.id} selected={booking.serviceId === s.id} onClick={() => pick({ serviceId: s.id })}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {booking.serviceId === s.id && <span className="text-[var(--crimson)] text-sm flex-shrink-0" aria-hidden="true">◆</span>}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[var(--ink)] font-medium text-sm" style={{ fontFamily: 'Outfit' }}>{s.name}</span>
                            {s.popular && (
                              <span className="bg-[var(--crimson)] text-[var(--void)] text-[0.55rem] font-bold tracking-widest uppercase px-1.5 py-0.5" style={{ fontFamily: 'Outfit' }}>
                                Beliebt
                              </span>
                            )}
                          </div>
                          <p className="text-[var(--muted)] text-xs mt-0.5 truncate" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>{s.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0 ml-4">
                        <span className="text-[var(--crimson)]" style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 600, fontSize: '1.25rem' }}>€{s.price}</span>
                        <span className="text-[var(--muted)] text-xs" style={{ fontFamily: 'Outfit' }}>{s.duration} min</span>
                      </div>
                    </div>
                  </PickBtn>
                ))}
              </div>
            </div>
          )}

          {/* ── BARBER ──────────────────────────────────── */}
          {step === 'barber' && (
            <div>
              <p className="text-[var(--steel)] text-sm mb-5" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>Wähle deinen Barber.</p>
              <div className="space-y-2">
                <PickBtn selected={booking.barberId === 'any'} onClick={() => pick({ barberId: 'any' })}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 border" style={{ borderColor: 'rgba(232,32,53,0.3)' }}>
                      <span className="text-[var(--crimson)]" aria-hidden="true">✦</span>
                    </div>
                    <div>
                      <p className="text-[var(--ink)] font-medium text-sm" style={{ fontFamily: 'Outfit' }}>Nächster Verfügbarer</p>
                      <p className="text-[var(--muted)] text-xs" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>Schnellste Verfügbarkeit</p>
                    </div>
                  </div>
                </PickBtn>
                {team.map((m) => (
                  <PickBtn key={m.id} selected={booking.barberId === m.id} onClick={() => pick({ barberId: m.id })}>
                    <div className="flex items-center gap-3">
                      <img src={m.imageUrl} alt="" aria-hidden="true" loading="lazy"
                        className="w-10 h-10 object-cover object-top flex-shrink-0"
                        style={{ filter: booking.barberId === m.id ? 'none' : 'grayscale(1)' }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[var(--ink)] font-medium text-sm truncate" style={{ fontFamily: 'Outfit' }}>{m.name}</p>
                        <p className="text-[var(--crimson)] text-xs" style={{ fontFamily: 'Outfit' }}>{m.role}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {m.specialties.slice(0, 2).map((sp) => (
                            <span key={sp} className="text-[var(--muted)] text-[0.58rem] border px-1.5 py-0.5" style={{ fontFamily: 'Outfit', borderColor: 'var(--border-hi)' }}>{sp}</span>
                          ))}
                        </div>
                      </div>
                      <span className="text-[var(--muted)] text-xs flex-shrink-0" style={{ fontFamily: 'Outfit' }}>{m.experience}j</span>
                    </div>
                  </PickBtn>
                ))}
              </div>
            </div>
          )}

          {/* ── DATE ────────────────────────────────────── */}
          {step === 'date' && (
            <div>
              <p className="text-[var(--steel)] text-sm mb-5" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>Wähle dein Datum.</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {days.map((d) => (
                  <button key={d.iso} onClick={() => pick({ date: d.iso, time: '' })}
                    className="flex flex-col items-center py-4 px-2 border transition-all duration-200"
                    style={{
                      background:  booking.date === d.iso ? 'var(--raised)' : 'rgba(18,18,40,0.5)',
                      borderColor: booking.date === d.iso ? 'var(--crimson)' : 'var(--border)',
                      minHeight:   '72px',
                    }}
                  >
                    <span className="text-[var(--muted)] text-[0.6rem] tracking-widest uppercase" style={{ fontFamily: 'Outfit' }}>{d.dayName}</span>
                    <span style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 500, fontSize: '1.35rem', color: booking.date === d.iso ? 'var(--crimson)' : 'var(--ink)' }}>
                      {d.dayNum}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── TIME ────────────────────────────────────── */}
          {step === 'time' && (
            <div>
              <p className="text-[var(--steel)] text-sm mb-5" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>Wähle eine Uhrzeit.</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map((sl) => (
                  <button key={sl.time} disabled={!sl.available} onClick={() => sl.available && pick({ time: sl.time })}
                    className="p-3 text-center text-sm border transition-all duration-200"
                    style={{
                      fontFamily: 'Outfit',
                      background:     !sl.available ? 'transparent' : booking.time === sl.time ? 'var(--raised)' : 'rgba(18,18,40,0.5)',
                      borderColor:    booking.time === sl.time && sl.available ? 'var(--crimson)' : 'var(--border)',
                      color:          !sl.available ? 'var(--muted)' : booking.time === sl.time ? 'var(--crimson)' : 'var(--ink)',
                      opacity:        sl.available ? 1 : 0.35,
                      cursor:         sl.available ? 'pointer' : 'not-allowed',
                      textDecoration: sl.available ? 'none' : 'line-through',
                      minHeight:      '52px',
                    }}
                    aria-label={sl.available ? `${sl.time} Uhr buchen` : `${sl.time} Uhr nicht verfügbar`}
                  >
                    {sl.time}
                  </button>
                ))}
              </div>
              <p className="text-[var(--muted)] text-xs mt-4" style={{ fontFamily: 'Outfit' }}>Durchgestrichen = bereits belegt</p>
            </div>
          )}

          {/* ── CONTACT ─────────────────────────────────── */}
          {step === 'contact' && (
            <div>
              <p className="text-[var(--steel)] text-sm mb-5" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>Fast geschafft – gib deine Kontaktdaten ein.</p>

              {/* Summary */}
              <div className="p-4 border mb-6" style={{ background: 'var(--raised)', borderColor: 'rgba(232,32,53,0.2)' }}>
                <p className="label mb-3 text-[0.6rem]">Deine Auswahl</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    { l: 'Service',  v: selSvc?.name },
                    { l: 'Barber',   v: booking.barberId === 'any' ? 'Nächster Verfügbarer' : selBarber?.name },
                    { l: 'Datum',    v: new Date(booking.date).toLocaleDateString('de-AT', { weekday: 'long', day: 'numeric', month: 'long' }) },
                    { l: 'Uhrzeit', v: `${booking.time} Uhr`, red: true },
                  ].map((r) => (
                    <div key={r.l}>
                      <span className="text-[var(--muted)] text-xs" style={{ fontFamily: 'Outfit' }}>{r.l}</span>
                      <p className="text-sm" style={{ fontFamily: 'Outfit', color: r.red ? 'var(--crimson)' : 'var(--ink)', fontWeight: r.red ? 500 : 400 }}>
                        {r.v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {(['firstName', 'lastName'] as const).map((f) => (
                    <div key={f}>
                      <label htmlFor={f} className="block label mb-2 text-[0.6rem]">
                        {f === 'firstName' ? 'Vorname' : 'Nachname'} *
                      </label>
                      <input id={f} type="text" autoComplete={f === 'firstName' ? 'given-name' : 'family-name'}
                        className={`input-void ${errors[f] ? 'error' : ''}`}
                        placeholder={f === 'firstName' ? 'Max' : 'Mustermann'}
                        value={booking[f]}
                        onChange={(e) => { setBooking((p) => ({ ...p, [f]: e.target.value })); setErrors((p) => ({ ...p, [f]: undefined })); }}
                      />
                      <FieldError msg={errors[f]} />
                    </div>
                  ))}
                </div>
                {([
                  { id: 'bPhone', field: 'phone' as const, label: 'Telefon *', type: 'tel',   placeholder: '+43 664 …',       autocomplete: 'tel'   },
                  { id: 'bEmail', field: 'email' as const, label: 'E-Mail *',  type: 'email', placeholder: 'max@beispiel.at', autocomplete: 'email' },
                ] as const).map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block label mb-2 text-[0.6rem]">{f.label}</label>
                    <input id={f.id} type={f.type} autoComplete={f.autocomplete}
                      className={`input-void ${errors[f.field] ? 'error' : ''}`}
                      placeholder={f.placeholder}
                      value={booking[f.field]}
                      onChange={(e) => { setBooking((p) => ({ ...p, [f.field]: e.target.value })); setErrors((p) => ({ ...p, [f.field]: undefined })); }}
                    />
                    <FieldError msg={errors[f.field]} />
                  </div>
                ))}
                <div>
                  <label htmlFor="bNotes" className="block label mb-2 text-[0.6rem]">Anmerkungen (optional)</label>
                  <textarea id="bNotes" rows={3} className="input-void resize-none" placeholder="Besondere Wünsche..."
                    value={booking.notes} onChange={(e) => setBooking((p) => ({ ...p, notes: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── SUCCESS ─────────────────────────────────── */}
          {step === 'success' && (
            <div className="py-4 text-center" role="status" aria-live="assertive">
              <div className="relative w-16 h-16 mx-auto mb-6">
                <div className="absolute inset-0 border border-[var(--crimson)] animate-ping opacity-20" aria-hidden="true"/>
                <div className="relative w-16 h-16 border border-[var(--crimson)] flex items-center justify-center bg-[var(--raised)] pulse-red">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--crimson)" strokeWidth="1.5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              </div>

              <h3 style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 500, fontSize: '2rem', color: 'var(--ink)', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                Termin bestätigt!
              </h3>
              <p className="text-[var(--steel)] mb-8 max-w-xs mx-auto" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>
                Bestätigung geht an{' '}
                <strong className="font-normal" style={{ color: 'var(--crimson)' }}>{booking.email}</strong>
              </p>

              <div className="p-5 text-left max-w-xs mx-auto mb-8 border" style={{ background: 'var(--raised)', borderColor: 'rgba(232,32,53,0.25)' }}>
                <p className="label mb-4 text-center text-[0.6rem]">Deine Buchung</p>
                <dl className="space-y-3">
                  {[
                    { l: 'Service', v: selSvc?.name },
                    { l: 'Barber',  v: booking.barberId === 'any' ? 'Nächster Verfügbarer' : selBarber?.name },
                    { l: 'Datum',   v: new Date(booking.date).toLocaleDateString('de-AT', { weekday: 'short', day: 'numeric', month: 'long' }) },
                  ].map((r) => (
                    <div key={r.l} className="flex justify-between">
                      <dt className="text-[var(--muted)] text-xs" style={{ fontFamily: 'Outfit' }}>{r.l}</dt>
                      <dd className="text-[var(--ink)] text-sm" style={{ fontFamily: 'Outfit' }}>{r.v}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-[var(--border)] pt-3">
                    <dt className="text-[var(--muted)] text-xs" style={{ fontFamily: 'Outfit' }}>Uhrzeit</dt>
                    <dd className="font-medium" style={{ fontFamily: 'Outfit', color: 'var(--crimson)' }}>{booking.time} Uhr</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[var(--muted)] text-xs" style={{ fontFamily: 'Outfit' }}>Preis</dt>
                    <dd className="font-medium" style={{ fontFamily: 'Outfit', color: 'var(--crimson)' }}>€{selSvc?.price}</dd>
                  </div>
                </dl>
              </div>

              <p className="text-[var(--muted)] text-xs mb-6" style={{ fontFamily: 'Outfit' }}>
                Mariahilfer Str. 42, 1060 Wien · +43 1 234 5678
              </p>
              <button onClick={handleClose} className="btn-ghost">Fenster schließen</button>
            </div>
          )}
        </div>

        {/* Footer nav — contact step confirm button */}
        {step === 'contact' && (
          <div
            className="flex items-center justify-between px-6 py-4 border-t border-[var(--border)] flex-shrink-0"
            style={{ paddingBottom: 'max(16px, var(--safe-bottom, 16px))' }}
          >
            <button onClick={back}
              className="flex items-center gap-2 text-[var(--muted)] text-[0.65rem] tracking-widest uppercase hover:text-[var(--crimson)] transition-colors font-semibold bg-transparent border-none"
              style={{ fontFamily: 'Outfit', minHeight: '44px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
              Zurück
            </button>
            <button onClick={() => { if (validate()) setStep('success'); }} className="btn-crimson">
              Termin bestätigen
            </button>
          </div>
        )}

        {/* Back-only footer for intermediate steps */}
        {(step === 'barber' || step === 'date' || step === 'time') && (
          <div
            className="px-6 py-3 border-t border-[var(--border)] flex-shrink-0"
            style={{ paddingBottom: 'max(12px, var(--safe-bottom, 12px))' }}
          >
            <button onClick={back}
              className="flex items-center gap-2 text-[var(--muted)] text-[0.65rem] tracking-widest uppercase hover:text-[var(--crimson)] transition-colors font-semibold bg-transparent border-none"
              style={{ fontFamily: 'Outfit', minHeight: '44px' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
              Zurück
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
