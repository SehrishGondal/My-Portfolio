import React, { useState, useEffect } from 'react';
import './index.css';
import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import Story           from './components/Story';
import Projects        from './components/Projects';
import Skills          from './components/Skills';
import Leadership      from './components/Leadership';
import Contact         from './components/Contact';
import Footer          from './components/Footer';
import Cursor          from './components/Cursor';
import StarsBackground from './components/StarsBackground';
import Background      from './components/Background';

function App() {
  const [theme,   setTheme]   = useState('dark');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const toggleTheme = () => setTheme(p => p === 'dark' ? 'light' : 'dark');

  if (loading) return <LoadingScreen />;

  return (
    <div className="app">
      {/* Layer 0 — stars canvas (dark only) */}
      <StarsBackground theme={theme} />

      {/* Layer 1 — noise texture + glowing orbs + vignette */}
      <Background theme={theme} />

      {/* Custom cursor (desktop) */}
      <Cursor />

      {/* Fixed navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Content */}
      <main style={{ position: 'relative', zIndex: 3 }}>
        <Hero />
        <Story />
        <Projects />
        <Skills />
        <Leadership />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#03040d',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
    }}>
      {/* Mini orb behind spinner */}
      <div style={{
        position: 'absolute',
        width: '300px', height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,220,185,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        width: '52px', height: '52px',
        marginBottom: '20px',
      }}>
        {/* Outer ring */}
        <div style={{
          position: 'absolute', inset: 0,
          border: '1.5px solid rgba(99,220,185,0.12)',
          borderTop: '1.5px solid #63dcb9',
          borderRadius: '50%',
          animation: 'spin 0.9s linear infinite',
        }} />
        {/* Inner ring */}
        <div style={{
          position: 'absolute', inset: '10px',
          border: '1.5px solid rgba(123,140,222,0.12)',
          borderBottom: '1.5px solid #7b8cde',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite reverse',
        }} />
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        letterSpacing: '0.18em',
        color: '#63dcb9',
        opacity: 0.65,
        textTransform: 'uppercase',
      }}>
        Loading portfolio
      </p>
    </div>
  );
}

export default App;
