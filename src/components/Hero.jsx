import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
export const heroSEO = {
  title: "WINK | Business Matchmaking Done Right",
  description: "WINK is a global B2B matchmaking and business development firm that helps organizations turn meetings into measurable business outcomes."
};
const Hero = ({ scrollVelocity = 0 }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const springConfig = {
    stiffness: Math.max(40, 120 - scrollVelocity * 18),
    damping: Math.min(30, 18 + scrollVelocity * 3),
  };

  const y        = useSpring(useTransform(scrollYProgress, [0, 1], ["0vh", "35vh"]), springConfig);
  const opacity  = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]), springConfig);
  const scale    = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.92]), springConfig);
  const titleY   = useSpring(useTransform(scrollYProgress, [0, 1], ["0vh", "20vh"]), springConfig);
  const descY    = useSpring(useTransform(scrollYProgress, [0, 1], ["0vh", "12vh"]), springConfig);
  const buttonsY = useSpring(useTransform(scrollYProgress, [0, 1], ["0vh", "8vh"]), springConfig);

  return (
    <section ref={containerRef} className="hero">
      <motion.div className="hero-container" style={{ y, opacity, scale }}>
        <div className="hero-content">
          <motion.h1
            className="hero-title"
            style={{ y: titleY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-line-1">WINK</span> <br />
            <span className="hero-line-2">BUSINESS MATCHMAKING,</span> <br />
            <span className="hero-line-3">DONE RIGHT</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            style={{ y: descY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Wink is a global B2B matchmaking and business development firm that helps
            organizations turn meetings into measurable business outcomes.
          </motion.p>

          <motion.div
            className="hero-buttons"
            style={{ y: buttonsY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              className="cta-button"
              onClick={() => window.dispatchEvent(new Event('openContactModal'))}
            >
              Get Started
            </button>

            <a
              href="#events"
              className="secondary-link"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('events')?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Upcoming Events
            </a>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        .hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 7rem 1rem 3rem;
          overflow: hidden;
        }

        .hero-container {
          max-width: 1440px;
          width: 100%;
          will-change: transform;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-title {
          text-align: left;
          line-height: 1;
          font-weight: 800;
          margin-bottom: 2rem;
          width: fit-content;
          align-self: flex-start;
          margin-left: 10vw;
          display: flex;
          flex-direction: column;
        }

        .hero-line-1 { font-size : 5rem; }
        .hero-line-2 { font-size : 5rem; white-space: nowrap; color : var(--color-one); }
        .hero-line-3 { font-size : 5rem; }

        .hero-description {
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          line-height: 1.7;
          color: var(--color-third);
          max-width: 800px;
          margin: 0 auto 3rem;
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          justify-content: center;
        }

        .cta-button {
          background-color: var(--extra-color-third);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: var(--border-radius);
          font-weight: 900;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .secondary-link {
          color: var(--color-third);
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
          transition: opacity 0.3s ease;
        }

        .secondary-link:hover {
          opacity: 0.7;
        }

        @media (max-width: 1024px) {
          .hero-title {
            margin-left: 0;
            align-self: center;
            text-align: center;
          }
          .hero-line-1, .hero-line-2, .hero-line-3 { font-size: clamp(2rem, 8vw, 3.5rem); white-space: normal; }
          .hero-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;