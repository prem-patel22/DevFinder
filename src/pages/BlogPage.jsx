import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaSearch, FaCalendar, FaUser, FaBookOpen, FaArrowRight, FaTimes, FaTag } from 'react-icons/fa';

// Sample blog posts - MAKE SURE THIS ARRAY IS HERE
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    excerpt: "Learn how to use useState, useEffect, and custom hooks to build powerful React applications.",
    content: `
# Getting Started with React Hooks

React Hooks revolutionized how we write React components.

## useState Example

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
\`\`\`

## Conclusion

Hooks make React code cleaner and more reusable!
    `,
    category: "React Tips",
    date: "April 8, 2026",
    readTime: "5 min read",
    author: "Prem Patel",
    tags: ["React", "Hooks", "JavaScript"]
  },
  {
    id: 2,
    title: "Building Your First Machine Learning Model with Python",
    excerpt: "A beginner-friendly guide to creating your first ML model using Scikit-learn.",
    content: `
# Building Your First Machine Learning Model

## Training a Model

\`\`\`python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier()
model.fit(X_train, y_train)
accuracy = model.score(X_test, y_test)
print(f"Accuracy: {accuracy:.2f}")
\`\`\`

## Next Steps

Try different algorithms like SVM, KNN, or Neural Networks!
    `,
    category: "ML Learning",
    date: "April 5, 2026",
    readTime: "8 min read",
    author: "Prem Patel",
    tags: ["Python", "Machine Learning", "Scikit-learn"]
  },
  {
    id: 3,
    title: "Spring Boot REST API Tutorial",
    excerpt: "Build production-ready REST APIs with Spring Boot and MySQL.",
    content: `
# Spring Boot REST API Tutorial

## Creating Controller

\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserController {
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
\`\`\`

Your REST API is ready!
    `,
    category: "Spring Boot Guides",
    date: "April 1, 2026",
    readTime: "10 min read",
    author: "Prem Patel",
    tags: ["Java", "Spring Boot", "REST API"]
  },
  {
    id: 4,
    title: "Understanding JavaScript Closures",
    excerpt: "Deep dive into JavaScript closures - a fundamental concept.",
    content: `
# Understanding JavaScript Closures

## Simple Example

\`\`\`javascript
function outerFunction(x) {
  function innerFunction(y) {
    return x + y;
  }
  return innerFunction;
}

const add5 = outerFunction(5);
console.log(add5(3)); // 8
\`\`\`

## Conclusion

Closures are powerful - master them to write better JavaScript!
    `,
    category: "JavaScript",
    date: "March 28, 2026",
    readTime: "6 min read",
    author: "Prem Patel",
    tags: ["JavaScript", "Closures", "Programming"]
  }
];

function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);
  
  const categories = ['All', 'React Tips', 'ML Learning', 'Spring Boot Guides', 'JavaScript'];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // If no posts, show message
  if (blogPosts.length === 0) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '60px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '20px', textAlign: 'center' }}>
          <h2>No blog posts found</h2>
          <p>Please check the blogPosts array in BlogPage.jsx</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '60px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {!selectedPost ? (
          <>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '15px' }}>
                📝 Tech Blog
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.95)' }}>
                Sharing my learning journey in development and AI/ML
              </p>
            </div>

            {/* Search Bar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '15px',
              marginBottom: '40px',
              justifyContent: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'white',
                borderRadius: '25px',
                padding: '10px 20px',
                flex: 1,
                maxWidth: '400px'
              }}>
                <FaSearch style={{ color: '#999', marginRight: '10px' }} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '16px'
                  }}
                />
                {searchTerm && (
                  <FaTimes 
                    style={{ color: '#999', cursor: 'pointer' }}
                    onClick={() => setSearchTerm('')}
                  />
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '8px 20px',
                      background: selectedCategory === cat ? 'white' : 'rgba(255,255,255,0.2)',
                      color: selectedCategory === cat ? '#667eea' : 'white',
                      border: 'none',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div style={{
              textAlign: 'center',
              marginBottom: '30px',
              color: 'white',
              fontSize: '1.1rem'
            }}>
              Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </div>

            {/* Blog Posts Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '30px'
            }}>
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '30px',
                    color: 'white'
                  }}>
                    <FaBookOpen size={40} />
                  </div>
                  <div style={{ padding: '25px' }}>
                    <h3 style={{ 
                      marginBottom: '12px', 
                      color: '#333',
                      fontSize: '1.3rem'
                    }}>
                      {post.title}
                    </h3>
                    <p style={{ 
                      color: '#666', 
                      marginBottom: '15px', 
                      lineHeight: '1.6'
                    }}>
                      {post.excerpt}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '15px',
                      fontSize: '13px',
                      color: '#999'
                    }}>
                      <span><FaCalendar /> {post.date}</span>
                      <span><FaUser /> {post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {post.tags.map(tag => (
                        <span key={tag} style={{
                          background: '#f0f0f0',
                          color: '#667eea',
                          padding: '4px 12px',
                          borderRadius: '15px',
                          fontSize: '11px'
                        }}>
                          <FaTag style={{ marginRight: '4px' }} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPost(post);
                      }}
                      style={{
                        marginTop: '20px',
                        padding: '10px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        width: '100%',
                        fontWeight: 'bold'
                      }}
                    >
                      Read Article <FaArrowRight style={{ marginLeft: '8px' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '60px',
                background: 'white',
                borderRadius: '20px',
                marginTop: '40px'
              }}>
                <h3>No articles found</h3>
                <p>Try adjusting your search or filter</p>
              </div>
            )}
          </>
        ) : (
          // Single Post View
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <button
              onClick={() => setSelectedPost(null)}
              style={{
                background: '#667eea',
                color: 'white',
                border: 'none',
                padding: '10px 25px',
                borderRadius: '25px',
                cursor: 'pointer',
                marginBottom: '30px'
              }}
            >
              ← Back to all posts
            </button>
            <h1 style={{ color: '#333', marginBottom: '20px' }}>{selectedPost.title}</h1>
            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '30px',
              color: '#666',
              fontSize: '14px',
              paddingBottom: '20px',
              borderBottom: '1px solid #eee'
            }}>
              <span><FaCalendar /> {selectedPost.date}</span>
              <span><FaUser /> {selectedPost.author}</span>
              <span>{selectedPost.readTime}</span>
            </div>
            <div className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {selectedPost.content}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPage;