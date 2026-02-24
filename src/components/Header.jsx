import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ activeSection, scrollVelocity, scrollDirection, theme, setTheme, scrollProgress }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWinkOpen, setIsWinkOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      if (!mobileMenuOpen) {
        setHidden(currentY > lastY.current && currentY > 300 && scrollVelocity > 1.5);
      }
      lastY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollVelocity, mobileMenuOpen]);

  useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (v) => {
      setProgressWidth(v * 100);
    });
    return unsubscribe;
  }, [scrollProgress]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

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
    setMobileMenuOpen(false);
  };

  const handleMobileCta = () => {
    window.dispatchEvent(new Event('openContactModal'));
    setMobileMenuOpen(false);
  };

  const navItems = ['home', 'services', 'packages', 'events'];

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-active' : ''}`}
      animate={{ y: hidden && !mobileMenuOpen ? '-100%' : '0%' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="progress-bar">
        <motion.div className="progress-fill" style={{ width: `${progressWidth}%` }} />
      </div>

      <div className="nav-container">
        <nav className="nav">
          <div className="nav-logo">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="logo-wrapper">
              <div className="dynamic-logo" />
            </a>
          </div>

          <ul className="nav-links desktop-only">
            {navItems.map((item) => (
              <li key={item}>
                <a href={`#${item}`} onClick={(e) => handleNavClick(e, item)} className={`nav-link ${activeSection === item ? 'active' : ''}`}>
                  <span className="nav-link-text">{item}</span>
                </a>
              </li>
            ))}
            <li className="dropdown-wrapper" onMouseEnter={() => setIsWinkOpen(true)} onMouseLeave={() => setIsWinkOpen(false)}>
              <button className={`wink-trigger-btn nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'about')}>
                <span className="nav-link-text">WINK</span>
              </button>
            </li>
          </ul>

          <div className="nav-cta">
            <button className="theme-toggle-minimal" onClick={toggleTheme} aria-label="Toggle theme">
              <span className="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
            </button>
            <button className="cta-button-high-end desktop-only" onClick={() => window.dispatchEvent(new Event('openContactModal'))}>
              <span className="cta-text">Start a Project</span>
            </button>
            <button
              className={`hamburger-menu ${mobileMenuOpen ? 'is-active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="line"></span>
              <span className="line"></span>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mobile-overlay"
          >
            <ul className="mobile-links">
              {navItems.map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={(e) => handleNavClick(e, item)}>{item}</a>
                </li>
              ))}
              <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>Wink</a></li>
              <li className="mobile-cta-wrapper">
                <button className="cta-button-high-end mobile-cta" onClick={handleMobileCta}>
                  Start a Project
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          width: 100%;
          padding: 1.1rem 0;
          background: transparent;
          transition: padding 0.5s ease, backdrop-filter 0.5s ease;
        }

        .header.scrolled {
          padding: 0.35rem 0;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .header.mobile-active {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border-bottom: none !important;
          background: transparent !important;
        }

        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
        }

        .progress-fill {
          height: 100%;
          background: var(--color-teal, var(--color-one));
        }

        .nav-container {
          width: 100%;
          padding: 0 4vw;
          position: relative;
          z-index: 1002;
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .nav-logo { flex-shrink: 0; min-width: 220px; }

        .dynamic-logo {
          height: 64px;
          width: 220px;
          background-image: var(--logo-url, url('/WinkWhite.png'));
          background-size: contain;
          background-repeat: no-repeat;
          background-position: left center;
        }

        .theme-toggle-minimal {
          background: transparent;
          border: none;
          height: 44px;
          width: 44px;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .theme-icon { font-size: 1.4rem; line-height: 1; }

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

        .nav-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          font-weight: 700;
          color: var(--color-third);
          text-decoration: none;
          cursor: pointer;
          position: relative;
          opacity: 0.75;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          border: none;
          background: none;
        }

        .nav-cta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cta-button-high-end {
          background: var(--color-third);
          color: var(--color-two);
          border: none;
          padding: 0.85rem 2rem;
          border-radius: 100px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-button-high-end:hover { background-color: var(--color-fourth); }
        .cta-button-high-end:active { transform: scale(0.98); }

        .hamburger-menu {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          height: 44px;
          width: 44px;
          padding: 0;
          flex-shrink: 0;
          position: relative;
          z-index: 1003;
        }

        .hamburger-menu .line {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--color-third);
          border-radius: 2px;
          transition: transform 0.3s ease;
          transform-origin: center;
        }

        .hamburger-menu.is-active .line:nth-child(1) {
          transform: translateY(4px) rotate(45deg);
        }
        .hamburger-menu.is-active .line:nth-child(2) {
          transform: translateY(-4px) rotate(-45deg);
        }

        @media (max-width: 1024px) {
          .desktop-only { display: none !important; }
          .hamburger-menu { display: flex; }
          .nav-logo { min-width: auto; }
          .dynamic-logo { width: 140px; height: 40px; }

          /*
            THE FIX: Use a solid opaque background color.
            backdrop-filter alone is invisible on Android Chrome / many mobile browsers
            unless there is an actual background-color with opacity behind it.
            We use the site's dark bg color at near-full opacity so content
            behind is fully hidden, just like a native menu.
          */
          .mobile-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            /* Solid dark background — fully covers the page behind it */
            background: var(--color-bg, #050e14);
            /* Optional frosted glass on top of that for devices that support it */
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 1001;
            overflow: hidden;
          }

          .mobile-links {
            list-style: none;
            text-align: center;
            padding: 0;
            margin: 0;
          }

          .mobile-links li { margin: 1.5rem 0; }

          .mobile-links a {
            color: var(--color-third);
            font-size: 1.5rem;
            text-transform: uppercase;
            font-weight: 800;
            text-decoration: none;
            letter-spacing: 0.1em;
          }

          .mobile-cta-wrapper { margin-top: 2rem !important; }

          .mobile-cta {
            font-size: 1.1rem;
            padding: 1.2rem 2.5rem;
            color: var(--color-third);
            background: var(--color-bg);
          }
        }
      `}</style>
    </motion.header>
  );
};

export default Header;