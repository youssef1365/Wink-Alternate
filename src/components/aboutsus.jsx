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

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const scrollDistanceStart = isMobile ? 0 : 80;
  const scrollDistanceEnd   = isMobile ? 0 : -25;

  const y = isMobile ? 0 : useTransform(
    scrollYProgress,
    [0, 0.12, 0.92, 1],
    [`${scrollDistanceStart}vh`, "0vh", "0vh", `${scrollDistanceEnd}vh`]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.93, 1],
    [0, 1, 1, 0]
  );

  const contentOp = opacity;
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
          min-height: 400vh;
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
        .aus-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(1.5rem, 3.5vw, 4rem);
          border-right: 1px solid rgba(0,62,86,0.1);
          gap: 2.5rem;
          position: relative;
        }
        .aus-eyebrow {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.35em;
          color: rgba(0,62,86,0.35);
          font-weight: 700;
          text-align: center;
        }
        .aus-logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
        }
        .aus-logo {
          width: clamp(140px, 18vw, 260px);
          height: auto;
          object-fit: contain;
          opacity: 0.92;
        }
        .aus-divider {
          width: 40px;
          height: 1.5px;
          background: rgba(0,62,86,0.15);
          border-radius: 2px;
        }
        .aus-tagline {
          font-size: clamp(0.7rem, 0.9vw, 0.85rem);
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: rgba(0,62,86,0.3);
          font-weight: 600;
          text-align: center;
          max-width: 220px;
          line-height: 1.6;
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
        .aus-vm-label { font-size: clamp(3rem, 8vw, 6rem); text-transform: uppercase; letter-spacing: 0.1rem; color: var(--extra-color-fourth); margin-bottom: 1rem; font-weight: 800; line-height: 1.0; }
        .aus-vm-text { font-size: clamp(1rem, 1.8vw, 1.6rem); line-height: 1.5; color: white; font-weight: 500; }
        .aus-vm-nav { position: absolute; bottom: 2rem; left: clamp(1.5rem, 5vw, 4rem); display: flex; gap: 0.6rem; align-items: center; }
        .aus-vm-dot { height: 4px; background: rgba(255,255,255,0.2); transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1); border-radius: 2px; }
        .aus-vm-dot.active { background: #17b8c8; width: 50px !important; }

        @media (max-width: 1024px) {
          .aus-grid { grid-template-columns: 1fr; grid-template-rows: 1.2fr 1fr; }
          .aus-left { border-right: none; border-bottom: 1px solid rgba(0,62,86,0.1); padding: 1.5rem; gap: 1.2rem; }
          .aus-card { height: 85vh; max-height: none; }
          .aus-vm-label { font-size: 2.8rem; }
          .aus-wrapper { min-height: 250vh; }
          .aus-sticky { position: sticky; top: 0; height: 100vh; }
          .aus-logo { width: clamp(100px, 30vw, 160px); }
        }
      `}</style>

      <div ref={containerRef} className="aus-wrapper">
        <div className="aus-sticky">
          <motion.div className="aus-card" style={{ y, opacity }}>
            <motion.div className="aus-grid" style={{ opacity: contentOp }}>

              <div className="aus-left">
                <div className="aus-eyebrow">About Us</div>
                <div className="aus-logo-wrap">
                  <img src="/WinkBlue.png" alt="Wink" className="aus-logo" />
                </div>
                <div className="aus-divider" />
                <div className="aus-tagline">Smart B2B Matchmaking & Event Management</div>
              </div>

              <div className="aus-right">
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
              </div>

            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}