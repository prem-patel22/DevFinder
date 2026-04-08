import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaSearch, FaTag, FaCalendar, FaUser, FaBookOpen, FaArrowRight, FaTimes } from 'react-icons/fa';

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    excerpt: "Learn how to use useState, useEffect, and custom hooks to build powerful React applications. A complete guide for beginners.",
    content: `
# Getting Started with React Hooks

React Hooks revolutionized how we write React components. Let me share my journey learning them!

## Why Hooks?

Before Hooks, class components were the only way to use state and lifecycle methods. Hooks allow functional components to have state and side effects.

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

## useEffect Example

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  return <div>{user?.name}</div>;
}
\`\`\`

## Custom Hooks

Create reusable logic by extracting it into custom hooks:

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  
  return [storedValue, setValue];
}
\`\`\`

## Conclusion

Hooks make React code cleaner and more reusable. Start using them in your next project!
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
    excerpt: "A beginner-friendly guide to creating your first ML model using Scikit-learn. Learn the fundamentals of machine learning.",
    content: `
# Building Your First Machine Learning Model

Machine Learning sounds complex, but with Python and Scikit-learn, it's surprisingly accessible!

## Setting Up Environment

\`\`\`bash
pip install scikit-learn pandas numpy matplotlib
\`\`\`

## Loading Data

\`\`\`python
import pandas as pd
from sklearn.datasets import load_iris

# Load iris dataset
iris = load_iris()
X = iris.data  # Features
y = iris.target  # Labels
\`\`\`

## Training a Model

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)
accuracy = model.score(X_test, y_test)
print(f"Accuracy: {accuracy:.2f}")
\`\`\`

## Visualizing Results

\`\`\`python
import matplotlib.pyplot as plt

plt.figure(figsize=(10, 6))
plt.bar(iris.feature_names, model.feature_importances_)
plt.title('Feature Importance')
plt.show()
\`\`\`

## Next Steps

Try different algorithms like SVM, KNN, or Neural Networks. Happy learning!
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
    excerpt: "Build production-ready REST APIs with Spring Boot and MySQL. Learn best practices for API development.",
    content: `
# Spring Boot REST API Tutorial

Spring Boot makes building REST APIs incredibly easy. Let me show you how!

## Project Setup

Use Spring Initializr (start.spring.io) with dependencies:
- Spring Web
- Spring Data JPA
- MySQL Driver
- Lombok

## Creating Entity

\`\`\`java
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
}
\`\`\`

## Creating Repository

\`\`\`java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
\`\`\`

## Creating Controller

\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
\`\`\`

## Application Properties

\`\`\`properties
spring.datasource.url=jdbc:mysql://localhost:3306/dbname
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
\`\`\`

## Testing with cURL

\`\`\`bash
# GET all users
curl http://localhost:8080/api/users

# POST new user
curl -X POST http://localhost:8080/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"John","email":"john@example.com"}'
\`\`\`

Your REST API is ready! Deploy to cloud platforms like Heroku or AWS.
    `,
    category: "Spring Boot Guides",
    date: "April 1, 2026",
    readTime: "10 min read",
    author: "Prem Patel",
    tags: ["Java", "Spring Boot", "REST API", "MySQL"]
  },
  {
    id: 4,
    title: "Understanding JavaScript Closures",
    excerpt: "Deep dive into JavaScript closures - one of the most important concepts for mastering JavaScript.",
    content: `
# Understanding JavaScript Closures

Closures are a fundamental concept in JavaScript that every developer should understand.

## What is a Closure?

A closure is the combination of a function bundled together with references to its surrounding state.

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

## Practical Use Cases

1. **Data Privacy**
2. **Function Factories**
3. **Event Handlers**

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

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '60px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {!selectedPost ? (
          // Blog List View
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              style={{ textAlign: 'center', marginBottom: '50px' }}
            >
              <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '15px' }}>
                📝 Tech Blog
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.95)' }}>
                Sharing my learning journey in development and AI/ML
              </p>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
              variants={fadeInUp}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '15px',
                marginBottom: '40px',
                justifyContent: 'center'
              }}
            >
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
                  placeholder="Search articles by title, tags, or content..."
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
                      fontWeight: 'bold',
                      transition: 'all 0.3s'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Results Count */}
            <motion.div
              variants={fadeInUp}
              style={{
                textAlign: 'center',
                marginBottom: '20px',
                color: 'rgba(255,255,255,0.8)'
              }}
            >
              Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </motion.div>

            {/* Blog Posts Grid */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              initial="hidden"
              animate="visible"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '30px'
              }}
            >
              {filteredPosts.map(post => (
                <motion.div
                  key={post.id}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  style={{
                    background: 'white',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s'
                  }}
                  onClick={() => setSelectedPost(post)}
                >
                  <div style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '20px',
                    color: 'white'
                  }}>
                    <FaBookOpen size={30} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ marginBottom: '10px', color: '#333' }}>{post.title}</h3>
                    <p style={{ color: '#666', marginBottom: '15px', lineHeight: '1.6' }}>
                      {post.excerpt}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '15px',
                      fontSize: '14px',
                      color: '#999'
                    }}>
                      <span><FaCalendar style={{ marginRight: '5px' }} />{post.date}</span>
                      <span><FaUser style={{ marginRight: '5px' }} />{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {post.tags.map(tag => (
                        <span key={tag} style={{
                          background: '#f0f0f0',
                          color: '#667eea',
                          padding: '4px 10px',
                          borderRadius: '15px',
                          fontSize: '12px'
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button style={{
                      marginTop: '15px',
                      padding: '8px 20px',
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      width: '100%'
                    }}>
                      Read More <FaArrowRight />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* No Results Message */}
            {filteredPosts.length === 0 && (
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
                <h3 style={{ color: '#333', marginBottom: '10px' }}>No articles found</h3>
                <p style={{ color: '#666' }}>
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </motion.div>
            )}
          </>
        ) : (
          // Single Post View
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            <button
              onClick={() => setSelectedPost(null)}
              style={{
                background: '#667eea',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                cursor: 'pointer',
                marginBottom: '20px'
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
              flexWrap: 'wrap'
            }}>
              <span><FaCalendar /> {selectedPost.date}</span>
              <span><FaUser /> {selectedPost.author}</span>
              <span>{selectedPost.readTime}</span>
            </div>
            <div className="markdown-content" style={{
              lineHeight: '1.8',
              color: '#555'
            }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {selectedPost.content}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default BlogPage;