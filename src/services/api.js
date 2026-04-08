import axios from 'axios';

const API_URL = 'https://api.github.com/users';

export const fetchGitHubUser = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};