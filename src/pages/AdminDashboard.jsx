import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaProjectDiagram, FaBlog, FaEnvelope, FaTrash, FaPlus, FaCrown, FaUserShield } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function AdminDashboard() {
  const { user, isSuperAdmin, getAllUsers, deleteUser, getAllContacts, deleteContact, addProject, deleteProject, addBlogPost, deleteBlogPost, getAllProjects, getAllBlogPosts } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Load data
  useEffect(() => {
    setProjects(getAllProjects());
    setBlogPosts(getAllBlogPosts());
    setContacts(getAllContacts());
    setUsers(getAllUsers());
  }, [refresh, getAllProjects, getAllBlogPosts, getAllContacts, getAllUsers]);

  // Only Super Admin can access
  if (!isSuperAdmin()) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <FaUserShield style={{ fontSize: '60px', color: '#e74c3c', marginBottom: '20px' }} />
          <h2 style={{ color: '#e74c3c', marginBottom: '15px' }}>Access Denied</h2>
          <p>You don't have permission to access the admin dashboard.</p>
          <p style={{ marginTop: '15px', color: '#666' }}>This area is only accessible by the Super Administrator.</p>
        </div>
      </div>
    );
  }

  const handleAddProject = (project) => {
    addProject(project);
    setRefresh(!refresh);
    setShowAddProject(false);
  };

  const handleDeleteProject = (id) => {
    deleteProject(id);
    setRefresh(!refresh);
  };

  const handleAddBlog = (post) => {
    addBlogPost(post);
    setRefresh(!refresh);
    setShowAddBlog(false);
  };

  const handleDeleteBlog = (id) => {
    deleteBlogPost(id);
    setRefresh(!refresh);
  };

  const handleDeleteContact = (id) => {
    deleteContact(id);
    setRefresh(!refresh);
  };

  const handleDeleteUser = (id) => {
    deleteUser(id);
    setRefresh(!refresh);
  };

  const stats = {
    totalUsers: users.length,
    totalProjects: projects.length,
    totalBlogs: blogPosts.length,
    totalContacts: contacts.length
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '60px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'white',
            borderRadius: '30px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '30px',
            color: 'white'
          }}>
            <h1 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaCrown /> Super Admin Dashboard
            </h1>
            <p>Welcome back, {user?.name}! You have full control over the site.</p>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            padding: '30px',
            background: '#f8f9fa'
          }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
              <FaUsers style={{ fontSize: '2rem', color: '#667eea' }} />
              <h3 style={{ fontSize: '2rem', marginTop: '10px' }}>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
              <FaProjectDiagram style={{ fontSize: '2rem', color: '#667eea' }} />
              <h3 style={{ fontSize: '2rem', marginTop: '10px' }}>{stats.totalProjects}</h3>
              <p>Projects</p>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
              <FaBlog style={{ fontSize: '2rem', color: '#667eea' }} />
              <h3 style={{ fontSize: '2rem', marginTop: '10px' }}>{stats.totalBlogs}</h3>
              <p>Blog Posts</p>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
              <FaEnvelope style={{ fontSize: '2rem', color: '#667eea' }} />
              <h3 style={{ fontSize: '2rem', marginTop: '10px' }}>{stats.totalContacts}</h3>
              <p>Messages</p>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '10px', padding: '0 30px', borderBottom: '2px solid #eee', flexWrap: 'wrap' }}>
            {['overview', 'projects', 'blog', 'contacts', 'users'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 24px',
                  background: activeTab === tab ? '#667eea' : 'transparent',
                  color: activeTab === tab ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '10px 10px 0 0',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ padding: '30px' }}>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h3>System Overview</h3>
                <p>Welcome to the Super Admin Dashboard. Here you have full control over:</p>
                <ul style={{ marginTop: '15px', lineHeight: '1.8' }}>
                  <li>📁 Projects - Add, edit, or delete projects</li>
                  <li>📝 Blog Posts - Create and manage blog content</li>
                  <li>📧 Contact Messages - View and delete messages from users</li>
                  <li>👥 User Management - View all users and delete users if needed</li>
                </ul>
                <div style={{ marginTop: '30px', padding: '20px', background: '#f0fdf4', borderRadius: '10px' }}>
                  <p style={{ color: '#10b981' }}>✅ You are logged in as Super Admin. You have full access to all features.</p>
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                <button
                  onClick={() => setShowAddProject(true)}
                  style={{
                    padding: '10px 20px',
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <FaPlus /> Add Project
                </button>
                
                {projects.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    No projects added yet. Click "Add Project" to get started.
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {projects.map(project => (
                      <div key={project.id} style={{
                        background: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '10px'
                      }}>
                        <div>
                          <h4>{project.title}</h4>
                          <p style={{ fontSize: '14px', color: '#666' }}>{project.description}</p>
                          <small>{project.tech?.join(', ')}</small>
                        </div>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          style={{
                            background: '#dc3545',
                            color: 'white',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Blog Tab */}
            {activeTab === 'blog' && (
              <div>
                <button
                  onClick={() => setShowAddBlog(true)}
                  style={{
                    padding: '10px 20px',
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <FaPlus /> Add Blog Post
                </button>
                
                {blogPosts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    No blog posts yet. Click "Add Blog Post" to get started.
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {blogPosts.map(post => (
                      <div key={post.id} style={{
                        background: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '10px'
                      }}>
                        <div>
                          <h4>{post.title}</h4>
                          <p style={{ fontSize: '14px', color: '#666' }}>{post.excerpt}</p>
                          <small>{post.category} | {post.date}</small>
                        </div>
                        <button
                          onClick={() => handleDeleteBlog(post.id)}
                          style={{
                            background: '#dc3545',
                            color: 'white',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div>
                {contacts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    No contact messages yet.
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {contacts.map(contact => (
                      <div key={contact.id} style={{
                        background: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '10px'
                      }}>
                        <div>
                          <h4>{contact.name}</h4>
                          <p style={{ fontSize: '14px', color: '#666' }}>{contact.email}</p>
                          <p>{contact.message}</p>
                          <small>{contact.date}</small>
                        </div>
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          style={{
                            background: '#dc3545',
                            color: 'white',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '5px',
                            cursor: 'pointer'
                          }}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                {users.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    No users found.
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {users.map(userItem => (
                      <div key={userItem.id} style={{
                        background: userItem.role === 'super_admin' ? 'linear-gradient(135deg, #8B5CF620 0%, #764ba220 100%)' : '#f8f9fa',
                        padding: '15px',
                        borderRadius: '10px',
                        border: userItem.role === 'super_admin' ? '1px solid #8B5CF6' : 'none'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                          <div>
                            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {userItem.name}
                              {userItem.role === 'super_admin' && <FaCrown style={{ color: '#8B5CF6' }} />}
                            </h4>
                            <p style={{ fontSize: '14px', color: '#666' }}>{userItem.email}</p>
                            <small>Role: <strong style={{ color: userItem.role === 'super_admin' ? '#8B5CF6' : '#10b981' }}>{userItem.role}</strong></small>
                            <br />
                            <small>Joined: {new Date(userItem.createdAt).toLocaleDateString()}</small>
                          </div>
                          {userItem.role !== 'super_admin' && (
                            <button
                              onClick={() => handleDeleteUser(userItem.id)}
                              style={{
                                padding: '8px 16px',
                                background: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                              }}
                            >
                              <FaTrash /> Delete User
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Add Project Modal */}
      {showAddProject && (
        <AddProjectModal onClose={() => setShowAddProject(false)} onSave={handleAddProject} />
      )}

      {/* Add Blog Modal */}
      {showAddBlog && (
        <AddBlogModal onClose={() => setShowAddBlog(false)} onSave={handleAddBlog} />
      )}
    </div>
  );
}

// Add Project Modal Component
function AddProjectModal({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tech, setTech] = useState('');
  const [githubLink, setGithubLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      description,
      tech: tech.split(',').map(t => t.trim()),
      githubLink
    });
  };

  return (
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
    }} onClick={onClose}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '20px',
        width: '90%',
        maxWidth: '500px'
      }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '20px' }}>Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }} required />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }} rows="3" required />
          <input type="text" placeholder="Tech Stack (comma separated, e.g., React, Node.js, MongoDB)" value={tech} onChange={(e) => setTech(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }} required />
          <input type="url" placeholder="GitHub Link (optional)" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px' }} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ padding: '12px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', flex: 1 }}>Save Project</button>
            <button type="button" onClick={onClose} style={{ padding: '12px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', flex: 1 }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Add Blog Modal Component
function AddBlogModal({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      excerpt,
      content,
      category,
      tags: tags.split(',').map(t => t.trim()),
      author: 'Super Admin',
      readTime: '5 min read'
    });
  };

  return (
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
    }} onClick={onClose}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '20px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '20px' }}>Add Blog Post</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }} required />
          <input type="text" placeholder="Excerpt (short summary)" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }} required />
          <textarea placeholder="Content (Markdown supported)" value={content} onChange={(e) => setContent(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }} rows="6" required />
          <input type="text" placeholder="Category (e.g., React Tips, ML Learning)" value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '8px' }} required />
          <input type="text" placeholder="Tags (comma separated, e.g., React, JavaScript, Hooks)" value={tags} onChange={(e) => setTags(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px' }} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ padding: '12px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', flex: 1 }}>Publish Post</button>
            <button type="button" onClick={onClose} style={{ padding: '12px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', flex: 1 }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminDashboard;