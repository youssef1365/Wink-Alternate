import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

export default function AboutUs({ isMobile }) {
  const containerRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);

  // We keep the target specific to this container so the 300vh height
  // correctly triggers the Mission/Vision swap as you scroll past.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] // Changed to start-start for stickier sync
  });

  const springConfig = {
    stiffness: 65,
    damping: 28,
    mass: 0.7,
    restDelta: 0.001
  };

  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.1, 0.8, 1], ["10vh", "0vh", "0vh", "-10vh"]),
    springConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0]),
    springConfig
  );

  const col1Y = useTransform(scrollYProgress, [0.1, 0.3], ["40px", "0px"]);

  // Slide trigger logic
  const slideTrigger = useTransform(scrollYProgress, v => (v < 0.5 ? 0 : 1));

  useMotionValueEvent(slideTrigger, "change", (v) => {
    if (v !== slideIndex) setSlideIndex(v);
  });

  const vmSlides = [
    { label: 'Our Mission', text: 'We design, organize, and deliver events that generate real business outcomes.' },
    { label: 'Our Vision', text: 'To become the leading platform for meaningful B2B connections worldwide.' },
  ];

  return (
    <section ref={containerRef} className="aus-wrapper">
      <div className="aus-sticky">
        <motion.div
          className="aus-card"
          style={{ y: isMobile ? 0 : y, opacity }}
          layout // Helps maintain smoothness during parent re-renders
        >
          <div className="aus-grid">
            <motion.div className="aus-left" style={{ y: isMobile ? 0 : col1Y }}>
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
            </motion.div>

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
          background: var(--bg-primary); /* Uses your charcoal global var */
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
          box-shadow: 0 40px 100px rgba(0,0,0,0.3);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .aus-grid { display: grid; grid-template-columns: 1fr 1fr; height: 100%; }

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
          color: var(--brand-orange); /* Updated to your brand color */
          font-weight: 800;
          margin-bottom: 1rem;
          display: block;
        }

        .aus-heading {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 900;
          line-height: 0.9;
          color: var(--text-main);
        }

        .aus-tech-highlight { font-weight: 900; color: var(--text-main); }
        .text-highlight { color: var(--brand-orange); }

        .aus-right {
          background: var(--brand-charcoal); /* Updated to your brand color */
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
          color: var(--brand-orange);
          font-weight: 900;
          line-height: 1;
          margin-bottom: 1.5rem;
        }

        .aus-vm-text {
          font-size: clamp(1.1rem, 1.5vw, 1.6rem);
          line-height: 1.5;
          color: #eee;
          max-width: 450px;
        }

        .aus-vm-dot {
          height: 4px;
          width: 20px;
          background: rgba(255, 255, 255, 0.2);
          transition: 0.4s ease;
          border-radius: 2px;
        }

        .aus-vm-dot.active {
          background: var(--brand-orange);
          width: 60px;
        }

        @media (max-width: 1024px) {
          .aus-grid { grid-template-columns: 1fr; }
          .aus-right { display: none; }
          .aus-card { height: auto; padding-bottom: 3rem; margin-top: 10vh; }
          .aus-wrapper { min-height: 120vh; }
        }
      `}</style>
    </section>
  );
}