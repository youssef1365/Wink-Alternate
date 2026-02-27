import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select';
import countryList from 'react-select-country-list';

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [country, setCountry] = useState(null);
  const [localPhone, setLocalPhone] = useState("");

  const countryOptions = useMemo(() => countryList().getData(), []);

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

  const getDialCode = (isoCode) => {
    if (!isoCode) return "";
    try {
      const phone = new Intl.DisplayNames(['en'], { type: 'region' });
      const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
      const formatter = new Intl.NumberFormat('en', {
        style: 'currency', currency: 'USD',
      });
    } catch {}
    const dialCodes = {
      AF:'+93',AL:'+355',DZ:'+213',AD:'+376',AO:'+244',AG:'+1',AR:'+54',AM:'+374',AU:'+61',AT:'+43',
      AZ:'+994',BS:'+1',BH:'+973',BD:'+880',BB:'+1',BY:'+375',BE:'+32',BZ:'+501',BJ:'+229',BT:'+975',
      BO:'+591',BA:'+387',BW:'+267',BR:'+55',BN:'+673',BG:'+359',BF:'+226',BI:'+257',CV:'+238',KH:'+855',
      CM:'+237',CA:'+1',CF:'+236',TD:'+235',CL:'+56',CN:'+86',CO:'+57',KM:'+269',CG:'+242',CD:'+243',
      CR:'+506',CI:'+225',HR:'+385',CU:'+53',CY:'+357',CZ:'+420',DK:'+45',DJ:'+253',DM:'+1',DO:'+1',
      EC:'+593',EG:'+20',SV:'+503',GQ:'+240',ER:'+291',EE:'+372',SZ:'+268',ET:'+251',FJ:'+679',FI:'+358',
      FR:'+33',GA:'+241',GM:'+220',GE:'+995',DE:'+49',GH:'+233',GR:'+30',GD:'+1',GT:'+502',GN:'+224',
      GW:'+245',GY:'+592',HT:'+509',HN:'+504',HU:'+36',IS:'+354',IN:'+91',ID:'+62',IR:'+98',IQ:'+964',
      IE:'+353',IL:'+972',IT:'+39',JM:'+1',JP:'+81',JO:'+962',KZ:'+7',KE:'+254',KI:'+686',KP:'+850',
      KR:'+82',KW:'+965',KG:'+996',LA:'+856',LV:'+371',LB:'+961',LS:'+266',LR:'+231',LY:'+218',LI:'+423',
      LT:'+370',LU:'+352',MG:'+261',MW:'+265',MY:'+60',MV:'+960',ML:'+223',MT:'+356',MH:'+692',MR:'+222',
      MU:'+230',MX:'+52',FM:'+691',MD:'+373',MC:'+377',MN:'+976',ME:'+382',MA:'+212',MZ:'+258',MM:'+95',
      NA:'+264',NR:'+674',NP:'+977',NL:'+31',NZ:'+64',NI:'+505',NE:'+227',NG:'+234',MK:'+389',NO:'+47',
      OM:'+968',PK:'+92',PW:'+680',PS:'+970',PA:'+507',PG:'+675',PY:'+595',PE:'+51',PH:'+63',PL:'+48',
      PT:'+351',QA:'+974',RO:'+40',RU:'+7',RW:'+250',KN:'+1',LC:'+1',VC:'+1',WS:'+685',SM:'+378',
      ST:'+239',SA:'+966',SN:'+221',RS:'+381',SC:'+248',SL:'+232',SG:'+65',SK:'+421',SI:'+386',SB:'+677',
      SO:'+252',ZA:'+27',SS:'+211',ES:'+34',LK:'+94',SD:'+249',SR:'+597',SE:'+46',CH:'+41',SY:'+963',
      TW:'+886',TJ:'+992',TZ:'+255',TH:'+66',TL:'+670',TG:'+228',TO:'+676',TT:'+1',TN:'+216',TR:'+90',
      TM:'+993',TV:'+688',UG:'+256',UA:'+380',AE:'+971',GB:'+44',US:'+1',UY:'+598',UZ:'+998',VU:'+678',
      VE:'+58',VN:'+84',YE:'+967',ZM:'+260',ZW:'+263',
    };
    return dialCodes[isoCode.toUpperCase()] || "";
  };

  const handleCountryChange = (selected) => {
    setCountry(selected);
    setLocalPhone("");
  };

  const dialCode = country ? getDialCode(country.value) : "";

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
          country: country?.label || "",
          interest: payload.interest,
          phone: dialCode ? `${dialCode} ${localPhone}` : localPhone,
          message: payload.objectives,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setStatusMessage("Success! We will contact you shortly.");
        e.target.reset();
        setLocalPhone("");
        setCountry(null);
      } else {
        setStatusMessage(result.error || result.message || "Server error. Please try again.");
      }
    } catch (err) {
      setStatusMessage("Connection error. Please check your internet or SSL.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      background: '#f4f7f9',
      border: `1px solid ${state.isFocused ? '#17b8c8' : '#e2e8f0'}`,
      borderRadius: '8px',
      minHeight: '46px',
      boxShadow: 'none',
      cursor: 'pointer',
      '&:hover': { borderColor: '#17b8c8' },
    }),
    valueContainer: (base) => ({ ...base, padding: '0 16px' }),
    input: (base) => ({ ...base, color: '#071e2b', margin: 0, padding: 0 }),
    singleValue: (base) => ({ ...base, color: '#071e2b', fontSize: '16px' }),
    placeholder: (base) => ({ ...base, color: '#9aa5b4', fontSize: '16px' }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base) => ({ ...base, color: '#9aa5b4' }),
    menu: (base) => ({
      ...base,
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
      zIndex: 99999,
    }),
    menuPortal: (base) => ({ ...base, zIndex: 99999 }),
    menuList: (base) => ({ ...base, maxHeight: '200px', padding: '4px 0' }),
    option: (base, state) => ({
      ...base,
      fontSize: '14px',
      color: '#071e2b',
      background: state.isSelected ? '#e6f9fb' : state.isFocused ? '#f0fbfc' : 'white',
      cursor: 'pointer',
    }),
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
            <div className="modal-header">
              <button className="close-btn" onClick={onClose}>✕</button>
            </div>

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
                    <Select
                      options={countryOptions}
                      value={country}
                      onChange={handleCountryChange}
                      placeholder="Select your country"
                      isClearable
                      isSearchable
                      styles={selectStyles}
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                    />
                  </div>
                </div>

                <div className="input-group full-width spaced-group">
                  <label>Phone Number</label>
                  <div className="phone-input-wrapper">
                    {dialCode && (
                      <span className="dial-badge">{dialCode}</span>
                    )}
                    <input
                      type="tel"
                      className={`phone-local${dialCode ? ' has-badge' : ''}`}
                      placeholder="Enter phone number"
                      value={localPhone}
                      onChange={(e) => setLocalPhone(e.target.value)}
                      required
                    />
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
                  {isSubmitting ? "Sending..." : "Submit your request"}
                </button>

                {statusMessage && (
                  <p style={{
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
              align-items: flex-end;
              justify-content: center;
              padding: 20px;
            }

            @media (min-width: 601px) {
              .modal-overlay { align-items: center; }
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
              height: 90dvh;
              max-height: 90dvh;
              border-radius: 20px;
              padding: 0;
              box-shadow: 0 30px 60px -12px rgba(0,0,0,0.5);
              z-index: 10000;
              display: flex;
              flex-direction: column;
              overflow: hidden;
            }

            .modal-header {
              flex-shrink: 0;
              display: flex;
              justify-content: flex-end;
              padding: 20px 20px 0;
            }

            .close-btn {
              background: none;
              border: none;
              font-size: 1.5rem;
              cursor: pointer;
              color: #071e2b;
              opacity: 0.5;
              line-height: 1;
              padding: 4px;
            }
            .close-btn:hover { opacity: 1; }

            .contact-form {
              flex: 1;
              min-height: 0;
              display: flex;
              flex-direction: column;
            }

            .form-scroll-container {
              flex: 1;
              min-height: 0;
              overflow-y: auto;
              -webkit-overflow-scrolling: touch;
              padding: 16px 40px 32px;
            }
            .form-scroll-container::-webkit-scrollbar { width: 4px; }
            .form-scroll-container::-webkit-scrollbar-thumb {
              background: rgba(0,0,0,0.1);
              border-radius: 10px;
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
              position: relative;
            }
            .input-group.full-width { grid-column: span 2; }
            .spaced-group { margin-bottom: 25px; }

            label {
              font-size: 0.7rem;
              font-weight: 800;
              color: var(--color-two);
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }

            input, select, textarea {
              padding: 12px 16px;
              background: #f4f7f9;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              font-size: 16px;
              color: #071e2b;
              width: 100%;
              box-sizing: border-box;
            }
            input:focus, select:focus, textarea:focus {
              outline: none;
              border-color: #17b8c8;
            }

            .phone-input-wrapper {
              display: flex;
              align-items: center;
              background: #f4f7f9;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              overflow: hidden;
            }
            .phone-input-wrapper:focus-within {
              border-color: #17b8c8;
            }
            .dial-badge {
              flex-shrink: 0;
              padding: 0 14px;
              font-size: 15px;
              font-weight: 700;
              color: #071e2b;
              background: #e8edf1;
              border-right: 1px solid #e2e8f0;
              height: 100%;
              min-height: 46px;
              display: flex;
              align-items: center;
              white-space: nowrap;
            }
            .phone-local {
              border: none !important;
              background: transparent !important;
              border-radius: 0 !important;
              flex: 1;
              width: auto !important;
            }
            .phone-local:focus {
              outline: none !important;
              border-color: transparent !important;
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
              min-height: 56px;
            }
            .submit-btn:hover { background: #17b8c8; transform: translateY(-2px); }

            @media (max-width: 600px) {
              .modal-overlay { padding: 0; }
              .modal-card {
                height: 92dvh;
                max-height: 92dvh;
                border-radius: 20px 20px 0 0;
                width: 100%;
                max-width: 100%;
              }
              .form-scroll-container { padding: 12px 20px 40px; }
              .form-grid {
                grid-template-columns: 1fr;
                row-gap: 16px;
                margin-bottom: 16px;
              }
              .input-group.full-width { grid-column: span 1; }
              .spaced-group { margin-bottom: 16px; }
              .submit-btn { padding: 16px; font-size: 0.85rem; }
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}