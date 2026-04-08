import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, 
  FaGraduationCap, FaCode, FaCamera, FaHeart, 
  FaLaptopCode, FaDatabase, FaCloud, FaTools,
  FaExternalLinkAlt, FaDownload, FaUserGraduate,
  FaReact, FaPython, FaJava, FaNodeJs, FaPhp,
  FaBriefcase, FaGlobe, FaCoffee, FaRocket, FaStar, FaGitAlt
} from 'react-icons/fa';
import { SiCplusplus, SiJavascript, SiMysql, SiSpringboot } from 'react-icons/si';

function DevelopersPage() {
  // Your GitHub profile link
  const githubProfile = "https://github.com/prem-patel22";
  
  // Your Image URL - Replace with your actual image URL
  const profileImage = "https://avatars.githubusercontent.com/prem-patel22";
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '60px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Main Card */}
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
          
          {/* Profile Header with Gradient */}
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
                👨‍💻 About Me
              </h2>
              <div style={{
                background: '#f8f9fa',
                padding: '25px',
                borderRadius: '15px',
                lineHeight: '1.8',
                color: '#555'
              }}>
                <p style={{ marginBottom: '15px', fontSize: '1.05rem' }}>
                  I'm a <strong>3rd year B.Tech IT student at Dharmsinh Desai University, Nadiad, Gujarat</strong>, 
                  passionate about building real-world applications that make a difference. Currently in my third year, 
                  I've developed a strong foundation in both frontend and backend technologies.
                </p>
                <p style={{ marginBottom: '15px', fontSize: '1.05rem' }}>
                  My journey in tech started with curiosity about how websites work, and now I'm deeply 
                  immersed in <strong>Full Stack Development and AI/ML</strong>. I love the challenge of solving 
                  complex problems and creating elegant solutions.
                </p>
                <p style={{ fontSize: '1.05rem' }}>
                  When I'm not coding, you'll find me with my camera capturing moments, contributing to 
                  open source, or enjoying a cup of chai while debugging ☕.
                </p>
              </div>
            </motion.section>

            {/* Quick Info Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
              }}
            >
              <motion.div variants={fadeInUp} style={{
                background: 'white',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <FaMapMarkerAlt style={{ color: '#667eea', fontSize: '2rem' }} />
                <div>
                  <h4 style={{ margin: 0, color: '#333' }}>Location</h4>
                  <p style={{ margin: '5px 0 0', color: '#666' }}>Nadiad, Gujarat, India</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} style={{
                background: 'white',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <FaGraduationCap style={{ color: '#667eea', fontSize: '2rem' }} />
                <div>
                  <h4 style={{ margin: 0, color: '#333' }}>Education</h4>
                  <p style={{ margin: '5px 0 0', color: '#666' }}>B.Tech IT, 3rd Year</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} style={{
                background: 'white',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <FaCode style={{ color: '#667eea', fontSize: '2rem' }} />
                <div>
                  <h4 style={{ margin: 0, color: '#333' }}>Focus</h4>
                  <p style={{ margin: '5px 0 0', color: '#666' }}>Full Stack · AI/ML</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} style={{
                background: 'white',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <FaCamera style={{ color: '#667eea', fontSize: '2rem' }} />
                <div>
                  <h4 style={{ margin: 0, color: '#333' }}>Hobbies</h4>
                  <p style={{ margin: '5px 0 0', color: '#666' }}>Photography · Open Source</p>
                </div>
              </motion.div>
            </motion.div>

            {/* GitHub Stats Section - FIXED with working URLs */}
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
                📊 GitHub Stats
              </h2>
              
              {/* Stats Cards Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                <div style={{
                  background: '#0D1117',
                  padding: '20px',
                  borderRadius: '15px',
                  textAlign: 'center',
                  color: 'white'
                }}>
                  <h3 style={{ fontSize: '2rem', color: '#39D353', margin: 0 }}>59</h3>
                  <p style={{ margin: '5px 0 0', color: '#C9D1D9' }}>Total Contributions</p>
                  <small style={{ color: '#8B949E' }}>Sep 18, 2025 - Present</small>
                </div>
                
                <div style={{
                  background: '#0D1117',
                  padding: '20px',
                  borderRadius: '15px',
                  textAlign: 'center',
                  color: 'white'
                }}>
                  <h3 style={{ fontSize: '2rem', color: '#39D353', margin: 0 }}>0</h3>
                  <p style={{ margin: '5px 0 0', color: '#C9D1D9' }}>Current Streak</p>
                  <small style={{ color: '#8B949E' }}>Apr 8</small>
                </div>
                
                <div style={{
                  background: '#0D1117',
                  padding: '20px',
                  borderRadius: '15px',
                  textAlign: 'center',
                  color: 'white'
                }}>
                  <h3 style={{ fontSize: '2rem', color: '#39D353', margin: 0 }}>5</h3>
                  <p style={{ margin: '5px 0 0', color: '#C9D1D9' }}>Longest Streak</p>
                  <small style={{ color: '#8B949E' }}>Oct 16, 2025 - Oct 20, 2025</small>
                </div>
              </div>

              {/* GitHub Stats Images - Using your working URLs */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <a href={githubProfile} target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://github-readme-stats-sigma-five.vercel.app/api?username=prem-patel22&show_icons=true&include_all_commits=true&count_private=true&hide_border=true&bg_color=0D1117&title_color=39D353&icon_color=39D353&text_color=C9D1D9"
                    alt="GitHub Stats"
                    style={{ 
                      height: '180px', 
                      borderRadius: '10px',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </a>
                
                <a href={githubProfile} target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=prem-patel22&layout=compact&hide_border=true&bg_color=0D1117&title_color=39D353&text_color=C9D1D9&langs_count=8"
                    alt="Top Languages"
                    style={{ 
                      height: '180px', 
                      borderRadius: '10px',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </a>
              </div>

              {/* Streak Stats */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <a href={githubProfile} target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://streak-stats.demolab.com/?user=prem-patel22&hide_border=true&background=0D1117&ring=39D353&fire=39D353&currStreakLabel=39D353&sideLabels=C9D1D9&dates=8B949E&stroke=39D353"
                    alt="GitHub Streak"
                    style={{ 
                      width: '100%', 
                      maxWidth: '500px', 
                      borderRadius: '10px',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </a>
              </div>

              {/* Contribution Graph */}
              <div style={{ textAlign: 'center' }}>
                <a href={githubProfile} target="_blank" rel="noopener noreferrer">
                  <img 
                    src="https://github-readme-activity-graph.vercel.app/graph?username=prem-patel22&bg_color=0D1117&color=39D353&line=39D353&point=FFFFFF&hide_border=true&radius=6"
                    alt="Contribution Graph"
                    style={{ 
                      width: '100%', 
                      borderRadius: '10px',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </a>
              </div>
            </motion.section>

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
                🛠️ Tech Stack
              </h2>
              
              {/* Languages */}
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ color: '#667eea', marginBottom: '15px' }}>💻 Languages</h3>
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
                <h3 style={{ color: '#667eea', marginBottom: '15px' }}>🌐 Frontend</h3>
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
                <h3 style={{ color: '#667eea', marginBottom: '15px' }}>⚙️ Backend & Frameworks</h3>
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
                <h3 style={{ color: '#667eea', marginBottom: '15px' }}>🗄️ Databases</h3>
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
                <h3 style={{ color: '#667eea', marginBottom: '15px' }}>🧰 Tools & IDEs</h3>
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
                📚 Currently Leveling Up
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
                🚀 Current Projects
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
                    <tr>
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
                🤝 Let's Connect
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
                "I debug best with a cup of chai ☕ - it's my secret superpower!"
              </p>
              <p style={{ color: '#667eea', marginTop: '10px', fontSize: '0.9rem' }}>
                ⭐ If you like what you see, consider starring a repo or two! | Made with ❤️ from Gujarat, India
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default DevelopersPage;