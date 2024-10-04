import React from 'react';
import CreateSnippet from './components/CreateSnippet';
import SnippetList from './components/SnippetList';
import './styles.css'; // Importing the custom CSS file

const App = () => {
  return (
    <div>
      <h1>Code Snippet Manager</h1>
      <CreateSnippet />
      <SnippetList />
    </div>
  );
};

export default App;
