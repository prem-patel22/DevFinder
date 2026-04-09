import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Loader from './components/Loader';
import SEO from './components/SEO';
import PerformanceMonitor from './components/PerformanceMonitor';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import LiveUrlPage from './pages/LiveUrlPage';
import DevelopersPage from './pages/DevelopersPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import BookingsPage from './pages/BookingsPage';
import './App.css';

// Page-specific SEO component
function PageSEO({ title, description, path }) {
  return (
    <SEO
      title={title}
      description={description}
      url={`https://prem-patel22.github.io/DevFinder${path}`}
    />
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <>
            <PageSEO 
              title="DevFinder - Home | Developer Portfolio Platform"
              description="Welcome to DevFinder - A modern developer portfolio platform to showcase your projects, blog posts, and connect with recruiters."
              path="/"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <HomePage />
            </motion.div>
          </>
        } />
        <Route path="/projects" element={
          <>
            <PageSEO 
              title="Projects | DevFinder - GitHub Projects Showcase"
              description="Explore my GitHub projects including Federated Medical Imaging, Library Management System, Sales Dashboard, and more."
              path="/projects"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectsPage />
            </motion.div>
          </>
        } />
        <Route path="/live-url" element={
          <>
            <PageSEO 
              title="Live URLs | DevFinder - Deployed Projects"
              description="Check out my live deployed projects including the Sales Dashboard and other upcoming applications."
              path="/live-url"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LiveUrlPage />
            </motion.div>
          </>
        } />
        <Route path="/blog" element={
          <>
            <PageSEO 
              title="Blog | DevFinder - Tech Articles & Tutorials"
              description="Read my latest articles on React, Machine Learning, Spring Boot, JavaScript, and web development."
              path="/blog"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BlogPage />
            </motion.div>
          </>
        } />
        <Route path="/developers" element={
          <>
            <PageSEO 
              title="About Developer | Prem Patel - Full Stack Developer"
              description="Learn about Prem Patel - Full Stack Developer, AI/ML Enthusiast, and B.Tech IT student at Dharmsinh Desai University."
              path="/developers"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DevelopersPage />
            </motion.div>
          </>
        } />
        <Route path="/contact" element={
          <>
            <PageSEO 
              title="Contact | DevFinder - Get in Touch"
              description="Get in touch with Prem Patel for collaborations, job opportunities, or any questions about projects."
              path="/contact"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ContactPage />
            </motion.div>
          </>
        } />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute adminOnly={true}>
              <>
                <PageSEO 
                  title="Admin Dashboard | DevFinder"
                  description="Admin dashboard for managing projects, blog posts, and users."
                  path="/admin"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AdminDashboard />
                </motion.div>
              </>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/bookings" 
          element={
            <ProtectedRoute adminOnly={true}>
              <>
                <PageSEO 
                  title="Bookings Management | DevFinder"
                  description="Admin dashboard for managing client bookings, confirmations, and cancellations."
                  path="/bookings"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BookingsPage />
                </motion.div>
              </>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <HelmetProvider>
      <AuthProvider>
        <Router basename="/DevFinder">
          <div className="App">
            <Toaster position="top-right" />
            <Header />
            <AnimatedRoutes />
            <PerformanceMonitor />
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;