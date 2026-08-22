import React, { useEffect, useRef } from 'react';

/* Custom animated cursor — only shows on desktop */
const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      requestAnimationFrame(animate);
    };

    const onEnterLink = () => ring.classList.add('cursor-expand');
    const onLeaveLink = () => ring.classList.remove('cursor-expand');

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    const frame = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed;
          width: 8px; height: 8px;
          background: #63dcb9;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          top: 0; left: 0;
          transition: opacity 0.2s;
          mix-blend-mode: difference;
        }
        .cursor-ring {
          position: fixed;
          width: 36px; height: 36px;
          border: 1.5px solid rgba(99,220,185,0.6);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          top: 0; left: 0;
          transition: width 0.2s, height 0.2s, border-color 0.2s;
        }
        .cursor-expand {
          width: 52px !important;
          height: 52px !important;
          border-color: rgba(99,220,185,0.9) !important;
          transform: translate(var(--x, 0), var(--y, 0)) !important;
        }
        body { cursor: none; }
        @media (pointer: coarse) {
          body { cursor: auto; }
          .cursor-dot, .cursor-ring { display: none; }
        }
      `}</style>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default Cursor;
