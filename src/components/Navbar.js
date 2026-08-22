import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Story',      href: '#story' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Contact',    href: '#contact' },
];

/**
 * Navbar
 * ──────
 * Fixed at top:0 always.
 * Uses IntersectionObserver to track the active section.
 * Active link gets an animated teal underline indicator.
 * Includes: logo (SJ), nav links, theme toggle, Resume download, Hire Me CTA.
 */
const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active,     setActive]     = useState('story');
  const linkRefs = useRef({});

  /* ── Scroll shadow ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* ── IntersectionObserver — active section ── */
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));

    const observer = new IntersectionObserver(
      entries => {
        // Pick the entry with largest intersection ratio that is visible
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length) setActive(visible[0].target.id);
      },
      {
        root:       null,
        rootMargin: '-15% 0px -70% 0px', // fires when section is in upper 30% of viewport
        threshold:  [0, 0.1, 0.25, 0.5],
      }
    );

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Smooth scroll ── */
  const scrollTo = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  /* ── Resume download ── */
  const downloadResume = () => {
    const a = document.createElement('a');
    a.href     = '/resume.pdf';
    a.download = 'Sehrish_Jabeen_Resume.pdf';
    a.click();
  };

  /* Nav background */
  const navBg = theme === 'dark'
    ? scrolled ? 'rgba(3,4,13,0.88)'  : 'rgba(3,4,13,0.45)'
    : scrolled ? 'rgba(242,245,255,0.90)' : 'rgba(242,245,255,0.55)';

  return (
    <>
      <motion.nav
        initial={{ y: -68, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:   'fixed',
          top:        0, left: 0, right: 0,
          zIndex:     1000,
          height:     '64px',
          background: navBg,
          backdropFilter:       'blur(22px) saturate(160%)',
          WebkitBackdropFilter: 'blur(22px) saturate(160%)',
          borderBottom: scrolled
            ? `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(123,140,222,0.15)'}`
            : '1px solid transparent',
          boxShadow: scrolled
            ? theme === 'dark'
              ? '0 1px 40px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(99,220,185,0.06)'
              : '0 1px 20px rgba(100,120,200,0.12)'
            : 'none',
          transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        }}
      >
        <div style={{
          maxWidth:       '1140px',
          margin:         '0 auto',
          padding:        '0 28px',
          height:         '100%',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          gap:            '8px',
        }}>

          {/* ── Logo ── */}
          <a
            href="#hero"
            onClick={e => scrollTo(e, '#hero')}
            style={{
              textDecoration:       'none',
              fontFamily:           "'Inter', sans-serif",
              fontWeight:           800,
              fontSize:             '22px',
              letterSpacing:        '-0.03em',
              background:           'linear-gradient(135deg, #63dcb9, #7b8cde)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor:  'transparent',
              flexShrink:           0,
              userSelect:           'none',
              lineHeight:           1,
            }}
          >
            SJ
          </a>

          {/* ── Desktop nav links ── */}
          <div
            className="nav-links-desktop"
            style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1, justifyContent: 'center' }}
          >
            {NAV_LINKS.map(link => {
              const id       = link.href.slice(1);
              const isActive = active === id;
              return (
                <NavLink
                  key={id}
                  link={link}
                  isActive={isActive}
                  scrollTo={scrollTo}
                  ref={el => linkRefs.current[id] = el}
                />
              );
            })}
          </div>

          {/* ── Desktop right controls ── */}
          <div
            className="nav-controls-desktop"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}
          >
            <ThemeBtn theme={theme} toggleTheme={toggleTheme} />

            <button
              onClick={downloadResume}
              style={btnStyle}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color       = 'var(--accent)';
                e.currentTarget.style.background  = 'rgba(99,220,185,0.07)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color       = 'var(--text-secondary)';
                e.currentTarget.style.background  = 'transparent';
              }}
            >
              <DownloadIcon /> Resume
            </button>

            <a
              href="#contact"
              onClick={e => scrollTo(e, '#contact')}
              style={ctaStyle}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Hire Me
            </a>
          </div>

          {/* ── Mobile controls ── */}
          <div className="nav-mobile-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ThemeBtn theme={theme} toggleTheme={toggleTheme} />
            <HamburgerBtn open={mobileOpen} onClick={() => setMobileOpen(o => !o)} />
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0,  scaleY: 1 }}
            exit={{   opacity: 0, y: -10, scaleY: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position:    'fixed',
              top:         '64px',
              left:        0, right: 0,
              zIndex:      999,
              background:  theme === 'dark' ? 'rgba(3,4,13,0.97)' : 'rgba(242,245,255,0.97)',
              backdropFilter: 'blur(24px)',
              borderBottom: `1px solid ${theme === 'dark' ? 'rgba(99,220,185,0.1)' : 'rgba(123,140,222,0.15)'}`,
              padding:     '10px 28px 24px',
              transformOrigin: 'top',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={e => scrollTo(e, link.href)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  fontFamily:     "'Inter', sans-serif",
                  fontWeight:     active === link.href.slice(1) ? 600 : 500,
                  fontSize:       '16px',
                  color:          active === link.href.slice(1) ? 'var(--accent)' : 'var(--text-primary)',
                  padding:        '12px 0',
                  borderBottom:   '1px solid var(--border)',
                }}
              >
                {link.label}
                {active === link.href.slice(1) && (
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
                )}
              </motion.a>
            ))}

            <button
              onClick={() => { downloadResume(); setMobileOpen(false); }}
              style={{
                marginTop:    '16px',
                width:        '100%',
                display:      'flex',
                alignItems:   'center',
                justifyContent: 'center',
                gap:          '8px',
                padding:      '13px',
                borderRadius: '10px',
                background:   'rgba(99,220,185,0.07)',
                border:       '1px solid rgba(99,220,185,0.18)',
                color:        'var(--accent)',
                fontSize:     '14px',
                fontFamily:   "'Inter', sans-serif",
                fontWeight:   600,
                cursor:       'pointer',
              }}
            >
              <DownloadIcon /> Download Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 900px) {
          .nav-links-desktop    { display: flex !important; }
          .nav-controls-desktop { display: flex !important; }
          .nav-mobile-controls  { display: none  !important; }
        }
        @media (max-width: 899px) {
          .nav-links-desktop    { display: none  !important; }
          .nav-controls-desktop { display: none  !important; }
          .nav-mobile-controls  { display: flex  !important; }
        }
      `}</style>
    </>
  );
};

/* ── NavLink with animated underline indicator ── */
const NavLink = React.forwardRef(({ link, isActive, scrollTo }, ref) => (
  <a
    ref={ref}
    href={link.href}
    onClick={e => scrollTo(e, link.href)}
    style={{
      position:       'relative',
      textDecoration: 'none',
      fontFamily:     "'Inter', sans-serif",
      fontWeight:     isActive ? 600 : 500,
      fontSize:       '14px',
      color:          isActive ? 'var(--accent)' : 'var(--text-secondary)',
      padding:        '8px 14px',
      borderRadius:   '8px',
      transition:     'color 0.2s',
      whiteSpace:     'nowrap',
    }}
    onMouseEnter={e => {
      if (!isActive) {
        e.currentTarget.style.color = 'var(--text-primary)';
      }
    }}
    onMouseLeave={e => {
      if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
    }}
  >
    {link.label}

    {/* Underline indicator — animated in/out */}
    {isActive && (
      <motion.span
        layoutId="nav-indicator"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        exit={{   scaleX: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        style={{
          position:    'absolute',
          bottom:      '2px',
          left:        '14px',
          right:       '14px',
          height:      '2px',
          borderRadius:'2px',
          background:  'linear-gradient(90deg, #63dcb9, #7b8cde)',
          boxShadow:   '0 0 8px rgba(99,220,185,0.6)',
          transformOrigin: 'left',
        }}
      />
    )}
  </a>
));

/* ── Small reusable pieces ── */
const ThemeBtn = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    style={{
      background:   'rgba(255,255,255,0.05)',
      border:       '1px solid var(--border)',
      borderRadius: '8px',
      width: '36px', height: '36px',
      cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '15px',
      transition: 'border-color 0.2s, background 0.2s',
      flexShrink: 0,
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'rgba(99,220,185,0.06)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
  >
    {theme === 'dark' ? '☀️' : '🌙'}
  </button>
);

const HamburgerBtn = ({ open, onClick }) => (
  <button
    onClick={onClick}
    aria-label="Toggle menu"
    style={{
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      padding: '9px 10px',
      cursor: 'pointer',
      display: 'flex', flexDirection: 'column',
      gap: '5px', alignItems: 'center',
    }}
  >
    {[0,1,2].map(i => (
      <span key={i} style={{
        display: 'block', width: '18px', height: '1.5px',
        background: 'var(--text-primary)', borderRadius: '2px',
        transition: 'transform 0.25s, opacity 0.25s',
        transform: open
          ? i === 0 ? 'rotate(45deg) translate(4.5px,4.5px)'
          : i === 2 ? 'rotate(-45deg) translate(4.5px,-4.5px)' : 'none'
          : 'none',
        opacity: open && i === 1 ? 0 : 1,
      }} />
    ))}
  </button>
);

const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

/* Shared button styles */
const btnStyle = {
  display: 'flex', alignItems: 'center', gap: '6px',
  padding: '8px 15px', borderRadius: '8px',
  background: 'transparent', border: '1px solid var(--border)',
  color: 'var(--text-secondary)',
  fontSize: '13px', fontFamily: "'Inter', sans-serif", fontWeight: 500,
  cursor: 'pointer', transition: 'all 0.18s', whiteSpace: 'nowrap',
};

const ctaStyle = {
  textDecoration: 'none',
  padding: '9px 20px', borderRadius: '8px',
  background: 'linear-gradient(135deg,#63dcb9,#7b8cde)',
  color: '#050810',
  fontSize: '13px', fontFamily: "'Inter', sans-serif", fontWeight: 700,
  letterSpacing: '0.01em',
  transition: 'opacity 0.18s, transform 0.18s',
  whiteSpace: 'nowrap',
  boxShadow: '0 0 20px rgba(99,220,185,0.18)',
};

export default Navbar;
