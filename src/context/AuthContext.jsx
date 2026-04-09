import React, { createContext, useState, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// SUPER ADMIN CREDENTIALS - ONLY YOU KNOW THESE
const SUPER_ADMIN = {
  email: 'premptl2204@gmail.com',
  password: btoa('prem#2204'),
  name: 'Prem Patel (Super Admin)',
  role: 'super_admin'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [savedProjects, setSavedProjects] = useState([]);
  const [developerContent, setDeveloperContent] = useState(null);

  useEffect(() => {
    const token = cookies.token;
    if (token) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        const saved = JSON.parse(localStorage.getItem('savedProjects_' + JSON.parse(storedUser).id) || '[]');
        setSavedProjects(saved);
      }
    }
    // Load developer content
    const savedContent = localStorage.getItem('developerContent');
    if (savedContent) {
      setDeveloperContent(JSON.parse(savedContent));
    }
    setLoading(false);
  }, [cookies.token]);

  // Initialize Super Admin if not exists
  const initializeSuperAdmin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const superAdminExists = users.find(u => u.role === 'super_admin');
    
    if (!superAdminExists) {
      const superAdminUser = {
        id: 999999,
        name: SUPER_ADMIN.name,
        email: SUPER_ADMIN.email,
        password: SUPER_ADMIN.password,
        role: 'super_admin',
        savedProjects: [],
        comments: [],
        createdAt: new Date().toISOString()
      };
      users.push(superAdminUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const signup = async (name, email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === email)) {
        toast.error('User already exists!');
        return false;
      }
      if (email === SUPER_ADMIN.email) {
        toast.error('Cannot create account with this email!');
        return false;
      }
      const newUser = {
        id: Date.now(),
        name,
        email,
        password: btoa(password),
        role: 'user',
        savedProjects: [],
        comments: [],
        createdAt: new Date().toISOString()
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      const token = btoa(email + ':' + Date.now());
      setCookie('token', token, { path: '/' });
      localStorage.setItem('user', JSON.stringify({ id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }));
      setUser({ id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role });
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      toast.error('Signup failed!');
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      if (email === SUPER_ADMIN.email && btoa(password) === SUPER_ADMIN.password) {
        const token = btoa(email + ':' + Date.now());
        setCookie('token', token, { path: '/' });
        localStorage.setItem('user', JSON.stringify({ id: 999999, name: SUPER_ADMIN.name, email: SUPER_ADMIN.email, role: 'super_admin' }));
        setUser({ id: 999999, name: SUPER_ADMIN.name, email: SUPER_ADMIN.email, role: 'super_admin' });
        toast.success('Welcome Super Admin!');
        return true;
      }
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === btoa(password));
      if (user && user.role === 'user') {
        const token = btoa(email + ':' + Date.now());
        setCookie('token', token, { path: '/' });
        localStorage.setItem('user', JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }));
        setUser({ id: user.id, name: user.name, email: user.email, role: user.role });
        const saved = JSON.parse(localStorage.getItem('savedProjects_' + user.id) || '[]');
        setSavedProjects(saved);
        toast.success(`Welcome ${user.name}!`);
        return true;
      } else {
        toast.error('Invalid credentials!');
        return false;
      }
    } catch (error) {
      toast.error('Login failed!');
      return false;
    }
  };

  const logout = () => {
    removeCookie('token', { path: '/' });
    localStorage.removeItem('user');
    setUser(null);
    setSavedProjects([]);
    toast.success('Logged out successfully!');
  };

  const isSuperAdmin = () => user?.role === 'super_admin';
  const isAdmin = () => user?.role === 'super_admin';
  const isRegularUser = () => user?.role === 'user';

  // Project Management
  const getAllProjects = () => JSON.parse(localStorage.getItem('adminProjects') || '[]');
  
  const addProject = (project) => {
    if (!isSuperAdmin()) { toast.error('Only Super Admin can add projects!'); return false; }
    const projects = getAllProjects();
    const newProject = { ...project, id: Date.now(), createdAt: new Date().toISOString() };
    projects.push(newProject);
    localStorage.setItem('adminProjects', JSON.stringify(projects));
    toast.success('Project added successfully!');
    return true;
  };
  
  const updateProject = (projectId, updatedData) => {
    if (!isSuperAdmin()) { toast.error('Only Super Admin can update projects!'); return false; }
    let projects = getAllProjects();
    const index = projects.findIndex(p => p.id === projectId);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updatedData };
      localStorage.setItem('adminProjects', JSON.stringify(projects));
      toast.success('Project updated successfully!');
      return true;
    }
    return false;
  };
  
  const deleteProject = (projectId) => {
    if (!isSuperAdmin()) { toast.error('Only Super Admin can delete projects!'); return false; }
    let projects = getAllProjects();
    projects = projects.filter(p => p.id !== projectId);
    localStorage.setItem('adminProjects', JSON.stringify(projects));
    toast.success('Project deleted!');
    return true;
  };

  // Live URL Management
  const getAllLiveUrls = () => JSON.parse(localStorage.getItem('liveUrls') || '[]');
  
  const addLiveUrl = (liveUrl) => {
    if (!isSuperAdmin()) { toast.error('Only Super Admin can add live URLs!'); return false; }
    const urls = getAllLiveUrls();
    const newUrl = { ...liveUrl, id: Date.now(), createdAt: new Date().toISOString() };
    urls.push(newUrl);
    localStorage.setItem('liveUrls', JSON.stringify(urls));
    toast.success('Live URL added successfully!');
    return true;
  };
  
  const updateLiveUrl = (urlId, updatedData) => {
    if (!isSuperAdmin()) { toast.error('Only Super Admin can update live URLs!'); return false; }
    let urls = getAllLiveUrls();
    const index = urls.findIndex(u => u.id === urlId);
    if (index !== -1) {
      urls[index] = { ...urls[index], ...updatedData };
      localStorage.setItem('liveUrls', JSON.stringify(urls));
      toast.success('Live URL updated successfully!');
      return true;
    }
    return false;
  };
  
  const deleteLiveUrl = (urlId) => {
    if (!isSuperAdmin()) { toast.error('Only Super Admin can delete live URLs!'); return false; }
    let urls = getAllLiveUrls();
    urls = urls.filter(u => u.id !== urlId);
    localStorage.setItem('liveUrls', JSON.stringify(urls));
    toast.success('Live URL deleted!');
    return true;
  };

  // Blog Management
  const getAllBlogPosts = () => JSON.parse(localStorage.getItem('adminBlogs') || '[]');
  
  const addBlogPost = (post) => {
    if (!isSuperAdmin()) { toast.error('Only Super Admin can add blog posts!'); return false; }
    const posts = getAllBlogPosts();
    const newPost = { ...post, id: Date.now(), date: new Date().toLocaleDateString(), createdAt: new Date().toISOString() };
    posts.push(newPost);
    localStorage.setItem('adminBlogs', JSON.stringify(posts));
    toast.success('Blog post added!');
    return true;
  };
  
  const updateBlogPost = (postId, updatedData) => {
    if (!isSuperAdmin()) { toast.error('Only Super Admin can update blog posts!'); return false; }
    let posts = getAllBlogPosts();
    const index = posts.findIndex(p => p.id === postId);
    if (index !== -1) {
      posts[index] = { ...posts[index], ...updatedData };
      localStorage.setItem('adminBlogs', JSON.stringify(posts));
      toast.success('Blog post updated successfully!');
      return true;
    }
    return false;
  };
  
  const deleteBlogPost = (postId) => {
    if (!isSuperAdmin()) { toast.error('Only Super Admin can delete blog posts!'); return false; }
    let posts = getAllBlogPosts();
    posts = posts.filter(p => p.id !== postId);
    localStorage.setItem('adminBlogs', JSON.stringify(posts));
    toast.success('Blog post deleted!');
    return true;
  };

  // Developer Content Management
  const getDeveloperContent = () => {
    const saved = localStorage.getItem('developerContent');
    return saved ? JSON.parse(saved) : null;
  };
  
  const updateDeveloperContent = (content) => {
    if (!isSuperAdmin()) { toast.error('Only Super Admin can update developer content!'); return false; }
    localStorage.setItem('developerContent', JSON.stringify(content));
    setDeveloperContent(content);
    toast.success('Developer page updated successfully!');
    return true;
  };

  // Contact Management
  const getAllContacts = () => {
    if (!isSuperAdmin()) return [];
    return JSON.parse(localStorage.getItem('contactMessages') || '[]');
  };
  
  const deleteContact = (contactId) => {
    if (!isSuperAdmin()) return false;
    let contacts = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    contacts = contacts.filter(c => c.id !== contactId);
    localStorage.setItem('contactMessages', JSON.stringify(contacts));
    toast.success('Message deleted!');
    return true;
  };

  // User Management
  const getAllUsers = () => {
    if (!isSuperAdmin()) return [];
    return JSON.parse(localStorage.getItem('users') || '[]');
  };
  
  const deleteUser = (userId) => {
    if (!isSuperAdmin()) return false;
    if (userId === 999999) {
      toast.error('Cannot delete Super Admin!');
      return false;
    }
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
    toast.success('User deleted!');
    return true;
  };

  const saveProject = (projectId) => {
    if (!user || isAdmin()) return false;
    if (!savedProjects.includes(projectId)) {
      const newSaved = [...savedProjects, projectId];
      setSavedProjects(newSaved);
      localStorage.setItem('savedProjects_' + user.id, JSON.stringify(newSaved));
      toast.success('Project saved!');
      return true;
    }
    return false;
  };

  const removeSavedProject = (projectId) => {
    const newSaved = savedProjects.filter(id => id !== projectId);
    setSavedProjects(newSaved);
    localStorage.setItem('savedProjects_' + user.id, JSON.stringify(newSaved));
    toast.success('Project removed from saved!');
  };

  const addComment = (postId, comment) => {
    if (!user) return false;
    const comments = JSON.parse(localStorage.getItem('blogComments') || '[]');
    comments.push({ id: Date.now(), postId, userId: user.id, userName: user.name, comment, createdAt: new Date().toISOString() });
    localStorage.setItem('blogComments', JSON.stringify(comments));
    toast.success('Comment added!');
    return true;
  };

  const getComments = (postId) => {
    const comments = JSON.parse(localStorage.getItem('blogComments') || '[]');
    return comments.filter(c => c.postId === postId);
  };

  useEffect(() => {
    initializeSuperAdmin();
  }, []);

  return (
    <AuthContext.Provider value={{
      user, loading, signup, login, logout, isSuperAdmin, isAdmin, isRegularUser,
      saveProject, removeSavedProject, savedProjects, addComment, getComments,
      getAllProjects, addProject, updateProject, deleteProject,
      getAllLiveUrls, addLiveUrl, updateLiveUrl, deleteLiveUrl,
      getAllBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost,
      getAllContacts, deleteContact, getAllUsers, deleteUser,
      getDeveloperContent, updateDeveloperContent
    }}>
      {children}
    </AuthContext.Provider>
  );
}