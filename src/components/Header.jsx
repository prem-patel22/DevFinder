import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaBars, FaTimes, FaDownload, FaFilePdf, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/projects', name: 'Projects' },
    { path: '/live-url', name: 'Live URL' },
    { path: '/blog', name: 'Blog' },
    { path: '/developers', name: 'Developers' },
    { path: '/contact', name: 'Contact' }
  ];

  // Download options
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
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = `/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Close dropdown after download
    setIsDropdownOpen(false);
    
    // Optional: Track download analytics
    console.log(`Downloading: ${displayName} (${filename})`);
  };

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
        transition: 'background-color 0.3s ease'
      }}
    >
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center'
        }}>
          {/* Navigation Links - Desktop */}
          <div style={{ 
            display: 'flex', 
            gap: '20px'
          }}>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  textDecoration: 'none',
                  color: location.pathname === link.path ? '#667eea' : '#333',
                  fontWeight: location.pathname === link.path ? 'bold' : 'normal',
                  transition: 'color 0.3s'
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Download Dropdown Button */}
          <div style={{ position: 'relative' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer'
              }}
              title="Download Documents"
            >
              <FaDownload /> Downloads <FaChevronDown style={{ fontSize: '12px' }} />
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
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
                  <div style={{
                    padding: '12px',
                    borderBottom: '1px solid #eee',
                    background: '#f8f9fa'
                  }}>
                    <strong style={{ color: '#333' }}>Download Documents</strong>
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                      Choose what you'd like to download
                    </p>
                  </div>
                  
                  {downloadOptions.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ backgroundColor: '#f8f9fa' }}
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
                        textAlign: 'left',
                        borderBottom: index < downloadOptions.length - 1 ? '1px solid #eee' : 'none',
                        transition: 'background 0.2s'
                      }}
                    >
                      <div style={{
                        background: '#667eea20',
                        padding: '8px',
                        borderRadius: '8px',
                        color: '#667eea'
                      }}>
                        {option.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', color: '#333', fontSize: '14px' }}>
                          {option.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {option.description}
                        </div>
                      </div>
                      <FaDownload style={{ color: '#999', fontSize: '12px' }} />
                    </motion.button>
                  ))}
                  
                  <div style={{
                    padding: '10px 16px',
                    borderTop: '1px solid #eee',
                    background: '#f8f9fa',
                    fontSize: '11px',
                    color: '#999',
                    textAlign: 'center'
                  }}>
                    All documents are in PDF format
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BIGGER GITHUB ICON */}
          <motion.a
            href="https://github.com/prem-patel22"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            style={{
              color: '#333',
              fontSize: '2rem',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.3s ease'
            }}
            title="Visit my GitHub Profile"
          >
            <FaGithub />
          </motion.a>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
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
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{
                  textDecoration: 'none',
                  color: location.pathname === link.path ? '#667eea' : '#333',
                  fontWeight: location.pathname === link.path ? 'bold' : 'normal',
                  padding: '10px',
                  transition: 'color 0.3s'
                }}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Download Options */}
            <div style={{ borderTop: '1px solid #eee', paddingTop: '15px', marginTop: '5px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>
                <FaDownload style={{ marginRight: '8px' }} /> Downloads
              </div>
              {downloadOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleDownload(option.filename, option.name);
                    setIsOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: '#f8f9fa',
                    border: 'none',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <FaFilePdf style={{ color: '#e74c3c' }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                      {option.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#666' }}>
                      {option.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add responsive CSS */}
      <style>
        {`
          @media (max-width: 968px) {
            .mobile-menu-btn {
              display: block !important;
            }
            .mobile-menu {
              display: flex !important;
            }
          }
          
          @media (min-width: 969px) {
            .mobile-menu-btn {
              display: none !important;
            }
            .mobile-menu {
              display: none !important;
            }
          }
        `}
      </style>
    </motion.header>
  );
}

export default Header;