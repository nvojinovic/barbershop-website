import { useState } from 'react';
import { gallery } from '../data/data';
import type { GalleryItem } from '../data/types';

type GF = 'all' | 'cut' | 'beard' | 'interior';
const LABELS: Record<GF, string> = { all: 'Alle', cut: 'Schnitte', beard: 'Bart', interior: 'Interior' };

function GalleryCard({ item }: { item: GalleryItem }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="gallery-card"
      style={{
        gridColumn: item.colSpan === 2 ? 'span 2' : 'span 1',
        gridRow:    item.rowSpan === 2 ? 'span 2' : 'span 1',
        /* aspectRatio removed — grid's auto-rows determine the height;
           mixing aspect-ratio with grid-auto-rows causes iOS WebKit layout bugs */
        background: 'var(--raised)',
      }}
      role="img"
      aria-label={item.alt}
    >
      {/* Loading skeleton */}
      {!loaded && (
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, var(--raised) 25%, var(--surface) 50%, var(--raised) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }}
          aria-hidden="true"
        />
      )}

      <img
        src={item.imageUrl}
        alt={item.alt}
        loading="lazy"
        className="w-full h-full object-cover"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
        onLoad={() => setLoaded(true)}
      />

      <div className="top-line" aria-hidden="true" />
      <div className="overlay" aria-hidden="true" />

      <div className="caption">
        <p className="label text-[0.58rem] mb-0.5">{LABELS[item.category as GF]}</p>
        <p className="text-[var(--frost)] text-sm" style={{ fontFamily: '"Cormorant Garamond"', fontStyle: 'italic' }}>
          {item.alt}
        </p>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState<GF>('all');
  const filtered = filter === 'all' ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <section id="gallery" className="py-24 lg:py-36 bg-[var(--void)]" aria-labelledby="gallery-heading">
      {/* Add shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-12">
          <div>
            <p className="label reveal mb-4">Unsere Arbeit</p>
            <h2
              id="gallery-heading"
              className="reveal reveal-d1"
              style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 500, fontSize: 'clamp(2rem,4.5vw,3.4rem)', color: 'var(--ink)' }}
            >
              Die <span style={{ fontStyle: 'italic', color: 'var(--crimson)' }}>Galerie</span>
            </h2>
          </div>

          {/* Filter */}
          <div className="reveal flex gap-2 flex-wrap" role="group" aria-label="Galerie filtern">
            {(Object.keys(LABELS) as GF[]).map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className="px-4 py-1.5 text-[0.62rem] tracking-widest uppercase font-semibold border transition-all duration-300"
                style={{
                  fontFamily:  'Outfit',
                  background:  filter === c ? 'var(--crimson)' : 'transparent',
                  color:       filter === c ? 'var(--void)'    : 'var(--steel)',
                  borderColor: filter === c ? 'var(--crimson)' : 'var(--border-hi)',
                }}
              >
                {LABELS[c]}
              </button>
            ))}
          </div>
        </div>

        {/*
          CSS GRID gallery — restored from V1 style.
          Items use colSpan / rowSpan for masonry-like layout.
          grid-auto-rows: 220px creates equal row heights on desktop.
        */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4"
          style={{ gridAutoRows: 'clamp(160px, 28vw, 240px)' }}
        >
          {filtered.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>

        <p className="text-center text-[var(--muted)] text-xs tracking-wider mt-8" style={{ fontFamily: 'Outfit' }}>
          Alle Fotos zeigen echte Kundenergebnisse · Hover für Details
        </p>
      </div>
    </section>
  );
}
