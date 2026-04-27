import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane, FaUser, FaEnvelope, FaRobot, FaUserCircle, FaHistory, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [historyMessages, setHistoryMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);

  // Load saved history when component mounts
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    setHistoryMessages(savedHistory);
  }, []);

  // Smart response system - Returns only the answer, no extra messages
  const getSmartResponse = (userMessage, userName) => {
    const message = userMessage.toLowerCase().trim();
    
    // Greetings - Only welcome message
    if (message.match(/^(hi|hello|hey|greetings|sup|hola)/)) {
      return `👋 Hello ${userName}! Welcome to DevFinder! How can I help you today?`;
    }
    
    // About developer / who is the developer
    if (message.match(/who is the developer|about developer|developer of this|who made|creator|behind this/)) {
      return `👨‍💻 About the Developer:\n\nI'm Prem Patel, a passionate Full Stack Developer and AI/ML Enthusiast. I'm currently in my 3rd year of B.Tech IT at Dharmsinh Desai University, Nadiad, Gujarat.\n\n✨ Skills: React, Node.js, Python, Java, Spring Boot, MongoDB, MySQL\n\n🚀 I love building real-world applications and solving complex problems.\n\n📧 Email: patelpremalpeshkumar@gmail.com`;
    }
    
    // GitHub profile link
    if (message.match(/github profile|github link|your github|github account|git hub/)) {
      return `🐙 My GitHub Profile:\n\nhttps://github.com/prem-patel22\n\nFeel free to follow me and check out my repositories! ⭐`;
    }
    
    // Projects list
    if (message.match(/projects list|all projects|show projects|list projects|what projects|github projects/)) {
      return `📁 GitHub Projects:\n\nI have 7+ projects on GitHub including:\n• Federated Medical Imaging (AI/ML)\n• Library Management System\n• Planora (Project Management)\n• TravelEase & Travl (Travel Platforms)\n• Sales Dashboard (Analytics)\n• Todo App (Productivity)\n\n🔗 Visit: https://github.com/prem-patel22\n\nAll projects are open source! ⭐ Star them if you like!`;
    }
    
    // Skills / Tech stack
    if (message.match(/skill|tech stack|technology|framework|language|know|expertise|what can you do/)) {
      return `🛠️ My Tech Stack:\n\n💻 Languages: C, C++, Java, Python, JavaScript, SQL\n🌐 Frontend: HTML5, CSS3, React, Bootstrap\n⚙️ Backend: Spring Boot, Node.js, REST APIs\n🗄️ Databases: MySQL, MongoDB\n🧰 Tools: Git, GitHub, VS Code, IntelliJ IDEA\n\nI'm currently learning Machine Learning and DSA! 📚`;
    }
    
    // Hire / Work / Collaborate
    if (message.match(/hire|work|job|collaborate|contract|freelance|opportunity|pay|price|cost|rate/)) {
      return `💼 Working Together:\n\nI'm open to collaborations and freelance opportunities!\n\n📋 Plans Available:\n• Basic Consultation: $49 (30-min call + project review)\n• Standard Package: $199 (2-hour consultation + code review)\n• Premium Package: $499 (Full-day mentorship + portfolio review)\n\nClick the "Hire Me" button on the homepage to book a session!\n\n📧 Or email me directly at: patelpremalpeshkumar@gmail.com`;
    }
    
    // Contact / Reach out
    if (message.match(/contact|email|reach|connect|linkedin|social|phone|call/)) {
      return `📧 Contact Information:\n\n• Email: patelpremalpeshkumar@gmail.com\n• GitHub: https://github.com/prem-patel22\n• LinkedIn: https://www.linkedin.com/in/prem-patel-50a59b27a/\n\nFeel free to reach out anytime! I usually respond within 24 hours. 💬`;
    }
    
    // Education / Qualification
    if (message.match(/education|college|university|degree|study|qualification|ddu|dharmsinh/)) {
      return `🎓 Education:\n\n• B.Tech Information Technology (2023–2027)\n• Dharmsinh Desai University, Nadiad, Gujarat\n• Current Year: 3rd Year\n\n📚 Coursework: Data Structures, Algorithms, Web Development, Machine Learning, Database Management`;
    }
    
    // Resume / CV
    if (message.match(/resume|cv|curriculum|vitae|profile|download resume/)) {
      return `📄 Resume Download:\n\nYou can download my resume from the "Downloads" button in the header!\n\nAvailable formats:\n• Resume Only\n• Cover Letter Only\n• Both (Complete Package)\n\nThank you for your interest! 📎`;
    }
    
    // Demo / Live projects
    if (message.match(/demo|live|deploy|working|preview|see it|show me|sales dashboard/)) {
      return `🚀 Live Demos:\n\nCheck out my deployed projects:\n• Sales Dashboard: https://sales-dashboard-one-chi.vercel.app/\n\nOther projects coming soon! Follow me on GitHub for updates. 🌟\n\nVisit the "Live URL" page for all deployed projects!`;
    }
    
    // Blog / Articles
    if (message.match(/blog|article|post|write|content|tutorial|learn|guide/)) {
      return `📝 Blog Content:\n\nI write about:\n• React development tips\n• Machine Learning basics\n• Spring Boot tutorials\n• JavaScript concepts\n\nCheck out the Blog section on the website for detailed articles! 📚\n\nNew posts added regularly! 🔥`;
    }
    
    // Thanks / Appreciation
    if (message.match(/thank|thanks|appreciate|grateful|awesome|cool|nice|great/)) {
      return `🙏 You're very welcome! Glad to help. 😊\n\nAnything else you'd like to know?`;
    }
    
    // Booking related
    if (message.match(/book|booking|appointment|schedule|meeting|call|consultation/)) {
      return `📅 Book a Session:\n\nYou can book a consultation through the "Hire Me" button on the homepage!\n\nAvailable plans:\n• Basic Consultation - $49\n• Standard Package - $199\n• Premium Package - $499\n\nSelect your plan, complete verification, and I'll confirm your booking! ✅`;
    }
    
    // Bye / Goodbye
    if (message.match(/bye|goodbye|see you|later|exit|quit|end|close/)) {
      return `👋 Goodbye ${userName}! It was great talking to you.\n\nFeel free to come back anytime! 🚀`;
    }
    
    // Default - Ask to clarify
    return `Thanks for your message, ${userName}! Could you please be more specific?\n\nYou can ask me about:\n• About the developer\n• My GitHub profile\n• List of projects\n• My tech skills\n• Hiring and collaboration\n• Contact information`;
  };

  // Send admin response
  const sendAdminResponse = (userMessage, userName) => {
    setIsTyping(true);
    
    const response = getSmartResponse(userMessage, userName);
    
    setTimeout(() => {
      const adminResponse = {
        id: Date.now(),
        text: response,
        sender: 'admin',
        name: 'Prem Patel',
        timestamp: new Date().toISOString(),
        isAdmin: true
      };
      
      setMessages(prev => {
        const newMessages = [...prev, adminResponse];
        return newMessages;
      });
      
      setIsTyping(false);
    }, 800);
  };

  // Save current conversation to history
  const saveToHistory = () => {
    if (messages.length > 0) {
      const conversation = {
        id: Date.now(),
        name: visitorName,
        email: visitorEmail,
        messages: messages,
        date: new Date().toISOString()
      };
      const updatedHistory = [conversation, ...historyMessages];
      setHistoryMessages(updatedHistory);
      localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
    }
  };

  // Clear current conversation and start fresh
  const clearChat = () => {
    if (messages.length > 0) {
      saveToHistory();
    }
    setMessages([]);
    // Add fresh welcome message
    const welcomeMsg = {
      id: Date.now(),
      text: `👋 Hello ${visitorName}! Welcome to DevFinder. How can I help you today?`,
      sender: 'admin',
      name: 'Prem Patel',
      timestamp: new Date().toISOString(),
      isAdmin: true
    };
    setMessages([welcomeMsg]);
  };

  // Load previous conversation from history
  const loadConversation = (conversation) => {
    setMessages(conversation.messages);
    setShowHistory(false);
  };

  // Delete conversation from history
  const deleteConversation = (id) => {
    const updatedHistory = historyMessages.filter(h => h.id !== id);
    setHistoryMessages(updatedHistory);
    localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
  };

  useEffect(() => {
    if (isOpen && isNameSet && messages.length === 0) {
      setIsConnected(true);
      
      // Only welcome message, no previous messages
      const welcomeMsg = {
        id: Date.now(),
        text: `👋 Hello ${visitorName}! Welcome to DevFinder. How can I help you today?`,
        sender: 'admin',
        name: 'Prem Patel',
        timestamp: new Date().toISOString(),
        isAdmin: true
      };
      setMessages([welcomeMsg]);
    }
  }, [isOpen, isNameSet, visitorName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      name: visitorName,
      timestamp: new Date().toISOString(),
      isAdmin: false
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    const sentMessage = newMessage;
    setNewMessage('');

    // Send smart admin response
    sendAdminResponse(sentMessage, visitorName);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}
      >
        <FaComments size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '20px',
              width: '400px',
              height: '550px',
              background: 'white',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 1000
            }}
          >
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '15px',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaRobot size={20} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px' }}>DevFinder Assistant</h3>
                  <p style={{ margin: 0, fontSize: '10px', opacity: 0.8 }}>
                    {isConnected ? '🟢 Online' : '🔴 Connecting...'}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {isNameSet && historyMessages.length > 0 && (
                  <button 
                    onClick={() => setShowHistory(!showHistory)} 
                    style={{ 
                      background: 'rgba(255,255,255,0.2)', 
                      border: 'none', 
                      color: 'white', 
                      padding: '4px 8px', 
                      borderRadius: '5px', 
                      cursor: 'pointer',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <FaHistory size={10} /> {showHistory ? 'Hide' : 'History'}
                  </button>
                )}
                {isNameSet && messages.length > 1 && (
                  <button 
                    onClick={clearChat} 
                    style={{ 
                      background: 'rgba(255,255,255,0.2)', 
                      border: 'none', 
                      color: 'white', 
                      padding: '4px 8px', 
                      borderRadius: '5px', 
                      cursor: 'pointer', 
                      fontSize: '11px' 
                    }}
                  >
                    New Chat
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)} 
                  style={{ 
                    background: 'rgba(255,255,255,0.2)', 
                    border: 'none', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '5px', 
                    cursor: 'pointer' 
                  }}
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Quick Suggestions - Only when no conversation active */}
            {isNameSet && messages.length <= 1 && (
              <div style={{
                padding: '10px',
                background: '#f8f9fa',
                borderBottom: '1px solid #eee',
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '12px', color: '#666' }}>Try asking:</span>
                <button
                  onClick={() => {
                    setNewMessage("Who is the developer of this site?");
                    setTimeout(() => {
                      const fakeEvent = { preventDefault: () => {} };
                      sendMessage(fakeEvent);
                    }, 100);
                  }}
                  style={{
                    fontSize: '11px',
                    padding: '4px 10px',
                    background: '#e0e7ff',
                    border: 'none',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    color: '#667eea'
                  }}
                >
                  About developer
                </button>
                <button
                  onClick={() => {
                    setNewMessage("Show me your GitHub profile");
                    setTimeout(() => {
                      const fakeEvent = { preventDefault: () => {} };
                      sendMessage(fakeEvent);
                    }, 100);
                  }}
                  style={{
                    fontSize: '11px',
                    padding: '4px 10px',
                    background: '#e0e7ff',
                    border: 'none',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    color: '#667eea'
                  }}
                >
                  GitHub link
                </button>
                <button
                  onClick={() => {
                    setNewMessage("List all your projects");
                    setTimeout(() => {
                      const fakeEvent = { preventDefault: () => {} };
                      sendMessage(fakeEvent);
                    }, 100);
                  }}
                  style={{
                    fontSize: '11px',
                    padding: '4px 10px',
                    background: '#e0e7ff',
                    border: 'none',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    color: '#667eea'
                  }}
                >
                  Projects list
                </button>
              </div>
            )}

            {/* History Panel */}
            {showHistory && historyMessages.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '70px',
                left: '10px',
                right: '10px',
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                maxHeight: '300px',
                overflowY: 'auto',
                zIndex: 10,
                border: '1px solid #eee'
              }}>
                <div style={{ padding: '10px', background: '#f8f9fa', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>
                  Previous Conversations
                </div>
                {historyMessages.map(conv => (
                  <div key={conv.id} style={{
                    padding: '10px',
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div onClick={() => loadConversation(conv)} style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{conv.name}</div>
                        <div style={{ fontSize: '11px', color: '#666' }}>
                          {new Date(conv.date).toLocaleDateString()} • {conv.messages.length} messages
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteConversation(conv.id);
                        }}
                        style={{
                          background: '#fee2e2',
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          color: '#ef4444',
                          fontSize: '11px'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Name Entry */}
            {!isNameSet ? (
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', flex: 1, justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <FaUserCircle size={50} color="#667eea" />
                  <h4 style={{ marginTop: '10px', color: '#333' }}>Start a Conversation</h4>
                  <p style={{ fontSize: '13px', color: '#666' }}>Say hello and ask me anything!</p>
                </div>
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                />
                <input
                  type="email"
                  placeholder="Your Email (optional)"
                  value={visitorEmail}
                  onChange={(e) => setVisitorEmail(e.target.value)}
                  style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                />
                <button
                  onClick={() => visitorName && setIsNameSet(true)}
                  style={{ 
                    padding: '12px', 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Start Chat
                </button>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        alignSelf: msg.isAdmin ? 'flex-start' : 'flex-end',
                        maxWidth: '85%'
                      }}
                    >
                      <div style={{
                        background: msg.isAdmin ? '#f0f0f0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: msg.isAdmin ? '#333' : 'white',
                        padding: '10px 14px',
                        borderRadius: msg.isAdmin ? '15px 15px 15px 5px' : '15px 15px 5px 15px',
                        fontSize: '13px',
                        lineHeight: '1.5',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {msg.text}
                      </div>
                      <div style={{ 
                        fontSize: '10px', 
                        color: '#999', 
                        marginTop: '4px', 
                        textAlign: msg.isAdmin ? 'left' : 'right',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        justifyContent: msg.isAdmin ? 'flex-start' : 'flex-end'
                      }}>
                        {msg.isAdmin ? <FaRobot size={10} /> : <FaUser size={10} />}
                        {msg.name} • {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <div style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
                      <div style={{
                        background: '#f0f0f0',
                        padding: '10px 14px',
                        borderRadius: '15px 15px 15px 5px',
                        fontSize: '13px'
                      }}>
                        <span style={{ display: 'flex', gap: '4px' }}>
                          <span style={{ animation: 'bounce 1.4s infinite ease-in-out' }}>●</span>
                          <span style={{ animation: 'bounce 1.4s infinite ease-in-out 0.2s' }}>●</span>
                          <span style={{ animation: 'bounce 1.4s infinite ease-in-out 0.4s' }}>●</span>
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={sendMessage} style={{ padding: '15px', borderTop: '1px solid #eee', display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '20px', outline: 'none', fontSize: '13px' }}
                  />
                  <button 
                    type="submit" 
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '50%', 
                      width: '36px', 
                      height: '36px', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}
                  >
                    <FaPaperPlane size={14} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>
        {`
          @keyframes bounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-5px); }
          }
        `}
      </style>
    </>
  );
}

export default ChatWidget;