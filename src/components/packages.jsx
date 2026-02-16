import React from 'react';
import { motion } from 'framer-motion';

const Packages = () => {
  const packageData = [
    {
      id: "01",
      title: "Enterprises",
      tag: "Package",
      items: ["Market Entry Roadshows", "Virtual Market Access", "Trade Show Deal Accelerator"],
    },
    {
      id: "02",
      title: "Government & Associations",
      tag: "Package",
      items: ["Trade Missions", "Trade Shows", "Investment Tours"],
    },
    {
      id: "03",
      title: "Event Organizers",
      tag: "Package",
      items: ["Hosted Buyers Programs", "B2B Meetings Organization", "Meetings Management Tool"],
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const openContactModal = () => {
    window.dispatchEvent(new Event('openContactModal'));
  };

  return (
    <>
      <section className="packages-section">

        {/* Heading */}
        <motion.h2
          className="packages-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Our Packages
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="packages-subheading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          Tailored programs for every stakeholder
        </motion.p>

        {/* Grid */}
        <motion.div
          className="packages-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {packageData.map((pkg, index) => (
            <motion.div
              key={index}
              className="pkg-card"
              variants={cardVariants}
            >
              {/* Hover spotlight */}
              <div className="card-spotlight" />

              {/* Ghost watermark number */}
              <div className="pkg-number-bg">{pkg.id}</div>

              <div className="card-top">
                <span className="card-tag">{pkg.tag}</span>
              </div>

              <motion.div
                className="card-line"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: index * 0.15 + 0.2, ease: [0.22, 1, 0.36, 1] }}
              />

              <h3 className="pkg-title">{pkg.title}</h3>

              <ul className="pkg-list">
                {pkg.items.map((item, i) => (
                  <li key={i} className="pkg-item">
                    <span className="pkg-bullet" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="card-arrow">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="pkg-footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <p className="pkg-footer-text">Choose a package designed for your organization’s objectives.</p>
          <button className="pkg-contact-btn" onClick={openContactModal}>
            <span>Contact Wink</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>

      </section>

      <style>{`
        .packages-section {
          background-color: var(--color-bg);
          padding: var(--space-xl) var(--space-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .packages-heading {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: var(--color-bg-third);
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin: 0 0 0.6rem 0;
          text-align: center;
          max-width: var(--max-width);
          width: 100%;
        }

        .packages-subheading {
          font-size: 0.88rem;
          font-weight: 400;
          color: var(--color-text-secondary, rgba(255,255,255,0.5));
          letter-spacing: 0.06em;
          margin: 0 0 clamp(2rem, 4vw, 3rem) 0;
          text-align: center;
        }

        .packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.25rem;
          max-width: var(--max-width);
          width: 100%;
          margin-bottom: clamp(2rem, 4vw, 3rem);
        }

        .pkg-card {
          position: relative;
          background: var(--color-bg-third);
          border: 5px solid var(--color-primary);
          border-radius: 3px;
          padding: 2.4rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 0;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }

        .pkg-card:hover {
          border-color: rgba(255,255,255,0.13);
          box-shadow: 0 20px 55px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(255,255,255,0.05) inset;
          transform: translateY(-6px);
        }

        .card-spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 55% at 25% 15%, rgba(255,255,255,0.05) 0%, transparent 65%);
          opacity: 0;
          transition: opacity 0.45s ease;
          pointer-events: none;
        }
        .pkg-card:hover .card-spotlight { opacity: 1; }

        .pkg-number-bg {
          position: absolute;
          bottom: -0.5rem;
          right: 1rem;
          font-size: 7rem;
          font-weight: 800;
          color: var(--color-bg);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          transition: color 0.4s ease;
        }
        .pkg-card:hover .pkg-number-bg { color: rgba(255,255,255,0.055); }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
        }

        .pkg-number-label {
          font-size: 0.02rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          color: var(--color-bg);
          opacity: 0.22;
        }

        .card-tag {
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-bg);
          opacity: 0.18;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.2rem 0.55rem;
          border-radius: 100px;
        }

        .card-line {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.04) 100%);
          transform-origin: left;
          margin-bottom: 1.6rem;
        }

        .pkg-title {
          font-size: clamp(1.55rem, 2.2vw, 2.1rem);
          font-weight: 800;
          color: var(--color-bg);
          margin: 0 0 1.2rem 0;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .pkg-list {
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        .pkg-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.82rem;
          font-weight: 400;
          color: var(--color-bg);
          line-height: 1.6;
        }

        .pkg-bullet {
          flex-shrink: 0;
          margin-top: 0.45em;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
        }

        .card-arrow {
          margin-top: 2rem;
          color: var(--color-bg);
          opacity: 0.2;
          display: flex;
          align-items: center;
          transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .pkg-card:hover .card-arrow {
          opacity: 0.7;
          transform: translateX(5px);
        }

        .pkg-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          padding: 2.5rem 3rem;
          background: var(--color-bg-third);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 3px;
          max-width: var(--max-width);
          width: 100%;
        }

        .pkg-footer-text {
          font-size: 0.95rem;
          font-weight: 400;
          color: var(--color-bg);
          margin: 0;
          letter-spacing: 0.03em;
          text-align: center;
        }

        .pkg-contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: transparent;
          color: var(--color-bg);
          border: 2px var(--color-bg);
          padding: 0.75rem 1.8rem;
          font-size: 0.68rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          border-radius: 100px;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
          box-shadow: 0 2px 16px rgba(255,255,255,0.1);
          position: relative;
          overflow: hidden;
        }

        .pkg-contact-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%);
          transform: translateX(-120%);
          transition: transform 0.6s ease;
        }
        .pkg-contact-btn:hover::before { transform: translateX(120%); }
        .pkg-contact-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(255,255,255,0.2);
        }

        @media (max-width: 768px) {
          .packages-grid { grid-template-columns: 1fr; }
          .pkg-footer { padding: 2rem 1.5rem; }
        }
      `}</style>
    </>
  );
};

export default Packages;