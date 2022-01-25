import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import Chart from './Chart.jsx';

const App = () => {
  const [showData, setShowData] = useState();
  const [beginAtZero, setBeginAtZero] = useState(false);
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/search');
      console.log('data: ', data);
      let showObj = {};
      showObj.episodeNums = data.episodes.map(ep => ep.season_number.toString() + '.' + String(ep.episode_number).padStart(2, '0'));
      showObj.vote_average = data.episodes.map(ep => ep.vote_average);
      console.log(showObj);
      setShowData(showObj);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchText]);

  if (!showData) {
    return null;
  } else {
    return (
      <div>
        <Header />
        <Nav
          beginAtZero={beginAtZero}
          setBeginAtZero={setBeginAtZero}
        />
        <Chart
          showData={showData}
          beginAtZero={beginAtZero}
        />
      </div>
    );
  }
};

export default App;
