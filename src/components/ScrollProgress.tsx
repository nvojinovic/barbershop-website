import { useEffect } from 'react';

/**
 * Attaches the IntersectionObserver that drives .reveal animations.
 * The actual scroll-progress bar is rendered inside Navigation's <header>
 * so it lives in the same fixed GPU layer and stays visible on iOS Safari
 * during address-bar transitions.
 */
export default function ScrollProgress() {
  useEffect(() => {
    const revealSelector = '.reveal, .reveal-left, .reveal-right';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    const observeRevealNodes = (root: ParentNode) => {
      root.querySelectorAll(revealSelector).forEach((el) => {
        if (!el.classList.contains('visible')) {
          observer.observe(el);
        }
      });
    };

    const timer = setTimeout(() => {
      observeRevealNodes(document);
    }, 80);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;

          if (node.matches(revealSelector) && !node.classList.contains('visible')) {
            observer.observe(node);
          }

          observeRevealNodes(node);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // No DOM output — bar lives in Navigation
  return null;
}
