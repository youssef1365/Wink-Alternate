import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

export default function AboutUs() {
  const containerRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = {
    stiffness: 65,
    damping: 28,
    mass: 0.7,
    restDelta: 0.001
  };

  const y = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.1, 0.8, 1],
      ["20vh", "0vh", "0vh", "-10vh"]
    ),
    springConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0]),
    springConfig
  );

  const col1Y = useTransform(scrollYProgress, [0.1, 0.3], ["40px", "0px"]);

  const slideTrigger = useTransform(scrollYProgress, v => {
    if (v < 0.5) return 0;
    return 1;
  });

  useMotionValueEvent(slideTrigger, "change", (v) => {
    setSlideIndex(v);
  });

  const vmSlides = [
    { label: 'Our Mission', text: 'We design, organize, and deliver events that generate real business outcomes.' },
    { label: 'Our Vision', text: 'To become the leading platform for meaningful B2B connections worldwide.' },
  ];

  return (
    <section ref={containerRef} className="aus-wrapper" id="about">
      <div className="aus-sticky">
        <motion.div className="aus-card" style={{ y, opacity }}>
          <div className="aus-grid">
            {/* LEFT COLUMN: The Narrative */}
            <motion.div className="aus-left" style={{ y: col1Y }}>
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
                  to ensure <span className="text-highlight">precision, scalability, and efficiency</span> —
                  enhancing human expertise with intelligent systems.
                </p>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Mission & Vision */}
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
                  <div
                    key={i}
                    className={`aus-vm-dot ${i === slideIndex ? 'active' : ''}`}
                  />
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
          background: var(--bg-primary);
        }

        .aus-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .aus-card {
          width: 92vw;
          max-width: 1400px;
          height: 75vh;
          background: var(--bg-secondary);
          border-radius: 32px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.2);
          overflow: hidden;
          border: 1px solid rgba(209, 219, 220, 0.1);
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
          padding: clamp(2rem, 5vw, 5rem);
        }

        .aus-eyebrow {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: var(--color-teal);
          font-weight: 800;
          display: block;
          margin-bottom: 1rem;
        }

        .aus-heading {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 900;
          line-height: 0.9;
          color: var(--text-main);
        }

        .aus-values-label {
          font-size: 1.2rem;
          text-transform: uppercase;
          color: var(--text-main);
          margin-bottom: 1rem;
          opacity: 0.6;
        }

        .aus-tech-highlight {
          font-weight: 900;
          color: var(--text-main);
          opacity: 1;
        }

        .aus-narrative-text {
          font-size: clamp(1rem, 1.2vw, 1.4rem);
          line-height: 1.6;
          color: var(--text-main);
          max-width: 500px;
        }

        .text-highlight { color: var(--color-teal); }

        .aus-right {
          background: linear-gradient(155deg, var(--color-navy) 0%, #001a26 100%);
          position: relative;
          overflow: hidden;
        }

        .aus-vm-slide {
          position: absolute;
          inset: 0;
          padding: clamp(2rem, 5vw, 5rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          opacity: 0;
          transform: translateY(30px);
        }

        .aus-vm-slide.active { opacity: 1; transform: translateY(0); }
        .aus-vm-slide.prev { opacity: 0; transform: translateY(-30px); }

        .aus-vm-label {
          font-size: clamp(3rem, 6vw, 5rem);
          text-transform: uppercase;
          color: var(--color-teal);
          font-weight: 900;
          line-height: 1;
          margin-bottom: 1.5rem;
        }

        .aus-vm-text {
          font-size: clamp(1.1rem, 1.5vw, 1.6rem);
          line-height: 1.5;
          color: var(--color-silver);
          max-width: 450px;
        }

        .aus-vm-nav {
          position: absolute;
          bottom: 3rem;
          left: clamp(2rem, 5vw, 5rem);
          display: flex;
          gap: 0.8rem;
        }

        .aus-vm-dot {
          height: 4px;
          width: 20px;
          background: rgba(209, 219, 220, 0.2);
          transition: 0.4s ease;
          border-radius: 2px;
        }

        .aus-vm-dot.active {
          background: var(--color-teal);
          width: 60px;
        }

        /* ── Mobile ─────────────────────────────────────────────────────────── */
        @media (max-width: 1024px) {
          /* Give the wrapper enough room for both panels stacked */
          .aus-wrapper {
            min-height: auto;
          }

          /* On mobile we don't want sticky scroll-jacking —
             just let the card sit naturally in the flow */
          .aus-sticky {
            position: relative;
            height: auto;
            padding: 6rem 0 4rem;
            overflow: visible;
          }

          /* Card grows to fit its content */
          .aus-card {
            height: auto;
            width: 92vw;
            border-radius: 24px;
            overflow: visible; /* let content breathe */
          }

          /* Stack left then right */
          .aus-grid {
            grid-template-columns: 1fr;
            height: auto;
          }

          .aus-left {
            padding: 2.5rem 2rem;
            gap: 2rem;
          }

          .aus-heading {
            font-size: clamp(2rem, 8vw, 3rem);
          }

          .aus-narrative-text {
            font-size: 1rem;
          }

          /* Show the right panel on mobile — just make it static, not absolute */
          .aus-right {
            display: block;
            border-radius: 0 0 24px 24px;
            min-height: 280px;
            position: relative; /* already set but ensure no absolute weirdness */
          }

          /* Slides: stack and show both, or keep the active-only logic */
          .aus-vm-slide {
            position: relative;
            inset: auto;
            padding: 2.5rem 2rem;
            opacity: 0;
            transform: translateY(30px);
            /* keep transition for the JS-driven active class */
          }

          .aus-vm-slide.active {
            opacity: 1;
            transform: translateY(0);
          }

          .aus-vm-label {
            font-size: clamp(2rem, 8vw, 3rem);
          }

          .aus-vm-text {
            font-size: 1rem;
          }

          .aus-vm-nav {
            position: relative;
            bottom: auto;
            left: auto;
            padding: 0 2rem 2rem;
          }
        }
      `}</style>
    </section>
  );
}