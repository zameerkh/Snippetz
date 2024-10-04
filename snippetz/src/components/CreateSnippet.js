import React, { useState } from 'react';
import { createGist } from '../services/gistService';

const CreateSnippet = () => {
  const [snippet, setSnippet] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const gist = await createGist(snippet, description);
      console.log('Gist created successfully:', gist);
      alert('Snippet saved to Gist!');
    } catch (error) {
      alert('Error creating Gist');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Snippet:</label>
        <textarea
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
        />
      </div>
      <button type="submit">Create Gist</button>
    </form>
  );
};

export default CreateSnippet;
