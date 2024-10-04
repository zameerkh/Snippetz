import axios from 'axios';

// Set your GitHub token here
const GITHUB_TOKEN =  process.env.REACT_APP_GITHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

export const createGist = async (snippetContent, description, isPublic = false) => {
  const gistData = {
    description,
    public: isPublic,
    files: {
      'snippet.js': {
        content: snippetContent,
      },
    },
  };

  try {
    const response = await api.post('/gists', gistData);
    return response.data;
  } catch (error) {
    console.error('Error creating Gist', error);
    throw error;
  }
};

export const getGists = async () => {
  try {
    const response = await api.get('/gists');
    return response.data;
  } catch (error) {
    console.error('Error fetching Gists', error);
    throw error;
  }
};
