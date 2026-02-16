import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style jsx>{`
      .footer-wrapper {
        background: linear-gradient(to bottom,
          transparent 0%,
          rgba(1, 83, 108, 0.05) 5%,
          rgba(1, 83, 108, 0.1) 10%,
          rgba(1, 83, 108, 0.2) 20%,
          rgba(1, 83, 108, 0.35) 30%,
          rgba(1, 83, 108, 0.55) 45%,
          var(--extra-color-fourth) 100%
        );
        color: var(--extra-color-fourth);
        border-top: 0px var(--color-border);
        transition: background-color var(--transition), color var(--transition);
      }

      .footer-container {
        max-width: 1440px;
        margin: 0 auto;
        padding: 8rem 2rem 4rem 2rem;
      }

      .footer-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 4rem;
      }

      @media (min-width: 768px) {
        .footer-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 3rem;
        }
      }

      @media (min-width: 1024px) {
        .footer-grid {
          grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
          gap: 0;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
        }
      }

      .footer-brand {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      @media (min-width: 1024px) {
        .footer-brand {
          padding: 0 3rem;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }
      }

      .footer-logo-link {
        display: block;
        text-decoration: none;
      }

      .footer-logo-img {
        background-image: var(--logo-url);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: left center;
        height: 70px;
        width: 200px;
        transition: background-image var(--transition);
      }

      .footer-tagline {
        color: var(--color-third);
        font-size: 1rem;
        font-weight: 300;
        line-height: 1.7;
        letter-spacing: 0.01em;
        max-width: 320px;
      }

      .footer-section {
        display: flex;
        flex-direction: column;
      }

      @media (min-width: 1024px) {
        .footer-section {
          padding: 0 3rem;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }
      }

      .footer-title {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-third);
        margin: 0 0 1.8rem 0;
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }

      .footer-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        color: var(--color-third);
      }

      .footer-link {
        position: relative;
        color: var(--color-third);
        text-decoration: none;
        font-size: 1rem;
        font-weight: 300;
        letter-spacing: 0.01em;
        transition: all 0.3s ease;
        display: inline-block;
        padding-bottom: 2px;
      }

      .footer-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 1px;
        background: white;
        transition: width 0.3s ease;
      }

      .footer-link:hover {
        color: white;
        transform: translateX(3px);
      }

      .footer-link:hover::after {
        width: 100%;
      }

      .footer-contact-item {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        color: var(--color-third);
        font-size: 1rem;
        font-weight: 300;
        letter-spacing: 0.01em;
      }

      .footer-icon {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
        margin-top: 3px;
        color: var(--color-third);
      }

      .footer-newsletter-form {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 2rem;
      }

      .footer-newsletter-input {
        flex: 1;
        padding: 0.85rem 1.2rem;
        background: var(--color-third);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: var(--border-radius);
        backdrop-filter: blur(10px);
        color: white;
        font-size: 0.95rem;
        font-weight: 300;
        letter-spacing: 0.01em;
        outline: none;
        transition: all var(--transition);
      }

      .footer-newsletter-input::placeholder {
        color: rgba(255, 255, 255, 0.4);
        opacity: 1;
      }

      .footer-newsletter-input:focus {
        background: var(--color-third);
        border-color: rgba(255, 255, 255, 0.3);
      }

      .footer-newsletter-button {
        width: 50px;
        background-color: white;
        color: black;
        border: none;
        border-radius: var(--border-radius);
        font-size: 1.2rem;
        font-weight: 400;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .footer-newsletter-button:hover {
        background-color: var(--color-one);
        color: white;
        transform: translateY(-2px);
      }

      .footer-social {
        display: flex;
        gap: 0.75rem;
        color: var(--color-third);
      }

      .footer-social-link {
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        color: var(--color-third);
        text-decoration: none;
        font-size: 0.7rem;
        font-weight: 500;
        letter-spacing: 0.05em;
        transition: all 0.3s ease;
      }

      .footer-social-link:hover {
        background: white;
        color: black;
        border-color: var(--color-third);
        transform: translateY(-3px);
      }

      .footer-bottom {
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(20px);
      }

      :root[data-theme="light"] .footer-bottom {
        background: rgba(0, 0, 0, 0.06);
      }

      .footer-bottom-container {
        max-width: 1440px;
        margin: 0 auto;
        padding: 2rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      @media (min-width: 640px) {
        .footer-bottom-container {
          flex-direction: row;
          justify-content: space-between;
        }
      }

      .footer-copyright {
        color: var(--color-third);
        font-size: 0.8rem;
        font-weight: 300;
        letter-spacing: 0.05em;
        margin: 0;
      }

      .footer-back-to-top {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-third);
        background: none;
        border: none;
        font-size: 0.85rem;
        font-weight: 500;
        letter-spacing: 0.02em;
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 0;
      }

      .footer-back-to-top:hover {
        color: white;
        transform: translateY(-2px);
      }

      .footer-back-to-top svg {
        width: 14px;
        height: 14px;
      }
      `}</style>


      <footer className="footer-wrapper">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo-box">
                <a href="/" className="footer-logo-link" aria-label="Wink Home">
                  <div className="footer-logo-img" />
                </a>
              </div>
              <p className="footer-tagline">
                High-impact B2B experiences that transform businesses and drive measurable results.
              </p>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Explore</h4>
              <ul className="footer-list">
                {['Home', 'About', 'Services', 'Packages'].map((item) => (
                  <li key={item}>
                    <motion.a href={`#${item.toLowerCase()}`} className="footer-link" whileHover={{ x: 5 }}>
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Contact</h4>
              <ul className="footer-list">
                <li className="footer-contact-item">
                  <svg className="footer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Tangier, Morocco</span>
                </li>
                <li className="footer-contact-item">
                  <svg className="footer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:hello@wink-consulting.com" className="footer-link">
                    hello@wink-consulting.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Newsletter</h4>
              <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Email address" className="footer-newsletter-input" />
                <motion.button type="submit" className="footer-newsletter-button" whileTap={{ scale: 0.95 }}>
                  →
                </motion.button>
              </form>
              <div className="footer-social">
                {['LN', 'TW', 'IG'].map((social) => (
                  <motion.a key={social} href="#" className="footer-social-link" whileHover={{ y: -3 }}>
                    {social}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-container">
            <p className="footer-copyright">
              © {currentYear} PointVirgul, All Rights Reserved.
            </p>
            <motion.button onClick={scrollToTop} className="footer-back-to-top" whileHover={{ y: -3 }}>
              <span>Back to top</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;