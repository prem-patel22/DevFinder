import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaSearch, FaFilter, FaBrain, FaBook, FaPlane, FaTasks, FaChartLine, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { EditProjectModal } from '../components/EditModals';
import ThreeDCard from '../components/ThreeDCard';

// Default projects (fallback if no projects in localStorage)
const defaultProjects = [
  {
    id: 1,
    title: "Federated Medical Imaging",
    description: "🏥 Privacy-preserving federated learning system where 3 hospitals collaborate to detect pneumonia without sharing patient data. HIPAA-compliant with differential privacy & Grad-CAM explainability.",
    tech: ["Python", "PyTorch", "Federated Learning", "Differential Privacy", "Streamlit", "Grad-CAM"],
    githubLink: "https://github.com/prem-patel22/federated-medical-imaging-fl",
    liveLink: null,
    category: "AI/ML",
    featured: true,
    iconName: "brain",
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
    iconName: "book",
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
    iconName: "tasks",
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
    iconName: "plane",
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
    iconName: "plane",
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
    iconName: "tasks",
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
    iconName: "chart",
    stats: {
      metrics: "20+",
      reports: "50+",
      users: "100+"
    }
  }
];

// Helper function to get icon by name
const getIcon = (iconName) => {
  switch(iconName) {
    case 'brain': return <FaBrain />;
    case 'book': return <FaBook />;
    case 'tasks': return <FaTasks />;
    case 'plane': return <FaPlane />;
    case 'chart': return <FaChartLine />;
    default: return <FaGithub />;
  }
};

function ProjectsPage() {
  const { isAdmin, getAllProjects, addProject, updateProject, deleteProject } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({ 
    title: '', 
    description: '', 
    tech: '', 
    githubLink: '', 
    category: 'Web App',
    featured: false,
    iconName: 'github'
  });

  const loadProjects = () => {
    const savedProjects = getAllProjects();
    if (savedProjects && savedProjects.length > 0) {
      setProjects(savedProjects);
    } else {
      localStorage.setItem('adminProjects', JSON.stringify(defaultProjects));
      setProjects(defaultProjects);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const categories = ['All', 'AI/ML', 'Web App', 'Travel', 'Productivity', 'Analytics'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.tech && project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProject = () => {
    const projectToAdd = {
      ...newProject,
      tech: newProject.tech.split(',').map(t => t.trim()),
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    if (addProject(projectToAdd)) {
      loadProjects();
      setShowAddModal(false);
      setNewProject({ title: '', description: '', tech: '', githubLink: '', category: 'Web App', featured: false, iconName: 'github' });
    }
  };

  const handleUpdateProject = (updatedData) => {
    if (updateProject(editingProject.id, updatedData)) {
      loadProjects();
      setEditingProject(null);
    }
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      loadProjects();
    }
  };

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
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
            <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '700px' }}>
              🚀 {projects.length} innovative projects showcasing my expertise in full-stack development, 
              AI/ML, and modern web technologies
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
              <FaPlus /> Add New Project
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
            <h3 style={{ fontSize: '2rem', color: '#667eea' }}>{projects.length}</h3>
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

        {/* Featured 3D Projects Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: '60px' }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
            🌟 Featured 3D Projects
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {projects.filter(p => p.featured).slice(0, 3).map(project => (
              <ThreeDCard
                key={project.id}
                title={project.title}
                tech={project.tech?.slice(0, 3).join(', ')}
                color="#667eea"
              />
            ))}
          </div>
        </motion.section>

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
                  cursor: 'pointer'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '25px' }}>
          {filteredProjects.map(project => (
            <motion.div 
              key={project.id} 
              whileHover={{ y: -5 }} 
              style={{ 
                background: 'white', 
                borderRadius: '20px', 
                overflow: 'hidden', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '25px',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ fontSize: '2.5rem' }}>
                  {getIcon(project.iconName)}
                </div>
                {isAdmin() && (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => setEditingProject(project)} 
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
                      onClick={() => handleDeleteProject(project.id)} 
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
              <div style={{ padding: '25px' }}>
                <h3 style={{ marginBottom: '10px' }}>{project.title}</h3>
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {project.tech && project.tech.map((t, i) => (
                    <span key={i} style={{ background: '#f0f0f0', color: '#667eea', padding: '5px 12px', borderRadius: '20px', fontSize: '12px' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#333', textDecoration: 'none' }}>
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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

      {/* Add Project Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }} onClick={() => setShowAddModal(false)}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '20px',
            width: '90%',
            maxWidth: '500px'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '20px' }}>Add New Project</h2>
            <input
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
              required
            />
            <textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px', minHeight: '80px' }}
              required
            />
            <input
              type="text"
              placeholder="Tech Stack (comma separated)"
              value={newProject.tech}
              onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
              style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
              required
            />
            <input
              type="url"
              placeholder="GitHub Link"
              value={newProject.githubLink}
              onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
              style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }}
            />
            <select
              value={newProject.category}
              onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
              style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px' }}
            >
              <option value="AI/ML">AI/ML</option>
              <option value="Web App">Web App</option>
              <option value="Travel">Travel</option>
              <option value="Productivity">Productivity</option>
              <option value="Analytics">Analytics</option>
            </select>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleAddProject} style={{ padding: '12px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', flex: 1, fontWeight: 'bold' }}>
                Add Project
              </button>
              <button onClick={() => setShowAddModal(false)} style={{ padding: '12px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', flex: 1, fontWeight: 'bold' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <EditProjectModal 
          project={editingProject} 
          onClose={() => setEditingProject(null)} 
          onSave={handleUpdateProject} 
        />
      )}
    </div>
  );
}

export default ProjectsPage;