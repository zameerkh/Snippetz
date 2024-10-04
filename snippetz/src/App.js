import React from 'react';
import { Box, Typography } from '@mui/material';
import CreateSnippet from './components/CreateSnippet';  // Ensure correct import
import SearchGist from './components/SearchGist';        // Ensure correct import
import DeleteAllGists from './components/DeleteAllGists'; // Ensure correct import

function App() {
  return (
    <Box sx={{ padding: 4 }}>
      {/* App Header */}
      <Typography variant="h3" gutterBottom align="center">
        Gist Manager
      </Typography>

      {/* Create Snippet Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create a New Gist
        </Typography>
        <CreateSnippet />
      </Box>

      {/* Search Gists Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Available Gists
        </Typography>
        <SearchGist />
      </Box>

      {/* Delete All Gists Section */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Delete All Gists
        </Typography>
        <DeleteAllGists />
      </Box>
    </Box>
  );
}

export default App;
