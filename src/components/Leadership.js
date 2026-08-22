import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const LeadershipCard = ({ role, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '18px',
        padding: '24px',
        display: 'flex',
        gap: '18px',
        alignItems: 'flex-start',
        backdropFilter: 'blur(10px)',
        transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--border-glow)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Icon */}
      <div style={{
        width: '48px', height: '48px',
        borderRadius: '12px',
        background: role.gradient,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '22px',
        flexShrink: 0,
      }}>
        {role.icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '6px' }}>
          <h3 style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            fontWeight: 700,
            fontSize: '16px',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}>{role.title}</h3>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
            flexShrink: 0,
            paddingTop: '2px',
          }}>{role.period}</span>
        </div>
        <div style={{
          fontSize: '13px',
          color: 'var(--accent)',
          marginBottom: '8px',
          fontWeight: 500,
        }}>{role.org}</div>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '13px',
          lineHeight: 1.65,
          fontWeight: 300,
        }}>{role.description}</p>
      </div>
    </motion.div>
  );
};

const LEADERSHIP = [
  {
    icon: '🎖️',
    title: 'General Secretary',
    org: 'AICP Riphah Chapter',
    period: '2026 – Present',
    gradient: 'linear-gradient(135deg,#63dcb9,#7b8cde)',
    description: 'Leading the chapter operations, coordinating events, and fostering a community of computing professionals and enthusiasts at Riphah International University.',
  },
  {
    icon: '⚙️',
    title: 'Operational Coordinator',
    org: 'Riphah Computing Society',
    period: '2025 – 2026',
    gradient: 'linear-gradient(135deg,#7b8cde,#f06292)',
    description: 'Managed end-to-end operations of society activities, overseeing logistics, team coordination, and ensuring seamless execution of technical workshops and events.',
  },
  {
    icon: '🌱',
    title: 'Assistant Director Campus',
    org: 'Strategic Youth Paradigm – Riphah Chapter',
    period: '2026 – Present',
    gradient: 'linear-gradient(135deg,#43e97b,#63dcb9)',
    description: 'Driving campus engagement initiatives, mentoring young leaders, and organizing programs focused on youth development and professional growth.',
  },
  {
    icon: '⚡',
    title: 'Event Organizer & Volunteer',
    org: 'IEEE Summer School & University Events',
    period: '2024 – Present',
    gradient: 'linear-gradient(135deg,#ffd740,#ff9800)',
    description: 'Actively organized and volunteered at the IEEE Summer School and multiple university events — contributing to technical education and community building.',
  },
];

const Leadership = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="leadership" style={{ padding: 'clamp(80px, 10vw, 120px) 0' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span className="section-tag">Leadership</span>
          <h2 style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 52px)',
            letterSpacing: '-0.03em',
            marginBottom: '16px',
          }}>
            Impact Beyond{' '}
            <span style={{
              background: 'var(--gradient-warm)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Code</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: '460px',
            margin: '0 auto',
            fontSize: '16px',
            lineHeight: 1.7,
            fontWeight: 300,
          }}>
            Leadership isn't just a title — it's the choice to show up, step forward, and bring others along.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '16px',
        }}>
          {LEADERSHIP.map((role, i) => (
            <LeadershipCard key={i} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
