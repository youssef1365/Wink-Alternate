import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { useMotionValueEvent } from "framer-motion";

export default function AboutUs({ isActive, scrollVelocity }) {
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
      [0, 0.03, 0.8, 1],
      ["90vh", "0vh", "0vh", "-25vh"]
    ),
    springConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.04, 0.85, 1], [0, 1, 1, 0]),
    springConfig
  );

  const contentOp = opacity;
  const col1Y = useTransform(scrollYProgress, [0.12, 0.28], ["40px", "0px"]);
  const col2Y = useTransform(scrollYProgress, [0, 0.32], ["0px", "0px"]);

  const slideTrigger = useTransform(scrollYProgress, v => {
    if (v < 0.55) return 0;
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
    <>
      <style>{`
        .aus-wrapper {
          min-height: 350vh;
          position: relative;
        }
        .aus-sticky {
          position: sticky;
          top: 110px;
          height: calc(100vh - 110px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .aus-card {
          width: 90vw;
          max-width: 1400px;
          height: 80vh;
          max-height: 700px;
          border-radius: 16px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.55);
          overflow: hidden;
          position: relative;
          will-change: transform, opacity;
          background: #F5F5F5;
        }
        .aus-grid { display: grid; grid-template-columns: 1fr 1fr; height: 100%; }
        .aus-left { display: flex; flex-direction: column; padding: clamp(1.5rem, 3.5vw, 4rem); border-right: 1px solid rgba(0,62,86,0.1); overflow-y: auto; }
        .aus-eyebrow { font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(0,62,86,0.4); margin-bottom: 0.5rem; font-weight: 700; }
        .aus-heading { font-size: clamp(2.2rem, 4.5vw, 4.5rem); font-weight: 900; line-height: 1; color: #003f5c; margin-bottom: 1.5rem; }
        .aus-values-label { font-size: 1.7rem; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(0,62,86,0.3); margin-top: auto; margin-bottom: 0.5rem; }

        .aus-narrative-text {
          font-size: clamp(1rem, 1.4vw, 1.6rem);
          line-height: 1.5;
          color: rgba(0,62,86,0.7);
          font-weight: 500;
        }
        .text-highlight {
          color: #17b8c8;
          font-weight: 700;
        }

        .aus-right { background: linear-gradient(155deg, #0d4a62 0%, #071e2b 100%); position: relative; overflow: hidden; }
        .aus-vm-slide {
          position: absolute;
          inset: 0;
          padding: clamp(1.5rem, 5vw, 4rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0;
          transform: scale(0.97) translateY(15px);
        }
        .aus-vm-slide.active { opacity: 1; transform: scale(1) translateY(0); }
        .aus-vm-slide.prev { opacity: 0; transform: scale(1.03) translateY(-15px); }
        .aus-vm-label { font-size: clamp(3rem, 8vw, 6rem); text-transform: uppercase; letter-spacing: 0.1rem; color: #17b8c8; margin-bottom: 1rem; font-weight: 800; line-height: 1.0; }
        .aus-vm-text { font-size: clamp(1rem, 1.8vw, 1.6rem); line-height: 1.5; color: white; font-weight: 500; }
        .aus-vm-nav { position: absolute; bottom: 2rem; left: clamp(1.5rem, 5vw, 4rem); display: flex; gap: 0.6rem; align-items: center; }
        .aus-vm-dot { height: 4px; background: rgba(255,255,255,0.2); transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1); border-radius: 2px; }
        .aus-vm-dot.active { background: #17b8c8; width: 50px !important; }
        .aus-tech-highlight{font-weight: bold;}

        @media (max-width: 1024px) {
          .aus-grid { grid-template-columns: 1fr; grid-template-rows: 1.2fr 1fr; }
          .aus-left { border-right: none; border-bottom: 1px solid rgba(0,62,86,0.1); padding: 1.5rem; }
          .aus-card { height: 85vh; max-height: none; }
          .aus-heading { font-size: 2.5rem; }
          .aus-values-label { margin-top: 1rem; font-size: 1.1rem; }
          .aus-vm-label { font-size: 2.8rem; }
          .aus-sticky { top: 80px; height: calc(100vh - 80px); }
          .aus-wrapper {
              min-height: 320vh;
          }
        }
      `}</style>

      <div ref={containerRef} className="aus-wrapper">
        <div className="aus-sticky">
          <motion.div className="aus-card" style={{ y, opacity }}>
            <motion.div className="aus-grid" style={{ opacity: contentOp }}>
              <motion.div className="aus-left" style={{ y: col1Y }}>
                <div>
                  <div className="aus-eyebrow">WINK Agency</div>
                  <h2 className="aus-heading">The Wink Way.</h2>
                </div>
                <div>
                  <div className="aus-values-label">
                    <span>Powered by,</span><br />
                    <span className="aus-tech-highlight">Smart Technology</span>
                  </div>
                  <div className="aus-narrative-text">
                    Wink integrates advanced matchmaking systems and structured meeting management tools to ensure precision, scalability, and efficiency — enhancing human expertise with intelligent systems.
                  </div>
                </div>
              </motion.div>
              <motion.div className="aus-right" style={{ y: col2Y }}>
                {vmSlides.map((slide, i) => (
                  <div key={i} className={`aus-vm-slide ${i === slideIndex ? 'active' : i < slideIndex ? 'prev' : ''}`}>
                    <div className="aus-vm-label">{slide.label}</div>
                    <div className="aus-vm-text">{slide.text}</div>
                  </div>
                ))}
                <div className="aus-vm-nav">
                  {vmSlides.map((_, i) => (
                    <div key={i} className={`aus-vm-dot ${i === slideIndex ? 'active' : ''}`} style={{ width: '20px' }} />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}