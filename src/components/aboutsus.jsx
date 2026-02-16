import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
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


  const values = [
    { icon: '◈', label: 'Quality over quantity', desc: 'Every detail is intentional — we never trade craft for volume.' },
    { icon: '◉', label: 'Business-driven', desc: 'Every event is designed to generate real, measurable outcomes.' },
    { icon: '◎', label: 'Global mindset', desc: 'Connecting decision-makers across borders and industries.' },
  ];

  const vmSlides = [
    { label: 'Mission', text: 'We design, organize, and deliver events that generate real business outcomes.' },
    { label: 'Vision', text: 'To become the leading platform for meaningful B2B connections worldwide.' },
  ];

  return (
    <>
      <style>{`
        .aus-wrapper {
          min-height: 450vh;
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
        .aus-left { display: flex; flex-direction: column; padding: clamp(2rem, 3.5vw, 4rem); border-right: 1px solid rgba(0,62,86,0.1); }
        .aus-eyebrow { font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(0,62,86,0.4); margin-bottom: 0.5rem; font-weight: 700; }
        .aus-heading { font-size: clamp(2.5rem, 4.5vw, 4.5rem); font-weight: 900; line-height: 1; color: #003f5c; margin-bottom: 2rem; }
        .aus-values-label { font-size: 1.4rem; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(0,62,86,0.3); margin-top: auto; margin-bottom: 0.5rem; }
        .aus-value-row { display: flex; gap: 1rem; padding: 1rem 0; border-top: 1px solid rgba(0,62,86,0.08); }
        .aus-right { background: linear-gradient(155deg, #0d4a62 0%, #071e2b 100%); position: relative; overflow: hidden; }
        .aus-vm-slide {
          position: absolute;
          inset: 0;
          padding: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1); /* Faster slide transition */
          opacity: 0;
          transform: scale(0.97) translateY(15px);
        }
        .aus-vm-slide.active { opacity: 1; transform: scale(1) translateY(0); }
        .aus-vm-slide.prev { opacity: 0; transform: scale(1.03) translateY(-15px); }
        .aus-vm-label { font-size: 6rem; text-transform: uppercase; letter-spacing: 0.1em; color: #17b8c8; margin-bottom: 1rem; font-weight: 800; }
        .aus-vm-text { font-size: clamp(1.1rem, 1.8vw, 1.6rem); line-height: 1.5; color: white; font-weight: 500; }
        .aus-vm-nav { position: absolute; bottom: 3rem; left: 4rem; display: flex; gap: 0.6rem; align-items: center; }
        .aus-vm-dot { height: 4px; background: rgba(255,255,255,0.2); transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1); border-radius: 2px; }
        .aus-vm-dot.active { background: #17b8c8; width: 50px !important; }
        @media (max-width: 1024px) { .aus-grid { grid-template-columns: 1fr; } .aus-right { display: none; } }
      `}</style>

      <div ref={containerRef} className="aus-wrapper">
        <div className="aus-sticky">
          <motion.div className="aus-card" style={{ y, opacity }}>
            <motion.div className="aus-grid" style={{ opacity: contentOp }}>
              <motion.div className="aus-left" style={{ y: col1Y }}>
                <div>
                  <div className="aus-eyebrow">Point Virgul Agency</div>
                  <h2 className="aus-heading">The Wink Way.</h2>
                </div>
                <div>
                  <div className="aus-values-label">Values</div>
                  {values.map((v, i) => (
                    <div key={i} className="aus-value-row">
                      <span style={{ color: '#17b8c8' }}>{v.icon}</span>
                      <div>
                        <div style={{ fontWeight: 700, color: '#003f5c', fontSize: '0.95rem' }}>{v.label}</div>
                        <div style={{ fontSize: '0.8rem', color: 'rgba(0,62,86,0.5)' }}>{v.desc}</div>
                      </div>
                    </div>
                  ))}
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
                    <div key={i} className={`aus-vm-dot ${i === slideIndex ? 'active' : ''}`} style={{ width: '25px' }} />
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