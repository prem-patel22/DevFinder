import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaUndo, FaSave, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';

function CodePlayground() {
  const [html, setHtml] = useState(`<div class="container">
  <h1>Hello DevFinder! 🚀</h1>
  <p>This is an interactive code playground</p>
  <button onclick="alert('You clicked me!')">Click Me!</button>
</div>`);
  
  const [css, setCss] = useState(`.container {
  text-align: center;
  padding: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  color: white;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

button:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
}`);

  const [js, setJs] = useState(`// Write JavaScript here
console.log('Welcome to the playground!');
document.querySelector('button')?.addEventListener('click', () => {
  console.log('Button clicked!');
});`);
  
  const [activeTab, setActiveTab] = useState('html');
  const [output, setOutput] = useState('');

  const runCode = () => {
    const combinedCode = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}<\/script>
      </body>
      </html>
    `;
    setOutput(combinedCode);
  };

  const resetCode = () => {
    setHtml(`<div class="container">
  <h1>Hello DevFinder! 🚀</h1>
  <p>This is an interactive code playground</p>
  <button onclick="alert('You clicked me!')">Click Me!</button>
</div>`);
    setCss(`.container {
  text-align: center;
  padding: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  color: white;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

button:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
}`);
    setJs(`// Write JavaScript here
console.log('Welcome to the playground!');`);
  };

  return (
    <div style={{ padding: '20px', background: '#1e1e1e', borderRadius: '15px', marginTop: '30px' }}>
      <h3 style={{ color: 'white', marginBottom: '20px' }}>🎮 Interactive Code Playground</h3>
      
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button
          onClick={() => setActiveTab('html')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'html' ? '#e34c26' : '#2d2d2d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FaHtml5 /> HTML
        </button>
        <button
          onClick={() => setActiveTab('css')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'css' ? '#264de4' : '#2d2d2d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FaCss3Alt /> CSS
        </button>
        <button
          onClick={() => setActiveTab('js')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'js' ? '#f7df1e' : '#2d2d2d',
            color: activeTab === 'js' ? '#333' : 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FaJs /> JavaScript
        </button>
      </div>

      {/* Code Editor */}
      <div style={{ marginBottom: '15px' }}>
        {activeTab === 'html' && (
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            style={{
              width: '100%',
              height: '300px',
              background: '#2d2d2d',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '15px',
              fontFamily: 'monospace',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        )}
        {activeTab === 'css' && (
          <textarea
            value={css}
            onChange={(e) => setCss(e.target.value)}
            style={{
              width: '100%',
              height: '300px',
              background: '#2d2d2d',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '15px',
              fontFamily: 'monospace',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        )}
        {activeTab === 'js' && (
          <textarea
            value={js}
            onChange={(e) => setJs(e.target.value)}
            style={{
              width: '100%',
              height: '300px',
              background: '#2d2d2d',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '15px',
              fontFamily: 'monospace',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={runCode}
          style={{
            padding: '10px 20px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FaPlay /> Run Code
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetCode}
          style={{
            padding: '10px 20px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FaUndo /> Reset
        </motion.button>
      </div>

      {/* Output Preview */}
      <div style={{ marginTop: '20px' }}>
        <h4 style={{ color: 'white', marginBottom: '10px' }}>Preview:</h4>
        <iframe
          srcDoc={output}
          title="output"
          style={{
            width: '100%',
            height: '400px',
            border: 'none',
            borderRadius: '8px',
            background: 'white'
          }}
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
}

export default CodePlayground;