import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaExternalLinkAlt, FaRocket, FaClock, FaCheckCircle, 
  FaChartLine, FaBrain, FaBook, FaPlane, FaTasks,
  FaEdit, FaTrash, FaPlus
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { EditLiveUrlModal, AddLiveUrlModal } from '../components/EditModals';

// Default live URLs (fallback if no data in localStorage)
const defaultLiveUrls = [
  {
    id: 1,
    name: "Sales Dashboard",
    description: "Interactive sales analytics dashboard with real-time metrics, predictive analytics, and data visualization.",
    tech: ["React", "D3.js", "Chart.js", "Python", "FastAPI"],
    url: "https://sales-dashboard-one-chi.vercel.app/",
    status: "live",
    iconName: "chart",
    statusColor: "#10b981",
    statusText: "Live Demo Available"
  },
  {
    id: 2,
    name: "Federated Medical Imaging",
    description: "Privacy-preserving federated learning system for medical imaging with differential privacy.",
    tech: ["Python", "PyTorch", "Flower", "Streamlit"],
    url: null,
    status: "coming-soon",
    iconName: "brain",
    statusColor: "#f59e0b",
    statusText: "Coming Soon"
  },
  {
    id: 3,
    name: "Library Management System",
    description: "Comprehensive library management system with book borrowing and inventory tracking.",
    tech: ["Java", "Spring Boot", "MySQL", "React"],
    url: null,
    status: "coming-soon",
    iconName: "book",
    statusColor: "#f59e0b",
    statusText: "Coming Soon"
  },
  {
    id: 4,
    name: "Planora",
    description: "Smart project management and collaboration platform.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    url: null,
    status: "coming-soon",
    iconName: "tasks",
    statusColor: "#f59e0b",
    statusText: "Coming Soon"
  },
  {
    id: 5,
    name: "TravelEase",
    description: "All-in-one travel planning platform for flights, hotels, and itineraries.",
    tech: ["React", "Python", "Django", "PostgreSQL"],
    url: null,
    status: "coming-soon",
    iconName: "plane",
    statusColor: "#f59e0b",
    statusText: "Coming Soon"
  },
  {
    id: 6,
    name: "Travl",
    description: "Social travel platform for sharing experiences and discovering hidden gems.",
    tech: ["MERN Stack", "MongoDB", "Express", "React", "Node.js"],
    url: null,
    status: "coming-soon",
    iconName: "plane",
    statusColor: "#f59e0b",
    statusText: "Coming Soon"
  },
  {
    id: 7,
    name: "Todo App",
    description: "Feature-rich todo application with task management and progress tracking.",
    tech: ["React", "Redux", "CSS3", "LocalStorage"],
    url: null,
    status: "coming-soon",
    iconName: "tasks",
    statusColor: "#f59e0b",
    statusText: "Coming Soon"
  }
];

// Helper function to get icon by name
const getIcon = (iconName) => {
  switch(iconName) {
    case 'chart': return <FaChartLine />;
    case 'brain': return <FaBrain />;
    case 'book': return <FaBook />;
    case 'tasks': return <FaTasks />;
    case 'plane': return <FaPlane />;
    default: return <FaRocket />;
  }
};

function LiveUrlPage() {
  const { isAdmin, getAllLiveUrls, addLiveUrl, updateLiveUrl, deleteLiveUrl } = useAuth();
  const [filter, setFilter] = useState('all');
  const [liveUrls, setLiveUrls] = useState([]);
  const [editingUrl, setEditingUrl] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const loadUrls = () => {
    const savedUrls = getAllLiveUrls();
    if (savedUrls && savedUrls.length > 0) {
      setLiveUrls(savedUrls);
    } else {
      localStorage.setItem('liveUrls', JSON.stringify(defaultLiveUrls));
      setLiveUrls(defaultLiveUrls);
    }
  };

  useEffect(() => {
    loadUrls();
  }, []);

  const filteredProjects = filter === 'all' 
    ? liveUrls 
    : filter === 'live' 
      ? liveUrls.filter(p => p.status === 'live')
      : liveUrls.filter(p => p.status === 'coming-soon');

  const liveCount = liveUrls.filter(p => p.status === 'live').length;
  const comingSoonCount = liveUrls.filter(p => p.status === 'coming-soon').length;

  const handleAddUrl = (newUrl) => {
    if (addLiveUrl(newUrl)) {
      loadUrls();
      setShowAddModal(false);
    }
  };

  const handleUpdateUrl = (updatedData) => {
    if (updateLiveUrl(editingUrl.id, updatedData)) {
      loadUrls();
      setEditingUrl(null);
    }
  };

  const handleDeleteUrl = (id) => {
    if (window.confirm('Are you sure you want to delete this live URL?')) {
      deleteLiveUrl(id);
      loadUrls();
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
        
        {/* Header Section with Admin Add Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            style={{ textAlign: 'left' }}
          >
            <motion.h1 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                fontSize: '3rem',
                background: 'white',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '15px'
              }}
            >
              🚀 Live URLs
            </motion.h1>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.95)', maxWidth: '700px' }}>
              Explore my deployed projects and see what's coming next!
            </p>
          </motion.div>
          
          {isAdmin() && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setShowAddModal(true)}
              style={{
                padding: '12px 24px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              <FaPlus /> Add Live URL
            </motion.button>
          )}
        </div>

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
            <h3 style={{ fontSize: '2rem', color: '#10b981', margin: 0 }}>{liveCount}</h3>
            <p style={{ color: '#666' }}>Live Projects</p>
            <FaCheckCircle style={{ color: '#10b981', fontSize: '1.2rem', marginTop: '5px' }} />
          </div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '2rem', color: '#f59e0b', margin: 0 }}>{comingSoonCount}</h3>
            <p style={{ color: '#666' }}>Coming Soon</p>
            <FaClock style={{ color: '#f59e0b', fontSize: '1.2rem', marginTop: '5px' }} />
          </div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '2rem', color: '#667eea', margin: 0 }}>{liveUrls.length}</h3>
            <p style={{ color: '#666' }}>Total Projects</p>
            <FaRocket style={{ color: '#667eea', fontSize: '1.2rem', marginTop: '5px' }} />
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            marginBottom: '40px'
          }}
        >
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '10px 30px',
              background: filter === 'all' ? 'white' : 'rgba(255,255,255,0.2)',
              color: filter === 'all' ? '#667eea' : 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter('live')}
            style={{
              padding: '10px 30px',
              background: filter === 'live' ? 'white' : 'rgba(255,255,255,0.2)',
              color: filter === 'live' ? '#10b981' : 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            Live ✅
          </button>
          <button
            onClick={() => setFilter('coming-soon')}
            style={{
              padding: '10px 30px',
              background: filter === 'coming-soon' ? 'white' : 'rgba(255,255,255,0.2)',
              color: filter === 'coming-soon' ? '#f59e0b' : 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            Coming Soon ⏳
          </button>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '30px'
          }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}
            >
              {/* Project Header */}
              <div style={{
                background: project.status === 'live' 
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                padding: '25px',
                color: 'white',
                position: 'relative'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{getIcon(project.iconName)}</span>
                  {isAdmin() && (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={() => setEditingUrl(project)} 
                        style={{ 
                          background: 'rgba(255,255,255,0.2)', 
                          border: 'none', 
                          color: 'white', 
                          padding: '8px 12px', 
                          borderRadius: '8px', 
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '12px'
                        }}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteUrl(project.id)} 
                        style={{ 
                          background: 'rgba(255,255,255,0.2)', 
                          border: 'none', 
                          color: 'white', 
                          padding: '8px 12px', 
                          borderRadius: '8px', 
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '12px'
                        }}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  )}
                </div>
                <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{project.name}</h2>
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255,255,255,0.3)',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {project.status === 'live' ? '✅ LIVE' : '⏳ SOON'}
                </div>
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
                    {project.tech && project.tech.map((tech, index) => (
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

                {/* URL Section */}
                <div style={{
                  background: project.status === 'live' ? '#f0fdf4' : '#fef3c7',
                  padding: '15px',
                  borderRadius: '10px',
                  marginBottom: '20px'
                }}>
                  <h4 style={{ 
                    marginBottom: '10px', 
                    color: project.status === 'live' ? '#10b981' : '#f59e0b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    {project.status === 'live' ? <FaExternalLinkAlt /> : <FaClock />}
                    {project.status === 'live' ? 'Live Demo URL' : 'Status'}
                  </h4>
                  
                  {project.status === 'live' && project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#10b981',
                        textDecoration: 'none',
                        wordBreak: 'break-all',
                        fontWeight: '500'
                      }}
                    >
                      {project.url}
                    </a>
                  ) : (
                    <div>
                      <p style={{ color: '#d97706', margin: 0, fontWeight: '500' }}>
                        🚧 This project is under development
                      </p>
                      <p style={{ color: '#92400e', fontSize: '0.9rem', marginTop: '5px' }}>
                        Check back soon for the live demo!
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {project.status === 'live' && project.url ? (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '12px',
                      background: '#10b981',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <FaExternalLinkAlt /> Visit Live Demo
                  </motion.a>
                ) : (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '12px',
                    background: '#fef3c7',
                    color: '#d97706',
                    borderRadius: '10px',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    <FaClock /> Coming Soon - Stay Tuned!
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Live Demo Banner for Sales Dashboard */}
        {liveUrls.some(p => p.status === 'live') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: '60px',
              padding: '30px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            <h2 style={{ color: 'white', marginBottom: '15px' }}>🎯 Featured Live Demo</h2>
            <p style={{ color: 'rgba(255,255,255,0.95)', marginBottom: '20px', fontSize: '1.1rem' }}>
              Check out my Sales Dashboard - A comprehensive analytics platform with real-time metrics!
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://sales-dashboard-one-chi.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 35px',
                background: 'white',
                color: '#059669',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            >
              <FaRocket /> Launch Sales Dashboard
              <FaExternalLinkAlt />
            </motion.a>
          </motion.div>
        )}

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: '40px',
            textAlign: 'center',
            padding: '20px',
            color: 'rgba(255,255,255,0.8)'
          }}
        >
          <p>
            💡 More live demos coming soon! Each project will get its own deployment URL.
          </p>
          <p style={{ marginTop: '10px' }}>
            📧 Want early access? Reach out to me at patelpremalpeshkumar@gmail.com
          </p>
        </motion.div>
      </div>

      {/* Add Live URL Modal */}
      {showAddModal && <AddLiveUrlModal onClose={() => setShowAddModal(false)} onSave={handleAddUrl} />}
      
      {/* Edit Live URL Modal */}
      {editingUrl && <EditLiveUrlModal liveUrl={editingUrl} onClose={() => setEditingUrl(null)} onSave={handleUpdateUrl} />}
    </div>
  );
}

export default LiveUrlPage;