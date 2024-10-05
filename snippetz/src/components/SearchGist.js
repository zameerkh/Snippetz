import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Autocomplete,
  TextField,
  IconButton
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getGists, getGistById, deleteGist } from '../services/gistService';

const SearchGist = forwardRef((props, ref) => {
  const { onGistSelect, onGistDeleted } = props;
  const [gists, setGists] = useState([]);
  const [filteredGists, setFilteredGists] = useState([]); // For filtered gists
  const [groupedGists, setGroupedGists] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState(''); // Track the search input value

  // Fetch gists from the API
  const fetchGists = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('Fetching gists...inside fetchGists');
      const fetchedGists = await getGists();
      setGists(fetchedGists);
      setFilteredGists(fetchedGists); // Initialize filtered gists with all gists
      groupGistsByTags(fetchedGists);
    } catch (err) {
      setError('Error fetching gists');
    } finally {
      setLoading(false);
    }
  };

  // Fetch gist details by ID
  const fetchGistDetails = async (gistId) => {
    try {
      const detailedGist = await getGistById(gistId);
      onGistSelect(detailedGist);
    } catch (err) {
      setError('Error fetching gist details');
    }
  };

  // Delete a gist by ID
  const handleDeleteGist = async (gistId) => {
    try {
      await deleteGist(gistId);
      onGistDeleted(); // Trigger any additional behavior on deletion
      fetchGists(); // Refresh the list after deletion
    } catch (err) {
      setError('Error deleting gist');
    }
  };

  // Expose fetchGists to parent component
  useImperativeHandle(ref, () => ({
    fetchGists,
  }));

  useEffect(() => {
    fetchGists();
  }, []);

  // Group gists by tags
  const groupGistsByTags = (gistsToGroup) => {
    const grouped = {};

    gistsToGroup.forEach((gist) => {
      // Extract tags from description, e.g., "[JavaScript]"
      const tagMatch = gist.description && gist.description.match(/\[([^\]]+)\]/);
      const tags = tagMatch ? tagMatch[1].split(',').map(tag => tag.trim()) : ['Untagged'];

      tags.forEach((tag) => {
        if (!grouped[tag]) {
          grouped[tag] = [];
        }
        grouped[tag].push(gist);
      });
    });

    setGroupedGists(grouped);
  };

  // Filter gists based on the search input
  const handleSearchChange = (event, inputValue) => {
    setSearchValue(inputValue);

    const filtered = gists.filter((gist) => {
      const description = gist.description || '';
      const filenames = Object.keys(gist.files).join(' ');
      return (
        description.toLowerCase().includes(inputValue.toLowerCase()) ||
        filenames.toLowerCase().includes(inputValue.toLowerCase())
      );
    });

    setFilteredGists(filtered); // Update the filtered gists
    groupGistsByTags(filtered); // Update grouped gists based on the filtered list
  };

  // Handle selection in Autocomplete
  const handleAutoCompleteSelect = (event, selectedGist) => {
    if (selectedGist && selectedGist.id) {
      fetchGistDetails(selectedGist.id);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      {/* Autocomplete Search Bar */}
      <Autocomplete
        freeSolo
        options={filteredGists} // Filtered gists based on search
        getOptionLabel={(gist) => gist.description || 'No description'}
        onInputChange={handleSearchChange} // Handle input change
        onChange={handleAutoCompleteSelect} // Handle gist selection from suggestions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Gists"
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 1,
              marginBottom: 2,
            }}
          />
        )}
      />

      {/* Display Gists Grouped by Tags */}
      {Object.keys(groupedGists).length === 0 ? (
        <Typography>No gists found</Typography>
      ) : (
        Object.keys(groupedGists).map((tag) => (
          <Accordion key={tag} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 'bold' }}>{tag}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {groupedGists[tag].map((gist) => (
                  <ListItem key={gist.id} button onClick={() => fetchGistDetails(gist.id)}>
                    <ListItemText
                      primary={gist.description || 'No description'}
                      secondary={`Files: ${Object.keys(gist.files).join(', ')}`}
                    />
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent gist selection when deleting
                        handleDeleteGist(gist.id); // Delete the gist
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
});

export default SearchGist;
