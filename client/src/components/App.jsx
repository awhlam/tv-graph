import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from './Chart.jsx';

const App = () => {
  const [showData, setShowData] = useState();
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/search');
      let showData = {};
      showData.episodeNums = data.map(ep => ep.season_number.toString() + '.' + String(ep.episode_number).padStart(2, '0'));
      showData.vote_average = data.map(ep => ep.vote_average);
      setShowData(showData);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchText]);

  if (!showData) {
    return (
      <div>
        <h1>TV Graph</h1>
        <p>Search for a TV Show: <input type="text" /></p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>TV Graph</h1>
        <p>Search for a TV Show: <input type="text" /></p>
        <Chart showData={showData} />
      </div>
    );
  }
};

export default App;
