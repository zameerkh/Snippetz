import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { List, ListItem, ListItemText, Box, Typography, CircularProgress } from '@mui/material';
import { getGists, getGistById } from '../services/gistService'; // Import getGistById

const SearchGist = forwardRef((props, ref) => {
  const { onGistSelect } = props; // Destructure the onGistSelect prop
  const [gists, setGists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGists = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedGists = await getGists();
      setGists(fetchedGists);
    } catch (err) {
      setError('Error fetching gists');
    } finally {
      setLoading(false);
    }
  };

  const fetchGistDetails = async (gistId) => {
    setLoading(true);
    setError(null);
    try {
      const detailedGist = await getGistById(gistId); // Fetch full gist details by ID
      onGistSelect(detailedGist); // Pass the detailed gist back to App.js
    } catch (err) {
      setError('Error fetching gist details');
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchGists,
  }));

  useEffect(() => {
    fetchGists();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <List>
        {gists.map((gist) => (
          <ListItem
            key={gist.id}
            button
            onClick={() => fetchGistDetails(gist.id)} // Fetch full gist details when clicked
          >
            <ListItemText primary={gist.description || 'No description'} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
});

export default SearchGist;
