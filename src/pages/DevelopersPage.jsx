import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaGraduationCap, FaCode, FaCamera, FaCoffee, FaPen, FaExternalLinkAlt } from 'react-icons/fa';
import GitHubActivity from '../components/GitHubActivity';
import { useAuth } from '../context/AuthContext';
import { EditDeveloperModal } from '../components/EditModals';
import HireMeButton from '../components/HireMeButton';

function DevelopersPage() {
  const { t } = useTranslation();
  const { isAdmin, getDeveloperContent, updateDeveloperContent } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [content, setContent] = useState({
    aboutText: "I'm a 3rd year B.Tech IT student at Dharmsinh Desai University, Nadiad, Gujarat, passionate about building real-world applications that make a difference. Currently in my third year, I've developed a strong foundation in both frontend and backend technologies. My journey in tech started with curiosity about how websites work, and now I'm deeply immersed in Full Stack Development and AI/ML. I love the challenge of solving complex problems and creating elegant solutions.",
    bio: "When I'm not coding, you'll find me with my camera capturing moments, contributing to open source, or enjoying a cup of chai while debugging ☕.",
    skills: ["C", "C++", "Java", "Python", "JavaScript", "SQL", "React", "Spring Boot", "Node.js", "MongoDB", "MySQL", "Git", "GitHub"],
    funFact: "I debug best with a cup of chai ☕ - it's my secret superpower!"
  });

  useEffect(() => {
    const savedContent = getDeveloperContent();
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const handleUpdateContent = (newContent) => {
    if (updateDeveloperContent(newContent)) {
      setContent(newContent);
      setShowEditModal(false);
    }
  };

  const githubProfile = "https://github.com/prem-patel22";
  const profileImage = "https://avatars.githubusercontent.com/prem-patel22";
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '60px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
          {/* Profile Header with Gradient and Edit Pen */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '60px 40px 40px 40px',
            textAlign: 'center',
            position: 'relative'
          }}>
            {/* Animated Background Circles */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
              style={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                top: '-50px',
                right: '-50px'
              }}
            />
            
            {/* Edit Pen Icon - Only visible to Admin */}
            {isAdmin() && (
              <button 
                onClick={() => setShowEditModal(true)} 
                style={{ 
                  position: 'absolute', 
                  top: '20px', 
                  right: '20px', 
                  background: 'white', 
                  border: 'none', 
                  padding: '12px', 
                  borderRadius: '50%', 
                  cursor: 'pointer', 
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  zIndex: 10,
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <FaPen style={{ color: '#667eea', fontSize: '1.2rem' }} />
              </button>
            )}
            
            {/* Profile Image with GitHub link */}
            <motion.a
              href={githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                display: 'block',
                width: '180px',
                height: '180px',
                margin: '0 auto 20px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid white',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                cursor: 'pointer'
              }}
            >
              <img 
                src={profileImage}
                alt="Prem Patel - GitHub Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/180x180?text=Prem+Patel';
                }}
              />
            </motion.a>

            {/* Name and Title */}
            <motion.h1 
              variants={fadeInUp}
              style={{
                fontSize: '2.5rem',
                color: 'white',
                marginBottom: '10px',
                fontWeight: 'bold'
              }}
            >
              Prem Patel
            </motion.h1>
            
            <motion.div
              variants={fadeInUp}
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)',
                padding: '8px 20px',
                borderRadius: '50px',
                marginBottom: '15px'
              }}
            >
              <p style={{ color: 'white', fontSize: '1rem', margin: 0 }}>
                🎓 B.Tech Information Technology (2023–2027)
              </p>
            </motion.div>

            <motion.p 
              variants={fadeInUp}
              style={{
                color: 'rgba(255,255,255,0.95)',
                fontSize: '1.1rem',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              Full Stack Developer · AI/ML Enthusiast · Photographer
            </motion.p>

            {/* Big GitHub Button in Header */}
            <motion.a
              variants={fadeInUp}
              href={githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '25px',
                padding: '12px 30px',
                background: 'white',
                color: '#333',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
              }}
            >
              <FaGithub style={{ fontSize: '1.5rem' }} />
              View My GitHub Profile
              <FaExternalLinkAlt style={{ fontSize: '0.9rem' }} />
            </motion.a>

            {/* Hire Me Button - Added here below GitHub button */}
            <div style={{ marginTop: '20px' }}>
              <HireMeButton />
            </div>
          </div>

          {/* About Me Content */}
          <div style={{ padding: '40px' }}>
            
            {/* About Section */}
            <motion.section
              variants={fadeInUp}
              style={{ marginBottom: '40px' }}
            >
              <h2 style={{ 
                fontSize: '2rem', 
                color: '#333',
                marginBottom: '20px',
                borderLeft: '4px solid #667eea',
                paddingLeft: '15px'
              }}>
                {t('developers.about')}
              </h2>
              <div style={{
                background: '#f8f9fa',
                padding: '25px',
                borderRadius: '15px',
                lineHeight: '1.8',
                color: '#555'
              }}>
                <p style={{ marginBottom: '15px', fontSize: '1.05rem' }}>
                  {content.aboutText}
                </p>
                <p style={{ fontSize: '1.05rem' }}>
                  {content.bio}
                </p>
              </div>
            </motion.section>

            {/* Quick Info Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginBottom: '40px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', background: '#f8f9fa', borderRadius: '10px' }}>
                <FaMapMarkerAlt style={{ color: '#667eea', fontSize: '1.3rem' }} />
                <span>{t('developers.location')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', background: '#f8f9fa', borderRadius: '10px' }}>
                <FaGraduationCap style={{ color: '#667eea', fontSize: '1.3rem' }} />
                <span>{t('developers.education')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', background: '#f8f9fa', borderRadius: '10px' }}>
                <FaCode style={{ color: '#667eea', fontSize: '1.3rem' }} />
                <span>{t('developers.focus')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', background: '#f8f9fa', borderRadius: '10px' }}>
                <FaCamera style={{ color: '#667eea', fontSize: '1.3rem' }} />
                <span>{t('developers.hobbies')}</span>
              </div>
            </div>

            {/* Tech Stack Section */}
            <motion.section
              variants={fadeInUp}
              style={{ marginBottom: '40px' }}
            >
              <h2 style={{ 
                fontSize: '2rem', 
                color: '#333',
                marginBottom: '20px',
                borderLeft: '4px solid #667eea',
                paddingLeft: '15px'
              }}>
                {t('developers.techStack')}
              </h2>
              
              {/* Languages */}
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ color: '#667eea', marginBottom: '15px' }}>{t('developers.languages')}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {['C', 'C++', 'Java', 'Python', 'JavaScript', 'SQL'].map((lang, idx) => (
                    <span key={idx} style={{
                      background: '#e8eaf6',
                      color: '#5c6bc0',
                      padding: '8px 20px',
                      borderRadius: '25px',
                      fontWeight: '500',
                      fontSize: '14px'
                    }}>
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frontend */}
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ color: '#667eea', marginBottom: '15px' }}>{t('developers.frontend')}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {['HTML5', 'CSS3', 'React', 'Bootstrap'].map((tech, idx) => (
                    <span key={idx} style={{
                      background: '#e8eaf6',
                      color: '#5c6bc0',
                      padding: '8px 20px',
                      borderRadius: '25px',
                      fontWeight: '500',
                      fontSize: '14px'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ color: '#667eea', marginBottom: '15px' }}>{t('developers.backend')}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {['Spring Boot', 'JDBC', 'REST APIs', 'Node.js'].map((tech, idx) => (
                    <span key={idx} style={{
                      background: '#e8eaf6',
                      color: '#5c6bc0',
                      padding: '8px 20px',
                      borderRadius: '25px',
                      fontWeight: '500',
                      fontSize: '14px'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Database */}
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ color: '#667eea', marginBottom: '15px' }}>{t('developers.databases')}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {['MySQL', 'MongoDB'].map((db, idx) => (
                    <span key={idx} style={{
                      background: '#e8eaf6',
                      color: '#5c6bc0',
                      padding: '8px 20px',
                      borderRadius: '25px',
                      fontWeight: '500',
                      fontSize: '14px'
                    }}>
                      {db}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ color: '#667eea', marginBottom: '15px' }}>{t('developers.tools')}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA'].map((tool, idx) => (
                    <span key={idx} style={{
                      background: '#e8eaf6',
                      color: '#5c6bc0',
                      padding: '8px 20px',
                      borderRadius: '25px',
                      fontWeight: '500',
                      fontSize: '14px'
                    }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* GitHub Activity Component */}
            <GitHubActivity />

            {/* Currently Learning */}
            <motion.section
              variants={fadeInUp}
              style={{ marginBottom: '40px' }}
            >
              <h2 style={{ 
                fontSize: '2rem', 
                color: '#333',
                marginBottom: '20px',
                borderLeft: '4px solid #667eea',
                paddingLeft: '15px'
              }}>
                {t('developers.learning')}
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '15px'
              }}>
                {[
                  { name: 'Machine Learning', icon: '🤖', progress: '70%' },
                  { name: 'Spring Boot', icon: '🍃', progress: '75%' },
                  { name: 'React', icon: '⚛️', progress: '85%' },
                  { name: 'DSA', icon: '📊', progress: '80%' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    background: 'white',
                    padding: '15px',
                    borderRadius: '15px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{item.icon}</div>
                    <h4 style={{ margin: '0 0 10px', color: '#333' }}>{item.name}</h4>
                    <div style={{
                      background: '#e0e0e0',
                      borderRadius: '10px',
                      height: '8px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: item.progress,
                        background: 'linear-gradient(90deg, #667eea, #764ba2)',
                        height: '100%',
                        borderRadius: '10px'
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Current Projects */}
            <motion.section
              variants={fadeInUp}
              style={{ marginBottom: '40px' }}
            >
              <h2 style={{ 
                fontSize: '2rem', 
                color: '#333',
                marginBottom: '20px',
                borderLeft: '4px solid #667eea',
                paddingLeft: '15px'
              }}>
                {t('developers.projects')}
              </h2>
              <div style={{
                background: '#f8f9fa',
                padding: '25px',
                borderRadius: '15px'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #ddd' }}>
                      <th style={{ textAlign: 'left', padding: '10px', color: '#667eea' }}>Project</th>
                      <th style={{ textAlign: 'left', padding: '10px', color: '#667eea' }}>Tech Stack</th>
                      <th style={{ textAlign: 'left', padding: '10px', color: '#667eea' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '10px' }}>🌐 Personal Portfolio Website</td>
                      <td style={{ padding: '10px' }}>React · Framer Motion</td>
                      <td style={{ padding: '10px' }}>🔨 In Progress</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '10px' }}>🤖 ML Basics Notebook</td>
                      <td style={{ padding: '10px' }}>Python · Scikit-learn</td>
                      <td style={{ padding: '10px' }}>📚 Learning</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '10px' }}>🔗 REST API with Spring Boot</td>
                      <td style={{ padding: '10px' }}>Java · Spring Boot · MySQL</td>
                      <td style={{ padding: '10px' }}>🔨 In Progress</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* Connect Section */}
            <motion.section
              variants={fadeInUp}
              style={{ marginBottom: '20px' }}
            >
              <h2 style={{ 
                fontSize: '2rem', 
                color: '#333',
                marginBottom: '20px',
                borderLeft: '4px solid #667eea',
                paddingLeft: '15px'
              }}>
                {t('developers.connect')}
              </h2>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'center'
              }}>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={githubProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 30px',
                    background: '#333',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '50px',
                    fontWeight: 'bold'
                  }}
                >
                  <FaGithub style={{ fontSize: '1.3rem' }} /> GitHub
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.linkedin.com/in/prem-patel-50a59b27a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 30px',
                    background: '#0077b5',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '50px',
                    fontWeight: 'bold'
                  }}
                >
                  <FaLinkedin style={{ fontSize: '1.3rem' }} /> LinkedIn
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:patelpremalpeshkumar@gmail.com"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 30px',
                    background: '#ea4335',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '50px',
                    fontWeight: 'bold'
                  }}
                >
                  <FaEnvelope style={{ fontSize: '1.3rem' }} /> Email
                </motion.a>
              </div>
            </motion.section>

            {/* Fun Fact */}
            <motion.div
              variants={fadeInUp}
              style={{
                marginTop: '40px',
                padding: '20px',
                background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
                borderRadius: '15px',
                textAlign: 'center'
              }}
            >
              <FaCoffee style={{ color: '#667eea', fontSize: '2rem', marginBottom: '10px' }} />
              <p style={{ color: '#555', fontStyle: 'italic', margin: 0 }}>
                {content.funFact}
              </p>
              <p style={{ color: '#667eea', marginTop: '10px', fontSize: '0.9rem' }}>
                {t('developers.star')}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Edit Developer Modal */}
      {showEditModal && <EditDeveloperModal content={content} onClose={() => setShowEditModal(false)} onSave={handleUpdateContent} />}
    </div>
  );
}

export default DevelopersPage;