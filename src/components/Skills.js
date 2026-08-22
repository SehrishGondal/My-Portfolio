import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* Animated skill bar */
const SkillBar = ({ skill, delay }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div ref={ref} style={{ marginBottom: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>{skill.icon}</span>
          <span style={{
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--text-primary)',
          }}>{skill.name}</span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.4 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: 'var(--accent)',
          }}
        >
          {skill.level}%
        </motion.span>
      </div>

      {/* Track */}
      <div style={{
        height: '6px',
        background: 'var(--bg-card)',
        borderRadius: '100px',
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}>
        {/* Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: delay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '100%',
            background: skill.gradient || 'var(--gradient)',
            borderRadius: '100px',
            position: 'relative',
          }}
        >
          {/* Shimmer */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0, right: 0,
            width: '30px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            borderRadius: '100px',
          }} />
        </motion.div>
      </div>
    </div>
  );
};

/* Skill category card */
const SkillCategory = ({ category, catIndex }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: catIndex * 0.1 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '28px',
        backdropFilter: 'blur(10px)',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-glow)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      {/* Category header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        marginBottom: '28px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          width: '40px', height: '40px',
          borderRadius: '10px',
          background: category.gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px',
        }}>
          {category.icon}
        </div>
        <div>
          <h3 style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            fontWeight: 700,
            fontSize: '16px',
            letterSpacing: '-0.01em',
          }}>{category.name}</h3>
          <span style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            fontFamily: "'JetBrains Mono', monospace",
          }}>{category.skills.length} skills</span>
        </div>
      </div>

      {/* Skills */}
      {category.skills.map((skill, i) => (
        <SkillBar key={skill.name} skill={skill} delay={catIndex * 0.1 + i * 0.08} />
      ))}
    </motion.div>
  );
};

/* Skills data */
const SKILL_CATEGORIES = [
  {
    icon: '🎨',
    name: 'Frontend',
    gradient: 'linear-gradient(135deg,#63dcb9,#7b8cde)',
    skills: [
      { name: 'React.js', icon: '⚛️', level: 80, gradient: 'linear-gradient(90deg,#63dcb9,#7b8cde)' },
      { name: 'JavaScript', icon: '🟨', level: 75, gradient: 'linear-gradient(90deg,#ffd740,#ff9800)' },
      { name: 'HTML / CSS', icon: '🌐', level: 85, gradient: 'linear-gradient(90deg,#63dcb9,#43e97b)' },
    ],
  },
  {
    icon: '⚙️',
    name: 'Backend & Database',
    gradient: 'linear-gradient(135deg,#7b8cde,#63dcb9)',
    skills: [
      { name: 'Firebase', icon: '🔥', level: 72, gradient: 'linear-gradient(90deg,#ff9800,#ffd740)' },
      { name: 'MySQL', icon: '🗄️', level: 65, gradient: 'linear-gradient(90deg,#7b8cde,#63dcb9)' },
    ],
  },
  {
    icon: '🤖',
    name: 'AI / Machine Learning',
    gradient: 'linear-gradient(135deg,#f06292,#ce93d8)',
    skills: [
      { name: 'Python', icon: '🐍', level: 75, gradient: 'linear-gradient(90deg,#63dcb9,#43e97b)' },
      { name: 'CNN / Deep Learning', icon: '🧠', level: 65, gradient: 'linear-gradient(90deg,#f06292,#ce93d8)' },
    ],
  },
  {
    icon: '💻',
    name: 'Programming',
    gradient: 'linear-gradient(135deg,#ffd740,#ff9800)',
    skills: [
      { name: 'Java', icon: '☕', level: 70, gradient: 'linear-gradient(90deg,#f06292,#ff9800)' },
      { name: 'C++', icon: '⚡', level: 68, gradient: 'linear-gradient(90deg,#ffd740,#ff9800)' },
    ],
  },
  {
    icon: '🛠️',
    name: 'Design & Tools',
    gradient: 'linear-gradient(135deg,#63dcb9,#f06292)',
    skills: [
      { name: 'Figma', icon: '🎭', level: 78, gradient: 'linear-gradient(90deg,#f06292,#ce93d8)' },
      { name: 'Miro', icon: '📋', level: 72, gradient: 'linear-gradient(90deg,#7b8cde,#63dcb9)' },
      { name: 'MS Office', icon: '📊', level: 88, gradient: 'linear-gradient(90deg,#63dcb9,#7b8cde)' },
    ],
  },
];

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" style={{ padding: 'clamp(80px, 10vw, 120px) 0' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span className="section-tag">Expertise</span>
          <h2 style={{
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 52px)',
            letterSpacing: '-0.03em',
            marginBottom: '16px',
          }}>
            My{' '}
            <span style={{
              background: 'var(--gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Toolkit</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: '440px',
            margin: '0 auto',
            fontSize: '16px',
            lineHeight: 1.7,
            fontWeight: 300,
          }}>
            Technologies and tools I use to bring ideas to life — and the ones I'm actively expanding.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCategory key={cat.name} category={cat} catIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
