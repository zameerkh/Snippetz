import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Divider, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { createGist } from '../services/gistService';

const languageOptions = ['JavaScript', 'Python', 'Ruby', 'Go', 'Java', 'C#', 'HTML', 'CSS', 'Other'];

const CreateSnippet = ({ onGistCreated }) => {
  const [snippet, setSnippet] = useState('');
  const [description, setDescription] = useState('');
  const [filename, setFilename] = useState('');
  const [language, setLanguage] = useState(''); // State to hold the selected language

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!filename) {
      alert('Please specify a filename with the correct extension');
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
      alert('Snippet saved to Gist!');
      onGistCreated(); // Trigger refresh in SearchGist
    } catch (error) {
      alert('Error creating Gist');
    }
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
    </Paper>
  );
};

export default CreateSnippet;
