import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ activeSection, scrollVelocity, scrollDirection, theme, setTheme, scrollProgress }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWinkOpen, setIsWinkOpen] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [hidden, setHidden] = useState(false);
  const lastY = React.useRef(0);

  useEffect(() => {
    const savedTheme = theme || localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);
      setHidden(currentY > lastY.current && currentY > 300 && scrollVelocity > 1.5);
      lastY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollVelocity]);

  useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (v) => {
      setProgressWidth(v * 100);
    });
    return unsubscribe;
  }, [scrollProgress]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    setIsWinkOpen(false);
  };

  const navItems = ['home', 'services', 'packages', 'events'];

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          style={{ width: `${progressWidth}%` }}
        />
      </div>

      <div className="nav-container">
        <nav className="nav">
          <div className="nav-logo">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="logo-wrapper">
              <div className="dynamic-logo" />
            </a>
          </div>

          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`nav-link ${activeSection === item ? 'active' : ''}`}
                >
                  <span className="nav-link-text">{item}</span>
                  <span className="nav-link-dot" />
                </a>
              </li>
            ))}

            <li
              className="dropdown-wrapper"
              onMouseEnter={() => setIsWinkOpen(true)}
              onMouseLeave={() => setIsWinkOpen(false)}
            >
              <button
                className={`wink-trigger-btn nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, 'about')}
              >
                <span className="nav-link-text">WINK</span>
                <span className="dropdown-arrow">
                  <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                    <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="nav-link-dot" />
              </button>
              <AnimatePresence>
                {isWinkOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="dropdown-list"
                  >
                    <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>Engage</a></li>
                    <li><a href="#insights" onClick={(e) => handleNavClick(e, 'insights')}>Insights</a></li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          </ul>

          <div className="nav-cta">
            <button className="theme-toggle-minimal" onClick={toggleTheme} aria-label="Toggle theme">
              <span className="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
            </button>
            <button
              className="cta-button-high-end"
              onClick={() => window.dispatchEvent(new Event('openContactModal'))}
            >
              <span className="cta-text">Start a Project</span>
              <span className="cta-arrow">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </nav>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@400;600;700;800&display=swap');

        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          width: 100%;
          padding: 1.1rem 0;
          transition: padding 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      background 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      backdrop-filter 0.5s ease,
                      border-color 0.5s ease;
          background: transparent;
        }
        .theme-toggle-minimal {
            border: transparent;
            background-color: transparent;
        }

        .header.scrolled {
          padding: 0.35rem 0;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-primary, #17b8c8), var(--extra-color-third, #00cec1));
          transition: width 0.1s linear;
          box-shadow: 0 0 8px rgba(23, 184, 200, 0.6);
        }

        .theme-icon { font-size: 1.4rem; }

        .nav-container {
          width: 100%;
          padding: 0 4vw;
          box-sizing: border-box;
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          position: relative;
        }

        .nav-logo { flex-shrink: 0; min-width: 220px; }

        .logo-wrapper { display: block; text-decoration: none; }

        .dynamic-logo {
          height: 64px;
          width: 220px;
          min-width: 220px;
          background-image: var(--logo-url, url('/WinkWhite.png'));
          background-size: contain;
          background-repeat: no-repeat;
          background-position: left center;
          transition: opacity 0.3s ease;
        }

        .nav-links {
          display: flex;
          gap: clamp(1.4rem, 2.5vw, 3.2rem);
          list-style: none;
          align-items: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          margin: 0;
          padding: 0;
        }

        .nav-link,
        .wink-trigger-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          font-weight: 700;
          color: var(--color-third);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.4rem 0;
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          opacity: 0.75;
          transition: opacity 0.3s ease, color 0.3s ease;
        }

        .nav-link-dot {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%) scale(0);
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--color-third);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-link:hover .nav-link-dot,
        .nav-link.active .nav-link-dot { transform: translateX(-50%) scale(1); }

        .dropdown-wrapper { position: relative; display: flex; align-items: center; }

        .dropdown-list {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 160px;
          background: var(--extra-color-one);
          backdrop-filter: blur(20px) saturate(180%);
          list-style: none;
          padding: 0.6rem 0;
          margin: 0;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 8px;
          z-index: 1000;
        }

        .dropdown-list li a {
          display: flex;
          align-items: center;
          padding: 0.65rem 1.4rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.62rem;
          color: var(--color-third);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-weight: 600;
          transition: color 0.25s ease;
        }

        .nav-cta { display: flex; align-items: center; gap: 1rem; flex-shrink: 0; }

        .cta-button-high-end {
          background: var(--extra-color-third);
          color: var(--extra-color-one);
          border: none;
          padding: 0.85rem 2rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-weight: 800;
          cursor: pointer;
          border-radius: 100px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: transform 0.35s ease;
        }

        @media (max-width: 1024px) {
          .nav-links { display: none; }
        }
      `}</style>
    </motion.header>
  );
};

export default Header;