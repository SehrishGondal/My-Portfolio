import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* Individual timeline chapter */
const Chapter = ({ chapter, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 60px 1fr',
        alignItems: 'start',
        gap: '0',
        marginBottom: '48px',
        position: 'relative',
      }}
    >
      {/* Left content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          padding: '0 32px 0 0',
          textAlign: 'justify',
          visibility: isLeft ? 'visible' : 'hidden',
        }}
      >
        {isLeft && <ChapterContent chapter={chapter} />}
      </motion.div>

      {/* Center dot */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '8px',
      }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            width: '36px', height: '36px',
            borderRadius: '50%',
            background: chapter.color || 'var(--gradient)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px',
            flexShrink: 0,
            boxShadow: `0 0 20px ${chapter.glow || 'rgba(99,220,185,0.4)'}`,
            zIndex: 1,
            position: 'relative',
          }}
        >
          {chapter.icon}
        </motion.div>
      </div>

      {/* Right content */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          padding: '0 0 0 32px',
          textAlign: 'justify',
          visibility: isLeft ? 'hidden' : 'visible',
        }}
      >
        {!isLeft && <ChapterContent chapter={chapter} />}
      </motion.div>
    </div>
  );
};

const ChapterContent = ({ chapter }) => (
  <div style={{
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    padding: '24px',
    backdropFilter: 'blur(10px)',
    transition: 'border-color 0.3s',
  }}
  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-glow)'}
  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
  >
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '11px',
      color: 'var(--accent)',
      letterSpacing: '0.1em',
      marginBottom: '8px',
      textTransform: 'uppercase',
    }}>{chapter.year}</div>
    <h3 style={{
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      fontWeight: 700,
      fontSize: '18px',
      marginBottom: '10px',
      lineHeight: 1.3,
    }}>{chapter.title}</h3>
    <p style={{
      color: 'var(--text-secondary)',
      fontSize: '14px',
      lineHeight: 1.7,
      fontWeight: 300,
    }}>{chapter.text}</p>
  </div>
);

/* Mobile-only single column chapter */
const ChapterMobile = ({ chapter, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex', gap: '20px', marginBottom: '32px',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '36px', height: '36px',
          borderRadius: '50%',
          background: chapter.color || 'var(--gradient)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px',
          boxShadow: `0 0 16px ${chapter.glow || 'rgba(99,220,185,0.3)'}`,
        }}>{chapter.icon}</div>
        {index < 5 && <div style={{ width: '1.5px', flex: 1, background: 'var(--border)', marginTop: '8px' }} />}
      </div>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '20px',
        flex: 1,
        marginBottom: '16px',
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          color: 'var(--accent)',
          letterSpacing: '0.1em',
          marginBottom: '6px',
          textTransform: 'uppercase',
        }}>{chapter.year}</div>
        <h3 style={{
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          fontWeight: 700,
          fontSize: '16px',
          marginBottom: '8px',
        }}>{chapter.title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.7, fontWeight: 300 }}>
          {chapter.text}
        </p>
      </div>
    </motion.div>
  );
};

/* Story data */
const CHAPTERS = [
  {
    year: 'The Beginning',
    icon: '🌿',
    color: 'linear-gradient(135deg,#43e97b,#38f9d7)',
    glow: 'rgba(67,233,123,0.4)',
    title: 'Roots in a Small Village',
    text: 'I grew up in a small village where technology was a distant concept and computers were a luxury few could imagine. While AI and software engineering were unknown worlds to those around me, a quiet curiosity burned inside me — a feeling that I was meant for something bigger.',
  },
  {
    year: 'First Dream',
    icon: '🩺',
    color: 'linear-gradient(135deg,#f06292,#ce93d8)',
    glow: 'rgba(240,98,146,0.4)',
    title: 'The Doctor\'s Dream',
    text: 'Like many girls from my background, I completed FSc in Pre-Medical with the dream of becoming a doctor. I studied hard, held that vision close, and believed medicine was my path. But life, as it often does, had a different blueprint waiting for me.',
  },
  {
    year: 'The Turning Point',
    icon: '💻',
    color: 'linear-gradient(135deg,#63dcb9,#7b8cde)',
    glow: 'rgba(99,220,185,0.4)',
    title: 'A New Direction',
    text: 'Against all expectations — including my own — I enrolled in Software Engineering. It felt unfamiliar, even intimidating. The first code I wrote confused me. The logic felt like a foreign language. But with every challenge came a lesson, and every lesson became a stepping stone.',
  },
  {
    year: 'The Struggle',
    icon: '⚡',
    color: 'linear-gradient(135deg,#ffd740,#ff9800)',
    glow: 'rgba(255,152,0,0.4)',
    title: 'Doubts & Determination',
    text: 'My first two semesters were brutal. I questioned whether I belonged here. Imposter syndrome was a daily visitor. But I refused to quit. I studied late nights, sought help without shame, and poured myself into every assignment. Slowly, the confusion began to clear.',
  },
  {
    year: 'The Breakthrough',
    icon: '🚀',
    color: 'linear-gradient(135deg,#7b8cde,#63dcb9)',
    glow: 'rgba(123,140,222,0.4)',
    title: 'Skills Forged in Fire',
    text: 'Persistence paid off. React.js clicked. Firebase made sense. I built my first full-stack app and felt the rush of creation. I discovered AI and machine learning — and realized this was not just a career path, but my calling. Each project became proof of how far I\'d come.',
  },
  {
    year: 'Today',
    icon: '🌟',
    color: 'linear-gradient(135deg,#63dcb9,#f06292)',
    glow: 'rgba(99,220,185,0.5)',
    title: 'Confident & Unstoppable',
    text: 'Today I lead, I build, I inspire. I hold leadership roles in national student organizations, mentor peers, and create technology that matters. The village girl who once thought tech was beyond her reach is now shaping it. And this is just the beginning.',
  },
];

const Story = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="story" style={{ padding: 'clamp(80px, 10vw, 120px) 0' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <span className="section-tag">My Journey</span>
          <h2 style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 52px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}>
            A Story of{' '}
            <span style={{
              background: 'var(--gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Transformation
            </span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            margin: '0 auto',
            fontSize: '16px',
            lineHeight: 1.7,
            fontWeight: 300,
          }}>
            Every great developer has a story. Mine begins far from Silicon Valley — in a small village with big dreams.
          </p>
        </motion.div>

        {/* Desktop timeline (2-column) */}
        <div className="timeline-desktop" style={{ position: 'relative' }}>
          {/* Center line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1.5px',
            background: 'linear-gradient(to bottom, transparent, var(--accent), var(--accent-2), transparent)',
            transform: 'translateX(-50%)',
            opacity: 0.3,
          }} />
          {CHAPTERS.map((chapter, i) => (
            <Chapter key={i} chapter={chapter} index={i} />
          ))}
        </div>

        {/* Mobile timeline (single column) */}
        <div className="timeline-mobile">
          {CHAPTERS.map((chapter, i) => (
            <ChapterMobile key={i} chapter={chapter} index={i} />
          ))}
        </div>

        <style>{`
          @media (min-width: 768px) {
            .timeline-desktop { display: block; }
            .timeline-mobile { display: none; }
          }
          @media (max-width: 767px) {
            .timeline-desktop { display: none; }
            .timeline-mobile { display: block; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Story;
