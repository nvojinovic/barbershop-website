# NOIR Barbershop — React.js MVP (Vite)

Premium Barbershop Website als React.js + Vite + TypeScript + Tailwind Projekt.

## Schnellstart

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Projektstruktur

```
src/
├── components/
│   ├── Cursor.tsx          # Custom Cursor (transform3d – kein Rendering-Artefakt)
│   ├── ScrollProgress.tsx  # Scroll-Fortschrittsbalken + IntersectionObserver Init
│   ├── Navigation.tsx      # Sticky Nav mit Mobile Menu
│   ├── Hero.tsx            # Hero mit Word-Reveal Animation
│   ├── About.tsx           # Über uns mit Counter-Animation
│   ├── Services.tsx        # Services mit 3D Tilt Cards
│   ├── Team.tsx            # Team Grid
│   ├── Gallery.tsx         # CSS Grid Galerie mit Filter
│   ├── Testimonials.tsx    # Bewertungen
│   ├── Contact.tsx         # Kontaktformular
│   ├── Footer.tsx          # Footer
│   └── BookingModal.tsx    # 6-Schritt Buchungsflow mit Focus Trap
├── data/
│   ├── types.ts            # TypeScript Interfaces
│   └── data.ts             # Alle Mock-Daten
├── hooks/
│   ├── useInView.ts        # IntersectionObserver Hook
│   └── useCounter.ts       # Animierter Zahlen-Counter
├── App.tsx
├── main.tsx
└── index.css               # CSS Design Tokens + alle Animationen
```

## Behobene Fehler (v3 → React)

| Problem                       | Ursache                                        | Fix                                              |
|-------------------------------|------------------------------------------------|--------------------------------------------------|
| Grüne Cursor-Linien           | `left`/`top` CSS-Properties verursachen GPU-Repaint-Artefakte | `transform: translate3d(x, y, 0)` + `will-change: transform` |
| Linien im Hero-Foto           | 3 gestapelte Gradient-Overlays → Banding       | Einzelner konsolidierter Gradient                |
| Vertikale Linien im Hero      | Dekorative `div`-Elemente mit 1px Breite       | Entfernt                                         |
| Nav schwer lesbar             | Links in `--steel` (#6070A0) zu dunkel         | `rgba(200,212,240,0.80)` → Hover zu `--ink`     |
| Karusells (Marquees)          | Passen nicht zum Barbershop-Stil               | Vollständig entfernt                             |
| Galerie als Horizontal-Scroll | Nicht intuitiv, kein Raster-Gefühl             | CSS Grid mit `gridRow/colSpan` wiederhergestellt |
| Kein Focus Trap im Modal      | Keyboard-User konnten aus Modal heraus tabben  | Focus Trap + Escape + Auto-Focus auf Close-Btn  |
| `cursor: none` auf Buttons    | Auch im Modal kein visueller Cursor            | `cursor: pointer` explizit nur auf `html`        |
| Bilder ohne `loading="lazy"`  | Alle Bilder gleichzeitig geladen               | `loading="lazy"` auf alle nicht-kritischen Bilder|
| Kein `aria-live` im Modal     | Screen Reader meldeten Schritt-Wechsel nicht  | `aria-live="polite"` auf Modal-Body              |

## Farbschema — Void Crimson

| Token          | Wert       | Verwendung                   |
|----------------|------------|------------------------------|
| `--void`       | `#030305`  | Tiefster Hintergrund         |
| `--base`       | `#08080F`  | Sekundärer Hintergrund       |
| `--surface`    | `#0D0D1A`  | Karten-Hintergrund           |
| `--raised`     | `#121228`  | Erhöhte Elemente             |
| `--crimson`    | `#E82035`  | Primäre Akzentfarbe          |
| `--steel`      | `#6070A0`  | Sekundärer Text              |
| `--steel-light`| `#90A8D0`  | Body-Text                    |
| `--ink`        | `#F4F6FF`  | Primärer Text (Weiß-Blau)   |
| `--frost`      | `#C8D4F0`  | Nav-Links, Subtitles         |

## Tech Stack

- **React 18** (Vite, keine Next.js-Abhängigkeit)
- **TypeScript 5**
- **Tailwind CSS 3**
- **Outfit** (UI Font) + **Cormorant Garamond** (Display Font)
- Keine externen Animations-Libraries — alles native CSS + rAF
