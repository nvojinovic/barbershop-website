import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on non-touch pointer devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX  = -100, ringY  = -100;
    let rafId: number;

    /**
     * FIX: Use transform3d instead of left/top.
     * This avoids GPU repaint artifacts (the "green lines" issue).
     * translate3d is composited on the GPU – zero painting cost.
     */
    const moveDot = (x: number, y: number) => {
      dot.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
    };

    const moveRing = (x: number, y: number) => {
      ring.style.transform = `translate3d(${x - 17}px, ${y - 17}px, 0)`;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      moveDot(mouseX, mouseY); // dot follows instantly
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      // Ring lags behind with lerp
      ringX = lerp(ringX, mouseX, 0.14);
      ringY = lerp(ringY, mouseY, 0.14);
      moveRing(ringX, ringY);
      rafId = requestAnimationFrame(animate);
    };

    const onEnter = () => document.body.classList.add('cursor-hover');
    const onLeave = () => document.body.classList.remove('cursor-hover');

    // Attach hover listeners to interactive elements
    const attachHover = () => {
      document.querySelectorAll('button, a, [data-hover]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    attachHover();

    // Re-attach when DOM changes (e.g. modal opens)
    const mutObs = new MutationObserver(attachHover);
    mutObs.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      mutObs.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor-dot"  ref={dotRef}  aria-hidden="true" />
      <div id="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
