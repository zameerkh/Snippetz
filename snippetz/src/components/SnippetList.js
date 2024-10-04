import React, { useState, useEffect } from 'react';
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
    <div>
      <h2>My Code Snippets</h2>
      <ul>
        {gists.map((gist) => (
          <li key={gist.id}>
            <a href={gist.html_url} target="_blank" rel="noopener noreferrer">
              {gist.description || 'No Description'}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnippetList;
