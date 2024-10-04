import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Divider, Select, MenuItem, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import { createGist } from '../services/gistService';

const languageOptions = ['JavaScript', 'Python', 'Ruby', 'Go', 'Java', 'C#', 'HTML', 'CSS', 'CSharp', 'Splunk', 'Other'];

const CreateSnippet = ({ onGistCreated }) => {
  const [snippet, setSnippet] = useState('');
  const [description, setDescription] = useState('');
  const [filename, setFilename] = useState('');
  const [language, setLanguage] = useState(''); // State to hold the selected language
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!filename) {
      setSnackbarMessage('Please specify a filename with the correct extension');
      setSnackbarSeverity('error');
      setOpenSnackbar(true); // Trigger the Snackbar
      return;
    }

    try {
      const gist = {
        snippet,
        description,
        filename,
        tags: [language], // Add selected language as a tag
      };
      await createGist(gist);
      setSnackbarMessage('Snippet saved to Gist!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true); // Trigger the Snackbar
      onGistCreated(); // Trigger refresh in SearchGist
    } catch (error) {
      setSnackbarMessage('Error creating Gist');
      setSnackbarSeverity('error');
      setOpenSnackbar(true); // Trigger the Snackbar
    }
  };

  // Close the Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
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
        Create a New Gist
      </Typography>
      <Divider sx={{ marginBottom: 2, borderColor: '#81c784' }} />

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: 1,
          }}
        />
        <TextField
          label="Snippet"
          variant="outlined"
          multiline
          rows={4}
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
          fullWidth
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: 1,
          }}
        />
        <TextField
          label="Filename (e.g., snippet.js)"
          variant="outlined"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          fullWidth
          required
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: 1,
          }}
        />

        {/* Select Input for Language Tags */}
        <FormControl fullWidth required>
          <InputLabel sx={{ color: '#ffffff' }}>Language</InputLabel>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 1,
            }}
          >
            {languageOptions.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: '#81c784',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#66bb6a',
            },
            borderRadius: 1,
            padding: '12px 24px',
          }}
        >
          Create Gist
        </Button>
      </Box>

      {/* Snackbar for success/error notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CreateSnippet;
