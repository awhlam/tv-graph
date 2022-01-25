import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import Chart from './Chart.jsx';
import Footer from './Footer.jsx';

const App = () => {
  const [showData, setShowData] = useState();
  const [beginAtZero, setBeginAtZero] = useState(false);
  const [searchText, setSearchText] = useState('Dexter');

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/search', { params: {query: searchText} });
      setShowData(data);
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
        <Footer />
      </div>
    );
  }
};

export default App;
