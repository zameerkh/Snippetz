import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createGist } from '../services/gistService';

const CreateSnippet = () => {
  const [snippet, setSnippet] = useState('');
  const [description, setDescription] = useState('');
  const [filename, setFilename] = useState(''); // New state for filename

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!filename) {
      alert('Please specify a filename with the correct extension (e.g., snippet.js)');
      return;
    }

    try {
      const gist = await createGist(snippet, description, filename); // Pass filename to createGist
      alert('Snippet saved to Gist!');
    } catch (error) {
      alert('Error creating Gist');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '500px',
        padding: 3,
        borderRadius: 1,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        marginBottom: 3,
      }}
    >
      <TextField
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
      <TextField
        label="Snippet"
        variant="outlined"
        multiline
        rows={4}
        value={snippet}
        onChange={(e) => setSnippet(e.target.value)}
        fullWidth
      />
      {/* New input field for the filename */}
      <TextField
        label="Filename (e.g., snippet.js)"
        variant="outlined"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        fullWidth
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Create Gist
      </Button>
    </Box>
  );
};

export default CreateSnippet;
