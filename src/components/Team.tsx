import { team } from '../data/data';

interface Props { onBookingOpen: () => void; }

export default function Team({ onBookingOpen }: Props) {
  return (
    <section id="team" className="py-24 lg:py-36 bg-[var(--surface)] relative overflow-hidden" aria-labelledby="team-heading">
      {/* Ghost text BG */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.018] leading-none hidden lg:block"
        style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 700, fontSize: '20vw', color: 'var(--frost)', letterSpacing: '-0.04em' }}
        aria-hidden="true"
      >
        TEAM
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <p className="label reveal mb-4">Die Meister</p>
            <h2
              id="team-heading"
              className="reveal reveal-d1"
              style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 500, fontSize: 'clamp(2rem,4.5vw,3.4rem)', color: 'var(--ink)', marginBottom: '0.75rem' }}
            >
              Unser <span style={{ fontStyle: 'italic', color: 'var(--crimson)' }}>Team</span>
            </h2>
            <p className="reveal reveal-d2 text-[var(--steel)] max-w-md" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>
              Vier Meister. Vier Handschriften. Ein gemeinsamer Anspruch: Perfektion.
            </p>
          </div>
          <button onClick={onBookingOpen} className="reveal btn-crimson flex-shrink-0 self-start lg:self-auto">
            Barber wählen
          </button>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <article
              key={member.id}
              className={`reveal reveal-d${i + 1} group relative`}
              aria-label={member.name}
            >
              {/* Photo */}
              <div className="relative overflow-hidden mb-5" style={{ aspectRatio: '3/4' }}>
                <img
                  src={member.imageUrl}
                  alt={`${member.name}, ${member.role}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
                  style={{ filter: 'grayscale(1)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(1)'; }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(3,3,5,0.88) 0%, transparent 55%)' }}
                />

                {/* Crimson top stripe on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--crimson)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  aria-hidden="true"
                />

                {/* Experience badge */}
                <div className="absolute top-4 left-4 bg-[var(--void)] bg-opacity-80 border px-3 py-2 backdrop-blur-sm" style={{ borderColor: 'rgba(232,32,53,0.3)' }}>
                  <p className="text-[var(--crimson)] text-lg leading-none" style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 600 }}>
                    {member.experience}
                  </p>
                  <p className="text-[var(--muted)] text-[0.55rem] tracking-widest uppercase" style={{ fontFamily: 'Outfit' }}>Jahre</p>
                </div>

                {/* Bio overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none">
                  <p className="text-[var(--frost)] text-xs leading-relaxed" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div>
                <h3
                  className="text-[var(--ink)] group-hover:text-[var(--crimson)] transition-colors duration-300"
                  style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 500, fontSize: '1.35rem' }}
                >
                  {member.name}
                </h3>
                <p className="label text-[0.58rem] mt-0.5 mb-3">{member.role}</p>
                <div className="flex flex-wrap gap-1.5">
                  {member.specialties.map((s) => (
                    <span
                      key={s}
                      className="text-[var(--muted)] text-[0.58rem] tracking-wider border px-2 py-0.5 transition-colors duration-300 group-hover:border-[var(--crimson)] group-hover:border-opacity-30"
                      style={{ fontFamily: 'Outfit', borderColor: 'var(--border-hi)' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom divider strip */}
        <div className="mt-20 pt-10 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 500, fontSize: '1.5rem', color: 'var(--ink)', fontStyle: 'italic' }}>
              Wähle deinen Lieblings-Barber.
            </p>
            <p className="text-[var(--steel)] text-sm mt-1" style={{ fontFamily: 'Outfit', fontWeight: 300 }}>
              Oder überlasse die Wahl uns — wir matchen dich perfekt.
            </p>
          </div>
          <button onClick={onBookingOpen} className="btn-crimson w-full sm:w-auto justify-center flex-shrink-0">
            Termin buchen
          </button>
        </div>
      </div>
    </section>
  );
}
