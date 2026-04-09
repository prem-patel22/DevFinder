import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCloudSun, FaNewspaper, FaGithub, FaChartLine, FaSync } from 'react-icons/fa';
import axios from 'axios';

function ApiHub() {
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const [githubStats, setGithubStats] = useState(null);
  const [loading, setLoading] = useState({ weather: true, news: true, github: true });
  const [activeTab, setActiveTab] = useState('weather');

  // Fetch Weather
  const fetchWeather = async () => {
    setLoading(prev => ({ ...prev, weather: true }));
    try {
      // Free weather API (no key required for demo)
      const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=22.7&longitude=72.8&current_weather=true');
      setWeather(response.data.current_weather);
    } catch (error) {
      console.error('Weather API error:', error);
    }
    setLoading(prev => ({ ...prev, weather: false }));
  };

  // Fetch News (using free GNews API)
  const fetchNews = async () => {
    setLoading(prev => ({ ...prev, news: true }));
    try {
      const response = await axios.get('https://gnews.io/api/v4/top-headlines?token=demo&lang=en&country=in&max=5');
      setNews(response.data.articles || []);
    } catch (error) {
      console.error('News API error:', error);
      // Fallback demo news
      setNews([
        { title: 'Tech Conference 2024 Announced', description: 'Major tech event coming soon', url: '#' },
        { title: 'New React 19 Features', description: 'Exciting updates to React', url: '#' },
        { title: 'AI Revolution in Web Dev', description: 'How AI is changing development', url: '#' }
      ]);
    }
    setLoading(prev => ({ ...prev, news: false }));
  };

  // Fetch GitHub Stats
  const fetchGithubStats = async () => {
    setLoading(prev => ({ ...prev, github: true }));
    try {
      const response = await axios.get('https://api.github.com/users/prem-patel22');
      setGithubStats(response.data);
    } catch (error) {
      console.error('GitHub API error:', error);
    }
    setLoading(prev => ({ ...prev, github: false }));
  };

  useEffect(() => {
    fetchWeather();
    fetchNews();
    fetchGithubStats();
  }, []);

  return (
    <div style={{ padding: '20px', background: 'white', borderRadius: '15px', marginTop: '30px' }}>
      <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        🔌 API Integration Hub
      </h3>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <button
          onClick={() => setActiveTab('weather')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'weather' ? '#667eea' : 'transparent',
            color: activeTab === 'weather' ? 'white' : '#333',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FaCloudSun /> Weather
        </button>
        <button
          onClick={() => setActiveTab('news')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'news' ? '#667eea' : 'transparent',
            color: activeTab === 'news' ? 'white' : '#333',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FaNewspaper /> News
        </button>
        <button
          onClick={() => setActiveTab('github')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'github' ? '#667eea' : 'transparent',
            color: activeTab === 'github' ? 'white' : '#333',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FaGithub /> GitHub Stats
        </button>
      </div>

      {/* Weather Tab */}
      {activeTab === 'weather' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center' }}
        >
          {loading.weather ? (
            <p>Loading weather data...</p>
          ) : weather ? (
            <div>
              <h2 style={{ fontSize: '3rem', color: '#667eea' }}>{weather.temperature}°C</h2>
              <p style={{ fontSize: '1.2rem' }}>Nadiad, Gujarat</p>
              <p>Wind Speed: {weather.windspeed} km/h</p>
              <button
                onClick={fetchWeather}
                style={{
                  marginTop: '15px',
                  padding: '8px 20px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}
              >
                <FaSync /> Refresh
              </button>
            </div>
          ) : (
            <p>Unable to fetch weather data</p>
          )}
        </motion.div>
      )}

      {/* News Tab */}
      {activeTab === 'news' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {loading.news ? (
            <p>Loading news...</p>
          ) : (
            <div>
              {news.map((item, index) => (
                <div key={index} style={{
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  marginBottom: '10px'
                }}>
                  <h4 style={{ color: '#333', marginBottom: '5px' }}>{item.title}</h4>
                  <p style={{ color: '#666', fontSize: '14px' }}>{item.description}</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', fontSize: '12px' }}>
                    Read more →
                  </a>
                </div>
              ))}
              <button
                onClick={fetchNews}
                style={{
                  marginTop: '15px',
                  padding: '8px 20px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}
              >
                <FaSync /> Refresh News
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* GitHub Stats Tab */}
      {activeTab === 'github' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {loading.github ? (
            <p>Loading GitHub stats...</p>
          ) : githubStats ? (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
                <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '10px' }}>
                  <h3 style={{ color: '#667eea' }}>{githubStats.public_repos}</h3>
                  <p>Repositories</p>
                </div>
                <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '10px' }}>
                  <h3 style={{ color: '#667eea' }}>{githubStats.followers}</h3>
                  <p>Followers</p>
                </div>
                <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '10px' }}>
                  <h3 style={{ color: '#667eea' }}>{githubStats.following}</h3>
                  <p>Following</p>
                </div>
              </div>
              <button
                onClick={fetchGithubStats}
                style={{
                  marginTop: '15px',
                  padding: '8px 20px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}
              >
                <FaSync /> Refresh Stats
              </button>
            </div>
          ) : (
            <p>Unable to fetch GitHub stats</p>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default ApiHub;