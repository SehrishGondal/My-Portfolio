import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SocialLink = ({ social }) => (
  <a
    href={social.href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '16px 20px',
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: '14px',
      textDecoration: 'none',
      transition: 'all 0.25s ease',
      backdropFilter: 'blur(10px)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'var(--border-glow)';
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = '0 8px 30px rgba(99,220,185,0.1)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'var(--border)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <div style={{
      width: '40px', height: '40px',
      borderRadius: '10px',
      background: social.gradient,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '20px',
      flexShrink: 0,
    }}>
      {social.icon}
    </div>
    <div>
      <div style={{
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        fontWeight: 600,
        fontSize: '14px',
        color: 'var(--text-primary)',
      }}>{social.label}</div>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        color: 'var(--text-muted)',
        letterSpacing: '0.03em',
      }}>{social.handle}</div>
    </div>
    <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '16px' }}>→</span>
  </a>
);

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    color: 'var(--text-primary)',
    fontSize: '14px',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const SOCIALS = [
    {
      icon: '💼',
      label: 'LinkedIn',
      handle: 'sehrish-jabeen',
      href: 'https://www.linkedin.com/in/sehrish-jabeen-2b4020382?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      gradient: 'linear-gradient(135deg,#0077b5,#00a8e0)',
    },
    {
      icon: '🐙',
      label: 'GitHub',
      handle: '@SehrishGondal',
      href: 'https://github.com/SehrishGondal',
      gradient: 'linear-gradient(135deg,#333,#666)',
    },
    {
      icon: '📧',
      label: 'Email',
      handle: 'sehrishjabeen1258@gmail.com',
      href: 'mailto:sehrish@example.com',
      gradient: 'linear-gradient(135deg,#63dcb9,#7b8cde)',
    },
    {
      icon: '📱',
      label: 'WhatsApp',
      handle: '+923425078238',
      href: '#',
      gradient: 'linear-gradient(135deg,#25d366,#128c7e)',
    },
  ];

  return (
    <section id="contact" style={{ padding: 'clamp(80px, 10vw, 120px) 0' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span className="section-tag">Contact</span>
          <h2 style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 52px)',
            letterSpacing: '-0.03em',
            marginBottom: '16px',
          }}>
            Let's{' '}
            <span style={{
              background: 'var(--gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Connect</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: '440px',
            margin: '0 auto',
            fontSize: '16px',
            lineHeight: 1.7,
            fontWeight: 300,
          }}>
            Whether it's an opportunity, a collaboration, or just a conversation about tech — I'm always open.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'start',
        }}>
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 style={{
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              fontWeight: 700,
              fontSize: '20px',
              marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}>Find me on</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {SOCIALS.map(s => <SocialLink key={s.label} social={s} />)}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 style={{
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              fontWeight: 700,
              fontSize: '20px',
              marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}>Send a message</h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
              <input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
              <textarea
                placeholder="Your message..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />

              <button
                type="submit"
                style={{
                  padding: '15px',
                  borderRadius: '10px',
                  background: sent ? 'linear-gradient(135deg,#43e97b,#38f9d7)' : 'var(--gradient)',
                  border: 'none',
                  color: '#060810',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "'Inter', 'Segoe UI', sans-serif",
                  letterSpacing: '0.02em',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.target.style.opacity = '0.88'; e.target.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }}
              >
                {sent ? '✓ Message Sent!' : 'Send Message →'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
