import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { List, ListItem, ListItemText, Box, Typography, CircularProgress } from '@mui/material';
import { getGists } from '../services/gistService';

const SearchGist = forwardRef((props, ref) => {
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

  useImperativeHandle(ref, () => ({
    fetchGists,
  }));

  useEffect(() => {
    fetchGists();
  }, []);

  return (
    <Box>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && gists.length > 0 ? (
        <List>
          {gists.map((gist) => (
            <ListItem key={gist.id}>
              <ListItemText primary={gist.description || 'No description'} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No gists available</Typography>
      )}
    </Box>
  );
});

export default SearchGist;
