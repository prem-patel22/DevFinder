import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaPaperPlane, FaUser, FaEnvelope } from 'react-icons/fa';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

// For demo purposes, we'll use a mock socket connection
// In production, replace with your actual WebSocket server URL
const SOCKET_URL = 'https://socket.io/demo/chat';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const { user } = useAuth();

  // Mock socket connection (for demo without actual server)
  useEffect(() => {
    if (isOpen && isNameSet) {
      // Simulate connection
      setIsConnected(true);
      
      // Load saved messages from localStorage
      const savedMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
      setMessages(savedMessages);
      
      // Simulate welcome message
      setTimeout(() => {
        const welcomeMsg = {
          id: Date.now(),
          text: `Hello ${visitorName}! Welcome to DevFinder. How can I help you today?`,
          sender: 'admin',
          name: 'Prem Patel',
          timestamp: new Date().toISOString(),
          isAdmin: true
        };
        setMessages(prev => {
          const newMessages = [...prev, welcomeMsg];
          localStorage.setItem('chatMessages', JSON.stringify(newMessages));
          return newMessages;
        });
      }, 500);
    }
  }, [isOpen, isNameSet, visitorName]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      name: visitorName,
      timestamp: new Date().toISOString(),
      isAdmin: false
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    setNewMessage('');

    // Simulate admin response after 2 seconds
    setTimeout(() => {
      const responses = [
        "Thanks for reaching out! I'll get back to you shortly.",
        "Great question! Let me help you with that.",
        "I appreciate your message. Is there anything specific you'd like to know?",
        "Thanks for your interest in DevFinder!"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const adminResponse = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'admin',
        name: 'Prem Patel',
        timestamp: new Date().toISOString(),
        isAdmin: true
      };
      setMessages(prev => {
        const newMessages = [...prev, adminResponse];
        localStorage.setItem('chatMessages', JSON.stringify(newMessages));
        return newMessages;
      });
    }, 2000);
  };

  const clearChat = () => {
    localStorage.removeItem('chatMessages');
    setMessages([]);
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
              width: '350px',
              height: '500px',
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
              <div>
                <h3 style={{ margin: 0, fontSize: '16px' }}>Live Chat</h3>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
                  {isConnected ? '🟢 Online' : '🔴 Offline'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={clearChat} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' }}>
                  Clear
                </button>
                <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Name Entry */}
            {!isNameSet ? (
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', flex: 1, justifyContent: 'center' }}>
                <h4>Start a Conversation</h4>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                />
                <input
                  type="email"
                  placeholder="Your Email (optional)"
                  value={visitorEmail}
                  onChange={(e) => setVisitorEmail(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                />
                <button
                  onClick={() => visitorName && setIsNameSet(true)}
                  style={{ padding: '10px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Start Chat
                </button>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        alignSelf: msg.isAdmin ? 'flex-start' : 'flex-end',
                        maxWidth: '80%'
                      }}
                    >
                      <div style={{
                        background: msg.isAdmin ? '#f0f0f0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: msg.isAdmin ? '#333' : 'white',
                        padding: '8px 12px',
                        borderRadius: msg.isAdmin ? '15px 15px 15px 5px' : '15px 15px 5px 15px',
                        fontSize: '14px'
                      }}>
                        {msg.text}
                      </div>
                      <div style={{ fontSize: '10px', color: '#999', marginTop: '4px', textAlign: msg.isAdmin ? 'left' : 'right' }}>
                        {msg.name} • {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={sendMessage} style={{ padding: '15px', borderTop: '1px solid #eee', display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '20px', outline: 'none' }}
                  />
                  <button type="submit" style={{ background: '#667eea', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaPaperPlane size={16} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatWidget;