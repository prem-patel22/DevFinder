import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaBars, FaTimes, FaDownload, FaFilePdf, FaChevronDown, FaUser, FaUserShield, FaCrown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import VisitorCounter from './VisitorCounter';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import LanguageSwitcher from './LanguageSwitcher';

function Header() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const { user, logout, isSuperAdmin, isAdmin } = useAuth();

  const navLinks = [
    { path: '/', name: t('nav.home') },
    { path: '/projects', name: t('nav.projects') },
    { path: '/live-url', name: t('nav.liveUrl') },
    { path: '/blog', name: t('nav.blog') },
    { path: '/developers', name: t('nav.developers') },
    { path: '/contact', name: t('nav.contact') }
  ];

  const downloadOptions = [
    {
      name: 'Resume Only',
      filename: 'Prem_Patel_Resume.pdf',
      icon: <FaFilePdf />,
      description: 'My professional resume'
    },
    {
      name: 'Cover Letter Only',
      filename: 'Prem_Patel_Cover_Letter.pdf',
      icon: <FaFilePdf />,
      description: 'Cover letter for opportunities'
    },
    {
      name: 'Both (Resume + Cover Letter)',
      filename: 'Prem_Patel_Both.pdf',
      icon: <FaFilePdf />,
      description: 'Complete application package'
    }
  ];

  const handleDownload = (filename, displayName) => {
    const link = document.createElement('a');
    link.href = `/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDropdownOpen(false);
  };

  const getRoleBadge = () => {
    if (isSuperAdmin()) {
      return {
        icon: <FaCrown style={{ marginRight: '3px', fontSize: '10px' }} />,
        text: 'Super Admin',
        bgColor: '#8B5CF6',
        textColor: 'white'
      };
    } else if (isAdmin()) {
      return {
        icon: <FaUserShield style={{ marginRight: '3px', fontSize: '10px' }} />,
        text: 'Admin',
        bgColor: '#f59e0b',
        textColor: 'white'
      };
    } else if (user) {
      return {
        icon: <FaUser style={{ marginRight: '3px', fontSize: '10px' }} />,
        text: 'User',
        bgColor: '#10b981',
        textColor: 'white'
      };
    }
    return null;
  };

  const roleBadge = user ? getRoleBadge() : null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.h1
            whileHover={{ scale: 1.05 }}
            style={{
              margin: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.8rem'
            }}
          >
            DevFinder
          </motion.h1>
        </Link>

        <div style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  textDecoration: 'none',
                  color: location.pathname === link.path ? '#667eea' : '#333',
                  fontWeight: location.pathname === link.path ? 'bold' : 'normal',
                  fontSize: '14px'
                }}
              >
                {link.name}
              </Link>
            ))}
            {/* Bookings Link - Desktop - Only visible to Admin */}
            {isAdmin() && (
              <Link
                to="/bookings"
                style={{
                  textDecoration: 'none',
                  color: location.pathname === '/bookings' ? '#667eea' : '#333',
                  fontWeight: location.pathname === '/bookings' ? 'bold' : 'normal',
                  fontSize: '14px'
                }}
              >
                📅 Bookings
              </Link>
            )}
          </div>

          <VisitorCounter />

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
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontWeight: 'bold',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              <FaDownload /> {t('nav.downloads')} <FaChevronDown style={{ fontSize: '10px' }} />
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
                    minWidth: '280px',
                    overflow: 'hidden',
                    zIndex: 1000
                  }}
                >
                  {downloadOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleDownload(option.filename, option.name)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        border: 'none',
                        background: 'white',
                        cursor: 'pointer',
                        borderBottom: index < downloadOptions.length - 1 ? '1px solid #eee' : 'none',
                      }}
                    >
                      <div style={{ background: '#667eea20', padding: '8px', borderRadius: '8px', color: '#667eea' }}>
                        {option.icon}
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontWeight: 'bold', color: '#333', fontSize: '13px' }}>{option.name}</div>
                        <div style={{ fontSize: '11px', color: '#666' }}>{option.description}</div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {!user ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLoginModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              <FaUser /> {t('nav.login')}
            </motion.button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#667eea', fontWeight: 'bold', fontSize: '14px' }}>
                  👋 {user.name}
                </span>
                {roleBadge && (
                  <span style={{
                    background: roleBadge.bgColor,
                    color: roleBadge.textColor,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {roleBadge.icon} {roleBadge.text}
                  </span>
                )}
              </div>
              {isAdmin() && (
                <>
                  <Link to="/admin" style={{ color: '#667eea', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
                    {t('nav.dashboard')}
                  </Link>
                  <Link to="/bookings" style={{ color: '#f59e0b', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
                    📅 Bookings
                  </Link>
                </>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                style={{
                  padding: '5px 12px',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                {t('nav.logout')}
              </motion.button>
            </div>
          )}

          <motion.a
            href="https://github.com/prem-patel22"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: '#333', fontSize: '2rem', display: 'flex', alignItems: 'center' }}
          >
            <FaGithub />
          </motion.a>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              color: '#333'
            }}
            className="mobile-menu-btn"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              display: 'none',
              flexDirection: 'column',
              background: 'white',
              padding: '20px',
              gap: '15px',
              borderTop: '1px solid #eee'
            }}
            className="mobile-menu"
          >
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} style={{ padding: '10px', textDecoration: 'none', color: location.pathname === link.path ? '#667eea' : '#333' }}>
                {link.name}
              </Link>
            ))}
            {/* Bookings Link - Mobile Menu - Only visible to Admin */}
            {isAdmin() && (
              <Link to="/bookings" onClick={() => setIsOpen(false)} style={{ padding: '10px', textDecoration: 'none', color: location.pathname === '/bookings' ? '#667eea' : '#333' }}>
                📅 Bookings
              </Link>
            )}
            <div style={{ padding: '10px 0' }}><VisitorCounter /></div>
            {!user ? (
              <button onClick={() => { setShowLoginModal(true); setIsOpen(false); }} style={{ padding: '10px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                <FaUser /> {t('nav.login')}
              </button>
            ) : (
              <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontWeight: 'bold' }}>👋 {user.name}</span>
                  {roleBadge && (
                    <span style={{ background: roleBadge.bgColor, color: roleBadge.textColor, padding: '2px 8px', borderRadius: '12px', fontSize: '10px' }}>
                      {roleBadge.text}
                    </span>
                  )}
                </div>
                {isAdmin() && (
                  <>
                    <Link to="/admin" style={{ display: 'block', marginBottom: '10px', color: '#667eea' }}>{t('nav.dashboard')}</Link>
                    <Link to="/bookings" style={{ display: 'block', marginBottom: '10px', color: '#f59e0b' }}>📅 Bookings</Link>
                  </>
                )}
                <button onClick={logout} style={{ width: '100%', padding: '8px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{t('nav.logout')}</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      <style>{`
        @media (max-width: 968px) { .mobile-menu-btn { display: block !important; } .mobile-menu { display: flex !important; } }
        @media (min-width: 969px) { .mobile-menu-btn { display: none !important; } .mobile-menu { display: none !important; } }
      `}</style>
    </motion.header>
  );
}

export default Header;