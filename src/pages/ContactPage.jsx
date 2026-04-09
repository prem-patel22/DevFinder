import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaUser, FaEnvelope, FaComment, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import HireMeButton from '../components/HireMeButton';

function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success(t('contact.success'));
    
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '60px 20px'
    }}>
      <Toaster position="top-right" />
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          style={{
            background: 'white',
            borderRadius: '30px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '40px',
            textAlign: 'center',
            color: 'white'
          }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{t('contact.title')}</h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.95 }}>{t('contact.subtitle')}</p>
          </div>

          <div style={{ padding: '40px' }}>
            {/* Hire Me Button Section */}
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '30px',
              padding: '20px',
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '15px'
            }}>
              <h3 style={{ color: '#d97706', marginBottom: '10px' }}>💼 Want to hire me?</h3>
              <p style={{ color: '#92400e', marginBottom: '15px' }}>Click below to check my consultation packages</p>
              <HireMeButton />
            </div>

            {/* Divider */}
            <div style={{ 
              textAlign: 'center', 
              margin: '20px 0',
              position: 'relative',
              borderBottom: '1px solid #eee'
            }}>
              <span style={{ 
                background: 'white', 
                padding: '0 10px', 
                color: '#999',
                position: 'relative',
                top: '10px'
              }}>
                OR
              </span>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#333',
                    fontWeight: 'bold'
                  }}>
                    <FaUser style={{ marginRight: '8px', color: '#667eea' }} />
                    {t('contact.name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '10px',
                      fontSize: '16px',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#333',
                    fontWeight: 'bold'
                  }}>
                    <FaEnvelope style={{ marginRight: '8px', color: '#667eea' }} />
                    {t('contact.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '10px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#333',
                    fontWeight: 'bold'
                  }}>
                    <FaComment style={{ marginRight: '8px', color: '#667eea' }} />
                    {t('contact.message')} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '10px',
                      fontSize: '16px',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: isSubmitting ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                >
                  {isSubmitting ? t('contact.sending') : (
                    <>
                      {t('contact.send')} <FaPaperPlane />
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: 'center',
                  padding: '40px'
                }}
              >
                <FaCheckCircle style={{ fontSize: '60px', color: '#10b981', marginBottom: '20px' }} />
                <h2 style={{ color: '#333', marginBottom: '10px' }}>{t('contact.success')} 🎉</h2>
                <p style={{ color: '#666' }}>
                  Thanks for reaching out! I'll get back to you within 24-48 hours.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ContactPage;