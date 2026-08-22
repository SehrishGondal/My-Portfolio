import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 24px 60px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow orbs */}
      <div style={{
        position: 'absolute', top: '20%', left: '-10%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(99,220,185,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        animation: 'floatOrb1 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '-10%',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(123,140,222,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        animation: 'floatOrb2 10s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '60%', left: '50%',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(240,98,146,0.07) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        animation: 'floatOrb1 6s ease-in-out infinite reverse',
      }} />

      <style>{`
        @keyframes floatOrb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px,-40px) scale(1.05); }
        }
        @keyframes floatOrb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-40px,30px) scale(1.08); }
        }
      `}</style>

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '32px' }}
        >
          <span className="section-tag">
            Available for opportunities
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22,1,0.36,1] }}
          style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(42px, 7vw, 88px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '12px',
          }}
        >
          Sehrish{' '}
          <span style={{
            background: 'var(--gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Jabeen
          </span>
        </motion.h1>

        {/* Typing animation subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(16px, 2.5vw, 22px)',
            color: 'var(--accent)',
            marginBottom: '28px',
            letterSpacing: '0.02em',
            minHeight: '32px',
          }}
        >
          <TypeAnimation
            sequence={[
              'Full-Stack Developer',
              2000,
              'AI Enthusiast',
              2000,
              'Software Engineer',
              2000,
              'Problem Solver',
              2000,
              'Continuous Learner',
              2000,
            ]}
            wrapper="span"
            repeat={Infinity}
            cursor={true}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(15px, 2vw, 18px)',
            maxWidth: '540px',
            margin: '0 auto 48px',
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          From a small village to the forefront of technology — building impactful solutions
          through code, curiosity, and relentless determination.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            onClick={() => scrollTo('#projects')}
            style={{
              padding: '14px 32px',
              borderRadius: '10px',
              background: 'var(--gradient)',
              border: 'none',
              color: '#060810',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              letterSpacing: '0.02em',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 40px rgba(99,220,185,0.35)';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            View My Work ↓
          </button>

          <button
            onClick={() => scrollTo('#story')}
            style={{
              padding: '14px 32px',
              borderRadius: '10px',
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontSize: '15px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.target.style.borderColor = 'var(--accent)';
              e.target.style.color = 'var(--accent)';
              e.target.style.background = 'rgba(99,220,185,0.06)';
            }}
            onMouseLeave={e => {
              e.target.style.borderColor = 'var(--border)';
              e.target.style.color = 'var(--text-primary)';
              e.target.style.background = 'transparent';
            }}
          >
            My Journey
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
          }}>scroll</span>
          <div style={{
            width: '1.5px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
            animation: 'scrollLine 2s ease infinite',
          }} />
          <style>{`
            @keyframes scrollLine {
              0% { opacity: 1; transform: scaleY(1) translateY(0); }
              100% { opacity: 0; transform: scaleY(0.3) translateY(20px); }
            }
          `}</style>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '48px',
            marginTop: '72px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { num: '3+', label: 'Projects Built' },
            { num: '4+', label: 'Leadership Roles' },
            { num: '5+', label: 'Technologies' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                fontWeight: 800,
                fontSize: '32px',
                background: 'var(--gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1,
                marginBottom: '6px',
              }}>{stat.num}</div>
              <div style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                letterSpacing: '0.05em',
                fontFamily: "'JetBrains Mono', monospace",
              }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
