import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Events = () => {
  const [filter, setFilter] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedEvent]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setSelectedEvent(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const allEvents = [
    {
      id: 1,
      type: 'upcoming',
      name: 'FOODEX JAPAN 2026',
      location: 'Japan',
      date: 'March 10 (Tue.) - 13 (Fri.), 2026',
      details: 'Morocco will showcase the richness and diversity of its agri-food sector at FOODEX Japan 2026, one of Asia’s leading international food and beverage exhibitions. Renowned for its Mediterranean and North African culinary heritage, Morocco offers a wide range of high-quality, export-ready food products, combining tradition, natural resources, and modern production standards. From fresh fruits and vegetables to processed snacks, aromatic herbs and natural ingredients, premium olive and terroir oils, and seafood products, Moroccan exhibitors present solutions tailored to the needs of international markets.'
    },
    {
      id: 2,
      type: 'upcoming',
      name: 'Moroccan Business Mission for Agri-food & Fresh Products',
      location: 'Jaal Hotel Marrakech, Marrakech',
      date: 'March 26, 2026',
      details: 'The Morocco Food & Fresh Produce Incoming Business Mission 2026, hosted in Marrakech, is an exclusive B2B initiative organized by Morocco Foodex to strengthen international trade partnerships and promote Moroccan agri-food and fresh produce exports. This high-level business mission brings together a selected group of international buyers, importers, and retail groups from key European markets to engage directly with leading Moroccan exporters. It combines curated B2B matchmaking meetings, market discovery activities, and networking opportunities in a premium business setting.'
    },
    {
      id: 3,
      type: 'upcoming',
      name: 'International Food & Drink Event (IFE) 2026',
      location: 'ExCeL London, United Kingdom',
      date: '30 March – 01 April 2026',
      details: 'IFE is the ultimate business event for food & drink product discovery, bringing together over 25,000 verified trade visitors, expert speakers, and global exhibitors from across the food & beverage industry. As part of Food, Drink & Hospitality Week, IFE offers three days of networking, product sourcing, market insights, and trend exploration for retailers, wholesalers, distributors, importers, exporters, and industry professionals.'
    },
    {
      id: 4,
      type: 'upcoming',
      name: 'Moroccan Trade Mission of Olive Oil Industry in New York',
      location: 'New York City (venue to be communicated)',
      date: 'March 27th, 2026',
      details: 'Taking place in the heart of New York City, the Moroccan Trade Mission – Olive Oil Industry, organized by Morocco Foodex, builds on previous successful editions in the United States. Designed to showcase the excellence of Moroccan olive oil to the North American market, this B2B initiative serves as a platform connecting selected Moroccan exporters with leading American importers and distributors. The mission promotes long-term commercial partnerships through targeted B2B matchmaking and positions Morocco as a reliable and competitive origin for olive oil in the U.S. market.'
    },
    {
      id: 5,
      type: 'past',
      name: 'The Moroccan Seafood Trade Mission in Ghana',
      location: 'Ghana',
      date: 'Mardi 9 Décembre 2025',
      details: 'The Moroccan Seafood Trade Mission in Ghana is a high-level B2B event designed to connect Moroccan seafood exporters with Ghanaian importers, distributors, and buyers. Organized by Morocco Foodex, this mission highlights the excellence and diversity of Morocco\'s seafood industry — from canned fish to value-added marine products renowned.',
      results: { meetings: 70, buyers: 41 },
      photos: ['/PHOTOS-POUR-LE-SITE-WEB/GHANA-FOODEX/ghana1.jpeg',
               '/PHOTOS-POUR-LE-SITE-WEB/GHANA-FOODEX/ghana2.jpeg']
    },
    {
      id: 6,
      type: 'past',
      name: '8th China International Import Expo (CIIE 2025)',
      location: 'China',
      date: '5 au 10 novembre 2025',
      details: 'The Morocco Foodex Pavilion at the China International Import Expo (CIIE 2025) highlights Morocco’s dynamic agri-food sector and its growing partnership with China. Led by Morocco Foodex, the delegation includes key national institutions — AMDIE, FENAGRI, IBERRY, SIMAPA, Zalar Agri, and AGRUMAR — all committed to strengthening trade, investment, and institutional collaboration between Morocco and China.',
      results: { meetings: 60, buyers: 37 },
      photos: ['/PHOTOS-POUR-LE-SITE-WEB/China-Moroccofoodex/china1.jpeg',
               '/PHOTOS-POUR-LE-SITE-WEB/China-Moroccofoodex/china2.jpeg',
               '/PHOTOS-POUR-LE-SITE-WEB/China-Moroccofoodex/china3.jpeg']
    },
    {
      id: 7,
      type: 'past',
      name: 'KOREA BUILD WEEK 2025',
      location: 'Korea',
      date: '30 juillet au 2 août 2025, de 10h00 à 18h00',
      details: 'KOREA BUILD WEEK 2025 brings together global leaders in building materials, interior design, construction equipment, and smart building technologies. From structural components and digital construction tools to energy-efficient systems and smart home integration, this event is the go-to platform to discover the future of construction and architecture in Asia.',
      results: { meetings: 81, buyers: 48 },
      photos: ['/PHOTOS-POUR-LE-SITE-WEB/KOREA-BUILDWEEK/korea1.jpeg',
               '/PHOTOS-POUR-LE-SITE-WEB/KOREA-BUILDWEEK/korea2.jpeg']
    },
    {
      id: 8,
      type: 'past',
      name: 'Mission commerciale du textile et des matières premières au Maroc',
      location: 'Casablanca, Morocco',
      date: '5 au 7 Novembre 2025 (Mission globale du 4 au 8 novembre)',
      details: 'La Mission commerciale du textile et des matières premières – Maroc (Casablanca), organisée par l’Association des Exportateurs de Textile et de Matières Premières d’Istanbul (İTHİB) en collaboration avec le Ministère turc du Commerce, vise à renforcer les relations économiques et commerciales entre la Turquie et le Maroc. Cet événement, qui se déroulera du 4 au 8 novembre 2025 à Casablanca, offrira une plateforme unique de rencontres B2B entre les principaux fabricants turcs de textile et de matières premières et les importateurs, distributeurs, industriels et décideurs marocains.',
      results: { meetings: 942, buyers: 247 },
      photos: []
    },
    {
      id: 9,
      type: 'past',
      name: 'GULFOOD 2026 - Meet Leading Qatari F&B Manufacturers',
      location: 'Dubai Exhibition Centre (DEC), Expo City Dubai',
      date: '26 au 30 Janvier 2026',
      details: 'Taking place in January 2026 at the Dubai Exhibition Centre (DEC) at Expo City Dubai, Gulfood is the world’s largest and most influential food and beverage exhibition. Bringing together global producers, distributors, retailers, and decision-makers, Gulfood offers unparalleled access to the Middle East, Africa, and Asia’s rapidly expanding F&B markets. Discover new trends, launch poducts, connect with high-level buyers, and transform meetings into long-term commercial partnerships.',
      results: { meetings: 260, buyers: 162 },
      photos: []
    },
    {
      id: 10,
      type: 'past',
      name: 'Conxemar 2025',
      location: 'Vigo, Espagne',
      date: '7 au 9 octobre 2025',
      details: 'Salon international de référence pour les produits de la mer surgelés. La mission vise à positionner les acteurs marocains et internationaux face aux acheteurs européens et mondiaux.',
      results: { meetings: 177, buyers: 61 },
      photos: []
    },
    {
      id: 11,
      type: 'past',
      name: 'Multi-Sector Food Trade Mission',
      location: 'Variable',
      date: 'Variable (Généralement automne 2025)',
      details: 'Dans le cadre du renforcement des échanges commerciaux entre la Turquie et le Maroc, cet événement B2B réunit une délégation d’entreprises turques leaders du secteur agroalimentaire et des importateurs marocains qualifiés à la recherche de nouveaux partenariats durables. Organisée avec le soutien d’institutions turques et marocaines, cette mission sectorielle constitue une plateforme stratégique de mise en relation directe entre fabricants turcs et acteurs marocains de l’importation, de la distribution et de la grande consommation.',
      results: { meetings: 128, buyers: 29 },
      photos: []
    },
    {
      id: 12,
      type: 'past',
      name: 'Big 5 Global Dubai',
      location: 'Dubai World Trade Centre',
      date: '24 au 27 novembre 2025',
      details: 'Taking place from November 24 – 27, 2025 at the Dubai World Trade Centre, Big 5 Global is the largest construction event in the Middle East and Africa. Tap into the regions $9.18 trillion construction market, connect with serious buyers, and turn conversations into contracts. Qatar Exports is the export promotion arm of Qatar Development Bank, dedicated to enhancing the global competitiveness of Qatari products and construction services.',
      results: { meetings: 142, buyers: 94 },
      photos: ['/PHOTOS-POUR-LE-SITE-WEB/BIG5-2025/big51.jpeg',
               '/PHOTOS-POUR-LE-SITE-WEB/BIG5-2025/big52.jpeg']
    },
    {
      id: 13,
      type: 'past',
      name: 'ADIFE 2025',
      location: 'Abu Dhabi',
      date: 'Novembre 2025',
      details: 'Salon stratégique à Abu Dhabi pour le secteur F&B et l\'hôtellerie, mettant l\'accent sur les innovations alimentaires et les partenariats dans le Golfe.',
      results: { meetings: 255, buyers: 85 },
      photos: ['/PHOTOS-POUR-LE-SITE-WEB/ADIF-2025/adif1.jpeg',
               '/PHOTOS-POUR-LE-SITE-WEB/ADIF-2025/adif2.jpeg']
    },
    {
      id: 14,
      type: 'past',
      name: 'Kitchenware & Tableware Trade Mission',
      location: 'To be confirmed',
      date: 'Dates spécifiques à confirmer par formulaire (Saison 2025)',
      details: 'Une mission de prospection ciblée permettant aux fabricants turcs d\'articles de cuisine et de table de rencontrer des acheteurs stratégiques, des distributeurs spécialisés et des décideurs du secteur HORECA (Hôtels, Restaurants, Cafés) pour s\'implanter sur le marché local.',
      results: { meetings: 250, buyers: 44 },
      photos: []
    },
    {
      id: 15,
      type: 'past',
      name: 'Mission Commerciale en République Démocratique du Congo',
      location: 'Kinshasa et Lubumbashi',
      date: 'Courant 2025/2026',
      details: 'Mission de prospection à Kinshasa et Lubumbashi pour explorer les opportunités dans les infrastructures, l\'énergie et l\'agro-industrie dans un marché à fort potentiel de croissance.',
      results: { meetings: 159, buyers: 71 },
      photos: []
    }
  ];

  const filteredEvents = allEvents.filter((event) => event.type === filter);

  const switchToUpcoming = () => {
    setSelectedEvent(null);
    setFilter('upcoming');
    setTimeout(() => {
      document.getElementById('events-anchor')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <>
      <section className="events-section" id="events-anchor">
        <div className="events-header">
          <h2 className="events-title">Our Events</h2>
          <p className="events-subtitle">
            Explore upcoming initiatives and past projects delivered across industries and markets.
          </p>
          <div className="filter-tabs">
            <button className={`tab-btn ${filter === 'upcoming' ? 'active' : ''}`} onClick={() => setFilter('upcoming')}>Upcoming Events</button>
            <button className={`tab-btn ${filter === 'past' ? 'active' : ''}`} onClick={() => setFilter('past')}>Past Events</button>
          </div>
        </div>

        <motion.div layout className="events-grid">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                key={`${filter}-${event.id}`}
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
                </div>
                <button className="view-event-cta" onClick={() => setSelectedEvent(event)}>View Event</button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
            />

            <motion.div
              className="modal-panel"
              initial={{ opacity: 0, x: '-50%', y: '-45%' }}
              animate={{ opacity: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, x: '-50%', y: '-45%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedEvent(null)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 2l12 12M14 2L2 14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div className="modal-tag">
                {selectedEvent.type === 'upcoming' ? 'Upcoming' : 'Past Event'}
              </div>

              <h2 className="modal-title">{selectedEvent.name}</h2>

              <div className="modal-meta">
                <span className="modal-meta-item">📍 {selectedEvent.location}</span>
                <span className="modal-meta-item">📅 {selectedEvent.date}</span>
              </div>

              <div className="modal-divider" />

              <div className="modal-section">
                <h4 className="modal-section-title">Description:</h4>
                <p className="modal-details">{selectedEvent.about || selectedEvent.details}</p>
              </div>

              {selectedEvent.results && (
                <div className="modal-results-grid">
                  <div className="result-item">
                    <span className="result-value">{selectedEvent.results?.meetings}</span>
                    <span className="result-label">Meetings done</span>
                  </div>
                  <div className="result-item">
                    <span className="result-value">{selectedEvent.results?.buyers}</span>
                    <span className="result-label">Buyers</span>
                  </div>
                </div>
              )}

              {selectedEvent.type === 'past' && selectedEvent.photos?.length > 0 && (
                <div className="modal-photos-section">
                  <p className="modal-photos-label">Event Gallery</p>
                  <div className="modal-photos-grid">
                    {selectedEvent.photos.map((src, i) => (
                      <div key={i} className="modal-photo-item">
                        <img src={src} className="modal-photo-img" alt={`${selectedEvent.name} ${i + 1}`} loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-footer">
                {selectedEvent.type === 'upcoming' ? (
                  <>
                    <button className="modal-cta" onClick={() => window.dispatchEvent(new Event('openContactModal'))}>Register</button>
                    <button className="modal-dismiss" onClick={() => setSelectedEvent(null)}>Close</button>
                  </>
                ) : (
                  <>
                    <button className="modal-cta" onClick={switchToUpcoming}>View Upcoming Events</button>
                    <button className="modal-dismiss" onClick={() => setSelectedEvent(null)}>Close</button>
                  </>
                )}
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
          border: 1px solid rgba(255, 255, 255, 0.05);
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

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: var(--color-bg);
          backdrop-filter: blur(6px);
          z-index: 1100;
        }

        .modal-panel {
          position: fixed;
          top: 50%;
          left: 50%;
          z-index: 1200;
          background: var(--color-bg);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 8px;
          padding: 2.8rem;
          width: min(620px, 92vw);
          max-height: 88vh;
          overflow-y: auto;
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.5);
        }

        .modal-close {
          position: absolute;
          top: 1.4rem;
          right: 1.4rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--color-text-primary);
          opacity: 0.6;
        }

        .modal-tag {
          display: inline-block;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-text-primary);
          opacity: 0.4;
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 0.25rem 0.7rem;
          border-radius: 100px;
          margin-bottom: 1.2rem;
        }

        .modal-title {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 800;
          color: var(--color-text-primary);
          margin: 0 0 1.2rem 0;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

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
          color: var(--color-text);
        }

        .modal-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, transparent 100%);
          margin-bottom: 1.4rem;
        }

        .modal-section {
          margin-bottom: 1.5rem;
        }

        .modal-section-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-primary);
          margin-bottom: 0.5rem;
          opacity: 0.9;
        }

        .modal-details {
          font-size: 0.88rem;
          color: var(--color-text-secondary);
          line-height: 1.75;
          margin: 0;
        }

        .modal-results-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin: 1.5rem 0;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .result-item {
          text-align: center;
          display: flex;
          flex-direction: column;
        }

        .result-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--color-text-primary);
        }

        .result-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.6;
          color: var(--color-text-secondary);
        }

        .modal-footer {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .modal-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(210, 230, 255, 0.88) 100%);
          color: #050508;
          border: none;
          padding: 0.7rem 1.5rem;
          font-size: 0.68rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          border-radius: 100px;
          cursor: pointer;
        }

        .modal-dismiss {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          opacity: 0.5;
        }

        .modal-photos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.6rem;
          margin-top: 1rem;
        }

        .modal-photo-item {
          aspect-ratio: 4 / 3;
          border-radius: 4px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.04);
        }

        .modal-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          opacity: 0.85;
        }

        .modal-photos-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-primary);
          margin-bottom: 0.5rem;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .events-grid {
            grid-template-columns: 1fr;
          }
          .modal-results-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default Events;