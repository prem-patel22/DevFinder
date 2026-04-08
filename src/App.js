import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import LiveUrlPage from './pages/LiveUrlPage';
import DevelopersPage from './pages/DevelopersPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/live-url" element={<LiveUrlPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/developers" element={<DevelopersPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;