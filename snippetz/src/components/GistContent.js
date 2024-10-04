import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const GistContent = ({ gist }) => {
  if (!gist) {
    return null;
  }

  return (
    <Paper
      elevation={5}
      sx={{
        padding: 4,
        backgroundColor: '#2d2f33',
        color: '#ffffff',
        borderRadius: 2,
        marginTop: 4,
      }}
    >
      <Typography variant="h5" sx={{ color: '#4fc3f7', marginBottom: 2 }}>
        {gist.description || 'No Description'}
      </Typography>

      {/* Map through the gist.files object and display each file's content */}
      {Object.keys(gist.files).map((filename) => {
        const file = gist.files[filename];
        return (
          <Box key={filename} sx={{ marginBottom: 3 }}>
            <Typography variant="body2" sx={{ color: '#81c784', marginBottom: 1 }}>
              Filename: {file.filename}
            </Typography>
            <Box
              sx={{
                backgroundColor: '#333',
                color: '#fff',
                padding: 2,
                borderRadius: 1,
                whiteSpace: 'pre-wrap', // Preserve formatting and line breaks
              }}
            >
              <Typography variant="body2">{file.content || 'No content available'}</Typography>
            </Box>
          </Box>
        );
      })}
    </Paper>
  );
};

export default GistContent;
