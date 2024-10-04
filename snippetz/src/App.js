import React from 'react';
import { Box, Typography } from '@mui/material';
import CreateSnippet from './components/CreateSnippet';
import SearchGist from './components/SearchGist'; // Ensure the correct import

function App() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Gist Manager
      </Typography>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create a New Gist
        </Typography>
        <CreateSnippet />
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Available Gists
        </Typography>
        <SearchGist /> {/* Ensure this component is being rendered */}
      </Box>
    </Box>
  );
}

export default App;
