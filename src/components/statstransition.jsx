import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const Counter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const totalMs = duration * 1000;
      const incrementTime = totalMs / end;
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

const StatsTransition = () => {
  const stats = [
    { label: "Years Experience", value: "15", suffix: "+" },
    { label: "Events Managed",   value: "500", suffix: "+" },
    { label: "Countries Reached", value: "50", suffix: "+" }
  ];

  return (
    <>
      <section className="stats-section">

        {/* Eyebrow */}
        <motion.p
          className="stats-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="eyebrow-line" />
          Proven Track Record
          <span className="eyebrow-line" />
        </motion.p>

        {/* Title */}
        <motion.h2
          className="stats-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          By The Numbers
        </motion.h2>

        {/* Stats row */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="stat-value">
                <Counter value={stat.value} />
                <span className="stat-suffix">{stat.suffix}</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>

      </section>

      <style>{`
        .stats-section {
          background-color: var(--color-bg);
          padding: var(--space-xl) var(--space-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .stats-eyebrow {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--color-text-primary);
          opacity: 0.4;
          margin: 0 0 1.2rem 0;
        }

        .eyebrow-line {
          display: block;
          width: 32px;
          height: 1px;
          background: currentColor;
          opacity: 0.6;
        }

        .stats-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: var(--color-text-primary);
          margin: 0 0 clamp(3rem, 6vw, 5rem) 0;
          letter-spacing: -0.02em;
          text-align: center;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          width: 100%;
          max-width: var(--max-width);
        }

        /* ── STAT ITEM ── */
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 2rem;
          /* Vertical separator between items */
          border-right: 1px solid rgba(255,255,255,0.07);
        }

        .stat-item:last-child {
          border-right: none;
        }

        /* ── VALUE ── */
        .stat-value {
          font-size: clamp(3.5rem, 7vw, 6rem);
          font-weight: 800;
          color: var(--color-text-primary, #fff);
          line-height: 1;
          letter-spacing: -0.03em;
          display: flex;
          align-items: flex-start;
        }

        .stat-suffix {
          font-size: 0.45em;
          font-weight: 800;
          color: var(--color-1, currentColor);
          margin-top: 0.15em;
          letter-spacing: 0;
        }

        /* ── SHORT DIVIDER UNDER VALUE ── */
        .stat-divider {
          width: 24px;
          height: 1.5px;
          background: var(--color-1, rgba(255,255,255,0.3));
          margin: 1rem 0 0.9rem 0;
          opacity: 0.6;
        }

        /* ── LABEL ── */
        .stat-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text-secondary, rgba(255,255,255,0.45));
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .stat-item {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.07);
            padding: 0 0 3rem 0;
          }
          .stat-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
        }
      `}</style>
    </>
  );
};

export default StatsTransition;