import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openContactModal', handleOpen);
    return () => window.removeEventListener('openContactModal', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const onClose = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="modal-backdrop"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="modal-card"
          >
            <button className="close-btn" onClick={onClose}>✕</button>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-grid">
                <div className="input-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your full name" required />
                </div>
                <div className="input-group">
                  <label>Organization</label>
                  <input type="text" placeholder="Company name" required />
                </div>
                <div className="input-group">
                  <label>Business Email</label>
                  <input type="email" placeholder="email@company.com" required />
                </div>
                <div className="input-group">
                  <label>Country / Region</label>
                  <input type="text" placeholder="e.g. Morocco, UAE" required />
                </div>
              </div>

              <div className="input-group full-width">
                <label>Area of Interest</label>
                <select required>
                  <option value="">Select an option</option>
                  <option value="matchmaking">B2B Matchmaking</option>
                  <option value="events">Event Management</option>
                  <option value="strategy">Strategy Consulting</option>
                </select>
              </div>

              <div className="input-group full-width">
                <label>Objectives / Context</label>
                <textarea rows="4" placeholder="Briefly describe your goals..."></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Request a discussion
              </button>
            </form>
          </motion.div>

          <style jsx>{`
            .modal-overlay {
              position: fixed;
              inset: 0;
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
              background: var--extra-color-third);
            }
            .modal-backdrop {
              position: absolute;
              inset: 0;
              background: var(--extra-color-third);
              backdrop-filter: blur(12px);
            }
            .modal-card {
              position: relative;
              background: var(--extra-color-third);;
              width: 100%;
              max-width: 750px;
              border-radius: 20px;
              padding: 40px;
              box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5);
              z-index: 10000;
            }
            .close-btn {
              position: absolute;
              top: 20px;
              right: 20px;
              background: none;
              border: none;
              font-size: 1.5rem;
              cursor: pointer;
              color: #071e2b;
              opacity: 0.5;
            }
            .close-btn:hover { opacity: 1; }
            .form-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 20px;
            }
            .input-group { display: flex; flex-direction: column; gap: 8px; }
            .input-group.full-width { grid-column: span 2; }
            label {
              font-size: 0.7rem;
              font-weight: 800;
              color: #071e2b;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            input, select, textarea {
              padding: 12px 16px;
              background: #f4f7f9;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              font-size: 0.9rem;
              color: #071e2b;
            }
            input:focus { outline: none; border-color: #17b8c8; }
            .submit-btn {
              width: 100%;
              margin-top: 20px;
              padding: 18px;
              background: var(--color-bg);
              color: white;
              border: none;
              border-radius: 10px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              cursor: pointer;
              transition: all 0.3s ease;
            }
            .submit-btn:hover { background: #17b8c8; transform: translateY(-2px); }
            @media (max-width: 600px) {
              .form-grid { grid-template-columns: 1fr; }
              .input-group.full-width { grid-column: span 1; }
              .modal-card { padding: 25px; }
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}