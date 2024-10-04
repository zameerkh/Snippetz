import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getGists } from '../services/gistService';

const SearchGist = () => {
  console.log('SearchGist component loaded'); // Log to check if component is loaded

  const [gists, setGists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGists()
      .then((fetchedGists) => {
        setGists(fetchedGists);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching gists');
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">Available Gists</Typography>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && gists.length > 0 && (
        <List>
          {gists.map((gist) => (
            <ListItem key={gist.id}>
              <ListItemText primary={gist.description || 'No description available'} />
            </ListItem>
          ))}
        </List>
      )}

      {!loading && !error && gists.length === 0 && <Typography>No gists available</Typography>}
    </Box>
  );
};

export default SearchGist;
