import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '48px 24px',
      position: 'relative',
      zIndex: 1,
    }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {/* Left: brand */}
        <div>
          <div style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            fontWeight: 800,
            fontSize: '18px',
            background: 'var(--gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '4px',
          }}>
            Sehrish Jabeen
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
          }}>
            Software Engineer · Full-Stack · AI Enthusiast
          </div>
        </div>

        {/* Center: quote */}
        <div style={{
          fontStyle: 'italic',
          color: 'var(--text-muted)',
          fontSize: '13px',
          maxWidth: '320px',
          textAlign: 'center',
          lineHeight: 1.6,
        }}>
          "From a small village to the front lines of technology — nothing can stop a determined mind."
        </div>

        {/* Right: copyright */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: 'var(--text-muted)',
          letterSpacing: '0.05em',
          textAlign: 'right',
        }}>
          <div>© {year} Sehrish Jabeen</div>
          <div style={{ marginTop: '4px' }}>
            Built with{' '}
            <span style={{ color: 'var(--accent)' }}>React.js</span>
            {' & '}
            <span style={{ color: 'var(--accent-2)' }}>Framer Motion</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
