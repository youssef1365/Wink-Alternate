import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Vision = ({ text, subtext, isActive }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const tokens = Array.isArray(text)
    ? text.map(t => typeof t === 'string' ? { word: t, accent: false, color: null } : t)
    : String(text).split(' ').map(w => ({ word: w }));

  const wordScrollStart = (i) => i / (tokens.length * 2.5);
  const wordScrollEnd   = (i) => wordScrollStart(i) + 0.28;

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.08, 0.88, 1], [0, 1, 1, 0]);
  const sectionY       = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [60, 0, 0, -40]);

  const smoothOpacity = useSpring(sectionOpacity, { stiffness: 60, damping: 20 });
  const smoothY       = useSpring(sectionY,       { stiffness: 60, damping: 20 });

  return (
    <section ref={containerRef} className="vision-section">
      <motion.div
        className="vision-wrapper"
        style={{ opacity: smoothOpacity, y: smoothY }}
      >
        <motion.div
          className="vision-rule"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />

        <h2 className="vision-headline" aria-label={tokens.map(t => t.word).join(' ')}>
          {tokens.map((token, i) => {
            const wordOpacity = useTransform(
              scrollYProgress,
              [wordScrollStart(i), wordScrollEnd(i), 0.85, 1],
              [0.08, 1, 1, 0.08]
            );
            const wordY = useTransform(
              scrollYProgress,
              [wordScrollStart(i), wordScrollEnd(i)],
              [24, 0]
            );
            const smoothWordOpacity = useSpring(wordOpacity, { stiffness: 80, damping: 22 });
            const smoothWordY       = useSpring(wordY,       { stiffness: 80, damping: 22 });

            return (
              <span key={i} className="word-outer" aria-hidden="true">
                <motion.span
                  className="word-inner"
                  style={{
                    opacity: smoothWordOpacity,
                    y: smoothWordY,
                    color: token.color
                      ? token.color
                      : token.accent
                      ? 'var(--color-one)'
                      : undefined,
                  }}
                >
                  {token.word}
                </motion.span>
              </span>
            );
          })}
        </h2>

        {subtext && (
          <motion.p
            className="vision-subtext"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            {subtext}
          </motion.p>
        )}

        <motion.div
          className="vision-rule"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      <style>{`
        .vision-section {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg);
          padding: 8vh 10vw;
          overflow: hidden;
          position: relative;
        }

        .vision-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 1000px;
          width: 100%;
        }

        .vision-rule {
          width: 48px;
          height: 1.5px;
          background: var(--color-third);
          opacity: 0.45;
          margin: 1.8rem 0;
          transform-origin: left center;
        }

        .vision-headline {
          font-size: clamp(1.9rem, 4.2vw, 3.8rem);
          font-weight: 800;
          line-height: 1.25;
          color: var(--color-third);
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.28em 0.3em;
        }

        .word-outer {
          display: inline-block;
          overflow: hidden;
          padding-bottom: 0.08em;
          line-height: inherit;
        }

        .word-inner {
          display: inline-block;
          color: inherit;
          line-height: inherit;
          will-change: transform, opacity;
        }

        .vision-subtext {
          margin-top: 0;
          margin-bottom: 0;
          font-size: clamp(0.78rem, 1.1vw, 0.95rem);
          color: var(--extra-color-third);
          max-width: 560px;
          line-height: 1.7;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.7;
        }
      `}</style>
    </section>
  );
};

export default Vision;