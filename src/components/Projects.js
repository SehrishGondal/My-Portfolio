import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* 3D Tilt card component */
const TiltCard = ({ children, style }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;

    card.style.transform =
      `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform =
      'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'transform 0.1s ease, box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* Tech badge */
const TechBadge = ({ tech }) => (
  <span
    style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '11px',
      padding: '4px 10px',
      borderRadius: '6px',
      background: 'rgba(99,220,185,0.08)',
      border: '1px solid rgba(99,220,185,0.15)',
      color: 'var(--accent)',
      letterSpacing: '0.03em',
    }}
  >
    {tech}
  </span>
);

/* Project Card */
const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <TiltCard style={{ height: '100%' }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            border: `1px solid ${
              hovered ? 'var(--border-glow)' : 'var(--border)'
            }`,
            borderRadius: '20px',
            padding: '32px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            cursor: 'default',
            backdropFilter: 'blur(12px)',
            transition:
              'border-color 0.3s, box-shadow 0.3s, background 0.3s',
            boxShadow: hovered
              ? `var(--shadow-card), 0 0 40px ${project.glow}`
              : 'var(--shadow-card)',
            background: hovered
              ? 'var(--bg-card-hover)'
              : 'var(--bg-card)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Gradient overlay on hover */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: project.gradient,
              opacity: hovered ? 0.04 : 0,
              transition: 'opacity 0.4s',
              borderRadius: '20px',
              pointerEvents: 'none',
            }}
          />

          {/* Icon */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: project.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              flexShrink: 0,
            }}
          >
            {project.icon}
          </div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {project.type}
              </span>

              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: project.statusColor,
                  background: project.statusBg,
                  padding: '3px 10px',
                  borderRadius: '20px',
                  letterSpacing: '0.05em',
                }}
              >
                {project.status}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                fontWeight: 700,
                fontSize: '22px',
                letterSpacing: '-0.02em',
                marginBottom: '12px',
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '14px',
                lineHeight: 1.7,
                fontWeight: 300,
                marginBottom: '20px',
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Tech stack */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            {project.tech.map((t) => (
              <TechBadge key={t} tech={t} />
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              style={{
                flex: 1,
                padding: '11px',
                borderRadius: '10px',
                background: project.gradient,
                border: 'none',
                color: '#060810',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                letterSpacing: '0.03em',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '0.85';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1';
              }}
            >
              View Project
            </button>

            <button
              style={{
                flex: 1,
                padding: '11px',
                borderRadius: '10px',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'var(--accent)';
                e.target.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.color = 'var(--text-secondary)';
              }}
            >
              GitHub →
            </button>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

/* Projects data */
const PROJECTS = [
  {
    icon: '🧠',
    type: 'Full-Stack App',
    status: 'Complete',
    statusColor: '#63dcb9',
    statusBg: 'rgba(99,220,185,0.1)',
    title: 'Stroke Mobility App',
    description:
      'A compassionate mobile application designed to assist stroke patients with guided mobility exercises, progress tracking, and real-time caregiver support. Bridges the gap between medical care and daily rehabilitation.',
    tech: ['React.js', 'JavaScript', 'Firebase', 'Realtime DB'],
    gradient: 'linear-gradient(135deg,#63dcb9,#7b8cde)',
    glow: 'rgba(99,220,185,0.15)',
  },
  {
    icon: '👁️',
    type: 'AI / ML Model',
    status: 'Complete',
    statusColor: '#f06292',
    statusBg: 'rgba(240,98,146,0.1)',
    title: 'Image Classification Model',
    description:
      'A deep learning model leveraging Convolutional Neural Networks to intelligently classify images across multiple categories. Trained with optimized architecture for high accuracy and efficient inference.',
    tech: ['Python', 'CNN', 'TensorFlow', 'NumPy', 'Matplotlib'],
    gradient: 'linear-gradient(135deg,#f06292,#ce93d8)',
    glow: 'rgba(240,98,146,0.15)',
  },
  {
    icon: '🛒',
    type: 'UI/UX Design',
    status: 'Complete',
    statusColor: '#ffd740',
    statusBg: 'rgba(255,215,64,0.1)',
    title: 'Shopping Management System',
    description:
      'A sleek, user-centric UI design for a complete shopping management platform. Features intuitive product browsing, cart management, and checkout flows — built with modern design principles for an exceptional user experience.',
    tech: ['Figma', 'Miro', 'UI Design', 'Prototyping'],
    gradient: 'linear-gradient(135deg,#ffd740,#ff9800)',
    glow: 'rgba(255,215,64,0.15)',
  },
];

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="projects"
      style={{
        padding: 'clamp(80px, 10vw, 120px) 0',
      }}
    >
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            marginBottom: '64px',
          }}
        >
          <span className="section-tag">Work</span>

          <h2
            style={{
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 52px)',
              letterSpacing: '-0.03em',
              marginBottom: '16px',
            }}
          >
            Things I've{' '}
            <span
              style={{
                background: 'var(--gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Built
            </span>
          </h2>

          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '460px',
              margin: '0 auto',
              fontSize: '16px',
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            From healthcare apps to AI models — projects that solve real
            problems and push my boundaries.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;