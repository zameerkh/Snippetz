import React, { useState } from 'react';
import { Button, CircularProgress, Box, Typography } from '@mui/material';
import { getGists, deleteGist } from '../services/gistService';

const DeleteAllGists = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Function to delete all gists
  const handleDeleteAll = async () => {
    setLoading(true);
    setMessage('');

    try {
      // Fetch all gists
      const gists = await getGists();
      if (gists.length === 0) {
        setMessage('No gists available to delete.');
        setLoading(false);
        return;
      }

      // Iterate and delete each gist
      for (const gist of gists) {
        await deleteGist(gist.id);
      }

      setMessage('All gists have been deleted successfully.');
    } catch (error) {
      setMessage('An error occurred while deleting gists.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Delete All Gists
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteAll}
        disabled={loading}
      >
        Delete All Gists
      </Button>

      {/* Show loading spinner while deleting */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Display result message */}
      {message && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default DeleteAllGists;
