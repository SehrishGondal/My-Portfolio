import React, { useEffect, useRef } from 'react';

/**
 * Background
 * ──────────
 * Renders (bottom → top):
 *   1. Noise texture SVG filter overlay        — adds film-grain depth
 *   2. Three slowly-animated glowing orbs      — teal / indigo / rose
 *   3. Radial vignette                         — pulls focus to centre
 *
 * All layers are fixed, pointer-events:none, z-index 0 / 1.
 */
const Background = ({ theme }) => {
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  /* Gentle JS-driven drift for organic feel */
  useEffect(() => {
    let frame;
    let t = 0;
    const animate = () => {
      t += 0.003;
      if (orb1Ref.current) {
        orb1Ref.current.style.transform =
          `translate(${Math.sin(t * 0.7) * 60}px, ${Math.cos(t * 0.5) * 50}px) scale(${1 + Math.sin(t * 0.9) * 0.06})`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform =
          `translate(${Math.cos(t * 0.6) * 70}px, ${Math.sin(t * 0.8) * 55}px) scale(${1 + Math.cos(t * 0.7) * 0.05})`;
      }
      if (orb3Ref.current) {
        orb3Ref.current.style.transform =
          `translate(${Math.sin(t * 0.5 + 1) * 50}px, ${Math.cos(t * 0.65) * 60}px) scale(${1 + Math.sin(t * 1.1) * 0.07})`;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  const isDark = theme === 'dark';

  return (
    <>
      {/* ── Noise texture ── */}
      <div
        style={{
          position:      'fixed',
          inset:         0,
          zIndex:        2,
          pointerEvents: 'none',
          opacity:       isDark ? 0.055 : 0.03,
          transition:    'opacity 0.5s',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize:   '200px 200px',
          mixBlendMode:     isDark ? 'screen' : 'multiply',
        }}
      />

      {/* ── Glowing orbs ── */}
      {isDark && (
        <div style={{
          position:      'fixed',
          inset:         0,
          zIndex:        1,
          pointerEvents: 'none',
          overflow:      'hidden',
        }}>
          {/* Orb 1 — Teal (top-left) */}
          <div
            ref={orb1Ref}
            style={{
              position:     'absolute',
              top:          '-10%',
              left:         '-8%',
              width:        '55vw',
              height:       '55vw',
              maxWidth:     '680px',
              maxHeight:    '680px',
              borderRadius: '50%',
              background:   'radial-gradient(circle, rgba(99,220,185,0.13) 0%, rgba(99,220,185,0.04) 45%, transparent 72%)',
              transition:   'transform 0.1s linear',
              willChange:   'transform',
            }}
          />

          {/* Orb 2 — Indigo (top-right) */}
          <div
            ref={orb2Ref}
            style={{
              position:     'absolute',
              top:          '-5%',
              right:        '-12%',
              width:        '50vw',
              height:       '50vw',
              maxWidth:     '620px',
              maxHeight:    '620px',
              borderRadius: '50%',
              background:   'radial-gradient(circle, rgba(123,140,222,0.15) 0%, rgba(123,140,222,0.05) 45%, transparent 72%)',
              transition:   'transform 0.1s linear',
              willChange:   'transform',
            }}
          />

          {/* Orb 3 — Rose (bottom-centre) */}
          <div
            ref={orb3Ref}
            style={{
              position:     'absolute',
              bottom:       '-15%',
              left:         '30%',
              width:        '45vw',
              height:       '45vw',
              maxWidth:     '560px',
              maxHeight:    '560px',
              borderRadius: '50%',
              background:   'radial-gradient(circle, rgba(240,98,146,0.10) 0%, rgba(240,98,146,0.03) 45%, transparent 72%)',
              transition:   'transform 0.1s linear',
              willChange:   'transform',
            }}
          />
        </div>
      )}

      {/* Light mode — very soft orbs */}
      {!isDark && (
        <div style={{
          position: 'fixed', inset: 0,
          zIndex: 1, pointerEvents: 'none', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-5%', left: '-5%',
            width: '50vw', height: '50vw', maxWidth: '600px', maxHeight: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,220,185,0.08) 0%, transparent 70%)',
            animation: 'orbDrift1 14s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', bottom: '-10%', right: '-8%',
            width: '45vw', height: '45vw', maxWidth: '550px', maxHeight: '550px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(123,140,222,0.10) 0%, transparent 70%)',
            animation: 'orbDrift2 16s ease-in-out infinite',
          }} />
        </div>
      )}

      {/* ── Radial vignette — centre brightens, edges darken ── */}
      <div style={{
        position:      'fixed',
        inset:         0,
        zIndex:        1,
        pointerEvents: 'none',
        background:    isDark
          ? 'radial-gradient(ellipse 80% 70% at 50% 40%, transparent 30%, rgba(3,4,13,0.55) 100%)'
          : 'radial-gradient(ellipse 80% 70% at 50% 40%, transparent 30%, rgba(242,245,255,0.4) 100%)',
        transition:    'background 0.5s',
      }} />

      <style>{`
        @keyframes orbDrift1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(40px,30px) scale(1.06); }
        }
        @keyframes orbDrift2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-40px,-35px) scale(1.05); }
        }
      `}</style>
    </>
  );
};

export default Background;
