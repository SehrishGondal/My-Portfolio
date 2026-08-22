import React, { useEffect, useRef } from 'react';

/**
 * StarsBackground
 * ──────────────
 * Three layered effects rendered on a single canvas:
 *   1. Twinkling star field  (3 depth layers, glow halos on bright stars)
 *   2. Shooting stars        (spawn every ~2.5 s, teal-to-white gradient trail)
 *   3. Subtle nebula wash    (large soft radial blobs drifting slowly)
 *
 * Sits at z-index 0, pointer-events none. Fades out in light mode.
 */
const StarsBackground = ({ theme }) => {
  const canvasRef        = useRef(null);
  const animRef          = useRef(null);
  const starsRef         = useRef([]);
  const shootingRef      = useRef([]);
  const nebulaeRef       = useRef([]);
  const shootTimerRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    /* ─── sizing ─── */
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      initNebulae();
    };

    /* ─── star field ─── */
    const initStars = () => {
      const density = Math.floor((canvas.width * canvas.height) / 2600);
      starsRef.current = Array.from({ length: Math.min(density, 340) }, () => {
        const layer  = Math.random();                      // 0–1  (near = big/bright)
        const radius = layer * 1.3 + 0.15;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          baseOpacity: layer * 0.65 + 0.08,
          opacity:     layer * 0.65 + 0.08,
          twinkleSpd:  Math.random() * 0.007 + 0.002,
          twinkleDir:  Math.random() > 0.5 ? 1 : -1,
          driftX:      (Math.random() - 0.5) * 0.012 * (layer + 0.3),
          driftY:      (Math.random() - 0.5) * 0.006 * (layer + 0.3),
          // color tint
          gold: layer > 0.75 && Math.random() < 0.25,
          teal: layer > 0.6  && Math.random() < 0.15,
        };
      });
    };

    /* ─── soft nebula blobs (very subtle) ─── */
    const initNebulae = () => {
      nebulaeRef.current = [
        { x: canvas.width * 0.15, y: canvas.height * 0.25, r: 380, color: '99,220,185',  alpha: 0.028, dx: 0.06, dy: 0.04 },
        { x: canvas.width * 0.80, y: canvas.height * 0.15, r: 320, color: '123,140,222', alpha: 0.032, dx: -0.05, dy: 0.05 },
        { x: canvas.width * 0.55, y: canvas.height * 0.70, r: 420, color: '240,98,146',  alpha: 0.018, dx: 0.04, dy: -0.06 },
        { x: canvas.width * 0.25, y: canvas.height * 0.80, r: 280, color: '123,140,222', alpha: 0.022, dx: 0.07, dy: 0.03 },
      ];
    };

    /* ─── spawn shooting star ─── */
    const spawnShoot = () => {
      const angle = (Math.random() * 30 + 15) * (Math.PI / 180); // 15–45°
      const speed = Math.random() * 7 + 6;
      const tailLen = Math.random() * 160 + 80;
      shootingRef.current.push({
        x:       Math.random() * canvas.width * 0.85,
        y:       Math.random() * canvas.height * 0.45,
        vx:      Math.cos(angle) * speed,
        vy:      Math.sin(angle) * speed,
        tailLen,
        opacity: 1,
        fade:    Math.random() * 0.012 + 0.008,
        width:   Math.random() * 1.2 + 0.8,
      });
    };

    /* ─── animation loop ─── */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (theme !== 'dark') {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      /* nebulae */
      nebulaeRef.current.forEach(n => {
        n.x += n.dx; n.y += n.dy;
        // soft wrap
        if (n.x < -n.r) n.x = canvas.width + n.r;
        if (n.x > canvas.width + n.r) n.x = -n.r;
        if (n.y < -n.r) n.y = canvas.height + n.r;
        if (n.y > canvas.height + n.r) n.y = -n.r;

        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        g.addColorStop(0,   `rgba(${n.color},${n.alpha})`);
        g.addColorStop(0.5, `rgba(${n.color},${n.alpha * 0.4})`);
        g.addColorStop(1,   `rgba(${n.color},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      /* stars */
      starsRef.current.forEach(s => {
        s.opacity += s.twinkleSpd * s.twinkleDir;
        if (s.opacity > s.baseOpacity + 0.25) s.twinkleDir = -1;
        if (s.opacity < 0.04)                  s.twinkleDir =  1;

        s.x += s.driftX; s.y += s.driftY;
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;

        const col = s.gold
          ? `rgba(255,225,140,${s.opacity})`
          : s.teal
          ? `rgba(140,240,210,${s.opacity})`
          : `rgba(210,225,255,${s.opacity})`;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();

        /* glow halo on brighter/larger stars */
        if (s.radius > 0.9 && s.opacity > 0.35) {
          const haloR = s.radius * 4.5;
          const g2 = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, haloR);
          const gc = s.gold
            ? `rgba(255,200,100,${s.opacity * 0.22})`
            : s.teal
            ? `rgba(99,220,185,${s.opacity * 0.28})`
            : `rgba(160,185,255,${s.opacity * 0.18})`;
          g2.addColorStop(0, gc);
          g2.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(s.x, s.y, haloR, 0, Math.PI * 2);
          ctx.fillStyle = g2;
          ctx.fill();
        }
      });

      /* shooting stars */
      shootingRef.current = shootingRef.current.filter(s => s.opacity > 0);
      shootingRef.current.forEach(s => {
        const tailX = s.x - s.vx * (s.tailLen / 10);
        const tailY = s.y - s.vy * (s.tailLen / 10);

        const g3 = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        g3.addColorStop(0,    `rgba(255,255,255,${s.opacity})`);
        g3.addColorStop(0.15, `rgba(180,240,225,${s.opacity * 0.85})`);
        g3.addColorStop(0.5,  `rgba(99,220,185,${s.opacity * 0.45})`);
        g3.addColorStop(1,    'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = g3;
        ctx.lineWidth   = s.width;
        ctx.lineCap     = 'round';
        ctx.stroke();

        /* bright head dot */
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.width * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();

        s.x += s.vx; s.y += s.vy;
        s.opacity -= s.fade;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    /* ─── init ─── */
    resize();
    draw();

    /* shoot every 2.5 s ±0.5 s */
    const scheduleShoot = () => {
      shootTimerRef.current = setTimeout(() => {
        if (Math.random() < 0.75) spawnShoot();
        scheduleShoot();
      }, 2000 + Math.random() * 1000);
    };
    scheduleShoot();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(shootTimerRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'fixed',
        inset:         0,
        width:         '100%',
        height:        '100%',
        zIndex:        0,
        pointerEvents: 'none',
        opacity:       theme === 'dark' ? 1 : 0,
        transition:    'opacity 0.7s ease',
      }}
    />
  );
};

export default StarsBackground;
