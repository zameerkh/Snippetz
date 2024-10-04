import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Divider } from '@mui/material';
import { createGist } from '../services/gistService';

const CreateSnippet = () => {
  const [snippet, setSnippet] = useState('');
  const [description, setDescription] = useState('');
  const [filename, setFilename] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!filename) {
      alert('Please specify a filename with the correct extension (e.g., snippet.js)');
      return;
    }

    try {
      const gist = await createGist(snippet, description, filename);
      alert('Snippet saved to Gist!');
    } catch (error) {
      alert('Error creating Gist');
    }
  };

  return (
    <Paper
      elevation={5}
      sx={{
        padding: 4,
        backgroundColor: '#2d2f33', // Dark background to match the app's theme
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
            backgroundColor: '#ffffff', // White background for input fields
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
            backgroundColor: '#ffffff', // White background for input fields
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
            backgroundColor: '#ffffff', // White background for input fields
            borderRadius: 1,
          }}
        />

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
    </Paper>
  );
};

export default CreateSnippet;
