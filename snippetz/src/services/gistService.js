import axios from 'axios';

// Set your GitHub token here
const GITHUB_TOKEN =  process.env.REACT_APP_GITHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

// Updated createGist to accept filename for specifying the language
export const createGist = async (snippetContent, description, filename, isPublic = false) => {
  if (!filename) {
    throw new Error('Filename is required, and it should include the correct extension (e.g., snippet.js).');
  }

  const gistData = {
    description,
    public: isPublic,
    files: {
      [filename]: {
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

// Fetch all Gists
export const getGists = async () => {
  try {
    const response = await api.get('/gists');
    return response.data;
  } catch (error) {
    console.error('Error fetching Gists', error);
    throw error;
  }
};

// Search Gists by language or search string (approximate match)
export const searchGists = async (searchTerm) => {
  try {
    const gists = await getGists();
    return gists.filter((gist) => {
      // Search in the description for language or search string
      const description = gist.description || '';
      const searchRegex = new RegExp(searchTerm, 'i'); // Case-insensitive search
      return searchRegex.test(description);
    });
  } catch (error) {
    console.error('Error searching Gists', error);
    throw error;
  }
};

// Fetch a specific Gist by ID to get its content
export const getGistById = async (gistId) => {
  try {
    const response = await api.get(`/gists/${gistId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Gist by ID', error);
    throw error;
  }
};

// Delete a single gist by ID
export const deleteGist = async (gistId) => {
  try {
    await api.delete(`/gists/${gistId}`);
    console.log(`Gist ${gistId} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting gist ${gistId}:`, error);
    throw error;
  }
};