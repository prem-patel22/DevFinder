import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaCode, FaUsers, FaRocket, FaArrowRight } from 'react-icons/fa';
import ThreeDGlobe from '../components/ThreeDGlobe';
import ChatWidget from '../components/ChatWidget';

// Enhanced Typing animation component
function TypingAnimation() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const words = [
    t('typing.dev1'),
    t('typing.dev2'),
    t('typing.dev3'),
    t('typing.dev4'),
    t('typing.dev5')
  ];
  
  useEffect(() => {
    const currentWord = words[wordIndex];
    
    if (!isDeleting && index < currentWord.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + currentWord[index]);
        setIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && index === currentWord.length) {
      setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && index > 0) {
      const timeout = setTimeout(() => {
        setText(prev => prev.slice(0, -1));
        setIndex(prev => prev - 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (isDeleting && index === 0) {
      setIsDeleting(false);
      setWordIndex(prev => (prev + 1) % words.length);
    }
  }, [index, wordIndex, isDeleting, t]);
  
  return (
    <h2 style={{
      fontSize: '1.8rem',
      color: '#f0f0f0',
      marginBottom: '20px',
      minHeight: '70px',
      fontFamily: 'monospace'
    }}>
      {text}
      <span style={{
        display: 'inline-block',
        width: '3px',
        height: '30px',
        backgroundColor: 'white',
        marginLeft: '5px',
        animation: 'blink 1s infinite'
      }}></span>
    </h2>
  );
}

function HomePage() {
  const { t } = useTranslation();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const floatAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div>
      {/* Hero Section with Gradient Background */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '120px 20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background Circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            top: '-100px',
            right: '-100px'
          }}
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '50%',
            bottom: '-200px',
            left: '-150px'
          }}
        />

        <motion.div variants={fadeInUp}>
          <motion.h1 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              fontSize: '3.5rem',
              marginBottom: '20px',
              fontWeight: 'bold'
            }}
          >
            {t('hero.title')}
          </motion.h1>
          
          {/* Enhanced Typing Animation Component */}
          <TypingAnimation />
          
          <motion.p 
            variants={fadeInUp}
            style={{
              fontSize: '1.3rem',
              marginBottom: '30px',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.6'
            }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button style={{
              padding: '15px 35px',
              fontSize: '18px',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}>
              {t('hero.button')} <FaArrowRight style={{ marginLeft: '10px' }} />
            </button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 3D Globe Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ThreeDGlobe />
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        style={{
          padding: '80px 20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <motion.h2 
          variants={fadeInUp}
          style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '50px',
            color: '#333'
          }}
        >
          {t('features.title')}
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginTop: '20px'
        }}>
          <motion.div 
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            style={{
              textAlign: 'center',
              padding: '30px',
              borderRadius: '15px',
              background: 'white',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}
          >
            <motion.div
              animate={floatAnimation}
              style={{ fontSize: '3rem', marginBottom: '20px', color: '#667eea' }}
            >
              <FaCode />
            </motion.div>
            <h3 style={{ marginBottom: '15px', color: '#333' }}>{t('features.skills')}</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>{t('features.skills.desc')}</p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            style={{
              textAlign: 'center',
              padding: '30px',
              borderRadius: '15px',
              background: 'white',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}
          >
            <motion.div
              animate={floatAnimation}
              transition={{ delay: 0.5 }}
              style={{ fontSize: '3rem', marginBottom: '20px', color: '#667eea' }}
            >
              <FaUsers />
            </motion.div>
            <h3 style={{ marginBottom: '15px', color: '#333' }}>{t('features.connect')}</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>{t('features.connect.desc')}</p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            style={{
              textAlign: 'center',
              padding: '30px',
              borderRadius: '15px',
              background: 'white',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}
          >
            <motion.div
              animate={floatAnimation}
              transition={{ delay: 1 }}
              style={{ fontSize: '3rem', marginBottom: '20px', color: '#667eea' }}
            >
              <FaRocket />
            </motion.div>
            <h3 style={{ marginBottom: '15px', color: '#333' }}>{t('features.grow')}</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>{t('features.grow.desc')}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section with Count Animation */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '60px 20px',
          color: 'white'
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <h2 style={{ fontSize: '3rem', marginBottom: '10px' }}>1000+</h2>
            <p>{t('stats.developers')}</p>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          >
            <h2 style={{ fontSize: '3rem', marginBottom: '10px' }}>500+</h2>
            <p>{t('stats.projects')}</p>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
          >
            <h2 style={{ fontSize: '3rem', marginBottom: '10px' }}>50+</h2>
            <p>{t('stats.companies')}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        style={{
          padding: '80px 20px',
          textAlign: 'center',
          background: '#f8f9fa'
        }}
      >
        <motion.h2 
          variants={fadeInUp}
          style={{
            fontSize: '2rem',
            marginBottom: '20px',
            color: '#333'
          }}
        >
          {t('cta.title')}
        </motion.h2>
        
        <motion.p 
          variants={fadeInUp}
          style={{
            fontSize: '1.2rem',
            marginBottom: '30px',
            color: '#666'
          }}
        >
          {t('cta.subtitle')}
        </motion.p>
        
        <motion.button
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '15px 40px',
            fontSize: '18px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {t('cta.button')}
        </motion.button>
      </motion.section>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}

export default HomePage;