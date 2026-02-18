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
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(1, 83, 108, 0.05) 15%,
            rgba(1, 83, 108, 0.1) 25%,
            rgba(1, 83, 108, 0.2) 30%,
            rgba(1, 83, 108, 0.35) 35%,
            rgba(1, 83, 108, 0.55) 50%,
            var(--extra-color-fourth) 100%
          );
          color: var(--extra-color-fourth);
          border-top: 0px var(--color-border);
          transition: background-color var(--transition), color var(--transition);
        }

        .footer-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 6rem 2rem 4rem 2rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 2.5fr 1fr 1.5fr 1.5fr;
            gap: 0;
          }
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-right: 4rem;
        }

        .footer-logo-img {
          background-image: var(--logo-url);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: left center;
          height: 100px;
          width: 180px;
        }

        .footer-tagline {
          color: var(--color-third);
          font-size: 0.95rem;
          font-weight: bold;
          line-height: 1.6;
          opacity: 0.8;
          max-width: 280px;
        }

        .footer-section {
          padding-top: 0.5rem;
        }

        @media (min-width: 1024px) {
          .footer-section {
            padding-left: 3rem;
            border-left: 1px solid rgba(255, 255, 255, 0.08);
          }
        }

        .footer-title {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--color-third);
          margin-bottom: 2rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          opacity: 0.6;
        }

        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-link {
          color: var(--color-third);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: bold;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }

        .footer-link:hover {
          color: white;
        }

        .footer-contact-item {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
          font-weight: bold;
        }

        .footer-icon {
          width: 16px;
          height: 16px;
          opacity: 0.5;
          margin-top: 2px;
        }

        .footer-newsletter-form {
          display: flex;
          margin-bottom: 1.5rem;
          padding: 4px;
        }

        .footer-discussion-btn {
          width: 100%;
          padding: 1rem;
          background: var(--color-third);
          color: var(--color-two);
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.75rem;
          transition: all 0.3s ease;
        }

        .footer-discussion-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .footer-social {
          display: flex;
          gap: 0.5rem;
          font-weight: bold;
        }

        .footer-social-link {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: var(--color-third);
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: bold;
        }

        .footer-social-link:hover {
          background: white;
          color: black;
          border-color: white;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 2rem 0;
        }

        .footer-bottom-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-copyright {
          color: var(--color-third);
          font-size: 1rem;
          opacity: 0.5;
          font-weight: bold;
        }

        .footer-back-to-top {
          background: none;
          border: none;
          color: var(--color-third);
          font-size:1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          opacity: 0.7;
          font-weight: bold;
        }

        .footer-back-to-top:hover {
          opacity: 1;
        }
      `}</style>

      <footer className="footer-wrapper">
        <div className="footer-container">
          <div className="footer-grid">

            <div className="footer-brand">
              <a href="/" className="footer-logo-link" aria-label="Wink Home">
                <div className="footer-logo-img" />
              </a>
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
              <div className="footer-contact-item">
                <svg className="footer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                  19 Rue Jbel Al Iyachi, Agdal, Rabat, Morocco
                </a>
              </div>
              <div className="footer-contact-item">
                <svg className="footer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:hala@wink-consulting.com" className="footer-link">
                  hala@wink-consulting.com
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h4 className="footer-title">Are You Interested?</h4>
              <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <button className="footer-discussion-btn">Request a Discussion</button>
              </form>
              <div className="footer-social">
                {[
                  { name: 'LN', url: 'https://www.linkedin.com/company/b2bbywink/' },
                  { name: 'FB', url: 'https://facebook.com/wink-consulting' },
                  { name: 'IG', url: 'https://www.instagram.com/b2bbywink/' }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className="footer-social-link"
                    whileHover={{ y: -3 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.name}
                  </motion.a>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-container">
           <a href="https://pointvirgul.com" target="_blank" rel="noopener noreferrer" className="footer-copyright" style={{ textDecoration: 'none' }}>
             © {currentYear} PointVirgul. All Rights Reserved.
           </a>
            <motion.button onClick={scrollToTop} className="footer-back-to-top">
              <span>Back to top</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14">
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