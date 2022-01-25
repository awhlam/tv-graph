import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [showData, setShowData] = useState({});
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get('/search')
      .then((res) => { setShowData((res.data)); });
  }, [searchText]);

  return (
    <div>
      <h1>Hello World</h1>
      <p>Search for a TV Show:</p>
      <input type="text" />
    </div>
  );
};

export default App;
