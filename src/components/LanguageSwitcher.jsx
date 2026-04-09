import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentLanguage = i18n.language;

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
    { code: 'gu', name: 'Gujarati', flag: '🇮🇳', nativeName: 'ગુજરાતી' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    setIsDropdownOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          background: '#f8f9fa',
          color: '#333',
          border: '1px solid #e0e0e0',
          borderRadius: '25px',
          fontWeight: 'bold',
          fontSize: '12px',
          cursor: 'pointer'
        }}
      >
        <FaGlobe /> {currentLang.flag} {currentLang.nativeName} <FaChevronDown style={{ fontSize: '10px' }} />
      </motion.button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '10px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              minWidth: '180px',
              overflow: 'hidden',
              zIndex: 1000
            }}
          >
            {languages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: 'none',
                  background: currentLanguage === lang.code ? '#667eea20' : 'white',
                  cursor: 'pointer',
                  borderBottom: index < languages.length - 1 ? '1px solid #eee' : 'none',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.background = currentLanguage === lang.code ? '#667eea20' : 'white'}
              >
                <span style={{ fontSize: '20px' }}>{lang.flag}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px' }}>{lang.name}</div>
                  <div style={{ fontSize: '11px', color: '#666' }}>{lang.nativeName}</div>
                </div>
                {currentLanguage === lang.code && (
                  <span style={{ marginLeft: 'auto', color: '#667eea', fontSize: '12px' }}>✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSwitcher;