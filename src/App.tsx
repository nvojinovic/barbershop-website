import { useState } from 'react';
import IntroSplash from './components/IntroSplash';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  // Splash has already played this session → skip it immediately
  const [splashDone, setSplashDone] = useState(
    () => !!sessionStorage.getItem('noir_splash_v2'),
  );

  const open  = () => setBookingOpen(true);
  const close = () => setBookingOpen(false);

  return (
    <>
      {/* Cinematic intro — renders on top of everything until done */}
      {!splashDone && (
        <IntroSplash onComplete={() => setSplashDone(true)} />
      )}

      <Cursor />
      <ScrollProgress />
      <Navigation onBookingOpen={open} />

      <main>
        <Hero         onBookingOpen={open} />
        <About />
        <Services     onBookingOpen={open} />
        <Team         onBookingOpen={open} />
        <Gallery />
        <Testimonials onBookingOpen={open} />
        <Contact />
      </main>

      <Footer onBookingOpen={open} />
      <BookingModal isOpen={bookingOpen} onClose={close} />

      {/* ── Mobile floating booking button (FAB) ──────── */}
      {!bookingOpen && (
        <button
          onClick={open}
          className="fab-booking btn-crimson lg:hidden"
          aria-label="Termin buchen"
        >
          <svg
            width="16" height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Termin buchen
        </button>
      )}
    </>
  );
}
