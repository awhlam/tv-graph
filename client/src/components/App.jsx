import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from './Chart.jsx';

const App = () => {
  const [showData, setShowData] = useState({});
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/search');
      let showData = {};
      showData['episodeNums'] = data.map(ep => ep.season_number.toString() + '.' + ep.episode_number.toString());
      showData['ratings'] = data.map(ep => ep.vote_average);
      setShowData(showData);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchText]);

  return (
    <div>
      <h1>TV Graph</h1>
      <p>Search for a TV Show:</p>
      <input type="text" />
      <Chart />
    </div>
  );
};

export default App;
