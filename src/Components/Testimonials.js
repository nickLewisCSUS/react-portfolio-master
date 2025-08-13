import React, { useEffect, useMemo, useRef, useState } from 'react';

const ROTATE_MS = 6000;
const FADE_MS = 800;

export default function Testimonials({ data }) {
  const items = useMemo(() => (data?.testimonials ?? []), [data]);
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);

  // Respect reduced motion
  const reducedMotion = typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!items.length) return;

    if (reducedMotion) return; // don’t auto-rotate if user prefers no motion

    timer.current = setInterval(() => {
      setIdx(i => (i + 1) % items.length);
    }, ROTATE_MS);

    return () => clearInterval(timer.current);
  }, [items.length, reducedMotion]);

  const goTo = (i) => {
    clearInterval(timer.current);
    setIdx(i);
  };

  return (
    <section id="testimonials">
      <div className="text-container">
        <div className="row">
          <div className="quote-intro-container">
            <p className="quote-intro">
              Some thoughts that inspire my approach to code and creativity.
            </p>
          </div>

          <div className="two columns header-col">
            <h1><span>Quotes</span></h1>
          </div>

          <div className="ten columns">
            <div className="fade-slider" aria-roledescription="carousel">
              {items.map((t, i) => (
                <div
                  key={t.user + i}
                  className={`fade-slide ${i === idx ? 'is-active' : ''}`}
                  aria-hidden={i === idx ? 'false' : 'true'}
                >
                  <blockquote>
                    <p>{t.text}</p>
                    <cite>{t.user}</cite>
                  </blockquote>
                </div>
              ))}
              {items.length > 1 && (
                <div className="fade-dots" role="tablist" aria-label="Quotes navigation">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      className={`dot ${i === idx ? 'active' : ''}`}
                      aria-label={`Go to quote ${i + 1}`}
                      aria-selected={i === idx}
                      onClick={() => goTo(i)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
