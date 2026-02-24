import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

export default function AboutUs({ isMobile }) {
  const containerRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springConfig = { stiffness: 65, damping: 28, mass: 0.7 };

  // Entry and Exit animations
  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.1, 0.8, 1], ["10vh", "0vh", "0vh", "-10vh"]),
    springConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0]),
    springConfig
  );

  // Trigger the Mission/Vision slide swap
  const slideTrigger = useTransform(scrollYProgress, v => (v < 0.5 ? 0 : 1));

  useMotionValueEvent(slideTrigger, "change", (v) => {
    if (v !== slideIndex) setSlideIndex(v);
  });

  const vmSlides = [
    { label: 'Our Mission', text: 'We design, organize, and deliver events that generate real business outcomes.' },
    { label: 'Our Vision', text: 'To become the leading platform for meaningful B2B connections worldwide.' },
  ];

  return (
    <section ref={containerRef} className="aus-wrapper" id="about">
      <div className="aus-sticky">
        <motion.div
          className="aus-card"
          style={{ y: isMobile ? 0 : y, opacity }}
        >
          <div className="aus-grid">
            {/* LEFT COLUMN: Narrative */}
            <div className="aus-left">
              <div className="aus-header">
                <span className="aus-eyebrow">WINK Agency</span>
                <h2 className="aus-heading">The Wink Way.</h2>
              </div>

              <div className="aus-footer">
                <div className="aus-values-label">
                  <span>Powered by</span><br />
                  <span className="aus-tech-highlight">Smart Technology</span>
                </div>
                <p className="aus-narrative-text">
                  Wink integrates advanced matchmaking systems and structured meeting management tools
                  to ensure <span className="text-highlight">precision and efficiency</span>.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Now visible on mobile! */}
            <div className="aus-right">
              {vmSlides.map((slide, i) => (
                <div
                  key={i}
                  className={`aus-vm-slide ${i === slideIndex ? 'active' : i < slideIndex ? 'prev' : ''}`}
                >
                  <span className="aus-vm-label">{slide.label}</span>
                  <p className="aus-vm-text">{slide.text}</p>
                </div>
              ))}

              <div className="aus-vm-nav">
                {vmSlides.map((_, i) => (
                  <div key={i} className={`aus-vm-dot ${i === slideIndex ? 'active' : ''}`} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .aus-wrapper {
          min-height: 300vh;
          position: relative;
          background: var(--brand-charcoal); /* Your charcoal brand variable */
        }

        .aus-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .aus-card {
          width: 92vw;
          max-width: 1400px;
          height: 75vh;
          background: var(--bg-secondary);
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.4);
        }

        .aus-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 100%;
        }

        .aus-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(1.5rem, 5vw, 5rem);
        }

        .aus-eyebrow {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--brand-orange); /* Your orange brand variable */
          font-weight: 800;
        }

        .aus-heading {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 900;
          color: var(--text-main);
          margin-top: 0.5rem;
        }

        .text-highlight { color: var(--brand-orange); }

        .aus-right {
          background: #050505; /* Slightly darker contrast for the slides */
          position: relative;
          overflow: hidden;
        }

        .aus-vm-slide {
          position: absolute;
          inset: 0;
          padding: clamp(1.5rem, 5vw, 5rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.6s ease-in-out;
          opacity: 0;
          transform: translateY(20px);
        }

        .aus-vm-slide.active { opacity: 1; transform: translateY(0); }
        .aus-vm-slide.prev { opacity: 0; transform: translateY(-20px); }

        .aus-vm-label {
          font-size: clamp(2rem, 6vw, 4rem);
          color: var(--brand-orange);
          font-weight: 900;
          margin-bottom: 1rem;
        }

        .aus-vm-text {
          font-size: 1.1rem;
          color: #ccc;
          max-width: 400px;
        }

        .aus-vm-nav {
          position: absolute;
          bottom: 2rem;
          left: clamp(1.5rem, 5vw, 5rem);
          display: flex;
          gap: 0.5rem;
        }

        .aus-vm-dot {
          height: 4px;
          width: 20px;
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
          transition: 0.3s;
        }

        .aus-vm-dot.active {
          background: var(--brand-orange);
          width: 40px;
        }

        /* Responsive Fix: Stack instead of Hide */
        @media (max-width: 1024px) {
          .aus-card { height: 85vh; }
          .aus-grid { grid-template-columns: 1fr; grid-template-rows: 1fr 1fr; }
          .aus-right { border-top: 1px solid rgba(255,255,255,0.1); }
          .aus-vm-label { font-size: 2.5rem; }
        }
      `}</style>
    </section>
  );
}