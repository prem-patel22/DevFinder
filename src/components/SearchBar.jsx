import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function SearchBar({ onSearch, placeholder = "Search..." }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div style={{ position: 'relative' }}>
      {!isOpen ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            color: '#667eea'
          }}
        >
          <FaSearch />
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            marginTop: '10px',
            background: 'white',
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            display: 'flex',
            gap: '10px',
            zIndex: 1000
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            autoFocus
            style={{
              padding: '8px 12px',
              border: '2px solid #667eea',
              borderRadius: '5px',
              outline: 'none',
              width: '250px'
            }}
          />
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#999'
            }}
          >
            <FaTimes />
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default SearchBar;