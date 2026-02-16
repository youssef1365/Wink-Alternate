import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Events = () => {
  const [filter, setFilter] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedEvent]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setSelectedEvent(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const allEvents = [
    {
      id: 1,
      type: 'upcoming',
      name: 'Global Trade Summit',
      location: 'Casablanca, Morocco',
      date: 'Oct 2026',
      description: 'Connecting Mediterranean tech leaders with global investors for high-impact B2B sessions.',
      details: 'A flagship event bringing together 500+ decision-makers from technology, finance, and government sectors across 30 countries. Featuring keynote addresses, curated 1-on-1 matchmaking sessions, and an exclusive gala dinner.'
    },
    {
      id: 2,
      type: 'upcoming',
      name: 'AfricaTech Investor Forum',
      location: 'Nairobi, Kenya',
      date: 'Nov 2026',
      description: 'A curated gathering of African startup founders and international venture capital funds.',
      details: 'Three days of structured pitches, deep-dive workshops, and facilitated investor meetings. Targeting early-stage to Series B startups across fintech, agritech, and healthtech verticals.'
    },
    {
      id: 3,
      type: 'upcoming',
      name: 'Euro-Med Business Days',
      location: 'Barcelona, Spain',
      date: 'Dec 2026',
      description: 'Cross-border partnership development between European and Mediterranean enterprises.',
      details: 'A bilateral trade event with pre-scheduled B2B meetings between companies from Spain, France, Italy, Morocco, Tunisia, and Egypt. Supported by the European Chamber of Commerce.'
    },
    {
      id: 4,
      type: 'upcoming',
      name: 'Gulf Investment Roadshow',
      location: 'Dubai, UAE',
      date: 'Feb 2027',
      description: 'Facilitating market entry for Western companies seeking expansion in the GCC region.',
      details: 'A week-long roadshow across Dubai and Abu Dhabi, with site visits, ministerial roundtables, and exclusive networking receptions. Ideal for companies in construction, energy, and digital services.'
    },
    {
      id: 5,
      type: 'upcoming',
      name: 'Agri-Food Trade Mission',
      location: 'Amsterdam, Netherlands',
      date: 'Mar 2027',
      description: 'Dedicated matchmaking for agri-food exporters and European distribution networks.',
      details: 'Co-located with the Fruit Logistica fair, this mission connects exporters from Africa and the Middle East with major European retail chains, importers, and logistics partners.'
    },
    {
      id: 6,
      type: 'upcoming',
      name: 'Smart Cities B2B Forum',
      location: 'Singapore',
      date: 'Apr 2027',
      description: 'Urban tech innovators meet government procurement leaders across Southeast Asia.',
      details: 'A focused two-day forum pairing smart mobility, IoT, and energy-efficiency solution providers with city planners and procurement officials from Singapore, Malaysia, Indonesia, and Vietnam.'
    },
    {
      id: 7,
      type: 'upcoming',
      name: 'Francophone Business Summit',
      location: "Abidjan, Côte d'Ivoire",
      date: 'Jun 2027',
      description: "Strategic networking across West Africa's fastest-growing business corridors.",
      details: "Bringing together 400+ business leaders from 15 Francophone African nations. Sectors include banking, infrastructure, telecommunications, and agribusiness. Hosted in partnership with CCIA."
    },
    {
      id: 8,
      type: 'past',
      name: 'B2B Matchmaking Days',
      location: 'Paris, France',
      date: 'Jan 2026',
      description: 'High-level networking for retail and logistics stakeholders across 22 countries.',
      details: '280 pre-scheduled meetings generated over two days, with a 74% meeting satisfaction rate. Participants included buyers from major European retail groups and exporters from North Africa and Sub-Saharan Africa.',
      photos: [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80',
        'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80',
      ]
    },
    {
      id: 9,
      type: 'past',
      name: 'MedInvest Forum',
      location: 'Tunis, Tunisia',
      date: 'Nov 2025',
      description: 'Bringing together 300+ investors and project owners across the MENA region.',
      details: 'Over €120M in investment projects presented across renewable energy, real estate, and manufacturing. Facilitated 180+ investor-to-project meetings with a 60% follow-up rate within 90 days.',
      photos: [
        'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80',
        'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&q=80',
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=80',
      ]
    },
    {
      id: 10,
      type: 'past',
      name: 'Trade Show Deal Accelerator',
      location: 'Milan, Italy',
      date: 'Sep 2025',
      description: 'Intensive pre-scheduled meeting program embedded within a major European trade show.',
      details: 'Embedded within the SMAU Milan innovation fair. Managed a hosted-buyer program for 85 international buyers, generating 340 pre-qualified meetings over three days.',
      photos: [
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80',
        'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=80',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&q=80',
      ]
    },
    {
      id: 11,
      type: 'past',
      name: 'Hosted Buyers Program — FITUR',
      location: 'Madrid, Spain',
      date: 'Jan 2025',
      description: 'Curated international buyers hosted for exclusive meetings with Spanish tourism operators.',
      details: 'Coordinated the end-to-end logistics and matchmaking for 60 hosted buyers from 18 countries at FITUR 2025. Delivered 420 B2B meetings and a 95% attendee satisfaction score.',
      photos: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
        'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&q=80',
      ]
    },
    {
      id: 12,
      type: 'past',
      name: 'West Africa Investment Tour',
      location: 'Dakar, Senegal',
      date: 'Oct 2024',
      description: 'On-the-ground site visits and ministerial meetings for European investors entering the region.',
      details: 'A 5-day immersive investment tour visiting industrial zones, port infrastructure, and agricultural projects. Attended by 25 European investors and facilitated 3 signed MoUs during the program.',
      photos: [
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80',
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&q=80',
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
      ]
    },
    {
      id: 13,
      type: 'past',
      name: 'Digital Economy B2B Summit',
      location: 'Rabat, Morocco',
      date: 'Jun 2024',
      description: 'Connecting African digital startups with European accelerators and corporate partners.',
      details: 'Hosted 120 startups from 12 African countries alongside 40 European corporate innovation teams and accelerators. Generated 200+ matchmaking meetings and 8 direct partnership agreements.',
      photos: [
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80',
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80',
        'https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?w=400&q=80',
      ]
    }
  ];

  const filteredEvents = allEvents.filter(event => event.type === filter);

  return (
    <>
      <section className="events-section">
        <div className="events-header">
          <h2 className="events-title">Our Events</h2>
          <p className="events-subtitle">
            Explore upcoming initiatives and past projects delivered across industries and markets.
          </p>
          <div className="filter-tabs">
            <button
              className={`tab-btn ${filter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming Events
            </button>
            <button
              className={`tab-btn ${filter === 'past' ? 'active' : ''}`}
              onClick={() => setFilter('past')}
            >
              Past Events
            </button>
          </div>
        </div>

        <motion.div layout className="events-grid">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="event-card"
              >
                <div className="event-info">
                  <h3 className="event-name">{event.name}</h3>
                  <div className="event-meta">
                    <span>📍 {event.location}</span>
                    <span>📅 {event.date}</span>
                  </div>
                  <p className="event-desc">{event.description}</p>
                </div>
                <button
                  className="view-event-cta"
                  onClick={() => setSelectedEvent(event)}
                >
                  View Event
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            {/* Backdrop */}
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedEvent(null)}
            />

            {/* Panel */}
            <motion.div
              className="modal-panel"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close button */}
              <button className="modal-close" onClick={() => setSelectedEvent(null)} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Tag */}
              <div className="modal-tag">
                {selectedEvent.type === 'upcoming' ? 'Upcoming' : 'Past Event'}
              </div>

              {/* Title */}
              <h2 className="modal-title">{selectedEvent.name}</h2>

              {/* Meta */}
              <div className="modal-meta">
                <span className="modal-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {selectedEvent.location}
                </span>
                <span className="modal-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {selectedEvent.date}
                </span>
              </div>

              {/* Divider */}
              <div className="modal-divider" />

              {/* Description */}
              <p className="modal-description">{selectedEvent.description}</p>

              {/* Details */}
              <p className="modal-details">{selectedEvent.details}</p>

              {/* Photos — past events only */}
              {selectedEvent.type === 'past' && selectedEvent.photos && (
                <div className="modal-photos-section">
                  <p className="modal-photos-label">Event Gallery</p>
                  <div className="modal-photos-grid">
                    {selectedEvent.photos.map((src, i) => (
                      <div key={i} className="modal-photo-item">
                        <img src={src} alt={`${selectedEvent.name} photo ${i + 1}`} className="modal-photo-img" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer CTA */}
              <div className="modal-footer">
                <button
                  className="modal-cta"
                  onClick={() => window.dispatchEvent(new Event('openContactModal'))}
                >
                  <span>Get in Touch</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="modal-dismiss" onClick={() => setSelectedEvent(null)}>
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .events-section {
          background-color: var(--color-bg);
          padding: var(--space-xl) var(--space-lg);
          min-height: 80vh;
          transition: background-color 0.3s ease;
        }

        .events-header {
          max-width: var(--max-width);
          margin: 0 auto var(--space-xl);
          text-align: center;
        }

        .events-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: var(--color-text-primary);
          font-weight: 800;
          margin-bottom: var(--space-sm);
        }

        .events-subtitle {
          color: var(--color-text-secondary);
          font-size: 1.15rem;
          max-width: 600px;
          margin: 0 auto var(--space-lg);
        }

        .filter-tabs {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
        }

        .tab-btn {
          background: var(--color-bg-secondary);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--color-text-secondary);
          padding: 0.8rem 1.5rem;
          border-radius: 100px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .tab-btn.active {
          background: var(--color-text);
          color: var(--color-bg);
          border-color: var(--color-text);
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: var(--space-lg);
          max-width: var(--max-width);
          margin: 0 auto;
        }

        .event-card {
          background: var(--color-bg);
          border-radius: var(--border-radius);
          padding: var(--space-lg);
          border: 1px solid rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .event-name {
          color: var(--color-text-primary);
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .event-meta {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          font-size: 0.85rem;
          color: var(--color-text);
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .event-desc {
          color: var(--color-text-secondary);
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .view-event-cta {
          margin-top: 1.5rem;
          background: none;
          border: 1px solid var(--color-text);
          color: var(--color-text);
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          align-self: flex-start;
        }

        .view-event-cta:hover {
          background: var(--color-text);
          color: var(--color-bg);
        }

        /* ── BACKDROP ── */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: var(--color-bg);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 1100;
        }

        .modal-panel {
          position: fixed;
          top: 50%;
          left: 50%;
          z-index: 1200;
          background: var(--color-bg);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 8px;
          padding: 2.8rem;
          width: min(620px, 92vw);
          max-height: 88vh;
          overflow-y: auto;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.05) inset;
          margin-left: calc(min(620px, 92vw) / -2);
          margin-top: -44vh;
        }

        .modal-close {
          position: absolute;
          top: 1.4rem;
          right: 1.4rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--color-text-primary);
          opacity: 0.6;
          transition: opacity 0.2s ease, background 0.2s ease;
        }
        .modal-close:hover { opacity: 1; background: rgba(255,255,255,0.1); }

        /* ── TAG ── */
        .modal-tag {
          display: inline-block;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-text-primary);
          opacity: 0.4;
          border: 1px solid rgba(255,255,255,0.12);
          padding: 0.25rem 0.7rem;
          border-radius: 100px;
          margin-bottom: 1.2rem;
        }

        /* ── TITLE ── */
        .modal-title {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 800;
          color: var(--color-text-primary);
          margin: 0 0 1.2rem 0;
          line-height: 1.15;
          letter-spacing: -0.02em;
          padding-right: 2rem;
        }

        /* ── META ── */
        .modal-meta {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.4rem;
        }

        .modal-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-1, var(--color-text));
        }

        /* ── DIVIDER ── */
        .modal-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.12) 0%, transparent 100%);
          margin-bottom: 1.4rem;
        }

        .modal-description {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-text-primary);
          line-height: 1.6;
          margin: 0 0 1rem 0;
          opacity: 0.85;
        }

        .modal-details {
          font-size: 0.88rem;
          color: var(--color-text-secondary);
          line-height: 1.75;
          margin: 0;
        }

        .modal-footer {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .modal-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(210,230,255,0.88) 100%);
          color: #050508;
          border: none;
          padding: 0.7rem 1.5rem;
          font-size: 0.68rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          border-radius: 100px;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 2px 14px rgba(255,255,255,0.1);
        }
        .modal-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(255,255,255,0.18);
        }

        .modal-dismiss {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          opacity: 0.5;
          transition: opacity 0.2s ease;
          padding: 0;
        }
        .modal-dismiss:hover { opacity: 1; }

        .modal-photos-section {
          margin-top: 1.8rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .modal-photos-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-text-primary);
          opacity: 0.35;
          margin: 0 0 1rem 0;
        }

        .modal-photos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.6rem;
        }

        .modal-photo-item {
          aspect-ratio: 4 / 3;
          border-radius: 4px;
          overflow: hidden;
          background: rgba(255,255,255,0.04);
        }

        .modal-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease, opacity 0.3s ease;
          opacity: 0.85;
        }

        .modal-photo-item:hover .modal-photo-img {
          transform: scale(1.05);
          opacity: 1;
        }

        @media (max-width: 768px) {
          .events-grid { grid-template-columns: 1fr; }
          .filter-tabs { flex-direction: column; }
          .modal-panel { padding: 2rem 1.5rem; }
        }
      `}</style>
    </>
  );
};

export default Events;