import axios from 'axios';

// Set your GitHub token here
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_PAT;

// Check if the GitHub token is loaded
if (!GITHUB_TOKEN) {
  console.error('GitHub token is not set. Please set REACT_APP_GITHUB_TOKEN in your .env file.');
}

const api = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  },
});

// Create a Gist
export const createGist = async ({ snippet, description, filename, tags }) => {
  const gistData = {
    description: `${description} [${tags.join(', ')}]`, // Add tags to the description
    public: true, // Set whether the gist is public or private
    files: {
      [filename]: {
        content: snippet,
      },
    },
  };
 console.log('Ctoken is ', process.env.REACT_APP_GITHUB_PAT);
  try {
    console.log('Creating gist with data:', gistData);
    const response = await api.post('/gists', gistData);
    console.log('Gist created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating Gist:', error.response?.data || error.message);
    throw error;
  }
};

// Fetch all Gists
export const getGists = async () => {
  try {
    console.log('Fetching gists...');
    const response = await api.get('/gists', {
      params: {
        _: new Date().getTime(), // Cache-busting parameter to prevent cached responses
      },
    });
    console.log('Gists fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching Gists:', error.response?.data || error.message);
    throw error;
  }
};

// Search Gists by language or search string (approximate match)
export const searchGists = async (searchTerm) => {
  try {
    const gists = await getGists();
    console.log(`Searching for gists with term: "${searchTerm}"`);
    const filteredGists = gists.filter((gist) => {
      const description = gist.description || '';
      const searchRegex = new RegExp(searchTerm, 'i'); // Case-insensitive search
      return searchRegex.test(description);
    });
    console.log('Filtered gists:', filteredGists);
    return filteredGists;
  } catch (error) {
    console.error('Error searching Gists:', error.response?.data || error.message);
    throw error;
  }
};

// Get full gist details by ID
export const getGistById = async (gistId) => {
  try {
    console.log(`Fetching gist with ID: ${gistId}`);
    const response = await api.get(`/gists/${gistId}`);
    console.log('Gist details:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Gist ${gistId}:`, error.response?.data || error.message);
    throw error;
  }
};

// Delete a single gist by ID
export const deleteGist = async (gistId) => {
  try {
    console.log(`Deleting gist with ID: ${gistId}`);
    const response = await api.delete(`/gists/${gistId}`);
    console.log(`Gist ${gistId} deleted successfully`, response.status);
  } catch (error) {
    console.error(`Error deleting gist ${gistId}:`, error.response?.data || error.message);
    throw error;
  }
};
