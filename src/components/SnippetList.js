import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Box } from '@mui/material';
import { getGists } from '../services/gistService';

const SnippetList = () => {
  const [gists, setGists] = useState([]);

  useEffect(() => {
    const fetchGists = async () => {
      try {
        const data = await getGists();
        setGists(data);
      } catch (error) {
        console.error('Error fetching gists:', error);
      }
    };
    fetchGists();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: '500px',
        padding: 3,
        borderRadius: 1,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
      }}
    >
      <h2>My Code Snippets</h2>
      <List>
        {gists.map((gist) => (
          <ListItem key={gist.id}>
            <ListItemText
              primary={
                <a href={gist.html_url} target="_blank" rel="noopener noreferrer">
                  {gist.description || 'No Description'}
                </a>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SnippetList;
