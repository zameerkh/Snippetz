import React, { useState } from 'react';
import { Button, CircularProgress, Box, Typography, Snackbar, Alert } from '@mui/material';
import { getGists, deleteGist } from '../services/gistService';

const DeleteAllGists = ({ onGistsDeleted }) => { // Add the prop here
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Function to delete all gists
  const handleDeleteAll = async () => {
    setLoading(true);
    setSnackbarMessage('');

    try {
      // Fetch all gists
      const gists = await getGists();
      if (gists.length === 0) {
        setSnackbarMessage('No gists available to delete.');
        setSnackbarSeverity('info'); // Set the severity to 'info'
        setOpenSnackbar(true); // Open the Snackbar
        setLoading(false);
        return;
      }

      // Iterate and delete each gist
      for (const gist of gists) {
        await deleteGist(gist.id);
      }

      setSnackbarMessage('All gists have been deleted successfully.');
      setSnackbarSeverity('success'); // Set the severity to 'success'
      setOpenSnackbar(true); // Open the Snackbar

      if (onGistsDeleted) {
        onGistsDeleted(); // Call the callback to refresh the SearchGist component
      }
    } catch (error) {
      setSnackbarMessage('An error occurred while deleting gists.');
      setSnackbarSeverity('error'); // Set the severity to 'error'
      setOpenSnackbar(true); // Open the Snackbar
    } finally {
      setLoading(false);
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
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Delete All Gists
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteAll}
        disabled={loading}
        sx={{ marginBottom: 2 }}
      >
        Delete All Gists
      </Button>

      {/* Show loading spinner while deleting */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <CircularProgress />
        </Box>
      )}

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
    </Box>
  );
};

export default DeleteAllGists;
