import React, { useState, useRef } from 'react';
import { Box, Typography, Grid, Paper, Divider } from '@mui/material';
import CreateSnippet from './components/CreateSnippet';
import SearchGist from './components/SearchGist';
import DeleteAllGists from './components/DeleteAllGists';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import GistContent from './components/GistContent';

function App() {
  const searchGistRef = useRef(null);
  const [selectedGist, setSelectedGist] = useState(null);

  // Function to handle gist selection
  const handleGistSelect = (gist) => {
    setSelectedGist(gist); // Set the selected gist
  };

  // Function to trigger refresh in SearchGist after creating or deleting a gist
  const refreshGists = () => {
    if (searchGistRef.current) {
      searchGistRef.current.fetchGists(); // Call fetchGists method in SearchGist
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 4,
        backgroundColor: '#1c1e21', // Dark background
        minHeight: '100vh',
      }}
    >
      {/* App Header */}
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{
          color: '#fff', // White color for contrast
          fontWeight: 600,
          marginBottom: 6,
          letterSpacing: '2px',
        }}
      >
        Gist Manager
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column (Create and Delete Gists) */}
        <Grid item xs={12} md={4}>
          {/* Paper for Create Snippet Section */}
          <Paper
            elevation={5}
            sx={{
              padding: 4,
              backgroundColor: '#2d2f33',
              color: '#ffffff',
              borderRadius: 2,
              transition: '0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
              },
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: '#81c784', fontWeight: 500 }}>
              <AddCircleOutlineIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
              Create a New Gist
            </Typography>
            <Divider sx={{ marginBottom: 2, borderColor: '#81c784' }} />
            <CreateSnippet onGistCreated={refreshGists} /> {/* Refresh on gist creation */}
          </Paper>

          {/* Paper for Delete All Gists Section */}
          <Paper
            elevation={5}
            sx={{
              padding: 4,
              backgroundColor: '#2d2f33',
              color: '#ffffff',
              borderRadius: 2,
              marginTop: 4,
              transition: '0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
              },
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: '#f44336', fontWeight: 500 }}>
              <DeleteSweepIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
              Delete All Gists
            </Typography>
            <Divider sx={{ marginBottom: 2, borderColor: '#f44336' }} />
            <DeleteAllGists onGistsDeleted={refreshGists} /> {/* Refresh on deleting gists */}
          </Paper>
        </Grid>

        {/* Right Column (Search Gists and Gist Content) */}
        <Grid item xs={12} md={8}>
          {/* Paper for Search Gists Section */}
          <Paper
            elevation={5}
            sx={{
              padding: 4,
              backgroundColor: '#2d2f33',
              color: '#ffffff',
              borderRadius: 2,
              transition: '0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
              },
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: '#4fc3f7', fontWeight: 500 }}>
              Available Gists
            </Typography>
            <Divider sx={{ marginBottom: 2, borderColor: '#4fc3f7' }} />
            <SearchGist ref={searchGistRef} onGistSelect={handleGistSelect} /> {/* Ref to refresh */}
          </Paper>

          {/* Gist Content Section */}
          {selectedGist ? (
            <GistContent gist={selectedGist} /> // Conditionally render GistContent
          ) : (
            <Typography sx={{ color: '#ffffff', marginTop: 4 }}>Select a gist to view its content</Typography> // Fallback if no gist is selected
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
