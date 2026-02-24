import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openContactModal', handleOpen);
    return () => window.removeEventListener('openContactModal', handleOpen);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const onClose = () => {
    setIsOpen(false);
    setStatusMessage("");
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setStatusMessage("");

      const data = new FormData(e.target);
      const payload = Object.fromEntries(data.entries());

      try {
        const res = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: payload.fullName,
            email: payload.email,
            organization: payload.organization,
            country: payload.country,
            interest: payload.interest,
            message: payload.objectives
          }),
        });

        const result = await res.json();

        if (res.ok) {
          setStatusMessage("Success! We will contact you shortly.");
          e.target.reset();
        } else {
          setStatusMessage(result.error || result.message || "Server error. Please try again.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setStatusMessage("Connection error. Please check your internet or SSL.");
      } finally {
        setIsSubmitting(false);
      }
    };

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

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-scroll-container">
                <div className="form-grid">
                  <div className="input-group">
                    <label>Full Name</label>
                    <input type="text" name="fullName" placeholder="Enter your full name" required />
                  </div>
                  <div className="input-group">
                    <label>Organization</label>
                    <input type="text" name="organization" placeholder="Company name" required />
                  </div>
                  <div className="input-group">
                    <label>Business Email</label>
                    <input type="email" name="email" placeholder="email@company.com" required />
                  </div>
                  <div className="input-group">
                    <label>Country / Region</label>
                    <input type="text" name="country" placeholder="e.g. Morocco, UAE" required />
                  </div>
                </div>

                <div className="input-group full-width spaced-group">
                  <label>Area of Interest</label>
                  <select name="interest" required>
                    <option value="">Select an option</option>
                    <option value="matchmaking">B2B Matchmaking & Meetings</option>
                    <option value="events">Trade Missions & Hosted Buyer Programs</option>
                    <option value="strategy">Business Development & Market Entry</option>
                  </select>
                </div>

                <div className="input-group full-width spaced-group">
                  <label>Objectives / Context</label>
                  <textarea name="objectives" rows="4" placeholder="Briefly describe your goals..." />
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Request a discussion"}
                </button>

                {statusMessage && (
                  <p className={`status-message visible`} style={{
                    color: statusMessage.includes('Success') ? '#2ecc71' : '#e74c3c',
                    marginTop: '15px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}>
                    {statusMessage}
                  </p>
                )}
              </div>
            </form>
          </motion.div>


          <style>{`
            .modal-overlay {
              position: fixed;
              inset: 0;
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }

            .modal-backdrop {
              position: absolute;
              inset: 0;
              background: var(--extra-color-third);
              backdrop-filter: blur(12px);
            }

            .modal-card {
              position: relative;
              background: var(--extra-color-third);
              width: 100%;
              max-width: 750px;
              max-height: 90vh;
              border-radius: 20px;
              padding: 40px;
              box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5);
              z-index: 10000;
              display: flex;
              flex-direction: column;
            }

            .form-scroll-container {
              overflow-y: auto;
              padding-right: 5px;
              margin-top: 10px;
            }

            /* Custom scrollbar for better look */
            .form-scroll-container::-webkit-scrollbar {
              width: 4px;
            }

            .form-scroll-container::-webkit-scrollbar-thumb {
              background: rgba(0, 0, 0, 0.1);
              border-radius: 10px;
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
              z-index: 11;
            }

            .close-btn:hover {
              opacity: 1;
            }

            .form-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              column-gap: 20px;
              row-gap: 25px;
              margin-bottom: 25px;
            }

            .input-group {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }

            .input-group.full-width {
              grid-column: span 2;
            }

            .spaced-group {
              margin-bottom: 25px;
            }

            label {
              font-size: 0.7rem;
              font-weight: 800;
              color: var(--color-two);
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }

            input,
            select,
            textarea {
              padding: 12px 16px;
              background: #f4f7f9;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              font-size: 0.9rem;
              color: #071e2b;
              width: 100%;
            }

            input:focus {
              outline: none;
              border-color: #17b8c8;
            }

            .submit-btn {
              width: 100%;
              margin-top: 10px;
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

            .submit-btn:hover {
              background: #17b8c8;
              transform: translateY(-2px);
            }

            @media (max-width: 600px) {
              .modal-overlay {
                padding: 10px;
              }

              .modal-card {
                padding: 30px 20px 20px 20px;
                border-radius: 15px;
              }

              .form-grid {
                grid-template-columns: 1fr;
                row-gap: 15px;
              }

              .input-group.full-width {
                grid-column: span 1;
              }

              .spaced-group {
                margin-bottom: 15px;
              }

              .submit-btn {
                padding: 15px;
                font-size: 0.8rem;
              }

              input, select, textarea {
                font-size: 16px;
              }
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}