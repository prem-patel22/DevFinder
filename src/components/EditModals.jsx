import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

// Edit Project Modal
export function EditProjectModal({ project, onClose, onSave }) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [tech, setTech] = useState(project.tech?.join(', ') || '');
  const [githubLink, setGithubLink] = useState(project.githubLink || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, tech: tech.split(',').map(t => t.trim()), githubLink });
  };

  return (
    <Modal onClose={onClose} title="Edit Project">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...inputStyle, minHeight: '80px' }} rows="3" required />
        <input type="text" placeholder="Tech Stack (comma separated)" value={tech} onChange={(e) => setTech(e.target.value)} style={inputStyle} required />
        <input type="url" placeholder="GitHub Link" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} style={inputStyle} />
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" style={{ ...buttonStyle, background: '#28a745' }}>Save Changes</button>
          <button type="button" onClick={onClose} style={{ ...buttonStyle, background: '#6c757d' }}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

// Edit Live URL Modal
export function EditLiveUrlModal({ liveUrl, onClose, onSave }) {
  const [name, setName] = useState(liveUrl.name);
  const [description, setDescription] = useState(liveUrl.description);
  const [url, setUrl] = useState(liveUrl.url);
  const [tech, setTech] = useState(liveUrl.tech?.join(', ') || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, description, url, tech: tech.split(',').map(t => t.trim()) });
  };

  return (
    <Modal onClose={onClose} title="Edit Live URL">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Project Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...inputStyle, minHeight: '80px' }} rows="3" required />
        <input type="url" placeholder="Live URL (https://...)" value={url} onChange={(e) => setUrl(e.target.value)} style={inputStyle} required />
        <input type="text" placeholder="Tech Stack (comma separated)" value={tech} onChange={(e) => setTech(e.target.value)} style={inputStyle} />
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" style={{ ...buttonStyle, background: '#28a745' }}>Save Changes</button>
          <button type="button" onClick={onClose} style={{ ...buttonStyle, background: '#6c757d' }}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

// Add Live URL Modal
export function AddLiveUrlModal({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [tech, setTech] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, description, url, tech: tech.split(',').map(t => t.trim()) });
  };

  return (
    <Modal onClose={onClose} title="Add New Live URL">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Project Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...inputStyle, minHeight: '80px' }} rows="3" required />
        <input type="url" placeholder="Live URL (https://...)" value={url} onChange={(e) => setUrl(e.target.value)} style={inputStyle} required />
        <input type="text" placeholder="Tech Stack (comma separated)" value={tech} onChange={(e) => setTech(e.target.value)} style={inputStyle} />
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" style={{ ...buttonStyle, background: '#28a745' }}>Add Live URL</button>
          <button type="button" onClick={onClose} style={{ ...buttonStyle, background: '#6c757d' }}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

// Edit Blog Modal
export function EditBlogModal({ post, onClose, onSave }) {
  const [title, setTitle] = useState(post.title);
  const [excerpt, setExcerpt] = useState(post.excerpt);
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState(post.category);
  const [tags, setTags] = useState(post.tags?.join(', ') || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, excerpt, content, category, tags: tags.split(',').map(t => t.trim()) });
  };

  return (
    <Modal onClose={onClose} title="Edit Blog Post">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} required />
        <input type="text" placeholder="Excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} style={inputStyle} required />
        <textarea placeholder="Content (Markdown)" value={content} onChange={(e) => setContent(e.target.value)} style={{ ...inputStyle, minHeight: '200px' }} rows="6" required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle} required />
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} style={inputStyle} />
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" style={{ ...buttonStyle, background: '#28a745' }}>Save Changes</button>
          <button type="button" onClick={onClose} style={{ ...buttonStyle, background: '#6c757d' }}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

// Edit Developer Page Modal
export function EditDeveloperModal({ content, onClose, onSave }) {
  const [aboutText, setAboutText] = useState(content?.aboutText || '');
  const [bio, setBio] = useState(content?.bio || '');
  const [skills, setSkills] = useState(content?.skills?.join(', ') || '');
  const [funFact, setFunFact] = useState(content?.funFact || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ aboutText, bio, skills: skills.split(',').map(s => s.trim()), funFact });
  };

  return (
    <Modal onClose={onClose} title="Edit Developer Page Content">
      <form onSubmit={handleSubmit}>
        <textarea placeholder="About Me Text" value={aboutText} onChange={(e) => setAboutText(e.target.value)} style={{ ...inputStyle, minHeight: '100px' }} rows="4" required />
        <textarea placeholder="Bio / Additional Info" value={bio} onChange={(e) => setBio(e.target.value)} style={{ ...inputStyle, minHeight: '80px' }} rows="3" />
        <input type="text" placeholder="Skills (comma separated)" value={skills} onChange={(e) => setSkills(e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Fun Fact" value={funFact} onChange={(e) => setFunFact(e.target.value)} style={inputStyle} />
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" style={{ ...buttonStyle, background: '#28a745' }}>Save Changes</button>
          <button type="button" onClick={onClose} style={{ ...buttonStyle, background: '#6c757d' }}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

// Generic Modal Component
function Modal({ children, onClose, title }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 2000, backdropFilter: 'blur(5px)'
    }} onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }}
        style={{
          background: 'white', borderRadius: '20px', padding: '30px',
          width: '90%', maxWidth: '550px', maxHeight: '85vh', overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}><FaTimes /></button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px', marginBottom: '15px',
  border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px',
  fontFamily: 'inherit', boxSizing: 'border-box'
};

const buttonStyle = {
  padding: '12px 20px', color: 'white', border: 'none',
  borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', flex: 1
};