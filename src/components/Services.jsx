import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

const Services = ({ isActive, scrollVelocity }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = {
    stiffness: 70,
    damping: 30,
    mass: 1,
    restDelta: 0.001
  };

  const y = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["20vh", "0vh", "0vh", "-10vh"]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]), springConfig);
  const contentOp = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);

  const servicesData = [
    { id: "01", title: "B2B Matchmaking & Meetings", description: "Curated one-to-one meetings between qualified buyers, sellers, and partners — designed around clear objectives." },
    { id: "02", title: "Trade Missions & Hosted Buyer Programs", description: "End-to-end design and execution of international business missions, from buyer sourcing to meetings and follow-up." },
    { id: "03", title: "Business Development & Market Entry", description: "Support for organizations and companies looking to access new markets through targeted introductions and structured engagement." }
  ];

  return (
    <>
      <style>{`
        .services-wrapper { min-height: 200vh; position: relative; background: var(--color-bg); }
        .services-sticky { position: sticky; top: 90px; height: calc(100vh - 90px); display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 0 1.5rem; }
        .services-card { width: 100%; max-width: 1400px; height: 85vh; max-height: 700px; border-radius: 16px; box-shadow: 0 32px 80px rgba(0, 77, 77, 0.4); overflow: hidden; position: relative; background: linear-gradient(to bottom right, rgba(44, 62, 80, 0.95), rgba(0, 77, 77, 0.95)); backdrop-filter: blur(24px); border: 1px solid rgba(127, 205, 205, 0.15); will-change: transform; }
        .services-content { position: relative; z-index: 1; height: 100%; padding: clamp(2rem, 4vw, 4rem); display: flex; flex-direction: column; }
        .services-eyebrow { font-size: 2rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--extra-color-fifth); margin-bottom: 0; }
        .services-title-main { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; line-height: 1.2; letter-spacing: -0.04em; margin: 0; color: white; font-style: italic;}
        .services-subtitle { font-size: 1.2rem; line-height: 1.5; color: var(--extra-color-fifth); max-width: 500px; }
        .services-grid { flex: 1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 2rem; }
        .service-item { position: relative; padding: 2rem; border-radius: 12px; background: rgba(0, 77, 77, 0.2); border: 1px solid rgba(127, 205, 205, 0.15); }
        .service-ghost-number { position: absolute; top: -1rem; right: -0.5rem; font-size: 120px; font-weight: 900; color: rgba(127, 205, 205, 0.05); pointer-events: none; }
        .service-number { display: inline-block; font-size: 0.75rem; color: var(--color-third); padding: 0.25rem 0.75rem; background: rgba(64, 201, 201, 0.15); border-radius: 0.5rem; margin-bottom: 1.25rem; }
        .service-title { font-size: 1.5rem; font-weight: 700; color: white; margin-bottom: 0.75rem; font-style: italic; }
        .service-description { font-size: 0.9rem; color: var(--extra-color-fifth); line-height: 1.7; }

        @media (max-width: 1024px) {
          .services-wrapper { min-height: 260vh;; padding: 4rem 1rem; }
          .services-sticky { position: relative; top: 0; height: auto; overflow: visible; padding: 0; }
          .services-card { height: auto; max-height: none; transform: none !important; opacity: 1 !important; box-shadow: none; border: none; background: none; backdrop-filter: none; }
          .services-content { padding: 0; opacity: 1 !important; }
          .services-grid { grid-template-columns: 1fr; gap: 1.5rem; margin-top: 3rem; }
          .service-item { background: linear-gradient(to bottom right, rgba(44, 62, 80, 0.95), rgba(0, 77, 77, 0.95)); border: 1px solid rgba(127, 205, 205, 0.15); }
          .services-title-main { font-size: 2.5rem; color: var(--color-third);}
          .services-eyebrow { font-size: 1.2rem; color: var(--color-third) }
          .service-ghost-number { display: none; color: var(--color-third)}
          .services-subtitle {color: var(--color-third);}
        }
      `}</style>

      <div ref={containerRef} className="services-wrapper">
        <div className="services-sticky">
          <motion.div
            className="services-card"
            style={typeof window !== 'undefined' && window.innerWidth > 1024 ? { y, opacity } : {}}
          >
            <motion.div
              className="services-content"
              style={typeof window !== 'undefined' && window.innerWidth > 1024 ? { opacity: contentOp } : { opacity: 1 }}
            >
              <div className="services-header">
                <div className="services-eyebrow">What We Deliver</div>
                <h2 className="services-title-main">Our Services</h2>
                <p className="services-subtitle">Powered by human expertise and smart meeting-management technology.</p>
              </div>
              <div className="services-grid">
                {servicesData.map((service, index) => {
                  return (
                    <motion.div key={service.id} className="service-item">
                      <div className="service-ghost-number">{service.id}</div>
                      <span className="service-number">{service.id}</span>
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-description">{service.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Services;