import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaSearch, FaFilter, FaBrain, FaBook, FaPlane, FaTasks, FaChartLine } from 'react-icons/fa';

// Your actual GitHub projects
const allProjects = [
  {
    id: 1,
    title: "Federated Medical Imaging",
    description: "🏥 Privacy-preserving federated learning system where 3 hospitals collaborate to detect pneumonia without sharing patient data. HIPAA-compliant with differential privacy & Grad-CAM explainability.",
    tech: ["Python", "PyTorch", "Federated Learning", "Differential Privacy", "Streamlit", "Grad-CAM"],
    githubLink: "https://github.com/prem-patel22/federated-medical-imaging-fl",
    liveLink: null,
    category: "AI/ML",
    featured: true,
    icon: <FaBrain />,
    stats: {
      accuracy: "87.3%",
      hospitals: 3,
      samples: "2,471"
    }
  },
  {
    id: 2,
    title: "Library Management System",
    description: "📚 Comprehensive library management system with book borrowing, returns, inventory tracking, and user management. Features include barcode scanning, fine calculation, and real-time availability.",
    tech: ["Java", "Spring Boot", "MySQL", "React", "REST API"],
    githubLink: "https://github.com/prem-patel22/LibraryManagementSystem",
    liveLink: null,
    category: "Web App",
    featured: true,
    icon: <FaBook />,
    stats: {
      books: "10,000+",
      users: "500+",
      transactions: "5,000+"
    }
  },
  {
    id: 3,
    title: "Planora",
    description: "📅 Smart project management and collaboration platform. Features include task tracking, team collaboration, deadline management, and real-time notifications.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    githubLink: "https://github.com/prem-patel22/Planora",
    liveLink: null,
    category: "Web App",
    featured: true,
    icon: <FaTasks />,
    stats: {
      tasks: "1,000+",
      teams: "50+",
      projects: "100+"
    }
  },
  {
    id: 4,
    title: "TravelEase",
    description: "✈️ All-in-one travel planning platform that helps users book flights, hotels, and create itineraries. Includes price comparison, travel guides, and booking management.",
    tech: ["React", "Python", "Django", "PostgreSQL", "REST API"],
    githubLink: "https://github.com/prem-patel22/TravelEase",
    liveLink: null,
    category: "Travel",
    featured: false,
    icon: <FaPlane />,
    stats: {
      destinations: "500+",
      bookings: "2,000+",
      users: "1,000+"
    }
  },
  {
    id: 5,
    title: "Travl",
    description: "🌍 Social travel platform where users share experiences, create travel blogs, and discover hidden gems. Features include interactive maps, photo sharing, and travel recommendations.",
    tech: ["MERN Stack", "MongoDB", "Express", "React", "Node.js", "Leaflet"],
    githubLink: "https://github.com/prem-patel22/travl",
    liveLink: null,
    category: "Travel",
    featured: false,
    icon: <FaPlane />,
    stats: {
      posts: "3,000+",
      photos: "10,000+",
      travelers: "2,500+"
    }
  },
  {
    id: 6,
    title: "Todo App",
    description: "✅ Feature-rich todo application with task management, categories, due dates, priority levels, and progress tracking. Includes dark mode and local storage persistence.",
    tech: ["React", "Redux", "CSS3", "LocalStorage", "Hooks"],
    githubLink: "https://github.com/prem-patel22/todo-app",
    liveLink: null,
    category: "Productivity",
    featured: false,
    icon: <FaTasks />,
    stats: {
      features: "15+",
      downloads: "1,000+",
      rating: "4.8"
    }
  },
  {
    id: 7,
    title: "Sales Dashboard",
    description: "📊 Interactive sales analytics dashboard with real-time metrics, predictive analytics, and data visualization. Features include sales forecasting, customer segmentation, and inventory tracking.",
    tech: ["React", "D3.js", "Chart.js", "Python", "Pandas", "FastAPI"],
    githubLink: "https://github.com/prem-patel22/sales-dashboard",
    liveLink: null,
    category: "Analytics",
    featured: true,
    icon: <FaChartLine />,
    stats: {
      metrics: "20+",
      reports: "50+",
      users: "100+"
    }
  }
];

function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showStats, setShowStats] = useState(false);

  const categories = ['All', 'AI/ML', 'Web App', 'Travel', 'Productivity', 'Analytics'];

  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '60px 20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          style={{ textAlign: 'center', marginBottom: '50px' }}
        >
          <motion.h1 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              fontSize: '3rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '15px'
            }}
          >
            My GitHub Projects
          </motion.h1>
          <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
            🚀 7 innovative projects showcasing my expertise in full-stack development, 
            AI/ML, and modern web technologies
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}
        >
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '2rem', color: '#667eea' }}>7</h3>
            <p style={{ color: '#666' }}>Total Projects</p>
          </div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '2rem', color: '#667eea' }}>6+</h3>
            <p style={{ color: '#666' }}>Technologies Used</p>
          </div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '2rem', color: '#667eea' }}>100%</h3>
            <p style={{ color: '#666' }}>Open Source</p>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px',
            justifyContent: 'space-between',
            marginBottom: '40px',
            background: 'white',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}
        >
          {/* Search Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            background: '#f5f5f5',
            borderRadius: '10px',
            padding: '10px 20px'
          }}>
            <FaSearch style={{ color: '#999', marginRight: '10px' }} />
            <input
              type="text"
              placeholder="Search by title, description, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '16px'
              }}
            />
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <FaFilter style={{ color: '#667eea', alignSelf: 'center' }} />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 20px',
                  background: selectedCategory === category ? '#667eea' : '#f5f5f5',
                  color: selectedCategory === category ? 'white' : '#666',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
              gap: '30px'
            }}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                layout
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Project Header with Gradient */}
                <div style={{
                  background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                  padding: '25px',
                  color: 'white',
                  position: 'relative'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                    {project.icon}
                  </div>
                  <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{project.title}</h2>
                  {project.featured && (
                    <span style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: 'rgba(255,255,255,0.3)',
                      padding: '5px 10px',
                      borderRadius: '20px',
                      fontSize: '12px'
                    }}>
                      ⭐ Featured
                    </span>
                  )}
                </div>

                {/* Project Body */}
                <div style={{ padding: '25px' }}>
                  <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ marginBottom: '10px', color: '#333' }}>🛠️ Tech Stack</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {project.tech.map((tech, index) => (
                        <span key={index} style={{
                          background: '#f0f0f0',
                          color: '#667eea',
                          padding: '5px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats Section */}
                  {project.stats && (
                    <div style={{ 
                      marginBottom: '20px',
                      background: '#f8f9fa',
                      padding: '15px',
                      borderRadius: '10px'
                    }}>
                      <h4 style={{ marginBottom: '10px', color: '#333' }}>📊 Key Metrics</h4>
                      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '10px' }}>
                        {Object.entries(project.stats).map(([key, value]) => (
                          <div key={key} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#667eea' }}>
                              {value}
                            </div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px',
                        background: '#333',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '10px',
                        fontWeight: 'bold'
                      }}
                    >
                      <FaGithub /> View Code
                    </motion.a>
                    {project.liveLink && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '12px',
                          background: '#667eea',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '10px',
                          fontWeight: 'bold'
                        }}
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '60px',
              background: 'white',
              borderRadius: '20px',
              marginTop: '40px'
            }}
          >
            <p style={{ fontSize: '1.2rem', color: '#999' }}>
              No projects found. Try adjusting your search or filter!
            </p>
          </motion.div>
        )}

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '60px',
            textAlign: 'center',
            padding: '30px',
            background: 'white',
            borderRadius: '15px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}
        >
          <h3 style={{ color: '#333', marginBottom: '10px' }}>🚀 Let's Connect!</h3>
          <p style={{ color: '#666', marginBottom: '15px' }}>
            All projects are open source! Feel free to ⭐ star them on GitHub and contribute!
          </p>
          <a
            href="https://github.com/prem-patel22"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 25px',
              background: '#333',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px'
            }}
          >
            <FaGithub /> Visit My GitHub Profile
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default ProjectsPage;