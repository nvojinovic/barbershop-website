import React, { useEffect, useState } from 'react';

interface Props { onComplete: () => void; }

/**
 * Cinematic intro splash — plays once per session.
 * 1) Razor-blade line sweeps left → right
 * 2) NOIR logo + subtitle fade in
 * 3) Screen curtains upward to reveal the site
 */
export default function IntroSplash({ onComplete }: Props) {
  const [started,     setStarted]     = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [lineWidth,   setLineWidth]   = useState(false);
  const [exiting,     setExiting]     = useState(false);

  useEffect(() => {
    // Only play once per browser session
    if (sessionStorage.getItem('noir_splash_v2')) {
      onComplete();
      return;
    }

    const timers = [
      setTimeout(() => setStarted(true),     80),
      setTimeout(() => setTextVisible(true), 680),
      setTimeout(() => setLineWidth(true),   780),
      setTimeout(() => setExiting(true),    2500),
      setTimeout(() => {
        sessionStorage.setItem('noir_splash_v2', '1');
        onComplete();
      }, 3300),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      aria-hidden="true"
      style={{
        position:    'fixed',
        inset:       0,
        zIndex:      9999,
        background:  'var(--void)',
        display:     'flex',
        alignItems:  'center',
        justifyContent: 'center',
        overflow:    'hidden',
        transform:   exiting ? 'translateY(-100vh)' : 'translateY(0)',
        transition:  exiting
          ? 'transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)'
          : 'none',
        pointerEvents: exiting ? 'none' : 'all',
        userSelect:  'none',
      }}
    >
      {/* ── Razor blade sweep ──────────────────────────── */}
      <div
        style={{
          position:   'absolute',
          top:        0,
          bottom:     0,
          left:       0,
          width:      '2px',
          background: 'linear-gradient(180deg, transparent 0%, var(--crimson) 20%, #fff 50%, var(--crimson) 80%, transparent 100%)',
          boxShadow:  '0 0 14px 7px rgba(232,32,53,0.55), 0 0 36px 14px rgba(232,32,53,0.22)',
          transform:  started ? 'translateX(110vw)' : 'translateX(-4px)',
          transition: started
            ? 'transform 0.78s cubic-bezier(0.4, 0, 0.2, 1)'
            : 'none',
        }}
      />

      {/* ── Logo & subtitle ────────────────────────────── */}
      <div
        style={{
          textAlign:  'center',
          opacity:    textVisible ? 1 : 0,
          transform:  textVisible ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.96)',
          transition: 'opacity 0.65s ease, transform 0.65s cubic-bezier(0.22,1,0.36,1)',
          padding:    '0 24px',
        }}
      >
        {/* NOIR wordmark */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <span
            style={{
              fontFamily:   '"Cormorant Garamond", serif',
              fontWeight:   600,
              fontSize:     'clamp(5.5rem, 24vw, 10.5rem)',
              lineHeight:   1,
              color:        'var(--ink)',
              letterSpacing: '-0.01em',
              display:      'block',
            }}
          >
            NOIR
          </span>

          {/* Crimson radial glow */}
          <div
            style={{
              position:    'absolute',
              inset:       '-40px -30px',
              background:  'radial-gradient(ellipse 80% 60%, rgba(232,32,53,0.13) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Animated separator line */}
        <div
          style={{
            height:     '1px',
            background: 'linear-gradient(90deg, transparent, var(--crimson) 30%, var(--crimson) 70%, transparent)',
            margin:     '16px auto',
            width:      lineWidth ? '200px' : '0px',
            transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1)',
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            fontFamily:    'Outfit, sans-serif',
            fontWeight:    600,
            fontSize:      '0.6rem',
            letterSpacing: '0.46em',
            textTransform: 'uppercase',
            color:         'var(--crimson)',
            opacity:       lineWidth ? 1 : 0,
            transition:    'opacity 0.5s ease 0.2s',
          }}
        >
          Barbershop&nbsp;·&nbsp;Wien&nbsp;·&nbsp;Seit&nbsp;2015
        </p>
      </div>

      {/* ── Corner frame accents ───────────────────────── */}
      {([
        { top: '20px',    left:  '20px',  borderWidth: '1px 0 0 1px' },
        { top: '20px',    right: '20px',  borderWidth: '1px 1px 0 0' },
        { bottom: '20px', left:  '20px',  borderWidth: '0 0 1px 1px' },
        { bottom: '20px', right: '20px',  borderWidth: '0 1px 1px 0' },
      ] as Array<React.CSSProperties>).map((s, i) => (
        <div
          key={i}
          style={{
            position:    'absolute',
            width:       28,
            height:      28,
            borderColor: 'rgba(232,32,53,0.30)',
            borderStyle: 'solid',
            opacity:     textVisible ? 1 : 0,
            transition:  `opacity 0.45s ease ${0.08 + i * 0.06}s`,
            ...s,
          }}
        />
      ))}

      {/* ── Bottom loading bar ─────────────────────────── */}
      <div
        style={{
          position:   'absolute',
          bottom:     0,
          left:       0,
          height:     '1px',
          background: 'var(--crimson)',
          width:      exiting ? '100%' : started ? '70%' : '0%',
          transition: exiting
            ? 'width 0.3s ease'
            : started
              ? 'width 1.8s cubic-bezier(0.4,0,0.2,1)'
              : 'none',
          opacity:    0.45,
        }}
      />
    </div>
  );
}
