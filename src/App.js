import React, { useState, useRef } from 'react';
import { Box, Typography, Grid, Paper, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CreateSnippet from './components/CreateSnippet';
import SearchGist from './components/SearchGist';
import DeleteAllGists from './components/DeleteAllGists';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GistContent from './components/GistContent';

function App() {
  const searchGistRef = useRef(null);
  const [selectedGist, setSelectedGist] = useState(null);
  const [activeSection, setActiveSection] = useState('gists'); // Track active section

  // Function to handle gist selection
  const handleGistSelect = (gist) => {
    setSelectedGist(gist); // Set the selected gist
  };

  // Function to handle gist deletion
  const handleGistDelete = () => {
    setSelectedGist(null); // Clear the selected gist
    refreshGists(); // Refresh the gists list in SearchGist
  };
  // Function to trigger refresh in SearchGist after creating or deleting a gist
  const refreshGists = () => {
    if (searchGistRef.current) {
      searchGistRef.current.fetchGists(); // Call fetchGists method in SearchGist
    }
  };

  // Sidebar items
  const sidebarItems = [
    { text: 'Create a Gist', icon: <AddCircleOutlineIcon />, section: 'create' },
    { text: 'Delete All Gists', icon: <DeleteSweepIcon />, section: 'delete' },
    { text: 'Available Gists', icon: <ListAltIcon />, section: 'gists' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#1c1e21' }}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#2d2f33',
            color: '#fff',
          },
        }}
      >
        <Typography variant="h4" sx={{ padding: 2, textAlign: 'center', color: '#4fc3f7', fontWeight: 600 }}>
          Snippetz
        </Typography>
        <Divider />
        <List>
          {sidebarItems.map((item) => (
            <ListItem button key={item.text} onClick={() => setActiveSection(item.section)}>
              <ListItemIcon sx={{ color: '#81c784' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 4,
          backgroundColor: '#1c1e21',
        }}
      >
        {activeSection === 'create' && (
          <Paper
            elevation={5}
            sx={{
              padding: 4,
              backgroundColor: '#2d2f33',
              color: '#ffffff',
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: '#81c784', fontWeight: 500 }}>
              <AddCircleOutlineIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
              Create a New Gist
            </Typography>
            <Divider sx={{ marginBottom: 2, borderColor: '#81c784' }} />
            <CreateSnippet onGistCreated={refreshGists} />
          </Paper>
        )}

        {activeSection === 'delete' && (
          <Paper
            elevation={5}
            sx={{
              padding: 4,
              backgroundColor: '#2d2f33',
              color: '#ffffff',
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: '#f44336', fontWeight: 500 }}>
              <DeleteSweepIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
              Delete All Gists
            </Typography>
            <Divider sx={{ marginBottom: 2, borderColor: '#f44336' }} />
            <DeleteAllGists onGistsDeleted={refreshGists} />
          </Paper>
        )}

        {activeSection === 'gists' && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
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
                <SearchGist
                  ref={searchGistRef}
                  onGistSelect={handleGistSelect}
                  onGistDeleted={handleGistDelete}
                />
              </Paper>

              {/* Gist Content Section */}
              {selectedGist ? (
                <GistContent gist={selectedGist} />
              ) : (
                <Typography sx={{ color: '#ffffff', marginTop: 4 }}>
                  Select a gist to view its content
                </Typography>
              )}
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default App;
